/**
 * ES6接触到: let const 解构赋值 (...)的三个作用
 */

//=============箭头函数
// let fn = function (x, y) {

// };
// // ES6
// let fn = (x, y) => {

// }

//=> 只有一个形参, 可以省略小括号
// let fn = x => {

// }
// fn(10);


//=> 如果函数体中只有一句操作, 并且是return, 我们可以省略大括号(给形参设置默认值)
// let fn = (x = 0, y = 0) => x + y;
// console.log(fn(10, 20));


//=> 嵌套函数
// let fn = x => y => x + y;
/*
var fn = function fn(x) {
    return function (y) {
        return x + y;
    };
};
*/


// 1. 箭头函数中没有arguments
let fn = (...arg) => {
    // console.log(arguments);//=> Uncaught ReferenceError: arguments is not defined
    console.log(arg);//=> 可以使用剩余运算符代替, 而且arg是一个数组
};
fn(10, 20, 30, 40);


// 2. 箭头函数中没有自己的执行主体(this), 它的this都是继承上下文中的this

// 原始写法(两种方案)
// obj.fn()中的this是obj  如果想让obj.fn执行, this也是window,该如何处理?

/* 第一种
let obj = {
    fn: (function () {
        //this:window
        return function () {
            console.log(this);
        }
    })()
};
obj.fn.call(window);//=> this: window
 */

/* 第二种
let obj = {
    fn: (function () {
        //this:window
        let _this = this;//=> window
        return function () {
            console.log(_this);//=> this只是一个变量, 不是私有的, 找上级作用域中的
        }
    })()
};
obj.fn();
 */

// 箭头函数写法
let obj = {
    fn: (function () {
        return () => {
            console.log(this);
        }
    })()
};
obj.fn();//=> this:window 箭头函数执行和是否有点, 点前面是谁都没有关系了, 因为它没有自己的执行主体(this), 在箭头函数中使用到的this都是直接找上下文中的this来使用









