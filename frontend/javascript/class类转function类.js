/* 
// 将class转换成function
class Example {
  constructor(name) {
    this.name = name;
  }
  func() {
    console.log(this.name);
  }
} */
/* 
1. 加'use strict' 目的是 为了让this指向undefined
2. 原型上的方法不可枚举
3. 必须使用new调用 new.target才会指向当前的类
*/
console.log(new.target);
"use strict";
function Example(name) {
  console.log(new.target);
  if (new.target !== Example) {
    throw new Error(
      "Class constructor Example cannot be invoked without 'new'"
    );
  }
  this.name = name;
}

Object.defineProperty(Example.prototype, "func", {
  value: function () {
    console.log(this.name);
  },
  enumerable: false, // false 不可枚举
});
// const p = new Example("zf");

// Example(); // 报错

// 遍历p的属性
/* for (let key in p) {
  console.log(key);
} */
