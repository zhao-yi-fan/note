// lodash 在执行多少次之后再执行
// 防抖 节流都会用到lodash
// 节流：不停触发 按时触发
// 防抖：一直触发 只触发一次
// 做异步的并发处理
function after (times, callback) {
  return function () {
    if (--times === 0) {
      callback();
    }
  }
}
let fn = after(3, () => {
  console.log('执行三次后才执行')
})
fn();
fn();
fn();
