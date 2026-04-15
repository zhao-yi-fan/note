const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  const arr = [];
  while ((line = await readline())) {
    let tokens = line.split(" ");
    arr.push(...tokens);
  }
  arr.shift();
  const set = [...new Set(arr)].sort((a, b) => a - b);
  set.forEach((item) => {
    console.log(item);
  });
})();
