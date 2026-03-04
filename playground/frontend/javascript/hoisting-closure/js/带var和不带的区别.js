//在全局作用域下声明一个变量, 也相当于给window全局对象设置了一个属性, 变量的值就是属性值(私有作用域中声明的私有变量和window没关系)

// in: 检测某个属性是否隶属于这个对象 
console.log(a) //=> undefined
console.log(window.a)  //=> undefined
console.log('a' in window) //=> true  在变量提升阶段, 在全局作用域中声明了一个变量a, 此时就已经把 a 当做属性赋值给window了, 只不过此时还没有给a赋值,默认值undefined
var a = 12; // 全局变量值修改, window 的属性值也跟着修改
console.log(a) //=> 12   全局变量 a
console.log(window.a) //=> 12 window的一个属性 a

// a = 13;
// console.log(window.a) //=> 13

// window.a = 14
// console.log(a) //=> 14

// //=> 全局变量和window中的属性存在"映射机制"



// 不加 var 的本质是win的属性
// console.log(a); //Uncaught ReferenceError: a is not defined
// 先看a是否是全局变量,不是的话再看a是否是window下的属性.既不是全局变量,也不是window的属性,最后按全局变量处理,直接报错
// console.log(window.a) // => undefined
// console.log('a' in window) // => false
// a = 12 // => window.a = 12
// console.log(a) // =>12
// // 先看是否是全局变量, 不是的话再看a是否是window下的属性.最后是window下的属性,直接输出window的a属性值
// console.log(window.a) // =>12
// // 直接是window下a属性值



// 私有作用域中带var 和不带也有区别
// 1. 带var 的在私有作用域变量提升阶段, 都声明为私有变量, 和外界没有任何的关系
// 2. 不带var 不是私有变量, 会向它的上级作用域查找, 看是否为上级的变量, 不是的话, 继续向上查找, 一直找到window为止
// (我们把这种查找机制称为: "作用域链"), 也就是我们在私有作用域中操作的这个非私有变量, 是一直操作别人的


// var a = 12,b = 12;// var a = 12; var b = 12;
// var a = b = 13;// var a = 13; b = 13;

// console.log(a, b);// => undefined undefined
// var a = 12, b = 12;
// function fn () {
//     console.log(a, b);// => undefined 12
//     var a = b = 13;/*var a = 13; b = 13;*/
//     console.log(a, b);// => 13 13
// }
// fn();
// console.log(a, b);// => 12 13


