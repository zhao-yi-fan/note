const button = document.createElement('button');
button.innerHTML = 'hello'

button.addEventListener('click', function () {
  // vue react的路由懒加载
  // import()是ES2020提案语法(内部是不JSONP实现的)，浏览器支持不好，需要babel转换
  // webpack 中 import() 是webpack提供的，由JSONP实现，浏览器支持好
  import(/* webpackChunkName: "source" */'./source').then((res)=>{ // webpackChunkName: "source" 为打包后的文件命名
    console.log(res.default);
  })
})

document.body.appendChild(button)