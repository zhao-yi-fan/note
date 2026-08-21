// Node.js 中的异步调度 API
// setImmediate 会在 I/O 回调后的 check 阶段执行，不等同于 0 毫秒定时器。
/* setTimeout(() => {
  console.log(1)
}, 0)

setImmediate(() => {
  console.log(2)
}) */


// process.nextTick：在当前调用栈清空后、事件循环进入下一阶段前执行。
// 它不是宏任务；递归调用会持续占用 nextTick 队列，可能阻塞 I/O。
/* process.nextTick(() => {
  console.log(2);
});
setTimeout(() => {
  console.log(1)
}, 10);
let i = 0;
while (i < 9999999) {
  i++;
}
console.log(3);
// => 3 2 1 */


// 如果在监听端口号下面的代码出现大量的占时间的代码，监听端口的代码在等待队列，由于主栈都没有执行完。访问该端口号会没有反应。
/* let http = require('http')
http.createServer((req, res) => {
  res.end('ok');
}).listen(8888, () => {
  console.log('success')
})

function computed () {
  let i = 0;
  while (i < 99999999) {
    i++;
  }
}
process.nextTick(computed) */


// process.env.NODE_ENV：全局环境变量
// 用途：真实项目中，我们项目基于webpack打包配置的时候，往往需要区分不同环境下的不同操作，例如有 开发环境、测试环境、生产环境...而我们一般都是基于环境变量来区分打包配置的！
