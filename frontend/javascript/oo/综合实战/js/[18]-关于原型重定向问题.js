//4、腾讯面试
/**
 * 在实际项目 基于面向对象开发的时候(构造原型设计模式), 我们根据需要, 很多时候回重定向类的原型(让类的原型指向自己开辟的堆内存)
 *      [存在的问题]
 *      1. 自己开辟的堆内存中没有constructor属性, 导致类的原型构造函数缺失(解决: 自己手动在堆内存中增加constructor属性)
 *      2. 当原型重定向后, 浏览器默认开辟的那个原型堆内存会被释放掉, 如果之前已经存储了一些方法或者属性, 这些东西都会丢失(所以: 内置类的原型不允许重定向到自己开辟的堆内存, 因为内置类原型上自带很多属性方法, 重定向后都没了, 这样是不被允许的,内置类原型保护)
 *      
 */

// function Fn() {

// }
//=> 当我们需要给类的原型批量设置属性和方法的时候, 一般都是让原型重定向到自己创建的对象中 
// Fn.prototype.aa = function () {

// }
// Fn.prototype.bb = function () {

// }
// Fn.prototype.cc = function () {

// }
// Fn.prototype.dd = 10;
// 这样写太繁琐, 才会重定向, 增加属性的时候直接添加进去, 但需要手动加入constructor, 如果不手动加的话, constructor会指向Object
// Fn.prototype = {
//     constructor: Fn,
//     aa: function () {

//     }
// }

function fun() {
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}
fun.prototype = {
    b: function () {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a)
    }
}
var my_fun = new fun();
my_fun.b();
my_fun.c();
