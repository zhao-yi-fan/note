/**
 * Express 静态资源服务配置
 * 
 * express.static() 参数：
 * - 相对路径可以省略 ./
 * - 目录名后的 / 可以省略
 */

var express = require('express')
var app = express()

// 访问路径: /a/xxx -> public/xxx
app.use('/a/', express.static('public/'))

// 访问路径: /xxx -> public/xxx（省略 /public/ 前缀）
app.use(express.static('./public/'))

// ============================================

/**
 * 路由
 * 路由本质是一张映射表，定义请求路径与处理函数的对应关系
 */

// 首页
app.get('/', function (req, res) {
    res.send('hello world')
})

// 登录页
app.get('/login', function (req, res) {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
    </head>
    <body>
        <h1>hello login</h1>
    </body>
    </html>
    `)
})

// 启动服务
app.listen(3000, function () {
    console.log('express app is running ...')
})
