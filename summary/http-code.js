// HTTP 状态码大全（常用）
// 可直接用于项目中，也可作为学习笔记

const HTTP_STATUS = {
  // 1xx 信息类
  100: "Continue：继续请求（大文件上传时常见）",
  101: "Switching Protocols：切换协议（如 WebSocket）",
  102: "Processing：服务器正在处理（WebDAV）",

  // 2xx 成功类
  200: "OK：请求成功",
  201: "Created：已创建资源（POST 新建成功）",
  202: "Accepted：请求已接受但未处理完成（异步任务）",
  204: "No Content：请求成功但无返回内容（如 DELETE）",
  206: "Partial Content：部分内容（断点续传）",

  // 3xx 重定向类
  300: "Multiple Choices：多种选择",
  301: "Moved Permanently：永久重定向（浏览器会缓存）",
  302: "Found：临时重定向（最常用跳转）",
  303: "See Other：重定向到 GET（表单提交后）",
  304: "Not Modified：缓存命中，不返回内容",
  307: "Temporary Redirect：临时重定向，保持原 HTTP 方法",
  308: "Permanent Redirect：永久重定向，保持原 HTTP 方法",

  // 4xx 客户端错误
  400: "Bad Request：请求参数错误",
  401: "Unauthorized：未授权（需要登录/Token）",
  403: "Forbidden：已认证但无权限",
  404: "Not Found：资源未找到",
  405: "Method Not Allowed：请求方法不支持",
  408: "Request Timeout：请求超时",
  409: "Conflict：资源冲突（例：重复创建）",
  410: "Gone：资源已永久删除",
  413: "Payload Too Large：请求体太大",
  429: "Too Many Requests：请求太频繁（限流）",

  // 5xx 服务端错误
  500: "Internal Server Error：服务器内部错误",
  501: "Not Implemented：接口未实现",
  502: "Bad Gateway：网关错误（Nginx → 后端）",
  503: "Service Unavailable：服务不可用（服务器挂了/重启）",
  504: "Gateway Timeout：网关超时（Nginx → 后端未响应）",
  505: "HTTP Version Not Supported：协议版本不支持",
};

// 导出（若你在 Node 或 ESModule 中使用）
export default HTTP_STATUS;
