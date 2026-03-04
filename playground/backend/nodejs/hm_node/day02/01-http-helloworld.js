var http = require('http')
var fs = require('fs')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 Server 的 request 请求事件, 设置请求处理函数
//      请求
//      处理
//      响应
//      一个请求对应一个响应, 如果在一个请求的过程中, 已经结束响应了, 则不能重复发送响应.
//      没有请求就没有响应

//  咱们以前是用过 Apache 服务器软件, 这个软件默认有一个 www 目录, 所有存放在 www 目录中的
//  127.0.0.1:80/a.txt
//  127.0.0.1:80/index.html


//改目录直接这里改
var wwwDir = 'C:/Users/99344/Desktop/2018web/听课/14.node/day02/www'

server.on('request', function (req, res) {
    var url = req.url
    // /                 访问: wwwDir + /index.html
    // /a.txt            访问: wwwDir + /a.txt
    // /apple/login.html 访问: wwwDir + /apple/login.html
    // /index.html       访问: wwwDir + /index.html
    // 所以url           访问: wwwDir + url
    if (url === '/') {
        fs.readFile(wwwDir + '/index.html', function (err, data) {
            // if (err) {
            //     res.end('404 Not Found.')
            // } else {

            // }
            if (err) {
                // return 有两个作用
                // 1. 方法返回值
                // 2. 阻止代码继续往后执行
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (url === '/a.txt') {
        fs.readFile(wwwDir + '/a.txt', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if (url === '/index.html') {
        fs.readFile(wwwDir + '/index.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    } else if(url === '/apple/login.html'){
        fs.readFile(wwwDir + '/apple/login.html', function (err, data) {
            if (err) {
                return res.end('404 Not Found.')
            }
            res.end(data)
        })
    }
    
})


// 3. 绑定端口号, 启动服务
server.listen(3000, function () {
    console.log('running ...')
    
})