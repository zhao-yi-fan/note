var http = require('http')
var fs = require('fs')

// 1. 创建 Server
var server = http.createServer()

// 2. 监听 Server 的 request 请求事件, 设置请求处理函数

var wwwDir = __dirname // 'C:/Users/99344/Desktop/2018web/听课/14.node/day02/www'

server.on('request', function (req, res) {
  var url = req.url

  fs.readFile(__dirname + '/template.html', function (err, data) {
    console.log(err, 'err===');
    if (err) {
      return res.end('404 Not Found')
    }
    //
    // 1. 如何得到 wwwDir 目录列表中的文件名和目录名
    //  fs.readdir
    //2.如何得到的文件名和目录名替换到template.html中
    //  2.1在 template.html中需要替换的位置预留一个特殊的标记(就像以前使用模板引擎的标记一样)
    //  2.2根据files生成需要的HTML内容
    //只要你做了则两件事,这个问题就解决了
    fs.readdir(wwwDir, function (err, files) {
      if (err) {
        return res.end('Can not find www dir.')
      }

      //2.1声称需要替换的内容
      var content = ''
      files.forEach(function (item) {
        // 在EcmaScript 6中的 ` 字符串中,可以使用${}来引用变量
        content += `
                    <tr>
                        <td data-value="apple/"><a class="icon dir" href="/${item}">${item}</a></td>
                        <td class="detailsColumn" data-value="0"></td>
                        <td class="detailsColumn" data-value="1509589967">2017/11/2 上午10:32:47</td>
                    </tr>
                `


      })

      //2.3 替换
      data = data.toString()
      data = data.replace('^_^', content)

      //3.发送解析替换过后的响应数据
      res.end(data)

    })

  })
})


// 3. 绑定端口号, 启动服务
server.listen(3000, function () {
  console.log('running ...')

})