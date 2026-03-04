/**
 * 在ES6 中基于 LET/CONST 等方式创建变量或者函数, 
 * => 1. 不存在变量提升机制
 * => 切断了全局变量和window属性的映射机制
 * 
 * => 在相同的作用域中, 基于LET不能声明相同名字的变量(不管用什么方式在当前作用域下声明了变量, 再次使用LET创建都会报错)
 * 
 *      虽然没有变量提升机制,但是在当前作用域代码自上而下执行之前, 浏览器会做一个
 *      重复性检测: 自上而下查找当前作用域下的所有变量, 一旦发现有重复的, 直接抛出异常,代码也不会再执行了
 *      (虽然没有把变量提前声明定义, 但是浏览器已经记住了当前作用域下有哪些变量)
 *          - 查找重复的
 *          - 不能在声明之前使用
 */

// console.log(a);//=> Uncaught ReferenceError: a is not defined (引用错误)

// let a = 12;
// console.log(window.a);//=> undefined
// console.log(a); //=> 12



// =>Uncaught SyntaxError: Identifier 'a' has already been declared
// 在执行之前报错
// let a = 12;
// console.log(a);
// let a = 13;
// console.log(a);



// let a = 10,
//     b = 10;
// let fn = function () {
//     // console.log(a, b);//=> Uncaught ReferenceError: a is not defined (未捕获的引用错误: a没有被定义)
//     let a = b = 20;
//     /**
//      * let a = 20; a 是私有作用域下的私有变量
//      * b = 20; 把全局中的 b = 20
//      *  
//      */
//     console.log(a, b);// =>20, 20
// }
// fn();
// console.log(a, b);//=> 10,20


a = 1;
console.log(a)
// var a;
let a;




