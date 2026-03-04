const path = require('path');
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const base = require('./webpack.base.js')

module.exports = merge(base, {
  target: 'node',
  entry: {
    server: path.resolve(__dirname, '../src/server-entry.js')
  },
  output: {
    libraryTarget: 'commonjs2', // module.exports = server-entry.js 导出给node服务端用
  },
  externals: [nodeExternals()], // 不打包node_modules中的文件
  plugins: [
    new VueSSRServerPlugin(),
    // 把public目录下index.ssr的内容拷贝到 dist 目录
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: path.resolve(__dirname, '../public/index.ssr.html'),
      // 排除上面entry中的server对应的文件，不会插入html模板中
      excludeChunks: ['server']
    })
  ]

})