let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
    // publicPath: 'http://www.127398j.com' // 所有的静态资源css js img都加域名前缀(CDN)
  },
  watch: true,
  watchOptions: {
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖 我一直输入代码
    ignored: /node_modules/, // 不需要进行监控
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
  ],
  externals: {
    jquery: '$'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-withimg-loader' // 解析html中的图片
      },
      {
        test: /\.(png|jpg|gif)$/,
        // 做一个限制 当我们的图片 小于多少k的时候 用base64 来转化
        // 否则用file-loader产生真实的图片
        /* loader: 'file-loader',
        options: {
          outputPath: '/img/'
        } */
        use: {
          loader: 'url-loader',
          options: {
            // limit: 1, // 正常生成不转base64
            limit: 50 * 1024, // 小于50k转base64
            outputPath: '/img/',
            // publicPath: 'http://www.127398j.com' // 只给img增加(CDN)
          }
        }
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              [
                "@babel/plugin-transform-runtime",
                // {
                //   corejs: 3,
                //   proposals: true
                // }
              ]
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',

        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  }
}