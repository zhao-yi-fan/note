Promise.myAllSettled = function (promises) {
  const arr = Array.from(promises);
  return new Promise((resolve) => {
    const result = [];
    let count = 0;
    if (arr.length === 0) {
      return resolve([]);
    }
    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => {
          result[i] = {
            state: "fulfilled",
            value,
          };
        })
        .catch((reason) => {
          result[i] = {
            state: "rejected",
            reason,
          };
        })
        .finally(() => {
          if (++count === arr.length) {
            resolve(result);
          }
        });
    });
  });
};

Promise.myAllSettled([Promise.resolve(1), Promise.reject("err"), 3, 4]).then(
  console.log
);
