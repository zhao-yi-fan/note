/* 我们可以使用除基取余法来将十进制数 M 转换为 N 进制数。具体步骤如下：

1. 判断 M 是否为负数，如果是，则先将其转为正数，并在最终结果中加上负号。
2. 用 M 除以 N，得到商 Q 和余数 R，其中 Q 和 R 均为整数。将余数 R 记录下来。
3. 如果 Q 不为 0，则将 Q 重新赋值给 M，重复步骤 2。
4. 如果 Q 为 0，则说明已经将 M 转换为 N 进制数。将之前记录的余数 R 倒序排列，就是 M 在 N 进制下的表示。
5. 如果 R 大于等于 10，则将其转换为大写字母表示。
6. 如果 R 小于 10，则直接记录 R。
7. 将所有记录下来的数字组成一个字符串，就是 M 在 N 进制下的表示。
下面是 JavaScript 代码实现： */

function decimalToN(M, N) {
  let isNegative = M < 0;
  M = Math.abs(M); // 取绝对值，方便后面计算

  let result = '';
  while (M !== 0) {
    let remainder = M % N;
    if (remainder >= 10) {
      result = String.fromCharCode(remainder + 55) + result;
    } else {
      result = remainder + result;
    }
    M = Math.floor(M / N);
  }
  if (result === '') { // 如果 M 为 0，则直接返回 0
    return '0';
  } else if (isNegative) {
    return '-' + result;
  } else {
    return result;
  }
}

console.log(decimalToN(10,4));

// 这个函数接受两个参数：十进制数 `decimalNumber` 和目标进制数 `n`。函数返回一个字符串，表示 `decimalNumber` 在 `n` 进制下的表示。例如，`decimalToN(10, 2)` 返回字符串 `"1010"`，表示十进制数 10 在二进制下的表示。