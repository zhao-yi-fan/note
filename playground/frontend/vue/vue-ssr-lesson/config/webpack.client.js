let path = require('path')
let merge = require('webpack-merge')
let HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
let base = require('./webpack.base.js')
module.exports = merge(base, {
  // 入口
  entry: {
    client: path.resolve(__dirname, '../src/client-entry.js'),
  },
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new VueSSRClientPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html')
    }),
  ]
})