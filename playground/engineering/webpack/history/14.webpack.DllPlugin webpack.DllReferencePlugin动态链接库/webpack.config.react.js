const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devServer: {
    open: true,
    contentBase: './dist' // dist目录下存在的会先使用，不存在就会到内存中去取
  },
  entry: {
    react: ['react', 'react-dom'] // 把node_modules中的react和react-dom打包到react.js中
  },
  output: {
    filename: '_dll_[name].js',
    path: path.resolve(__dirname, 'build'),
    library: '_dll_[name]', // 暴露的全局变量名
    // libraryTarget: 'var' // 默认是var this commonjs commonjs2 umd
  },
  plugins: [
    new webpack.DllPlugin({
      name: '_dll_[name]', // 要和library保持一致
      path: path.resolve(__dirname, 'build', 'manifest.json') // 生成依赖清单
    })
  ],
}