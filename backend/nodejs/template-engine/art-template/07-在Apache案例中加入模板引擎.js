var http = require("http");
var fs = require("fs");
var template = require("art-template");
var server = http.createServer();

var wwwDir = __dirname; // 'C:/Users/99344/Desktop/2018web/听课/14.node/day02/www'

server.on("request", function (req, res) {
  var url = req.url;
  fs.readFile(__dirname + "/template-apache.html", function (err, data) {
    if (err) {
      return res.end("404 Not Found");
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
        return res.end("Can not find www dir.");
      }

      //这里只需要使用模板引擎解析替换data中的模板字符串就可以了
      //数据就是files
      //然后去你的template-apache.html文件中编写你的模板语法就可以了
      var htmlStr = template.render(data.toString(), {
        title: "哈哈",
        files: files,
      });

      //3.发送解析替换过后的响应数据
      res.end(htmlStr);
    });
  });
});

// 3. 绑定端口号, 启动服务
server.listen(3000, function () {
  console.log("running ...");
});
