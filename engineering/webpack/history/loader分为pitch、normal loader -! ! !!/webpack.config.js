const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    hot: true,
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
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
  resolveLoader: {
    modules: ['node_modules', path.resolve(__dirname, './loaders')],
    // 别名
    // alias: {
    //   'less-loader': path.resolve(__dirname, 'loaders', 'less-loader.js')
    // }
  },
  module: {
    // loader的分类 pre前面 normal中间 post后面
    // pre + normal + inline + post
    // loader顺序从右向左 从下到上
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'loader2',
        },
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'loader3',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve('src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              // '@babel/plugin-syntax-dynamic-import', // 支持动态导入 浏览器自带import()语法
            ]
          },
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'loader1',
        },
        enforce: 'post'
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }
    ]
  }
}