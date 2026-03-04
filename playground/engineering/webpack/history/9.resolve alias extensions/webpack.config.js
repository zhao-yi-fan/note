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
  devServer: {
    /* 
    3.在服务器中启动webpack，公用一个端口号
    2.前端mock接口
    before (app) {
      app.get('/user', (req, res) => {
        res.json({ name: 'tobi' });
      })
    } */
    /*
    1.代理 
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': ''
        }
      }
    } */
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