const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  while ((line = await readline())) {
    const arr = line.split("");
    const map = {};
    arr.forEach((key) => {
      if (map[key] === undefined) {
        map[key] = 1;
      } else {
        map[key]++;
      }
    });
    const sortArr = Object.values(map);
    sortArr.sort((a, b) => a - b);
    const minLength = sortArr[0];
    for (const key in map) {
      if (map[key] === minLength) {
        const reg = new RegExp(key, "g");
        line = line.replace(reg, "");
      }
    }
    console.log(line);
  }
})();
