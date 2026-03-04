const loaderUtils = require("loader-utils");

/**
 * normal 阶段的 loader 函数
 * 注意：由于 pitch 函数返回了内容，这个 normal 函数实际上不会被执行
 * style-loader 完全依赖 pitch 机制，所以这里保持空函数即可
 *
 * 参考真实源码：
 * https://github.com/webpack-contrib/style-loader/blob/master/src/index.js
 */
function loader(source) {
  // Intentionally empty - style-loader uses only the pitch phase
}

/**
 * pitch 阶段的 loader 函数（核心）
 *
 * @param {string} remainingRequest - 剩余的 loader 请求链
 *                                     格式：'css-loader!less-loader!/absolute/path/to/index.less'
 *
 * 例如配置：use: ['style-loader', 'css-loader', 'less-loader']
 * 处理文件：./index.less
 * remainingRequest 就是：'css-loader!less-loader!/path/to/index.less'
 */
loader.pitch = function (remainingRequest) {
  console.log("style-loader pitch");
  console.log(remainingRequest, "remainingRequest=====");
  // remainingRequest: 'css-loader!less-loader!/path/to/index.less'

  // loaderUtils.stringifyRequest() 的作用：
  // 1. 将绝对路径转换为相对路径
  // 2. 转换为可以在 require() 中使用的字符串格式
  // 3. 添加适当的引号和转义
  // !! 表示禁用所有配置的 loader，只使用内联 loader
  console.log(loaderUtils.stringifyRequest(this, "!!" + remainingRequest));

  // 返回的代码会被 webpack 打包到最终的 bundle 中
  // 当模块被 import 时，这段代码会在浏览器中执行
  return `
  const style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(
    this,
    "!!" + remainingRequest
  )});
  document.head.appendChild(style);
  `;
  // 注意：
  // - require() 是运行时执行的，会得到 css-loader 返回的 CSS 字符串
  // - 这段代码在浏览器中执行时会创建 <style> 标签并插入 CSS
};

module.exports = loader;

/**
 * 自定义 style-loader 简化版
 *
 * 作用：将 CSS 字符串插入到页面的 <style> 标签中，使样式生效
 *
 * ========== 核心原理 ==========
 *
 * style-loader 的关键在于使用 pitch 函数来中断 loader 链的正常执行流程
 *
 * webpack loader 执行顺序：
 * 1. pitch 阶段：从左到右执行（style-loader.pitch → css-loader.pitch → ...）
 * 2. normal 阶段：从右到左执行（... → css-loader → style-loader）
 *
 * 如果某个 pitch 函数返回了内容，会中断后续的 pitch 和 normal，
 * 直接将返回值传给前一个 loader 的 normal 阶段
 *
 * ========== 完整执行流程（重要！）==========
 *
 * webpack 配置：use: ['style-loader', 'css-loader', 'less-loader']
 * 处理文件：./index.less
 *
 * 【第一条 loader 链 - 被中断】
 *
 * 1. style-loader.pitch 执行 ✅
 *    remainingRequest = "css-loader!less-loader!/path/to/index.less"
 *    返回代码（包含 require）→ 中断原始链！
 *
 * 2. ❌ css-loader.pitch 被跳过
 * 3. ❌ less-loader.pitch 被跳过
 * 4. ❌ less-loader normal 被跳过（原始链中没执行）
 * 5. ❌ css-loader normal 被跳过（原始链中没执行）
 * 6. ❌ style-loader normal 被跳过
 *
 * 【第二条 loader 链 - 由 require() 触发】⚠️ 关键点
 *
 * webpack 分析 pitch 返回的代码，发现里面有 require()：
 * require('!!css-loader!less-loader!./index.less')
 *
 * webpack 会创建一个新的 loader 链来处理这个 require：
 *
 * 7. ✅ less-loader normal 执行（新链中）
 *    输入：.body { .header { color: red; } }  (less 语法)
 *    输出：body .header { color: red; }       (css)
 *
 * 8. ✅ css-loader normal 执行（新链中）
 *    输入：body .header { color: red; }
 *    输出：module.exports = "body .header { color: red; }"
 *
 * 9. ✅ 打包到 bundle.js
 *    模块1：创建 style 标签的代码（来自 pitch）
 *    模块2：CSS 字符串（来自 css-loader）
 *
 * ⚠️ 常见疑问：pitch 不是中断了吗？为什么 less 还会转成 css？
 *
 * 答：原始链被中断了，但 require() 会创建新的链！
 * - 原始链：被 pitch 中断，less-loader normal 没执行
 * - 新的链：webpack 看到 require()，创建新链处理依赖
 * - 两条链是独立的！新链中 less-loader 和 css-loader 正常执行
 *
 * ========== 构建时 vs 运行时 ==========
 *
 * 【构建时（webpack 打包阶段）】
 *
 * 1. style-loader.pitch 返回代码字符串
 * 2. webpack 分析代码，发现 require()
 * 3. 触发新的 loader 链：less-loader → css-loader
 * 4. less 转 css ✅（构建时完成）
 * 5. url() 处理 ✅（构建时完成）
 * 6. 生成 bundle.js，包含：
 *    - 创建 style 标签的代码
 *    - 已经处理好的 CSS 字符串
 *
 * 【运行时（浏览器执行阶段）】
 *
 * 1. 执行 import './index.less'
 * 2. 创建 style 标签（运行时）
 * 3. 执行 require() → 获取已经处理好的 CSS（运行时）
 * 4. 设置 innerHTML（运行时）
 * 5. 插入 DOM（运行时）
 * 6. 样式生效！
 *
 * ⚠️ 重要：less 转 css 在构建时就完成了！
 * 运行时的 require() 只是从 bundle.js 中读取已经转换好的 CSS 字符串
 * 不会在浏览器中重新转换！
 *
 * 打包后的代码简化版：
 * ```
 * // 模块1：style-loader.pitch 返回的代码
 * modules['./index.less'] = function() {
 *   const style = document.createElement('style');
 *   style.innerHTML = __webpack_require__('./index.less?processed'); // 指向模块2
 *   document.head.appendChild(style);
 * };
 *
 * // 模块2：css-loader + less-loader 处理的结果（构建时已转换）
 * modules['./index.less?processed'] = function() {
 *   module.exports = "body .header { color: red; }"; // 已经是 CSS 了
 * };
 * ```
 *
 * ========== !! 前缀的作用 ==========
 *
 * 不加 !!：require('css-loader!less-loader!./index.less')
 * - 会使用配置中的所有 loader（包括 style-loader）
 * - 导致死循环：style-loader → require → style-loader → require → ...
 *
 * 加 !!：require('!!css-loader!less-loader!./index.less')
 * - 禁用配置的 loader，只用内联指定的 css-loader 和 less-loader
 * - 避免 style-loader 再次执行
 *
 * ========== 为什么要用 pitch？==========
 *
 * 如果不用 pitch，在 normal 阶段：
 * 1. less-loader 将 less 转为 css
 * 2. css-loader 将 css 转为 JS 模块（导出字符串）
 * 3. style-loader 接收到的是 JS 代码字符串，不是 CSS 字符串
 *
 * 使用 pitch 的好处：
 * ✅ 在 pitch 阶段就返回最终代码
 * ✅ 使用 require() 动态加载 css-loader 的结果
 * ✅ require() 在运行时执行，能拿到真正的 CSS 字符串
 * ✅ 避免在编译时处理复杂的模块依赖
 */
