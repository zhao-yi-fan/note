const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')

// npm run build -- --config webpack/webpack.dev.js
module.exports = merge(base, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {
          '/api': ''
        }
      }
    }
  }
})