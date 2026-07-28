/**
 * ============================================================
 *  有效的括号（LeetCode 20）—— 栈的经典应用
 * ============================================================
 *
 * 题目：给定只包含 ()、[]、{} 的字符串，判断括号是否有效。
 *
 * 规则：
 *   1. 左括号必须由同类型的右括号闭合
 *   2. 左括号必须按正确顺序闭合
 *
 * 思路：
 *   - 遇到左括号，入栈，等待后续匹配
 *   - 遇到右括号，必须与栈顶左括号匹配
 *   - 最终栈为空，说明所有左括号都已闭合
 *
 * 时间复杂度：O(n)
 * 空间复杂度：O(n)
 */

function isValid(s) {
  const pair = {
    ')': '(',
    ']': '[',
    '}': '{',
  };
  const stack = [];

  for (const ch of s) {
    // `in` 会检查对象自身属性和原型链属性；本题输入固定为括号时可用。
    // 通用场景更推荐 `Object.hasOwn(pair, ch)`：只检查自身属性，
    // 也避免对象重写 `hasOwnProperty` 后调用不安全的问题。
    if (Object.hasOwn(pair, ch)) {
      // 右括号必须和最近一个未匹配的左括号对应
      if (stack.pop() !== pair[ch]) return false;
    } else {
      stack.push(ch);
    }
  }

  return stack.length === 0;
}

console.log('=== 有效的括号 ===');
console.log(isValid('{[()]}')); // true
console.log(isValid('([)]')); // false
console.log(isValid('(()')); // false
console.log(isValid('')); // true
