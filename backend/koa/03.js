const Koa = require("Koa");
const app = new Koa();
app.use((ctx) => {
  if (ctx.request.accepts("xml")) {
    ctx.response.type = "xml";
    ctx.response.body = "<data>Hello World</data>";
  } else if (ctx.request.accepts("json")) {
    ctx.response.type = "json";
    ctx.response.body = { data: "Hello World" };
  } else if (ctx.request.accepts("html")) {
    ctx.response.type = "html";
    ctx.response.body = "<p>Hello World</p>";
  } else {
    ctx.response.type = "text";
    ctx.response.body = "Hello World";
  }
});
app.listen(3000);
