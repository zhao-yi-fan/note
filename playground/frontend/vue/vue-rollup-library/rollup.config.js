import serve from 'rollup-plugin-serve'
import babel from '@rollup/plugin-babel'
export default {
  input: './src/index.js',
  output: {
    file: 'dist/vue.js',
    name: 'Vue', // 全局名字
    format: 'umd', // window.Vue
    sourcemap: true, // es6->es5 开发查看源码的时候看的是es6的，并不是转化后的代码
  },
  plugins: [
    babel({
      exclude: "node_modules/**",
    }),
    serve({
      open: true,
      openPage: '/public/index.html',
      port: 3000,
      contentBase: '' // 以当前根目录
    })
  ]



}