const express = require('express')

const app = express()

const Vue = require('vue')
const fs = require('fs')
// vue提供的服务端渲染的包
const VueServerRenderer = require('vue-server-renderer')
// 创建vue实例
const vm = new Vue({
  template: '<div>hello</div>'
})
const template = fs.readFileSync('./index.html', 'utf8')
// 创建渲染函数
const render = VueServerRenderer.createRenderer({
  template
});

app.get('/', (req, res) => {
  render.renderToString(vm, function (err, html) {
    res.send(html)
  })
})
app.listen(4000)