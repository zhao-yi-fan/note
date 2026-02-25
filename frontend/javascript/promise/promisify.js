// promisify 主要在node环境中使用
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
  };
}

const sleep = promisify(setTimeout);

sleep(1000).then(() => console.log("1秒后执行"));

