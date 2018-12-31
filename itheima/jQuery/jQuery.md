## html与text方法

```js
//html()相当于js中的innerHTML
//text()相当于js中的innertext

//html()设置
$("div").html("<span>这是一段内容</span>");
//html()获取
$("div").html();
//text()设置
$("div").text("这是一段内容");
//text()获取
$("div").text();
```

区别:

html()会识别标签,text()不会识别标签,会把内容直接当成字符串.

## css样式设置和获取

```javascript
//获取宽(获得的是带px的值)
$("div").css("width");
//设置(值可以是字符串加px,也可以直接是数值不加引号)
$("div").css("width","400px")
$("div").css("width",400);
```

## width与height方法

```javascript
//获取width(得到的值都是数值,不含px)
console.log($("div").width());//width
console.log($("div").innerWidth());//width+padding
console.log($("div").outerWidth());//width+padding+border
console.log($("div").outerWidth(true));//width+padding+border+margin
            
//设置width
$("div").width(400);
$("div").width("400");
$("div").width("400px")

//需要获取页面可视区域的宽度和高度
//当调整浏览器窗口的大小时，发生 resize 事件。
$(window).resize(function(){
    console.log($(window).width());
    console.log($(window).height());

});
```

## scrollTop与scrollLeft方法

设置或者获取垂直滚动条的位置

```javascript
//获取页面被卷曲的高度
$(window).scrollTop();
//获取页面被卷曲的宽度
$(window).scrollLeft();

//当用户滚动指定的元素时，会发生 scroll 事件。
//scroll 事件适用于所有可滚动的元素和 window 对象（浏览器窗口）。
$(window).scroll(function(){
//获取
console.log($(window).scrollTop());
console.log($(window).scrollLeft());
});
```

案例 小火箭返回顶部案例

```javascript
$(".actGotop").click(function(){
//动画到顶部
$("html,body").stop().animate({scrollTop:0},3000);//chrome支持html 不支持body. IE6 7 8 支持body.
//没有过度,直接到顶部
//$(window).scrollTop(0);

//虽然说window对象中没有scrollTop属性,但scrollTop是jq封装好的方法,封装后是可以用的.window对象应该用pageYOffset属性,但pageYOffset属性是只读的,不能设置.
});
```

## offset与position方法

offset方法获取元素距离document的位置，position方法获取的是元素距离有定位的父元素的位置。position不能传参数设置,是只读属性.

```javascript
//offset是一个对象,里面存的是该元素外边界到document的距离(都是数值,没有px单位)
//返回值为对象{left:100,top:100}
console.log($(".son").offset());
//position是该元素外边界到该元素最近的有定位的父元素border内边界的距离(都是数值,没有px单位)
console.log($(".son").position().left);
```

## jQuery事件机制

jQuery对js事件进行了封装,增加并扩展了事件处理机制.

jQuery事件发展历程

简单事件绑定>>bind事件绑定>>delegate事件绑定>>on事件绑定(推荐)

### 简单事件注册:

```
click(handler)     单击事件
mouseenter(handler)  鼠标进入事件
mouseleave(handler)  事件离开事件
```

缺点:不能注册多个事件

### bind方式注册事件

```javascript
//第一个参数:事件类型
//第二个参数:事件处理程序
//多种事件共用一种函数
$("p").bind("click mouseenter", function(){
//事件响应方法
});
//每种事件用各自的函数
$("p").bind({
click:function () {
alert("呵呵")
},
mouseenter:function () {
alert("哈哈")
}
});
```

缺点:不支持动态事件绑定



### delegate委托事件

给父元素注册委托事件,最终还是子元素来执行

```javascript
//第一个参数:selector,事件最终由谁来执行
//第二个参数:事件的类型
//第三个参数:函数,要做什么
$("div").delegate("p", "click", function () {
console.log(this);
//为div下面的所有的p标签绑定事件
//这里面的this是指的子元素p标签,不是指的父元素div标签.
});
```

缺点：只能注册委托事件，因此注册事件需要记得方法太多了

### on注册事件

jQuery1.7之后，jQuery用on统一了所有事件的处理方法。

最现代的方式，兼容zepto(移动端类似jQuery的一个库)，强烈建议使用。

```javascript
// 第一个参数：events，绑定事件的名称可以是由空格分隔的多个事件（标准事件或者自定义事件）
// 第二个参数：selector, 执行事件的后代元素（可选），如果没有后代元素，那么事件将有自己执行。
// 第三个参数：data，传递给处理函数的数据，事件触发的时候通过event.data来使用（不常使用）
// 第四个参数：handler，事件处理函数
$(selector).on(events[,selector][,data],handler);
//div的委托事件,由子元素p执行
//委托事件里面的this是p标签,不是div标签
$("div").on("click", "p", function () {
alert("呵呵")
});

//给自己注册的事件
$("#btn").on("click", function () {
$("<p>我是新建的p元素</p>").appendTo("div");
});
```

## 事件解绑

> unbind方式（不用）

```
$(selector).unbind(); //解绑所有的事件
$(selector).unbind("click"); //解绑指定的事件
```

