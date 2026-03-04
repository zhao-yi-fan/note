// 判断数据类型
// typeof 不能判断对象或者数组
// instanceof
// contructor  
// Object.prototype.toString.call

function isType (content, type) {
  return Object.prototype.toString.call(content) == `[object ${type}]`

}
// isTring isArray isBoolean
let types = ['String', 'Boolean', 'Number', 'Null', 'Undefined']
let utils = {}
for (let i = 0; i < types.length; i++) {
  let type = types[i]

}
let flag = isType('hello', 'string')
console.log(flag)

// 如何实现柯理化和反柯理化
// 作业
function fn (a, b, c) {
  return a + b + c;
}
function fn (a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    }
  }
}
// 偏函数
function fn (a, b) {
  return function (c) {

  }
}