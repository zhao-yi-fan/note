/* function myNew(context) {
  const obj = new Object();
  obj.__proto__ = context.prototype;
  const res = context.apply(obj, [...arguments].slice(1));
  return typeof res === "object" ? res : obj;
} */

function myNew(Constructor, ...args) {
  // 1. 创建新对象，并且让它的原型指向构造函数 prototype
  const obj = Object.create(Constructor.prototype);

  // 2. 执行构造函数，绑定 this
  const res = Constructor.apply(obj, args);

  // 3. 返回值如果是对象/函数，则返回它；否则返回 obj
  return res !== null && (typeof res === "object" || typeof res === "function")
    ? res
    : obj;
}


function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
};

const john = myNew(Person, "John", 25);
john.sayHello(); // Output: Hello, my name is John and I am 25 years old.
