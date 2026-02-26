let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: { // 解析
    modules: [path.resolve('node_modules')], // 模块查找的路径 只能从当前目录下查找
    mainFields: ['style', 'main'],
    // mainFiles: [], // 默认找入口文件的名字 默认是index.js，可以自定义
    extensions: ['.js', '.css', '.json', '.vue'], // 解析顺序 省略后缀名
    alias: { // 别名
      // bootstrap: 'bootstrap/dist/css/bootstrap.css'
    }
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
    new webpack.DefinePlugin(
      {
        DEV1: "'development'", // 会把变量解析parse一下
        DEV: JSON.stringify('development'),
        FLAG: 'true',
        FLAG1: JSON.stringify(true),
        EXPRESSION: JSON.stringify('1+1'),
      }
    )
  ],
  externals: {
    // jquery: '$' // 不打包jquery
  },
  module: {
    noParse: /jquery/, // 不去解析jquery中的依赖库 提升打包速度 （依然会打包在js文件中）
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
        // include: path.resolve(__dirname, 'src'),
        // exclude: /node_modules/
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