var express = require('express')

// 1, 创建 app
var app = express()

// 当以 /public/ 开头的时候, 去 ./public/ 目录中查找对应的资源
// 这种方式更容易辨识, 推荐这种方式
// app.use('/public/', express.static('./public/'))

// 必须是 /a/public 目录中
// ./public/ 可以省略 ./ 为public/,也可以省略 public/ 后面的 /  因为文件路径可以省略 ./
app.use('/a/', express.static('public/'))  


// 当省略第一个参数的时候, 则可以通过省略 /public/ 的方式来查找对应的资源
// 这种方式的好处就是可以省略 /public/
app.use(express.static('./public/'))

app.get('/', function (req, res) {
    // res.write('hello ')
    // res.write('world ')
    // res.end()

    // res.end('hello world')

    res.send('hello world')
})

// 路由其实就是一张表
// 这个表里面有具体的映射关系

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

app.listen(3000, function () {
    console.log('express app is running ...');
    
})