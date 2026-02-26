//1.结合 fs 发送文件中的数据
//2.Content-Type
//  http://tool.oschina.net/commons
//  不同的资源对应的 Content-Type是不一样的
//  图片不需要指定编码
//  一般只为字符数据才指定编码



var http = require('http')
var fs = require('fs')

var server = http.createServer()

server.on('request', function (req, res) {
    var url = req.url


    if (url === '/') {
        //url: 统一资源定位符
        //一个url最终其实是要对应到一个资源的

        // 肯定不这么干
        // res.end('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Document</title></head><body><h1>首页</h1></body>/html>')

        //我们要发送的还是在文件中的内容
        fs.readFile('./resource/index.html', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败,请稍后重试!')
            } else {
                //data 默认是二进制数据,可以通过 .toString转为咱们能识别的字符串
                //res.end()支持两种数据类型,一种是二进制,一种是字符串
                res.setHeader('Content-Type', 'text/html; charset=utf-8')

                res.end(data)
            }
        })
    } else if (url === '/baby') {


        fs.readFile('./resource/ab2.jpg', function (err, data) {
            if (err) {
                res.setHeader('Content-Type', 'text/plain; charset=utf-8')
                res.end('文件读取失败,请稍后重试!')
            } else {
                //data 默认是二进制数据,可以通过 .toString转为咱们能识别的字符串
                //res.end()支持两种数据类型,一种是二进制,一种是字符串
                //图片不需要指定编码,因为我们常说的编码一般指的是:字符编码
                //图片它有特殊的编码格式,不需要知道
                res.setHeader('Content-Type', 'image/jpeg')
                res.end(data)
            }
        })
    }

})

//可以两个服务的端口不一样,多个服务占用不同的端口号
server.listen(3000, function () {
    console.log('Server is running...');

})