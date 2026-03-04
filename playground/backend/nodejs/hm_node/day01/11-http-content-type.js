var http = require('http')

var server = http.createServer()

server.on('request',function(req, res){
    //在服务器默认发送的数据,其实是utf8编码的内容
    //但是服务器不知道你是utf8编码的内容
    //浏览器在不知道服务器响应内容的编码的情况下会按照当前操作系统的默认编码去解析
    //中文操作系统默认是gbk
    //解决方法是正确的告诉浏览器我给你发送的内容是什么编码的
    //在http协议中,Content-Type就是用来告知对方我给你发送的数据是什么类型
    // res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    // res.end('hello 世界')

    var url = req.url

    if(url === '/plain'){
        //text/plain  就是普通文本
        res.setHeader('Content-Type', 'text/plain; charset=utf-8')

        res.end('hello 世界')
    }else if(url === '/html') {
        //如果你发送的是html格式的字符串,也要告诉浏览器我给你发送的是html格式的文本
        res.setHeader('Content-Type', 'text/html; charset=utf-8')

        res.end('<p>hello html <a href="">点我</a></p>')
    }
})

//可以两个服务的端口不一样,多个服务占用不同的端口号
server.listen(3000, function(){
    console.log('Server is running...');
    
})