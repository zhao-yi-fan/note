Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);
    let settled = false;

    if (arr.length === 0) return;

    arr.forEach((p) => {
      Promise.resolve(p).then(
        (val) => {
          if (!settled) {
            settled = true;
            resolve(val);
          }
        },
        (err) => {
          if (!settled) {
            settled = true;
            reject(err);
          }
        }
      );
    });
  });
};

Promise.myRace([
  1,
  new Promise((res, rej) => {
    setTimeout(rej, 100);
  }),
])
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
