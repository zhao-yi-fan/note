/**
 * 当前函数执行, 形成一个私有作用域A, A的上级作用域是谁, 和它在哪执行的没有关系, 
 * 和它在哪创建的有关系, 在哪创建的, 它的上级作用域就是谁
 */


/* var a = 12;
function fn () {
    console.log(a);
}
function sum () {
    var a = 120;
    fn();
}
sum(); */


// var a = 20;
// function fn () {
//     // arguments: 实参集合
//     // 目前在严格模式下 arguments.callee 和 arguments.callee.caller都不允许用
//     // arguments.callee: 函数本身fn
//     // arguments.callee.caller: 当前函数在哪执行的, caller就是谁(记录的是它执行的宿主环境), 在全局下执行caller的结果是null
//     console.log(arguments.callee.caller);
//     //=> ƒ aa () {
//     //     fn(a);
//     // }
// }
// function aa () {
//     fn();
// }
// aa();


// var a = 20;
// function fn () {
//     console.log(arguments.callee.caller);//=> null   
// }
// fn();


var n = 10;
function fn () {
    var n = 20;
    function f() {
        n++;
        console.log(n);
    }
    f();
    return f;
}
var x = fn();
x();
x();
console.log(n);
