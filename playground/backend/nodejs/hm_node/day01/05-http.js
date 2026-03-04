//可以使用Node非常轻松的构建一个Web服务器
//Node中专门提供了一个核心模块:http
//http模块就是帮你创建编写服务器的

//1.加载http核心模块
var http = require('http')

//2.使用http.createServer() 方法创建一个Web服务器
//返回一个 Server 实例
var server = http.createServer()

//3.服务器要干嘛?
//提供服务: 对 数据 的服务
//发请求
//接收请求
//处理请求
//给个反馈(发送响应)

//注册 request 请求事件
//当客户端请求过来,会自动触发服务器的request请求时间,然后执行第二个参数,回调处理
server.on('request', function(){
    console.log('收到客户端的请求了');

})

//4.绑定端口号,启动服务器
server.listen(3000, function(){
    console.log('服务器启动成功了,可以通过 http://127.0.0.1:3000/ 来进行访问');
    
})