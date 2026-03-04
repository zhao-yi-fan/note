// finally回调函数不拿任何值，只负责透传
Promise.prototype.myFinally = function (fn) {
  return this.then(
    (res) => Promise.resolve(fn()).then(() => res),
    (err) =>
      Promise.resolve(fn()).then(() => {
        throw err;
      })
  );
};

Promise.resolve(1)
  .myFinally((a, b, c) => {
    console.log("myFinally", a, b, c);
  })
  .then((res) => {
    console.log("res", res);
  });
