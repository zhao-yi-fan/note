const Koa = require("koa");
const app = new Koa();

const fs = require("fs");

app.use((ctx) => {
  ctx.response.type = "html";
  ctx.response.body = fs.createReadStream("./template.html");
});
app.listen(3000);
