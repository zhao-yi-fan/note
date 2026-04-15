const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  while ((line = await readline())) {
    let tokens = line.split(";");
    const map = {
      A: -1,
      D: +1,
      S: -1,
      W: +1,
    };
    let xSum = 0;
    let ySum = 0;
    tokens.forEach((token) => {
      const symbol = token.slice(0, 1);
      if (["A", "D"].includes(symbol) && !Number.isNaN(Number(token.slice(1)))) {
        xSum = xSum + map[symbol] * token.slice(1);
      }
      if (["W", "S"].includes(symbol) && !Number.isNaN(Number(token.slice(1)))) {
        ySum = ySum + map[symbol] * token.slice(1);
      }
      // console.log(xSum, ySum);
    });
    console.log(`${xSum},${ySum}`)
  }
})();
