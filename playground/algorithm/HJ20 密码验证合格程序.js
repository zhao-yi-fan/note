const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
  // Write your code here
  while ((line = await readline())) {
    console.log(validate(line));
  }
  function validate(str) {
    let valid = "NG";
    let validStr = str.length > 8;
    let validRepeat = repeat(str);
    let validTypes = types(str);
    if (validStr && validRepeat && validTypes) {
      valid = "OK";
    }
    return valid;
  }
  function types(str) {
    let num = 0;
    if (/[a-z]/.test(str)) {
      num++;
    }
    if (/[A-Z]/.test(str)) {
      num++;
    }
    if (/[0-9]/.test(str)) {
      num++;
    }
    if (/[^0-9a-zA-Z\s]/.test(str)) {
      num++;
    }
    return num >= 3;
  }
  function repeat(str) {
    const arr = [];
    for (let i = 0; i < str.length - 2; i++) {
      const sub = str.substring(i, i + 3);
      if (arr.indexOf(sub) >= 0) {
        return false;
      } else {
        arr.push(sub);
      }
    }
    return true;
  }
})();
