/**
 * iOS 端 dsBridge 原理示例（非完整项目，只展示关键代码）
 *
 * 目标：帮助理解 H5 与 iOS 之间是如何通过 prompt 互相传参，
 *      以及同步 / 异步调用是怎么实现的。
 *
 * 核心点：
 * 1. H5 调原生：window.prompt("_dsbridge=" + method, jsonString)
 * 2. iOS 拦截：runJavaScriptTextInputPanelWithPrompt:defaultText:... 中拿到 jsonString
 * 3. 解析 JSON，路由到对应 ObjC 方法 + 参数
 * 4. 同步：直接在 completionHandler 里返回字符串
 * 5. 异步：保存 callbackId，异步完成后通过 evaluateJavaScript 回调 JS
 */

#import <UIKit/UIKit.h>
#import <WebKit/WebKit.h>

@interface DsBridgeViewController : UIViewController <WKUIDelegate, WKNavigationDelegate>

@property (nonatomic, strong) WKWebView *webView;

@end

@implementation DsBridgeViewController

- (void)viewDidLoad {
  [super viewDidLoad];

  WKWebViewConfiguration *config = [[WKWebViewConfiguration alloc] init];
  self.webView = [[WKWebView alloc] initWithFrame:self.view.bounds configuration:config];
  self.webView.UIDelegate = self;
  self.webView.navigationDelegate = self;
  self.webView.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
  [self.view addSubview:self.webView];

  // 加载你刚才写的 H5 页面（这里假设是本地文件，也可以是远程地址）
  // NSURL *url = [[NSBundle mainBundle] URLForResource:@"index" withExtension:@"html"];
  // [self.webView loadFileURL:url allowingReadAccessToURL:url];
}

#pragma mark - H5 调原生：拦截 prompt

/**
 * H5 侧 dsBridge.call 内部会调用：
 *   prompt("_dsbridge=" + methodName, jsonString)
 *
 * WKWebView 会回调到这里，供我们决定：
 *   - 要不要拦截这个 prompt
 *   - 要返回什么字符串给 JS（作为 prompt 的返回值）
 */
- (void)webView:(WKWebView *)webView
runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt
   defaultText:(NSString *)defaultText
      initiatedByFrame:(WKFrameInfo *)frame
     completionHandler:(void (^)(NSString * _Nullable result))completionHandler {

  if ([prompt hasPrefix:@"_dsbridge="]) {
    // 1. 解析方法名
    NSString *methodName = [prompt substringFromIndex:@"_dsbridge=".length];

    // 2. defaultText 里是 JSON 字符串，包含 args + callbackId
    NSData *data = [defaultText dataUsingEncoding:NSUTF8StringEncoding];
    NSDictionary *json = nil;
    if (data) {
      json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];
    }
    NSDictionary *args = json[@"args"];
    NSString *callbackId = json[@"callbackId"];

    // 3. 路由到具体原生方法
    if ([methodName isEqualToString:@"native.syncEcho"]) {
      NSString *ret = [self syncEcho:args];
      // *** 关键：completionHandler 返回的字符串会作为 prompt 的返回值回到 JS ***
      completionHandler(ret ?: @"");
      return;
    }

    if ([methodName isEqualToString:@"native.asyncEcho"]) {
      [self asyncEcho:args callbackId:callbackId];
      // 异步场景：这里一般返回空，真正结果稍后再调用 JS
      completionHandler(@"");
      return;
    }

    // 未识别的方法，返回空串
    completionHandler(@"");
    return;
  }

  // 非 dsBridge 的 prompt 走默认逻辑
  completionHandler(nil);
}

#pragma mark - 同步方法示例

/**
 * H5：
 *   const ret = dsBridge.call('native.syncEcho', { msg: 'hello' })
 */
- (NSString *)syncEcho:(NSDictionary *)args {
  NSString *msg = args[@"msg"] ?: @"";
  NSString *ret = [NSString stringWithFormat:@"[iOS sync] 收到: %@", msg];
  return ret;
}

#pragma mark - 异步方法示例

/**
 * H5：
 *   dsBridge.call('native.asyncEcho', { msg: 'hello' }, function (ret) { ... })
 *
 * 默认约定：JS 传给原生的 JSON 里会带一个 callbackId，
 * iOS 需要记住它，等异步任务完成后再通过 evaluateJavaScript 执行：
 *   window._handleMessageFromNative(callbackId, jsonData, true)
 */
- (void)asyncEcho:(NSDictionary *)args callbackId:(NSString *)callbackId {
  NSString *msg = args[@"msg"] ?: @"";
  NSString *cbId = [callbackId copy];

  // 模拟一个异步任务：2 秒后回调
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2 * NSEC_PER_SEC)),
                 dispatch_get_main_queue(), ^{
    NSDictionary *retDict = @{ @"msg": [NSString stringWithFormat:@"[iOS async] 收到: %@", msg] };
    NSData *jsonData = [NSJSONSerialization dataWithJSONObject:retDict options:0 error:nil];
    NSString *jsonStr = [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];

    // 拼出调用 JS 的代码
    // 注意需要对字符串中的引号做转义
    NSString *escaped = [jsonStr stringByReplacingOccurrencesOfString:@"'" withString:@"\\'"];
    NSString *js = [NSString stringWithFormat:
                    @"window._handleMessageFromNative('%@', '%@', true)",
                    cbId, escaped];

    [self.webView evaluateJavaScript:js completionHandler:^(id _Nullable result, NSError * _Nullable error) {
      // result 为 JS 函数的返回值，一般不用
    }];
  });
}

#pragma mark - 原生主动调用 JS 注册的方法

/**
 * JS 侧：
 *   dsBridge.register('js.showFromNative', function (data) { ... })
 *
 * 原生希望主动通知 H5 时，可以通过一个约定函数，例如：
 *   window._invokeJsMethod('js.showFromNative', '{...}')
 */
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

@end
