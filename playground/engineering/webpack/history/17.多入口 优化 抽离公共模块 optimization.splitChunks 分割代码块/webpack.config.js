const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  devServer: {
    open: true,
    // contentBase: './build'
  },
  optimization: {
    splitChunks: { // 分割代码块
      cacheGroups: { // 缓存组
        common: { // 公共的模块
          chunks: 'initial',
          minSize: 0,
          minChunks: 2
        },
        vendor: { // 第三方模块
          priority: 1, // 权重
          test: /node_modules/, // 抽离第三方模块
          chunks: 'initial', // 只从入口文件进行抽离
          minSize: 0, // 大小限制
          minChunks: 2 // 最少引用次数
        }
      }
    }
  },
  entry: {
    index: './src/index.js',
    other: './src/other.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}