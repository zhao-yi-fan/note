Promise.myAny = function (promiseList) {
  return new Promise((resolve, reject) => {
    let rejectedCount = 0;
    const errors = [];

    const arr = Array.from(promiseList);

    if (arr.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    arr.forEach((promise, index) => {
      promise.then(resolve).catch((err) => {
        errors[index] = err;
        if (++rejectedCount === arr.length) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};

Promise.myAny([
  Promise.reject(0),
  Promise.reject(1),
  Promise.reject(2),
  Promise.reject(3),
]).then((res) => {
  console.log(res);
});
