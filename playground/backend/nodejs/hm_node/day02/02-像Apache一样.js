var http = require('http')
var fs = require('fs')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 Server 的 request 请求事件, 设置请求处理函数

var wwwDir = 'C:/Users/99344/Desktop/2018web/听课/14.node/day02/www'

server.on('request', function (req, res) {
    var url = req.url
    // /                 访问: wwwDir + /index.html
    // /a.txt            访问: wwwDir + /a.txt
    // /apple/login.html 访问: wwwDir + /apple/login.html
    // /index.html       访问: wwwDir + /index.html
    // 所以url           访问: wwwDir + url
    var filePath = 'index.html'
    if (url !== '/') {
        filePath = url
    }

    fs.readFile(wwwDir + filePath, function (err, data) {
        if (err) {
            //return 阻止代码继续向后执行
            return res.end('404 Not Found')
        }
        res.end(data)
    })
})


// 3. 绑定端口号, 启动服务
server.listen(3000, function () {
    console.log('running ...')

})