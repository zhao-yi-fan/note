let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin')
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
let TerserJSPlugin = require('terser-webpack-plugin');
let webpack = require('webpack');
module.exports = {
  optimization: { // 优化项
    minimizer: [
      // new TerserJSPlugin({}), // 压缩js文件体积
      new OptimizeCss({}), // 压缩css文件体积
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
      filename: 'main.css' // 抽离出css文件名
    }),
    /* new webpack.ProvidePlugin({ // 在每个模块中都注入$
      $: 'jquery'
    }) */
  ],
  externals: { // 打包时忽略
    jquery: '$'
  },
  module: {
    rules: [
      /* {
        test: require.resolve('jquery'), // 只要引用了jquery就匹配到
        use: 'expose-loader?$'
      }, */
      // loader 默认是从右边向左边执行 从下到上执行
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader',
      //     options: {
      //       enforce: 'pre' // previous：强制执行顺序.js文件eslint-loader先执行 post：后执行
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: { // options可以写在外面也可以写在里面 用babel-loader 需要把es6->es5
            presets: [ // 映射
              '@babel/preset-env'
            ],
            plugins: [ // 转化class A{}语法
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
        include: path.resolve(__dirname, 'src'), // 只包含，src下的js文件，否则会去node_modules下找
        exclude: /node_modules/ // 排除
      },
      { // 我们不希望css抽离出来再放到模板的style标签中，要把style-loader去掉
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader', // 解析css之前就要加前缀
          'postcss-loader',

        ]
      },
      { // 引入同一个'mini-css-extract-plugin'会全都抽离成一个文件main.css。
        // 也可以拷贝，引入两个'mini-css-extract-plugin'，分别new两个实例和用这两个的loader。比如一个用来抽离.css文件到main.css，一个用来抽离.less文件到main1.css，虽然是不同的两个css文件，但他们内容是一样的，有可能.less文件less-loader完成之后，和.css文件一起css-loader。
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