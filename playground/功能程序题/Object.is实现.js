/**
 * 手写 Object.is
 * 和 === 的主要区别：
 * 1. Object.is(NaN, NaN) === true
 * 2. Object.is(+0, -0) === false
 */
function is(x, y) {
  if (x === y) {
    // 处理 +0 和 -0 的情况
    // 1 / +0 是 Infinity, 1 / -0 是 -Infinity
    return x !== 0 || 1 / x === 1 / y;
  }

  // 处理 NaN 的情况
  // 只有 NaN 不等于自身
  return x !== x && y !== y;
}

console.log(is(1, 1)); // true
console.log(is(NaN, NaN)); // true
console.log(is(+0, -0)); // false
console.log(is(-0, -0)); // true
console.log(is({}, {})); // false
