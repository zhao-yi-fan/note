// 实现x的n次方，n为整型
// 时间复杂度 O(log n)
function pow(x, n) {
  const num = Number(x);

  if (n === 0) return 1;

  // 处理负数
  if (n < 0) {
    return 1 / pow(num, -n);
  }

  const half = pow(num, Math.floor(n / 2));

  if (n % 2 === 0) {
    return half * half;
  } else {
    return half * half * num;
  }
}

console.log(pow(2, 5)); // 32
