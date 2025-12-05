// 编程题
// 回文串是指正着读和反着读都一样的字符串。例如，"racecar" 和 "level" 都是回文串，而 "hello" 则不是。
function isPalindrome(str) {
  // return boolean
}

// console.log(isPalindrome("level")); // true
// console.log(isPalindrome("hello")); // false
console.log(isPalindrome("helloabbaolleh")); // true



function isPalindrome(str) {
  if (Object.prototype.toString.call(str) !== "[object String]") {
    throw new Error("str is not String");
  }
  let result = null

  function pick(str) {
    if (!str || str.length === 1) {
      result = true;
      return;
    }
    const first = str.slice(0, 1);
    const last = str.slice(str.length - 1, str.length);
    const rest = str.slice(1, str.length - 1);
    console.log(first, last, rest, str);

    if (first === last) {
      pick(rest);
    } else {
      result = false;
    }
  }
  pick(str);
  return result;
}

/* function isPalindrome(str) {
  if (Object.prototype.toString.call(str) !== "[object String]") {
    throw new Error("str is not String");
  }
  const arr = str.split("");
  
  let leftIndex = 0;
  let rightIndex = arr.length - 1;
  while (leftIndex < arr.length / 2) {
    if (arr[leftIndex] === arr[rightIndex]) {
      leftIndex++;
      rightIndex--;
    } else {
      return false;
    }
  }
  return true;
} */
