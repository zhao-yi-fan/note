const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');

const app = new Koa();

const main = serve(path.join(__dirname));
app.use(main);
app.listen(3000);
