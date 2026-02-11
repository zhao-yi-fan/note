// 实现x的n次方，n为整型
function num(x, n) {
  if (
    !["[object Number]", "[object String]"].includes(
      Object.prototype.toString.call(x)
    )
  ) {
    throw new Error("n is not Number|String");
  }
  if (Object.prototype.toString.call(n) !== "[object Number]") {
    throw new Error("n is not Number");
  }

  const number = Number(x);
  let result = number;
  for (let i = 1; i < n; i++) {
    result = result * number;
  }

  // x**n/2 * x**n/2 * x**n/2

  // log10

  return result;
}

console.log(num("2", 5));
