const express = require('express')
const app = express()
// vue提供的服务端渲染的包
const VueServerRenderer = require('vue-server-renderer')
const fs = require('fs')
const path = require('path')
const template = fs.readFileSync('./dist/index.ssr.html', 'utf8')
// const serverBundle = fs.readFileSync('./dist/server.bundle.js', 'utf8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest
})
app.get('/', (req, res) => {
  // 只是返回一个字符串，并没有vue的实际功能
  const context = { url: req.url };
  render.renderToString(context, (err, html) => {
    res.send(html);
  })
})

// 顺序要保证
app.use(express.static(path.resolve(__dirname, './dist')))
// 如果访问的路径不存在 默认渲染index.ssr.html 并且把路由定向到当前请求的路径
app.get('*', (req, res) => {
  // 只是返回一个字符串，并没有vue的实际功能
  const context = { url: req.url };
  render.renderToString(context, (err, html) => {
    res.send(html);
  })
})
app.listen(3000)