# JQ源码解析

## 基础介绍

- 类库, 插件, UI组件, 框架

> 1. 类库: JQ/ZEPTO... 提供一些真实项目中常用的方法, 任何项目都可以把类库导入进来, 调取里面的方法实现自己需要的业务逻辑(JQ是PC端考虑兼容性的, ZEPTO是手机端不考虑兼容的)
> 2. 插件: 具备一定的业务功能, 例如, 我们可以封装轮播图插件, 选项卡插件, 模态框插件等(插件规定了当前这个功能的样式解构, 把实现功能的js进行封装, 以后想实现这个功能直接导入插件即可) 
>   swiper\iscroll\jquery-dialog\jquery-drag\jquery-datepicker\Echarts...
> 3. UI组件: 把结构, css, js全部都封装好了, 我们想实现一个功能直接导入进来即可(偶尔需要我们修改一下) bootstrap...
> 4. 框架: 具备一定的编程思想, 要求我们按照框架的思想开发, 一般框架中提供了常用的类库方法, 提供了强大的功能插件, 有的也提供了强大的UI组件.  React(React native)\Vue\Angular\Backone\Sea.js\Require.js...

- jQuery(JQ)非常优秀的"类库"

>    基于原生js封装的一个类库,提供了很多的方法, 而且这些方法是兼容所有浏览器.
    JQ版本:
        v1 最常用的版本 1.8.3  1.9.3  1.11.3最常用的版本
        v2 为移动端做贡献, 不支持兼容性
        v3 vue\react崛起的时代, 用的人不多了. 和v1版本差不多

## 安装JQ

> 推荐版本v1.11.3
>
> 常用文档: http://jquery.cuishifeng.cn/

> webStorm提供了一个Terminal, 和DOS窗口类似, 在里面用npm下载

## JQ的核心结构

> JQ是一个类(也是一个普通对象): 函数的两种角色, JQ是一个类库提供了很多的方法, 其中这些方法有两部分
>             1. 放到JQ原型上的(jQuery.fn/jQuery.prototype), 这里面的方法是供JQ实例调取使用的
>             2. 把JQ当做一个普通对象, 在对象上设置一些私有的属性和方法, 这类方法以后用的时候直接jQuery.xxx()执行即可
>
> extend是把一个对象中的属性和方法扩展到指定的对象上

```javascript
(function () {
    var	version = "1.11.3",
        jQuery = function( selector, context ) {
            return new jQuery.fn.init( selector, context );//=> 创建了init这个类的实例, 也相当于创建了jQuery这个类的实例(因为在后面的时候, 让init.prototype=jQuery.prototype)
        };

    jQuery.fn = jQuery.prototype = {
        jquery: version,
        constructor: jQuery,//=> 当前类的原型重定向后, 自己开辟的堆内存中是没有constructor的, 需要手动添加保证它的完整性
        filter: function () {
            
        }
    };

    //=> 给JQ原型上增加extend方法, 同时把JQ当做一个普通对象, 给这个对象设置了一个私有的方法
    jQuery.extend = jQuery.fn.extend = function() {
        
    };
    
    jQuery.extend({
        isFunction: function( obj ) {
           
        },

        isArray: Array.isArray || function( obj ) {
           
        }
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
```

- JQ源码为什么返回的不是jQuery的实例, 而是jQuery.prototype.init的实例?

```javascript
// 为什么不写成下面这样的格式?
let jQuery = function () {
    return new jQuery();
}
let f = jQuery();
```

> 因为会出现无限次函数递归调用.调用jQuery方法执行, 来返回创建的jQuery实例, 在创建jQuery实例的同时又会去执行jQuery, 所以才会出现了把别的类的原型指向jQuery的原型,用别的类来创建实例.

```javascript
let Fn = function () {
    return new Fn.prototype.init();
}
Fn.prototype.init = function () {

}
init.prototype = Fn.prototype;
let f = Fn();
```

- 面试题

```javascript
let Fn = function () {
    //...
}
Fn.prototype = {
    aa: function () {}
}
Fn().aa();
// 问: Fn()如何不new的情况下调用原型上的aa
// 正是jQuery源码所使用的思想
```

