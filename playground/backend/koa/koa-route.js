const Koa = require('Koa');
const route = require('koa-route');

const app = new Koa();
const main = ctx => {
    ctx.response.body = 'Hello World';

}

const about = ctx => {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">IndexPage</a>';
}
app.use(route.get('/', main));
app.use(route.get('/about', about));
app.listen(3000);