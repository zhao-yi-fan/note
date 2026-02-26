let express = require('express')
let app = express();

let counter = 0;
app.use(express.static(__dirname));

app.get('/clock', function (req, res) {
  res.header('Content-Type','text/event-stream')
  let $timer = setInterval(() => {
    // 最后要加\n\n代表结束
    res.write(`id:${counter++}\nevent:open\ndata:${new Date().toLocaleString()}\n\n`)
  }, 1000);
  // 每次刷新页面会断开连接，再次连接。但定时器没有销毁，id传出的值会counter++多次，几个定时器就会累加几次。所以要销毁。
  // close事件：当服务器关闭时触发。
  res.on('close',function(){
    clearInterval($timer)
  })
})

app.listen(8000, function () {
  console.log('server is running')
})
