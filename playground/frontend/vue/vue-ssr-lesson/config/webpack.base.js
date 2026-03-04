let path = require('path')

let VueLoaderPlugin = require('vue-loader/lib/plugin')
module.exports = {
  mode: 'production',
  output: {
    filename: '[name].bundle.js', // name是根据入口文件自定义设置的client/server
    path: path.resolve(__dirname, '../dist')
  },
  // 对模块处理
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins:['@babel/plugin-syntax-dynamic-import']
          }
        },
        exclude: /node_modules/ // 不包含node_modules
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'vue-style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ]
} 