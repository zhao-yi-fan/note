const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  let line;
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
      if (!/^[ASWD]\d{1,2}$/.test(token)) return;

      const symbol = token.slice(0, 1);
      const distance = Number(token.slice(1));
      if (["A", "D"].includes(symbol)) {
        xSum = xSum + map[symbol] * distance;
      }
      if (["W", "S"].includes(symbol)) {
        ySum = ySum + map[symbol] * distance;
      }
      // console.log(xSum, ySum);
    });
    console.log(`${xSum},${ySum}`)
  }
})();
