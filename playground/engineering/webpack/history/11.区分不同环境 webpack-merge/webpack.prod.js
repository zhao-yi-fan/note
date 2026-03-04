const { merge } = require('webpack-merge')
let TerserJSPlugin = require('terser-webpack-plugin');
let OptimizeCss = require('optimize-css-assets-webpack-plugin');
const base = require('./webpack.base.js')

// npm run build -- --config webpack/webpack.dev.js
module.exports = merge(base, {
  mode: 'production',
  optimization: {
    minimizer: [
      // new TerserJSPlugin({}),
      new OptimizeCss({}),
    ]
  },
})