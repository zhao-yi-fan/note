// '@vue/compiler-sfc'
const compiler = require("@vue/compiler-sfc");
const { readFileSync } = require("fs");
const { resolve } = require("path");
const chalk = require("chalk");
const content = readFileSync(resolve(__dirname, "./1.vue"), "utf-8");

// 解析.vue文件
const { descriptor } = compiler.parse(content);

console.log(descriptor);
// 使用vue-template-compiler解析template
/* const { template } = descriptor;
const render = compiler.compileTemplate({
  source: template.content,
  id: '1',
}).code;
// 会有静态提升 超过20 个节点的时候会自动提升
console.log(chalk.red(render)); */

const { script } = descriptor;
const render2 = compiler.compileScript(descriptor, {
  id: '1',
});
// 其他颜色
console.log(chalk.blue(JSON.stringify(render2, null, 1)));

