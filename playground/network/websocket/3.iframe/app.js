let express = require('express')
let app = express();

app.use(express.static(__dirname));

app.get('/clock', function (req, res) {
  res.header('Content-Type', 'text/html')
  // 向客户端发送一段js脚本
  // parent就是页面中的window，使用parent就可以使用外面定义的方法和变量了
  // send是写入并关闭（write和end两个方法），放在定时器中并不会每秒做出响应
  setInterval(() => {
    // 此时用send就不行了，只能写（write）不能关闭（end）,一直做出响应，永远不断开
    res.write(`
      <script>
        console.log(parent)
        parent.setTime("${new Date().toLocaleString()}")
      </script>
    `)
  }, 1000);
})

app.listen(8000, function () {
  console.log('server is running')
})