> undelegate方式（不用）

```
$( selector ).undelegate(); //解绑所有的delegate事件
$( selector).undelegate( “click” ); //解绑所有的click事件
```

> off方式（推荐）

```
// 解绑匹配元素的所有事件
$(selector).off();
// 解绑匹配元素的所有click事件
$(selector).off("click");
```

## 触发事件

```
//1.
$(selector).click(); //触发 click事件
//2.
$(selector).trigger("click");
//1.第一种
$("#btn").click(function(){
$("p").click();
});
//2.第二种,使用trigger方法
$("#btn").on("click", function () {
$("p").trigger("click");//会触发四次是因为有四个p标签
});
```

## jQuery事件对象

jQuery事件对象其实就是js事件对象的一个封装，处理了兼容性。

```
//screenX和screenY	对应屏幕最左上角的值
//clientX和clientY	距离页面左上角的位置（忽视滚动条）
//pageX和pageY	距离页面最顶部的左上角的位置（会计算滚动条的距离）

//event.keyCode	按下的键盘代码
//event.data	存储绑定事件时传递的附加数据

//event.stopPropagation()	阻止事件冒泡行为
//event.preventDefault()	阻止浏览器默认行为
//return false:既能阻止事件冒泡，又能阻止浏览器默认行为。
```

```
例子:
$("a").on("click",function(e){
alert("hehehe");

//看情况来用单独的阻止事件冒泡或者阻止浏览器默认跳转
//阻止浏览器默认跳转
e.preventDefault();
//阻止事件冒泡       cancelBubble=true是专门针对IE的阻止冒泡事件,在jq中不能用,做兼容给了stopPropagation();
e.stopPropagation();
//return false;//既能阻止事件冒泡也能阻止浏览器默认跳转
});

//增加事件冒泡
$("body").on("click",function(){
alert("嘻嘻嘻");
});
```



## 链式编程

> 通常情况下，只有设置操作才能把链式编程延续下去。因为获取操作的时候，会返回获取到的相应的值，无法返回 jQuery对象。

```
end(); // 筛选选择器会改变jQuery对象的DOM对象，想要恢复到上一次的状态，并且返回匹配元素之前的状态。

```
例子:五角星评分案例

```javascript
var wjx_k = "☆";
var wjx_s = "★";
//鼠标移入事件
$(".comment>li").on("mouseenter",function(){
//移入的和移入之前的都变实心
$(this).text(wjx_s).prevAll().text(wjx_s);
//移入的后面的变空心
$(this).nextAll().text(wjx_k);

//$(this).text(wjx_s).prevAll().text(wjx_s)加入移入的是第三个五角星,现在的jq对象变成了前两个五角星的集合了,如果再nextAll()
//的话,会分别求第一个五角星的nextAll()是后四个五角星集合的对象,第二个五角星的nextAll()是后三个五角星集合的对象,加起来是后四个五角星集合的对象.
//并不是最后两个.

//end()可以把jq对象回退到上一个.
//$(this).text(wjx_s).prevAll().text(wjx_s).end().nextAll().text(wjx_k);

});


//鼠标移出事件
$(".comment").on("mouseleave",function(){
//所有的五角星变空心
$("li").children().text(wjx_k);
//找到current,把current属性的li和之前的li都变成实心
$("li.current").text(wjx_s).prevAll().text(wjx_s);

});
//鼠标点击事件,当前点击的li加一个class或者属性,排除其他的class或者属性
$(".comment>li").on("click",function(){
$(this).addClass("current").siblings().removeClass("current");
});
```

## each方法

jQuery的隐式迭代会对所有的DOM对象设置相同的值，但是如果我们需要给每一个对象设置不同的值的时候，就需要自己进行迭代了。

作用：遍历jQuery对象集合，为每个匹配的元素执行一个函数

```
// 参数一表示当前元素在所有匹配元素中的索引号
// 参数二表示当前元素（DOM对象）
$(selector).each(function(index,element){});
```

例子:

```javascript
// var lis = $("li");
// for(var i = 0; i<lis.length; i++){
//     $("li").eq(i).css("opacity",(i+1)/10);
// }

//each方法遍历
$("li").each(function(index,element){
$("li").eq(index).css("opacity",(index+1)/10);
});
```

## 多库共存

```
jQuery使用$作为标示符，但是如果与其他框架中的$冲突时，jQuery可以释放$符的控制权.
```

```
var c = $.noConflict();//释放$的控制权,并且把$的能力给了c
```

例子:

```javascript
//如果引入的jq和别的js库冲突,jq在引入别的库下面,就可以先把$符号释放掉换成别的名字,先使$供别的库使用.
//在jq中的$一直就有一个备胎的名字jQuery,改不改别的名字,jQuery一直都可以使用
//入口函数也可以写成 jQuery(function(){});

//如果引入的jq在别的库上面,那此时的$已经是别的库中的$了.就不能调用noConflict改名或者释放$了.
console.log($);//未改名之前$是jq的
var $$ = $.noConflict();//把jq的$改名为$$
console.log($);//输出此时的$,现在是itcast库的$
```

+

