function loader (source) {
  console.log('css-loader normal');
  console.log(source, 'source=====');
  const reg = /url\((.+?)\)/g
  let pos = 0;
  let current;
  const arr = ['const list = []']
  /**
   * [
        "url('./Screenshot_1667581037.png')",
        "'./Screenshot_1667581037.png'",
        index: 21,
        input: "body {\n  background: url('./Screenshot_1667581037.png');\n}\n",
        groups: undefined
      ]
   */
  while (current = reg.exec(source)) {
    let [matchUrl, g] = current
    console.log(reg.lastIndex, 111);
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
    // 把g替换成require的写法
    arr.push(`list.push('url('+require(${g})+')')`)
    pos = reg.lastIndex
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
  arr.push(`module.exports = list.join('')`)
  return arr.join('\r\n')
}

loader.pitch = function (remainingRequest){
  console.log('css-loader pitch');
  console.log(remainingRequest, 'remainingRequest=====');
}

module.exports = loader


/**
 * 自定义 css-loader 简化版
 * 
 * 作用：处理 CSS 文件中的 url() 引用，将其转换为 webpack 的 require() 调用
 * 
 * ========== 执行流程 ==========
 * 
 * 1. 输入（source 参数）- CSS 文件内容字符串
 *    例如：
 *    "body {\n  background: url('./Screenshot_1667581037.png');\n}\n"
 * 
 * 2. 正则匹配所有 url() 
 *    匹配结果示例：
 *    [
 *      "url('./Screenshot_1667581037.png')",  // 完整匹配
 *      "'./Screenshot_1667581037.png'",        // 捕获组（路径）
 *      index: 21,                               // 匹配位置
 *      ...
 *    ]
 * 
 * 3. 拆分 CSS 内容为三部分：
 *    - url 之前的普通文本：list.push("body {\n  background: ")
 *    - url 引用转为 require：list.push('url('+require('./Screenshot_1667581037.png')+')')
 *    - url 之后的普通文本：list.push(");\n}\n")
 * 
 * 4. 返回值 - 生成的 JS 代码（字符串）：
 *    ```
 *    const list = []
 *    list.push("body {\n  background: ")
 *    list.push('url('+require('./Screenshot_1667581037.png')+')')
 *    list.push(");\n}\n")
 *    module.exports = list.join('')
 *    ```
 * 
 * 5. webpack 执行返回的代码：
 *    - require('./Screenshot_1667581037.png') 触发图片 loader 处理
 *    - 图片打包后返回路径，如：'dist/img/abc123.png'
 *    - list.join('') 拼接成最终 CSS：
 *      "body {\n  background: url(dist/img/abc123.png);\n}\n"
 * 
 * ========== 真实 css-loader 还需要处理的情况 ==========
 * 
 * 当前简化版只处理了 url()，真实的 css-loader 还需要处理：
 * 
 * 1. @import 规则
 *    - 处理 CSS 中的 @import 语句
 *    - 例如：@import './other.css';
 *    - 需要将导入的 CSS 文件也转换为 require() 调用
 *    - 保证样式加载的顺序正确
 * 
 * 2. url() 的各种情况
 *    - 带引号：url('./image.png') 或 url("./image.png")
 *    - 不带引号：url(./image.png)
 *    - 绝对路径：url(/images/logo.png)
 *    - 网络路径：url(https://example.com/image.png) - 不需要处理
 *    - Data URL：url(data:image/png;base64,...) - 不需要处理
 *    - 特殊字符：url() 内包含空格、括号等特殊情况
 * 
 * 3. CSS Modules
 *    - 将类名转换为唯一的 hash 值，避免全局命名冲突
 *    - 例如：.button {} → ._button_abc123 {}
 *    - 导出类名映射对象：module.exports = { button: '_button_abc123' }
 *    - 支持 :local() 和 :global() 语法
 * 
 * 4. Source Maps
 *    - 生成源码映射文件，方便调试
 *    - 在浏览器中可以看到原始的 CSS 文件位置
 *    - 而不是打包后的文件位置
 * 
 * 5. PostCSS 处理
 *    - 使用 PostCSS 解析 CSS 生成 AST（抽象语法树）
 *    - 支持嵌套规则、变量等高级语法
 *    - 可以集成各种 PostCSS 插件
 * 
 * 6. 其他高级特性
 *    - @font-face 中的字体文件引用
 *    - filter: url() 滤镜引用
 *    - -webkit-mask-image 等特殊属性中的 url()
 *    - 处理 CSS 变量（CSS Custom Properties）
 *    - 压缩和优化 CSS
 * 
 * ========== 使用说明 ==========
 * 
 * ⚠️ 注意：css-loader 单独使用不会将 CSS 应用到页面！
 * 必须配合 style-loader 或 mini-css-extract-plugin 使用
 * 
 * webpack 配置示例：
 * {
 *   test: /\.css$/,
 *   use: [
 *     'style-loader',  // 创建 <style> 标签，插入到 DOM
 *     'css-loader'     // 处理 CSS，转成 JS 模块
 *   ]
 *   // 执行顺序：从右到左（从下到上）
 * }
 * 
 * 流程：CSS 文件 → css-loader(导出字符串) → style-loader(插入DOM) → 页面生效
 */
