const fs = require("fs");

// 没有 promisify 时，需要直接使用回调函数处理异步结果
/* fs.readFile(__filename, "utf8", (err, content) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(content.length);
}); */

// promisify 主要在 Node 环境中使用，用于转换 error-first callback 风格的 API
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

const readFile = promisify(fs.readFile);

readFile(__filename, "utf8").then((content) => {
  console.log(content.length);
});
