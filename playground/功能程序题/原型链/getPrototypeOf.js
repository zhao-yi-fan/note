/**
 * Object.getPrototypeOf 的常见问题整理
 *
 * 1. 为什么直接写 {}.__proto__ 有时会报错？
 *    因为在语句开头，{} 可能会被当成代码块解析，不是对象字面量。
 *
 *    下面两种写法是安全的：
 *    - ({}).__proto__
 *    - Object.getPrototypeOf({})
 *
 * 2. 为什么更推荐 Object.getPrototypeOf？
 *    - 它是标准 API
 *    - 语义更明确
 *    - 比直接写 __proto__ 更稳妥
 *
 * 3. 什么时候会用到它？
 *    - 想确认一个对象的原型是谁
 *    - 手写 instanceof / new / 继承相关逻辑
 *    - 调试原型链问题
 *
 * 4. Object.create(null) 有什么特点？
 *    - 创建一个“没有原型”的对象
 *    - Object.getPrototypeOf(obj) 会返回 null
 *    - 不是“禁止别人读取原型”，而是这个对象本身就没有原型
 *
 * 5. 如果不想让原型对象被改动怎么办？
 *    - 可以冻结原型对象本身：Object.freeze(Constructor.prototype)
 *    - 这只能阻止原型对象被修改，不会阻止别人读取原型
 *
 * 6. 如果想拦截“读取原型”这件事怎么办？
 *    - 不能靠 defineProperty
 *    - 要用 Proxy 的 getPrototypeOf trap
 */

const obj = { name: "zs" };
const arr = [];
const noProtoObj = Object.create(null);

function Person() {}

console.log(Object.getPrototypeOf(obj) === Object.prototype); // true
console.log(Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(Object.getPrototypeOf(noProtoObj)); // null
console.log(Object.getPrototypeOf(new Person()) === Person.prototype); // true

// 语句开头要注意解析歧义
console.log(({}).__proto__ === Object.prototype); // true
console.log(Object.getPrototypeOf({}) === Object.prototype); // true

Object.freeze(Person.prototype);
console.log(Object.isFrozen(Person.prototype)); // true

const proxy = new Proxy(obj, {
  getPrototypeOf(target) {
    console.log("读取了原型");
    return Object.getPrototypeOf(target);
  },
});

console.log(Object.getPrototypeOf(proxy) === Object.prototype); // true
