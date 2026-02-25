const express = require('express');
const app = express();
const querystring = require('querystring');
const util = require('util');
const whiteList = ['http://localhost:3000']
app.use(function (req, res, next) {
  const origin = req.headers.origin;
  if (whiteList.includes(origin)) {
    res.setHeader('Access-Control-Allow-Credentials', 'true')
    // 设置哪个源可以访问
    res.setHeader('Access-Control-Allow-Origin', origin)
    res.setHeader('Access-Control-Allow-Headers', 'name'); // 多个 'name,a,b,c'     对应 xhr.setRequestHeader('name', 'zfpx');
    // 跨域默认只有GET/POST/HEAD 其他请求方法需要标明
    res.setHeader('Access-Control-Allow-Methods', 'PUT');
    // 跨域的话 除了简单请求方法(GET/POST/HEAD)都会做一个OPSITONS预检请求
    // 预检测不是每次都发，而是过6秒发一次，默认是一分钟发一次
    res.setHeader('Access-Control-Max-Age', 6); // 以秒为单位
    if (req.method === 'PUT') {
      res.end(); // OPTIONS请求不做任何处理
    }
  }
  next();
})
app.post('/getData', function (req, res) {
  // console.log(req.headers);
  let post = '';
  req.on('data', function (data) {
    console.log('data', data);
    post += data;
  });
  // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
  req.on('end', function () {
    //解析为post对象
    console.log(post, 'post===');
    // post = querystring.parse(post);
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.end(post);
  });
});
app.put('/getData', function (req, res) {
  console.log(req.headers);
  res.end('数据响应')

})
app.get('/getData', function (req, res) {
  console.log(req.headers);
  res.end('数据响应')

})
app.use(express.static(__dirname))
app.listen(4000)