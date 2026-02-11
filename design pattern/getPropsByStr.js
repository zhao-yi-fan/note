/**
 * 第四题、实现一个getPropsByStr方法，可以通过字符串读取对象属性值
 */
function getPropsByStr(data, str) {
  return str.split(".").reduce((obj, key) => obj?.[key], data);
}

/* function getPropsByStr(data, str) {
  const propsArr = str.split(".");
  let result = data;

  for (let i = 0; i < propsArr.length; i++) {
    const item = result[propsArr[i]];
    if (Object.prototype.toString.call(item) !== "[object Object]") {
      if (i !== propsArr.length - 1) {
        return undefined;
      }
      return item;
    }
    result = item;
  }

  console.log("result", result);

  return result;
} */

const data = { a: { bb: "" } };
console.log(getPropsByStr(data, "a.bb.c") === undefined); // true
console.log(getPropsByStr(data, "a.bb") === ""); // true
console.log(getPropsByStr(data, "a") === data.a); // true
