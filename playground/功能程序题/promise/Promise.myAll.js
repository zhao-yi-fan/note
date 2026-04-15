Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    if (arr.length === 0) return resolve([]);
    let count = 0;
    const result = new Array(arr.length);
    arr.forEach((promise, index) => {
      Promise.resolve(promise).then(
        (res) => {
          result[index] = res;
          if (++count === arr.length) {
            resolve(result);
          }
        },
        (err) => reject(err)
      );
    });
  });
};

Promise.myAll([
  new Promise((resolve) => setTimeout(resolve, 400, 4)),
  new Promise((resolve) => setTimeout(resolve, 200, 2)),
  new Promise((resolve) => setTimeout(resolve, 300, 3)),
  Promise.resolve(1),
]).then((result) => {
  console.log(result);
});
