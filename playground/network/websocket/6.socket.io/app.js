let express = require('express');
let app = express();
app.use(express.static(__dirname));
let { Message } = require('./db');
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let SYSTEM = '系统';
let sockets = {};
// io.of('/').on() 默认命名空间就是/，不写就是默认
/* 监听客户端的连接事件，当客户端连接上来后，执行回调函数 */
io.on('connection', async function (socket) {
  let username;
  let rooms = []; // 代表此客户端进入的所有房间

  /* 监听getAllMessages事件，客户端要获得聊天记录 */
  socket.on('getAllMessages', async function () {
    // 从MongDB数据库中把数据取出
    let messages = await Message.find().sort({ createAt: -1 }).limit(10);
    messages.reverse();
    /* 给客户端发送allMessages事件，并把之前的聊天记录返回 */
    socket.emit('allMessages', messages)
  })

  /* 监听客户端的join事件，触发后将该用户的socket加入到指定的房间名 */
  socket.on('join', function (roomName) {
    // 获取房间名在房间数组中的索引，没有返回-1
    let index = rooms.indexOf(roomName);
    if (index == -1) {
      rooms.push(roomName);
      socket.join(roomName);
      socket.emit('joined', roomName);
    }
  })

  /* 监听客户端离开房间leave事件 */
  socket.on('leave', function (roomName) {
    let index = rooms.indexOf(roomName);
    if (index != -1) {
      rooms.splice(index, 1) // 在数组中删除这个房间名
      socket.leave(roomName); // leave是socket提供的方法
      /* 给客户端发送事件 */
      socket.emit('leaved', roomName)
    }
  })

  /* 监听客户端message事件的消息 */
  socket.on('message', async function (content) {
    // 全体广播io.emit
    if (username) { // 已经在聊天室中
      let result = content.match(/@([^ ]+) (.+)/);
      if (result) { // 私聊
        let toUser = result[1];
        let toContent = result[2];
        let toSocket = sockets[toUser];
        toSocket && toSocket.emit('message', getMsg(toContent, username))
      } else { // 公聊
        // 如果在大厅说话，则所有的人都能听到，包括其他大厅的人和所有房间的人
        let savedMessage = await Message.create(getMsg(content, username));
        if (rooms.length > 0) {
          // 循环所有的房间
          rooms.forEach(room => {
            io.in(room).emit('message', savedMessage)
          })
        } else {
          io.emit('message', savedMessage)
        }
      }
    } else { // 第一次进入聊天 设置名字
      let hasSocket = sockets[content];
      if (hasSocket) { // 防止名字冲突
        socket.emit('message', getMsg(`${content}已经被占用，请换一个用户名吧`))
      } else { // 设置名字 并保存名字和socket
        username = content; // 把这个消息的内容设置为当前用户的用户名
        // 把用户名和对应的socket对象进行关联
        sockets[username] = socket;
        // socket.broadcast.emit 除了自己告诉其他人
        socket.broadcast.emit('message', getMsg(`${username}加入聊天室`))
      }
    }
  })
})

server.listen(4000);
function getMsg (content, username = SYSTEM) {
  return { username, content, createAt: new Date() }
}