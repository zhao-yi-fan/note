const path = require('path')

class P {
  apply (compiler) {
    compiler.hooks.emit.tap('emit', () => {
      console.log('emit');
    })
    compiler.hooks.afterCompile.tap('emit', () => {
      console.log('afterCompile');
    })
  }
}
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'less-loader'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'post',
        use: [
          'post-loader1',
          'post-loader2'
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        use: [
          'pre-loader1',
          'pre-loader2'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'normal-loader1',
          'normal-loader2'
        ]
      },
    ]
  },
  plugins: [
    new P()
  ]
}