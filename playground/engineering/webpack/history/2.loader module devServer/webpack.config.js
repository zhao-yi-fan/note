// webpack 是node写出来的 node的写法
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000, //改端口号
    progress: true, // 加进度条
    contentBase: './build', // 在哪个文件夹下起服务
    open: true, // 自动打开浏览器
    compress: true, // gzip压缩
  },
  mode: 'production', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名 [hash]加入哈希，产生不同的文件，防止覆盖和出现缓存的问题 [hash:8]只显示8位
    path: path.resolve(__dirname, 'build'),// 路径必须是一个绝对路径，加__dirname是以当前目录下加一个build目录
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './public/index.html', // 以哪个html作为模板
      filename: 'index.html', // 设置打包后生成的html模板，不设置默认也是index.html
      minify: { // 简化html
        removeAttributeQuotes: true, // 删除属性的双引号
        collapseWhitespace: true, // 折叠空行
      },
      hash: true, // 引用文件加哈希戳 防止缓存的问题
    })
  ],
  module: { // 模块
    rules: [ // 规则 css-loader  解析 @import这种语法的
      // style-loader 它是把css 插入到head的标签中
      // loader的特点 希望功能单一
      // loader的用法 一个loader就用字符串
      // { test: /\.css$/, use: 'css-loader' }
      // 多个loader需要用 []
      // loader的顺序 默认是从右向左执行  从下到上执行
      // 先使用css-loader打包好之后再使用style-loader插入模板
      // { test: /\.css$/, use: ['style-loader','css-loader'] }
      // loader还可以写成 对象方式，好处是可以再写一个参数
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader', // 插入模板head标签的位置
            options: {
              insertAt: 'top' // 插入head标签顶部
            }
          },
          'css-loader'
        ]
      },
      {  // 可以处理less文件
        test: /\.less$/,
        use: [
          { // 把css文件插入到模板中
            loader: 'style-loader',
            options: {
              insertAt: 'top' // 插入模板head标签的位置
            }
          },
          'css-loader', // @import 解析路径
          'less-loader' // 把less 解析成 css
        ]
      }
    ]
  }
}