let p1 = new Promise((resolve, reject) => {
  // resolve和reject只能执行一个，执行其中一个另一个就不会执行
  setTimeout(() => {
    // 定时器中不能手动抛异常
    Math.random() < 0.5 ? resolve(100) : reject(-100);
  }, 1000);
  resolve(100);
  throw new Error("ERROR");
});
let p3 = p1
  .then((result) => {
    console.log(result);
    throw new Error("222");
  })
  .catch((reason) => {
    console.log(reason);
  });
console.log(3);

// var promise = new Promise(function(resolve, reject){
//   setTimeout(function() {
//     resolve(1);
//   }, 3000)
// })

// promise.then(2).then((n) => {
//   console.log(n)
// });

// Promise.resolve()
//   .then(() => {
//     return new Error('error!!!')
//   })
//   .then((res) => {
//     console.log('then: ', res)
//   })
//   .catch((err) => {
//     console.log('catch: ', err)
//   })
