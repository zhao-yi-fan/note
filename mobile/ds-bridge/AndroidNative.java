/**
 * Android 端 dsBridge 原理示例（非完整项目，只展示关键代码）
 *
 * 目标：帮助理解 H5 与 Android 之间是如何通过 prompt 互相传参，
 *      以及同步 / 异步调用是怎么实现的。
 *
 * 核心点：
 * 1. H5 调原生：通过 window.prompt("_dsbridge=method", jsonString)
 * 2. Android 拦截：在 WebChromeClient.onJsPrompt(...) 中拿到 jsonString
 * 3. 解析 JSON，找到要调用的 Java 方法 + 参数
 * 4. 同步：直接在 onJsPrompt 里执行 Java 方法并返回字符串
 * 5. 异步：保存 callbackId，等异步完成后再通过 evaluateJavascript 回调 JS
 */

package com.example.dsbridge.demo;

import android.annotation.SuppressLint;
import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.webkit.JsPromptResult;
import android.webkit.WebChromeClient;
import android.webkit.WebView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * 这个类只是示例，真实项目通常会有 Activity + 自己封装的 DWebView。
 */
public class AndroidNative {

  private WebView webView;
  private Handler mainHandler = new Handler(Looper.getMainLooper());

  @SuppressLint("SetJavaScriptEnabled")
  private void initWebView() {
    webView = new WebView(/* context */ null);
    webView.getSettings().setJavaScriptEnabled(true);

    // 1. 注入一个 JS 对象，给 dsBridge 内部用
    webView.addJavascriptInterface(new JsApi(), "_dsbridge_native");

    // 2. 设置自定义 WebChromeClient，用来拦截 window.prompt
    webView.setWebChromeClient(new WebChromeClient() {
      @Override
      public boolean onJsPrompt(WebView view,
                                String url,
                                String message,
                                String defaultValue,
                                JsPromptResult result) {
        // H5 侧 dsBridge.call 内部会调用：
        //   prompt("_dsbridge=" + methodName, jsonString)

        if (message != null && message.startsWith("_dsbridge=")) {
          // 从 message 中取出方法名
          String methodName = message.substring("_dsbridge=".length());

          // defaultValue 里是 JSON 字符串，包含 args 和 callbackId
          try {
            JSONObject json = new JSONObject(defaultValue);
            JSONObject args = json.optJSONObject("args");
            String callbackId = json.optString("callbackId", null);

            // 这里演示：根据方法名路由到不同的 Java 方法
            if ("native.syncEcho".equals(methodName)) {
              // 同步方法：直接返回字符串给 JS
              String ret = syncEcho(args);
              // *** 关键：result.confirm(retStr) 会作为 prompt 的返回值回到 JS ***
              result.confirm(ret);
              return true;
            }

            if ("native.asyncEcho".equals(methodName)) {
              // 异步方法：立即返回一个占位（通常为 null 或空串），
              // 真正的结果会通过 callbackId 异步回调到 JS。
              asyncEcho(args, callbackId);
              result.confirm("");
              return true;
            }

          } catch (JSONException e) {
            e.printStackTrace();
            // 出错时也要结束 prompt
            result.confirm("");
            return true;
          }
        }

        return super.onJsPrompt(view, url, message, defaultValue, result);
      }
    });
  }

  /**
   * ====================
   *  同步方法示例
   * ====================
   * H5：
   *   const ret = dsBridge.call('native.syncEcho', { msg: 'hello' })
   *   // ret 立刻拿到原生返回值
   */
  private String syncEcho(JSONObject args) {
    String msg = args != null ? args.optString("msg", "") : "";
    // 这里可以做任意业务逻辑处理
    return "[Android sync] 收到: " + msg;
  }

  /**
   * ====================
   *  异步方法示例
   * ====================
   * H5：
   *   dsBridge.call('native.asyncEcho', { msg: 'hello' }, function (ret) { ... })
   *
   * JS 侧传过来的 JSON 包含 callbackId，Android 需要记住它，
   * 等异步操作（网络请求/IO 等）完成后，再用 callbackId 回调回去。
   */
  private void asyncEcho(JSONObject args, String callbackId) {
    final String msg = args != null ? args.optString("msg", "") : "";
    final String cbId = callbackId;

    // 模拟一个异步操作：2 秒后回调
    new Thread(() -> {
      try {
        Thread.sleep(2000);
      } catch (InterruptedException ignored) {
      }

      // 构造要返回给 JS 的数据
      JSONObject ret = new JSONObject();
      try {
        ret.put("msg", "[Android async] 收到: " + msg);
      } catch (JSONException ignored) {
      }

      // 关键：通过执行一段 JS，把数据推回给 H5
      // 协议约定为：
      //   window._handleMessageFromNative(callbackId, jsonString, true)
      String jsCode = "window._handleMessageFromNative('" + cbId + "', '"
        + ret.toString().replace("'", "\\'") + "', true)";

      mainHandler.post(() -> webView.evaluateJavascript(jsCode, value -> {
        // 这里的 value 是 _handleMessageFromNative 的返回值，一般不用
      }));
    }).start();
  }

  /**
   * ====================
   *  原生调用 JS 中注册的方法（不是回调）
   * ====================
   * JS 侧：
   *   dsBridge.register('js.showFromNative', function (data) { ... })
   *
   * 原生想主动通知 JS 时，可以调用 _invokeJsMethod：
   */
  private void callJsApi() {
    String jsonArgs = "{\\"msg\\":\\"hello from Android native\\"}";
    String jsCode = "window._invokeJsMethod('js.showFromNative', '"
      + jsonArgs.replace("'", "\\'") + "')";

    mainHandler.post(() -> webView.evaluateJavascript(jsCode, null));
  }

  /**
   * ====================
   *  JsApi 仅示意：
   * ====================
   * 有些 dsBridge 版本会通过 addJavascriptInterface 注入一个对象，
   * 让 JS 可以直接访问 window._dsbridge_native.xxx，
   * 这里给出一个简单示例，说明 @JavascriptInterface 的作用。
   */
  public static class JsApi {

    @JavascriptInterface
    public String ping(String msg) {
      // 这个方法可以被 JS 直接通过 window._dsbridge_native.ping 调到
      return "pong: " + msg;
    }
  }
}
