let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// cleanWebpackPlugin 清除文件
// copyWebpackPlugin 拷贝文件
// bannerPlugin webpack内置的
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({ patterns: [{ from: 'doc', to: 'doc' }] }),
    new webpack.BannerPlugin('make 2022 by aaaa')
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
        use: {
          loader: 'url-loader',
          options: {
            // limit: 1, // 正常生成不转base64
            limit: 50 * 1024, // 小于50k转base64
            outputPath: '/img/',
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