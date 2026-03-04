(function () {
    var	version = "1.11.3",
        jQuery = function( selector, context ) {
            return new jQuery.fn.init( selector, context );//=> 创建了init这个类的实例, 也相当于创建了jQuery这个类的实例(因为在后面的时候, 让init.prototype=jQuery.prototype)
        };
    //=> jQuery是一个类, 在它的原型上提供了很多的属性和方法, 供JQ的实例调取使用
    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=> 当前类的原型重定向后, 自己开辟的堆内存中是没有constructor的, 需要手动添加保证它的完整性
        // ...
        filter: function () {
            
        }

    };

    //=> 给JQ原型上增加extend方法, 同时把JQ当做一个普通对象, 给这个对象设置了一个私有的方法
    /* 
        JQ是一个类(也是一个普通对象): 函数的两种角色, JQ是一个类库提供了很多的方法, 其中这些方法有两部分
            1. 放到JQ原型上的(jQuery.fn/jQuery.prototype), 这里面的方法是供JQ实例调取使用的
            2. 把JQ当做一个普通对象, 在对象上设置一些私有的属性和方法, 这类方法以后用的时候直接jQuery.xxx()执行即可
    */
    jQuery.extend = jQuery.fn.extend = function() {};
    /* 
        extend是把一个对象中的属性和方法扩展到指定的对象上
    */
    jQuery.extend({
        isFunction: function( obj ) {
           
        },

        isArray: Array.isArray || function( obj ) {
           
        },
        //...
    })
    // jQuery:{extend:..., isFunction:..., isArray:...}

    jQuery.fn.extend({
        find:xxx,
    });
    //jQuery.prototype: {..., find:...}

    var init = jQuery.fn.init = function( selector, context ) {

    }
    init.prototype = jQuery.fn;//=> 把init当作一个类, 但是让这个类的原型指向了jQuery.prototype(init这个类的实例最后找到的也是jQuery这个类原型上的方法 =>init的实例其实也可以理解为jQuery的实例)

    window.jQuery = window.$ = jQuery;
})();
$().filter() //=> 创建一个jQuery类的实例, 可以调取JQ.fn中的方法
$.isFunction() //=> 把JQ当作一个普通对象, 直接的使用对象上扩展的那些私有属性和方法(这些方法和实例没关系)



//===============================================
// JQ源码为什么返回的不是jQuery的实例, 而是jQuery.prototype.init的实例?
let jQuery = function () {
    return new jQuery();
}
let f = jQuery();
// 因为会出现无限次函数递归调用.调用jQuery方法执行, 来返回创建的jQuery实例, 在创建jQuery实例的同时又会去执行jQuery, 所以才会出现了把别的类的原型指向jQuery的原型,用别的类来创建实例.

let Fn = function () {
    return new Fn.prototype.init();
}
Fn.prototype.init = function () {

}
init.prototype = Fn.prototype;
let f = Fn();


// 面试题:
let Fn = function () {
    //...
}
Fn.prototype = {
    aa: function () {}
}
Fn().aa();
// 问: Fn()如何不new的情况下调用原型上的aa



