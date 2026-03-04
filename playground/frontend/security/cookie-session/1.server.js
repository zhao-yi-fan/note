const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();
let sign = 'XvHtNhhmnsKcy9g_6J_5wjnpr-Y';
// 做权限校验 session
// 登录页面 展示页面
console.log(require('crypto').createHmac('sha1','zf').update('name=zf').digest('base64'));
// sh1
// cookie
app.keys = ['zf'];
router.get('/read', ctx => {

  // 设置cors
  // ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');

  // ctx.set('Access-Control-Allow-Credentials', 'true');

  // 响应头增加json
  ctx.set('Content-Type', 'application/json; charset=utf-8');
  
  // 显式设置状态码，并确保响应体有内容
  ctx.status = 200;
  ctx.body = {
    code: 200,
    message: 'success',
    data: {
      name: ctx.cookies.get('name'),
    }
  } 
})
router.get('/write', ctx => {
  ctx.cookies.set('name', 'zf', { signed: true });
  ctx.cookies.set('age', 10);
  ctx.body = 'write ok'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000);