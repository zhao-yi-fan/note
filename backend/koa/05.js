const Koa = require("Koa");
const app = new Koa();
app.use((ctx) => {
  if (ctx.request.path != "/") {
    ctx.response.type = "html";
    ctx.response.body = '<a href="/">Index Page</a>';
  } else {
    ctx.response.body = "Hello World";
  }
});
app.listen(3000);
