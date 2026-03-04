// 高阶函数 函数参数如果是函数，或者这个函数返回一个新的函数，我们就叫他高阶函数

// fn是高阶函数
/* function fn(){
  return function(){

  }
}
fn(()=>{

}) */

// AOP 面向切片编程

// before  （this指向) 箭头函数的特点   after 函数
// 不会破坏原函数，添加自己的功能
function say (who) {
  console.log(who + 'hello');
}
Function.prototype.before = function (beforeFunc) {
  // this  箭头函数中没有this  也没有arguments
  return (...args) => { // ['我']
    beforeFunc();
    this(...args);
  }
}
// beforeSay 是一个包装后的函数
let beforeSay = say.before(() => {
  console.log('开始说话')
})
beforeSay('我');

// react中的事务

