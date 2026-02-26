//9、

// var foo = 'hello';
// (function (foo) {
//     /**
//      * 形参赋值: foo = 'hello'
//      * 变量提升: var foo;(这一步省略: 因为在私有作用域中已经有foo这个变量了, 浏览器不会重新声明重复的变量)
//      */
//     console.log(foo);//=> hello
//     var foo = foo || 'world';//=> 'hello' || 'world' => foo = hello
//     console.log(foo);//=> hello
// })(foo);// 把全局下的foo的值作为实参传递给函数的形参 => 'hello'
// console.log(foo);//=> hello

/*
 A、hello hello hello   
 B、undefined world  hello   
 C、hello world world   
 D、以上答案都不正确
*/
//实战用法:
function fn(x) {
    //=> "给形参赋值默认值": 验证传递的参数值, 如果没有传递实参, 让其默认值为零

    // if (x === undefined) {
    //     x = 0;
    // }
    // // '=='的话会出现问题, 因为 null == undefined成立.

    // if (typeof x === 'undefined') {
    //     x = 0;
    // }.

    x = x || 0;//=> 如果x没传递值, x=undefined => x = undefined || 0
    // 这种赋值的方式没有上面if判断严谨,if这种是没传递值才会赋值默认值, ||这种是不传值或者传递的值是假, 都让它等于零(实际开发用的最多)
}