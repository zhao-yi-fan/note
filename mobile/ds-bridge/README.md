# dsBridge 跨端通信原理梳理（面试向）

> 不再是一个 React Native 工程，而是用 **H5 + Android 示例 + iOS 示例** 来帮你理解 dsBridge 的通信流程和关键点。

---

## 1. 总体思路

**一句话：dsBridge = 利用 `prompt` 做的一套 JS ↔ 原生 RPC 协议。**

- JS 调原生：
  - H5 调用：`dsBridge.call('native.xxx', args, callback)`
  - 内部实现：`window.prompt('_dsbridge=' + method, jsonString)`
  - Android 拦截：`WebChromeClient.onJsPrompt(...)`
  - iOS 拦截：`runJavaScriptTextInputPanelWithPrompt:defaultText:...`
  - 解析 JSON，路由到对应的原生方法，执行后返回字符串给 JS
- 原生调 JS：
  - 通过 `evaluateJavascript` / `evaluateJavaScript:` 执行一个约定好的 JS 函数
  - 常见约定：`window._handleMessageFromNative(callbackId, data, isComplete)` / `_invokeJsMethod` 等

**核心协议：**

1. 使用 `prompt` 作为“单次请求”的信道（JS → Native）
2. 使用一个全局回调表 + `callbackId` 管理异步回调（Native → JS）
3. 使用 JSON 字符串传输复杂参数和返回值

---

## 2. H5 侧：极简版 dsBridge 实现

关键文件：`index.html`

### 2.1 核心数据结构

```js
var callbackMap = {};     // 保存异步回调
var callbackSeq = 0;      // 自增的 callbackId

function genCallbackId() {
  callbackSeq += 1;
  return 'cb_' + callbackSeq;
}
```

### 2.2 JS → 原生：`dsBridge.call`

```js
window.dsBridge = {
  call: function(method, args, cb) {
    var isAsync = typeof cb === 'function';
    var callbackId = null;

    if (isAsync) {
      callbackId = genCallbackId();
      callbackMap[callbackId] = cb;
    }

    var message = { method, args: args || null, callbackId };
    var json = JSON.stringify(message);

    // *** 核心：通过 prompt 把调用信息传给原生 ***
    var retStr = window.prompt('_dsbridge=' + method, json);

    // 同步：直接用 prompt 的返回值
    if (!isAsync) {
      if (!retStr) return null;
      try { return JSON.parse(retStr); } catch (e) { return retStr; }
    }

    // 异步：真正的结果稍后由原生调用 _handleMessageFromNative 再回到 JS
  },

  register: function(name, fn) {
    if (!window._jsApi) window._jsApi = {};
    window._jsApi[name] = fn;
  }
};
```

### 2.3 Native → JS：异步回调与主动调用

```js
// 原生异步完成后调用（约定好的入口）
window._handleMessageFromNative = function(callbackId, data, complete) {
  var cb = callbackMap[callbackId];
  if (!cb) return;
  try {
    var parsed = typeof data === 'string' ? JSON.parse(data) : data;
    cb(parsed);
  } catch (e) {
    cb(data);
  }
  if (complete) delete callbackMap[callbackId];
};

// 原生主动调用 JS 注册的方法
window._invokeJsMethod = function(name, jsonArgs) {
  var fn = window._jsApi && window._jsApi[name];
  if (typeof fn !== 'function') return;
  var args = typeof jsonArgs === 'string' ? JSON.parse(jsonArgs) : jsonArgs;
  fn(args);
};
```

---

## 3. Android 端关键流程

关键文件：`AndroidNative.java`

### 3.1 拦截 prompt：`onJsPrompt`

```java
webView.setWebChromeClient(new WebChromeClient() {
  @Override
  public boolean onJsPrompt(WebView view, String url, String message,
                            String defaultValue, JsPromptResult result) {
    if (message != null && message.startsWith("_dsbridge=")) {
      String methodName = message.substring("_dsbridge=".length());
      JSONObject json = new JSONObject(defaultValue);   // args + callbackId
      JSONObject args = json.optJSONObject("args");
      String callbackId = json.optString("callbackId", null);

      if ("native.syncEcho".equals(methodName)) {
        String ret = syncEcho(args);
        // *** 同步返回：prompt 的返回值 ***
        result.confirm(ret);
        return true;
      }

      if ("native.asyncEcho".equals(methodName)) {
        // 异步：只触发逻辑，不在这里返回真正结果
        asyncEcho(args, callbackId);
        result.confirm("");
        return true;
      }
    }
    return super.onJsPrompt(view, url, message, defaultValue, result);
  }
});
```

### 3.2 同步方法

```java
private String syncEcho(JSONObject args) {
  String msg = args != null ? args.optString("msg", "") : "";
  return "[Android sync] 收到: " + msg;
}
```

### 3.3 异步方法 + 回调 JS

```java
private void asyncEcho(JSONObject args, String callbackId) {
  String msg = args != null ? args.optString("msg", "") : "";
  String cbId = callbackId;

  new Thread(() -> {
    // 模拟耗时
    Thread.sleep(2000);

    JSONObject ret = new JSONObject();
    ret.put("msg", "[Android async] 收到: " + msg);

    // *** 关键：通过执行 JS 来回调 H5 ***
    // window._handleMessageFromNative(callbackId, json, true)
    String jsCode = "window._handleMessageFromNative('" + cbId + "', '"
      + ret.toString().replace("'", "\\'") + "', true)";

    mainHandler.post(() -> webView.evaluateJavascript(jsCode, null));
  }).start();
}
```

