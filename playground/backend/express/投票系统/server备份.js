let express = require('express'),
  app = express();
let bodyParser = require('body-parser'),
  session = require('express-session');
app.listen(8686, function () {
  console.log('server is running')
})

// `app.use()`express里面的中间件（middleware）：在api接口请求处理之前，把一些公共的部分进行提取，中间件中就是先处理这些公共的内容，处理完成后，再继续执行接口请求即可
// 请求静态资源文件
app.use(express.static('./static'))

app.use('/user', (req, res, next) => {
  // 请求的path地址是以'/user'开头的，例如：'/user'、'/user/add' ...
  next(); // 不执行next是无法走到下一个中间件或者请求中的（next就是执行下一个的意思，可能是下一个中间件，也有可能是下一个请求...）
  // 如果next()下面有代码，会等next执行结束才执行，next是同步的
})

app.use((req, res, next) => {
  // 所有的请求都会走这个中间件，而且中间件执行的顺序是按照书写的先后顺序执行
})

// api处理
// get请求，接收问号传参的信息，可以使用：req.query、req.param   '/xxx/:name'是路径参数param  '/xxx?name=xxx'是问号传参query
// post请求，接收请求主体传递的信息，此时我们需要使用一个中间件（`body-parser`）
app.get('/getUser', (req, res) => {
  // 当客户端向服务端发送请求，如果请求方式是GET，请求路径是'/getUser'，就会把回调函数执行，里面有三个参数 req/res/next
  // req:不是原生的req，是二次处理过的
  // `req.params`存储的是路径参数信息
  // `req.path`请求的路径名称
  // `req.query`请求的问好参数信息（GET请求都是这样传递的信息）（对象）
  // `req.body`当请求的方式是POST，我们基于`body-parse`中间件处理后，会把客户端请求主题中传递的内容存放到body属性上
  // `req.session`当我们基于`express-session`中间件处理后，会把session操作放到这个属性上，基于这个属性可以操作session信息
  // `req.cookies`当我们基于`cookie-parser`中间件处理后，会把客户端传递的cookie信息存放到这个属性上
  // `req.get()`获取指定的请求头信息
  // `req.param()`基于这个方法可以把url-encoded格式字符串（或者路径参数）中的某一个属性名对应的信息获取到

  // res:不是原生的res，经过封装处理的，目的是为了提供一些属性和方法，可以供服务器端向客户端返回内容
  // `res.cookie()通过此方法可以设置一些cookie信息，通过响应头set-cookie返回给客户端，客户端把返回的cookie信息种到本地
  // ·res.type()·设置响应内容的MIME类型
  // `res.sendStatus()`设置返回的状态吗（它是结束响应，把状态对应的信息当做响应主体返回，我们一般都是status，然后自己来设置响应主体内容）
  // `res.set()`设置响应头
  // `res.json()`向客户端返回JSON格式的字符串，但是允许我们传递JSON对象，方法会帮我们转换为字符串然后再返回（执行此方法后会自动结束响应，也就是自动执行了res.end()）
  // `res.send-file([path])`首先把path指定的文件内容得到，然后把内容返回给客户端浏览器（完成了文件读取和响应两步操作），也会自动结束响应
  // `res.send()`想返回什么都可以（综合体）
  // `res.redirect()`响应是重定向的（状态码302）
  // `res.render()`只有页面是需要服务器渲染的时候我们才会用这个
  res.send({
    message: 'ok'
  });
})

// `body-parser`如果是post/put请求，会把基于请求主体传递的信息预先截获
// 如果传递的是JSON格式的字符串，基于bodyParser.json()会把它转换为JSON格式的对象
// 如果传递的是url-encoded格式的字符串如'xxx=xxx&xxx=xxx'，会基于bodyParser.urlencoded()把它转换为对象键值对的方式
// ...
// 把转换后的结果挂载到req.body属性上，每个方法内置next，继续执行接口api，里面获得的req.body都是统一的
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// `express-session`：这个中间件是供我们后续操作session的，基于这个中间件，我们可以设置客户端cookie的过期时间（也理解为session在服务器端存储的时间），当中间件执行完成后，会在req上挂载一个session的属性，用来操作session
app.use(session({
  secret: 'zfpx',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))

app.post('/register', (req, res) => {
  console.log(req.body) // 获取的是请求主体内容
  req.session.xxx = 'xxx'; // 设置session
  console.log(req.session.xxx); // 获取session
})
