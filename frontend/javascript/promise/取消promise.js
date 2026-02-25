// 如何取消一个promise
function wrap(p) {
  let obj = {
    reject: null,
    resolve: null,
    promise: null,
  };
  let p1 = new Promise((resolve, reject) => {
    obj.resolve = resolve;
    obj.reject = reject;
  });
  obj.promise = Promise.race([p1, p]);
  return obj; // 里面放了可控制的promise对象
}

let promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(123);
  }, 1000);
});
let obj = wrap(promise);
obj.promise
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log("catch", err);
  });
// obj.reject("主动错误"); // 调用就回立刻结束promise
