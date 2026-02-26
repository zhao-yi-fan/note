const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HappyPack = require('happypack')

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    contentBase: './build'
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    library: 'jquery',
    libraryTarget: 'umd' // var this commonjs commonjs2 umd
  },
  plugins: [
    new HappyPack({
      id: 'css',
      use: ['style-loader', 'css-loader']
    }),
    new HappyPack({
      id: 'js',
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          }
        }
      ]
    }),
    new webpack.DllReferencePlugin({ // 引用动态链接库
      manifest: path.resolve(__dirname, 'build', 'manifest.json')
    }),
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
        use: 'HappyPack/loader?id=js'
      },
      {
        test: /\.css$/,
        use: 'HappyPack/loader?id=css'
      }
    ]
  }
}