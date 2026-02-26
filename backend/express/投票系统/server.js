let express = require('express'),
  bodyParser = require('body-parser'),
  session = require('express-session');
let { readFile, writeFile } = require('./utils/fsPromise'),
  pathDataUSER = './json/USER.json',
  pathDataVOTE = './json/VOTE.json',
  port = 8686,
  app = express();

// 创建服务
app.listen(port, () => {
  console.log(`服务创建成功，正在监听${port}端口！`);
})

// 处理API
app.use(session({
  secret: 'zfpx',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }
}))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //false是一层，true会变深层对象
app.use(async (req, res, next) => {
  let userData = await readFile(pathDataUSER)
  let voteData = await readFile(pathDataVOTE)
  req.userData = JSON.parse(userData);
  req.voteData = JSON.parse(voteData);
  next()
})

// 登录
app.post('/login', (req, res) => {
  // req.body请求主体传递的内容（对象）
  let { name = '', password = '' } = req.body;
  // 客户端把密码md5加密，服务器端二次加工，去掉前四个和后四个（一共32位字符），剩下的从后往前颠倒顺序（先变数组倒过来再变字符串）
  password = password.substr(4, 24).split('').reverse().join(''); // 二次加密
  let result = req.userData.find(item => (item['name'] === name || item['phone'] === name) && item['password'] === password)
  if (result) {
    // 登录成功：记录session（是否登录 & 登录用户的id）
    req.session.isLogin = true;
    req.session.userID = parseFloat(result['id']);
    res.send({
      code: 0,
      message: '登录成功'
    })
    return;
  }
  // 登录失败
  res.send({
    code: 1,
    message: '登录失败'
  })
})
// 检测是否登录
app.get('/checkLogin', (req, res) => {
  let isLogin = req.session.isLogin;
  if (isLogin) {
    res.send({
      code: 1,
      message: '已登录'
    })
    return;
  }
  res.send({
    code: 0,
    message: '未登录'
  })
})
// 退出登录
app.get('/exitLogin', (req, res) => {
  req.session.isLogin = false;
  req.session.userID = null;
  res.send({
    code: 0,
    message: '退出成功！'
  })
})
// 获取用户信息：没有传递用户id，获取当前用户的信息
app.get('/getUser', (req, res) => {
  let { userId = req.session.userID } = req.query,
    result = req.userData.find(item => item['id'] === parseFloat(userId));
  if (result) {
    res.send({
      code: 1,
      message: '获取个人信息成功',
      data: { ...result, password: null }
    })
    return;
  }
  res.send({
    code: 1,
    message: '获取个人信息失败',
    data: null
  })
})

// 处理静态资源请求
app.use(express.static('./static'));
app.use((req, res, next) => {
  res.status(404);
  res.redirect('http://www.qq.com/babygohome/')
})