### 3.4 原生主动调用 JS 注册的方法

```java
private void callJsApi() {
  String jsonArgs = "{\\"msg\\":\\"hello from Android native\\"}";
  String jsCode = "window._invokeJsMethod('js.showFromNative', '"
    + jsonArgs.replace("'", "\\'") + "')";
  mainHandler.post(() -> webView.evaluateJavascript(jsCode, null));
}
```

---

## 4. iOS 端关键流程

关键文件：`iOSNative.m`

### 4.1 拦截 prompt：`runJavaScriptTextInputPanelWithPrompt`

```objc
- (void)webView:(WKWebView *)webView
runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt
   defaultText:(NSString *)defaultText
      initiatedByFrame:(WKFrameInfo *)frame
     completionHandler:(void (^)(NSString * _Nullable result))completionHandler {

  if ([prompt hasPrefix:@"_dsbridge="]) {
    NSString *methodName = [prompt substringFromIndex:@"_dsbridge=".length];

    NSData *data = [defaultText dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    NSDictionary *args = json[@"args"];
    NSString *callbackId = json[@"callbackId"];

    if ([methodName isEqualToString:@"native.syncEcho"]) {
      NSString *ret = [self syncEcho:args];
      // *** 同步返回 ***
      completionHandler(ret ?: @"");
      return;
    }

    if ([methodName isEqualToString:@"native.asyncEcho"]) {
      [self asyncEcho:args callbackId:callbackId];
      // 异步：先返回空，稍后再 evaluateJavaScript 回调
      completionHandler(@"");
      return;
    }

    completionHandler(@"");
    return;
  }

  completionHandler(nil);
}
```

### 4.2 同步方法

```objc
- (NSString *)syncEcho:(NSDictionary *)args {
  NSString *msg = args[@"msg"] ?: @"";
  return [NSString stringWithFormat:@"[iOS sync] 收到: %@", msg];
}
```

### 4.3 异步方法 + 回调 JS

```objc
- (void)asyncEcho:(NSDictionary *)args callbackId:(NSString *)callbackId {
  NSString *msg = args[@"msg"] ?: @"";
  NSString *cbId = [callbackId copy];

  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
    NSDictionary *retDict = @{ @"msg": [NSString stringWithFormat:@"[iOS async] 收到: %@", msg] };
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:retDict options:0 error:nil];
    NSString *jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
    NSString *escaped = [jsonStr stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"];

    NSString *js = [NSString stringWithFormat:
                    @"window._handleMessageFromNative('%@', '%@', true)",
                    cbId, escaped];

    [self.webView evaluateJavaScript:js completionHandler:nil];
  });
}
```

### 4.4 原生主动调用 JS 注册的方法

```objc
- (void)callJsApi {
  NSDictionary *args = @{ @"msg": @"hello from iOS native" };
  NSData *jsonData = [NSJSONSerialization dataWithJSONObject:args options:0 error:nil];
  NSString *jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
  NSString *escaped = [jsonStr stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"];

  NSString *js = [NSString stringWithFormat:
                  @"window._invokeJsMethod('%@', '%@')",
                  @"js.showFromNative", escaped];

  [self.webView evaluateJavaScript:js completionHandler:nil];
}
```

---

## 5. 面试时可以怎么表述？（要点）

1. **通道选择**：
   - dsBridge 使用 `prompt` 作为 JS → 原生 的调用通道，因为它天然支持“有返回值”。
2. **协议格式**：
   - message 前缀 `_dsbridge=` 标记这是桥接调用；
   - `defaultValue` 里用 JSON 封装 `method`、`args`、`callbackId`。
3. **同步调用**：
   - JS 调用 `dsBridge.call` 不带回调；
   - 原生在 `onJsPrompt` / `runJavaScriptTextInputPanelWithPrompt` 里直接执行完逻辑；
   - 返回字符串给 `prompt`，JS 侧同步拿到结果。
4. **异步调用**：
   - JS 生成 `callbackId`，把回调存在 `callbackMap` 中；
   - 原生只触发异步逻辑，不在 prompt 返回真正结果；
   - 异步完成后，通过 `evaluateJavascript` 调用 `window._handleMessageFromNative(callbackId, data, true)`；
   - JS 根据 `callbackId` 找到回调并执行，完成一次异步 RPC。
5. **原生主动调 JS**：
   - 不是通过 prompt，而是直接 `evaluateJavascript("window._invokeJsMethod('xxx', json)"...)`；
   - JS 侧提前通过 `dsBridge.register` 把函数挂到一个表上。

---

## 6. 总结一句话

> **dsBridge 就是：用 `prompt` + JSON + callbackId + `evaluateJavascript`，在 JS 和原生之间做了一套同步 + 异步的 RPC 协议。**
>
> 你只要能清晰地画出：
> - JS 调原生时那一次 `prompt` 的来回；
> - 原生异步回调 JS 时那一次 `evaluateJavascript` 的路径；
> 基本上就已经掌握了它的原理。
