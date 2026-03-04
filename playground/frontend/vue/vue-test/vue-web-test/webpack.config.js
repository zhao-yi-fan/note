const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');
console.log(process.env.NODE_ENV);

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'build.[hash:8].js',
    path: path.resolve(__dirname, 'build'),
  },
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 20000,
  //   poll: 1000
  // },
  devServer: {
    port: 8088,
    // progress: true, // 加进度条
    hot: true,
    contentBase: './build', // 在哪个文件夹下起服务
    // open: true,
    compress: true, // gzip压缩
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js', '.vue']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, './loaders'), 'node_modules']
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebPackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new webpack.NamedChunksPlugin(), // 打印更新的模块路径
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ["@babel/plugin-proposal-optional-chaining"]
            }
          }
        ]
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "autoprefixer",
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          'sass-loader'
        ]
      }
    ]
  }
}