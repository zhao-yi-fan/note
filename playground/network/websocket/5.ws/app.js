let express = require('express')
let app = express()
app.use(express.static(__dirname))

app.listen(3000)

/* let WebSockerServer = require('ws').Server;
// 起服务的端口号和websocket的端口号不能一样。跨域是肯定的，websocket本身也是支持跨域的。
let server = new WebSockerServer({ port: 8888 })
// socket 插座
// 监听连接
server.on('connection', function (socket) {
  console.log('2.服务器端监听到了客户端的连接')
  // 监听客户端发过来的消息
  socket.on('message', function (message) {
    console.log('4.服务端接收客户端连接过来的消息', message)
    // 发送消息
    socket.send('5.服务器说：' + message)
  })
}) */