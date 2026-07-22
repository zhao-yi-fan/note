const fs = require("fs");

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
