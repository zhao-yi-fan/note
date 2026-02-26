//6、

var a = 10, b = 11, c = 12;
function test(a) {
    a = 1;
    var b = 2;
    c = 3;
}
test(10);
console.log(a);
console.log(b);
console.log(c);

/*
 A、1 11 3   
 B、10 11 12  
 C、1 2 3   
 D、10 11 3
*/


//7
/**
 * 变量提升:
 *      var a; 不管条件是否成立都要进行变量提升, 在全局作用域下声明的变量, 也相当于给window设置了一个对象的属性, 而且两者之间建立了映射的机制<=> window.a=undefined;
 */
if (!("a" in window)) {//=> 'a' in window =>true
    var a = 1;
}
console.log(a);

/*
A、1   
B、undefined   
C、报错   
D、以上答案都不对
*/
//=> B



//8、

var a = 4;
function b(x, y, a) {
    /**
     * 形参赋值: x = 1 y = 2 a = 3
     * 变量提升
     */
    //=> arguments: 函数内置的实参集合, 不管是否设置形参, 传递的实参值在这个集合中都存在
    /**
     * arguments
     * {
     *  0: 1
     *  1: 2
     *  2: 3
     *  length: 3
     *  callee: 函数本身
     *  ...
     * }
     */
    /**
     * 在js非严格模式下, 函数中的形参变量和arguments存在映射机制(映射: 互相之间影响)
     *  第一个形参变量值修改为100, 那么arg[0]的值也跟着修改为100
     *  arg[1]的值修改为200, 那么第二个形参变量y的值也会跟着变为200
     *  ...
     */
    console.log(a);//=> 3
    arguments[2] = 10;//=> 把传递的第三个实参值修改为10, 此时第三个形参变量a也会受到影响
    console.log(a);//=> 10
}
a = b(1, 2, 3);//=> a=b执行的结果 => a = undefined [b函数中并没有编写return, 所以默认函数的返回值是undefined]

console.log(a);

/*
 A、3  3  4   
 B、3  10  4   
 C、3  10  10   
 D、3  10  undefined
*/

// function fn (x, y) {
//     /**
//      * 形参
//      *  x = 10
//      *  y = undefined y也是私有变量, 不是没赋值, 而是赋值为undefined
//      * 
//      * arg
//      *  0: 10
//      *  length: 1
//      * arg和形参之间的映射是以arg的索引为基础完成的, arg中有这个索引, 浏览器会完成和对应形参变量中的映射机制搭建, 如果形参比arg中个数多, 那么多出来的形参是无法和arg中对应的索引建立关联的
//      */
//     var arg = arguments;
//     arg[0] = 100;
//     console.log(x);//=> 100
//     y = 200;
//     console.log(arg[1]);//=> undefined
// }
// fn(10);



~function () {
    // function fn (x) {
    //     arguments[0] = 100;
    //     console.log(x);//=> 100 存在映射机制
    // }
    // fn(10);

    // var obj = {
    //     n: 10,
    //     n: 20
    // };
    // console.log(obj.n);

    function fn () {
        console.log(this);//=> window
    }
    fn();
    
}();
~function () {
    "use strict";
    // function fn (x) {
    //     arguments[0] = 100;
    //     console.log(x);//=> 10 不存在映射机制
    // }
    // fn(10);

    // var obj = {
    //     n: 10,
    //     n: 20
    // };
    // console.log(obj.n);

    function fn () {
        console.log(this);//=> undefined
    }
    fn();
}();