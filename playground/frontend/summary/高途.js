/**
 * 第3题、有效括号
 */
/* 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

有效字符串需满足：
1左括号必须用相同类型的右括号闭合。
2左括号必须以正确的顺序闭合。
3每个右括号都有一个对应的相同类型的左括号。
 

示例 1：
输入：s = "()"
输出：true

示例 2：
输入：s = "()[]{}"
输出：true

示例 3：
输入：s = "(]"
输出：false

示例 4：
输入：s = "([])"
输出：true

示例 5：
输入：s = "([)]"
输出：false

实现isValid方法： */

var isValid = function (s) {
  if (Object.prototype.toString.call(s) !== "[object String]") {
    throw new Error("s is not String");
  }
  const countMap = {
    "(": {
      index: null,
      count: 0,
    },
    ")": {
      index: null,
      count: 0,
    },
    "[": {
      index: null,
      count: 0,
    },
    "]": {
      index: null,
      count: 0,
    },
    "{": {
      index: null,
      count: 0,
    },
    "}": {
      index: null,
      count: 0,
    },
  };
  const arr = s.split("");
  arr.forEach((item, index) => {
    const currInfo = countMap[item];
    currInfo.count++;
    currInfo.index = index;
  });
  if (
    countMap["{"].count > 0 &&
    (countMap["{"].count !== countMap["}"].count ||
      countMap["{"].index > countMap["}"].index)
  ) {
    return false;
  }
  if (
    countMap["("].count > 0 &&
    (countMap["("].count !== countMap[")"].count ||
      countMap["("].index > countMap[")"].index)
  ) {
    return false;
  }
  if (
    countMap["["].count > 0 &&
    (countMap["["].count !== countMap["]"].count ||
      countMap["["].index > countMap["]"].index)
  ) {
    return false;
  }
  return true;
};

console.log(isValid("()[]{}"));


