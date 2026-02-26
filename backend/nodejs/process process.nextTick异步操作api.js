// NODE中独有的异步操作API
// 它也是定时器，但是它不设置时间，但是它也是异步编程（宏任务），它会在所有其他定时器之前执行
// 可以理解setImmediate相当于0毫秒
/* setTimeout(() => {
  console.log(1)
}, 0)

setImmediate(() => {
  console.log(2)
}) */


// process.nextTick：把当前任务放到主栈最后执行（当主栈执行完，先执行nextTick，再到等待队列中找）
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
