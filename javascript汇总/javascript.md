# 浏览器模型

## 表单FormData对象

### 概述

FormData类其实是在XMLHttpRequest2级定义的, 它是为序列化表以及创建于表单格式相同的数据(当然是用于XHR传输)提供便利.

### 构造函数

创建一个formData对象实例有几种方式

1. 创建一个空对象 实例

```javascript
var formData = new FormData();
```

此时可以调用append()方法来添加数据.

2. 使用已有的表单来初始化一个对象.

假如现在页面已经有一个表单

```html
<form action="" id="myForm" method="post">
    <input type="text" name="name">名字
    <input type="password" name="psw">密码
    <input type="submit" value="提交">
</form>
```

我们可以使用这个表单元素作为初始化参数, 来实例化一个formData对象

```javascript
// 获取页面已有的一个form表单
let form = document.getElementById('myForm');
// 用表单来初始化
let formData = new FormData(form);
// 我们可以根据name来访问表单中的字段
let name = formData.get("name");// 获取名字
let psw = formData.get("psw");// 获取密码
// 当然也可以在此基础上, 添加其他数据
formData.append("token","asd3gdf");
```

### 操作方法

我们要明确formData里面存储的数据形式, 一对key/value组成一条数据, key是唯一的,一个key可能对应多个value. 如果是使用表单初始化, 每一个表单字段对应一条数据, 它们的HTML name属性即为key值, 它们value属性对应value值.

| key  | value      |
| ---- | ---------- |
| k1   | [v1,v2,v3] |
| k2   | v4         |

1. 获取值

可以通过`get(key)`和`getAll(key)`来获取对应的value.

```javascript
formData.get("name");// 获取key为name的第一个值.
formData.getAll("name");// 返回一个数组, 获取key为name的所有值
```

2. 添加数据

可以通过append(key, value)来添加数据, 如果指定的key不存在则会新增一条数据, 如果key存在, 则添加到数据的末尾

```javascript
formData.append("k1","v1");
formData.append("k1","v2");
formData.append("k1","v1");

formData.get("k1");// "v1"
formData.getAll("k1");// ["v1","v2","v1"]
```

3. 设置修改数据

通过set(key, value)来设置修改数据, 如果指定的key不存在则会新增一条, 如果存在, 则会修改对应的value值

```javascript
formData.append("k1","v1");
formData.set("k1","1");
formData.get("k1");// ["1"]
```

4. 判断是否该数据

可以通过has(key)来判断是否对应的key值

```javascript
formData.append("k1","v1");
formData.append("k2",null);

formData.has("k1");// true
formData.has("k2");// true
formData.has("k3");// false
```

5. 删除数据

通过delete(key), 来删除数据

```javascript
formData.append("k1","v1");
formData.append("k1","v2");
formData.append("k1","v1");
formData.delete("k1");

formData.getAll("k1");// []
```

6. 遍历

通过entries()来获取一个迭代器, 然后遍历所有的数据

```javascript
formData.append("k1","v1");
formData.append("k1","v2");
formData.append("k2","v1");

var i = formData.entries();

i.next(); // {done:false, value:["k1", "v1"]}
i.next(); // {done:fase, value:["k1", "v2"]}
i.next(); // {done:fase, value:["k2", "v1"]}
i.next(); // {done:true, value:undefined}
```

可以看到返回迭代器的规则

- 每调用一次next()返回一条数据, 数据的顺序由添加的顺序决定

- 返回的是一个对象, 当其done属性为true时, 说明已经遍历完所有的数据, 这个也可以作为判断的依据

- 返回的对象的value属性以数组形式存储了一对key/value, 数组下标0为key, 下标1为value, 如果一个key值对应多个value, 会变成多对key/value返回

可以通过values()方法只获取value值

### 发送数据

我们可以通过xhr来发送数据

```javascript
let xhr = new XMLHttpRequest();
xhr.open("post","login");
xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
xhr.send(formData);
```

这种方式可以实现文件的异步上传



### form标签的enctype属性

enctype就是encodetype就是编码类型的意思.

multipart/form-data是指表单数据由多部分构成, 既有文本数据, 又有文件等二进制数据.

application/x-www-form-urlencoded不是不能上传文件, 是只能上传文本格式的文件, multipart/form-data是将文件以二进制的形式上传, 这样可以实现多种类型的文件上传.



enctype属性规定在发送到服务器之前应该如何对表单数据进行编码.

默认地, 表单数据会编码为"application/x-www-form-urlencoded". 就是说, 在发送到服务器之前, 所有字符都会进行编码(空格转换为"+"加号, 特殊符号转换为ASCII HEX值)

| 值                                | 描述                                                       |
| --------------------------------- | ---------------------------------------------------------- |
| application/x-www-form-urlencoded | 在发送前编码所有字符(默认)                                 |
| multipart/form-data               | 不对字符编码. 在使用包含文件上传空间的表单时, 必须使用该值 |
| text/plain                        | 空格转换为"+"加号, 但不对特殊字符编码                      |

例子: 表单数据会在未编码的情况下发送

```html
<form action="form_action.asp" enctype="text/plain">
    <p>First name: <input type="text" name="fname" /></p>
    <p>Last name: <input type="text" name="lname" /></p>
    <input type="submit" value="Submit" />
</form>
```



# webapi

## 获取节点DOM

获取当前节点的父级节点`my$("uu").parentNode`

获取当前节点的父级元素`my$("uu").parentElement`

获取当前节点的子级节点`my$("uu").childNodes`

获取当前节点的子级元素`my$("uu").children`

获取当前节点的第一个子级节点`my$("uu").firstChild`

获取当前节点的第一个子级元素`my$("uu").firstElementChild`

获取当前节点的最后一个子级节点`my$("uu").lastChild`

获取当前节点的最后一个子级元素`my$("uu").lastElementChild`

sibling:兄弟 同胞

获取当前节点的前一个兄弟节点`my$("uu").previousSibling`

获取当前节点的前一个兄弟元素`my$("uu").previousElementSibling`

获取当前节点的后一个兄弟节点`my$("uu").nextSibling`

获取当前节点的后一个兄弟元素`my$("uu").nextElementSibling`

## innerText和textContent

设置标签中的文本内容,应该使用textContent属性,谷歌,火狐支持,IE8不支持

设置标签中的文本内容,应该使用innerText属性,谷歌,火狐,IE8都支持

如果这个属性在浏览器中不支持,那么这个属性的类型是undefined

判断这个属性的类型 是不是undefined,就知道浏览器是否支持

## 三大系列:

在style 标签 中设置的样式属性获取不到

style 属性 中设置的样式属性是可以获取到的

获取元素的样式,下面的方式不可用了

console.log(my$("dv1").style.width);

console.log(my$("dv1").style.height);

以后获取元素的宽和高,应该使用offset系列来获取

### offset系列

父级元素没有脱离文档流:

子级元素的`offsetLeft`或者`offsetTop`=父级元素margin+父级元素padding+父级元素border+自己的margin

父级元素脱离文档流:

子级元素的`offsetLeft`或者`OffsetTop`=自己的left和自己的margin

```javascript
offsetLeft/offsetTop:到左边和上边不算自己的边框

offsetWidth:获取元素的宽度(有边框)

offsetHeight:获取元素的高度(有边框)
```

#### offset系列浅析

1.offsetLeft:HTMLElement.offsetLeft(DOM对象的offsetLeft属性来获取left)是一个只读属性,**返回当前元素左上角相对于HTMLElement.offsetParent节点的左边界偏移的像素值.**
2.offsetWidth指当前元素的宽=border+padding+width;(宽含边框)
offsetHeight指当前元素的高=border+padding+height;(高含边框)

下面重点是offsetLeft和offsetTop的理解

##### 1.只有自己一个元素时

```javascript
加了定位(相对定位,绝对定位)后:
offsetLeft=left+(margin-left);
offsetTop=top+(margin-top);
没加定位后:
offsetLeft=margin-left;
offsetTop=margin-top;

不论是否定位:
offsetWidth指当前元素的宽=border+padding+width;(宽含边框)
offsetHeight指当前元素的高=border+padding+height;(高含边框)

```

##### 2.有父元素和子元素时,求子元素的offsetLeft和offsetTop

```javascript
<style>
    *{
        margin:0 ;
        padding: 0 ;
    }
    #bigdv {
        margin-left: 150px;
        margin-top: 50px;
        padding-left: 17px;
        padding-top: 23px;
        width: 300px;
        height: 300px;
        background-color: green;
        border:30px red solid;
        /*position: absolute;*/
    }
    #dv {
        margin-left: 100px;
        margin-top: 100px;
        padding-left: 13px;
        padding-top: 12px;
        width: 100px;
        height: 100px;
        background-color: pink;
        border:10px red solid;
        /*position: absolute;*/
    }
</style>
<body>
	<div id="bigdv">
		<div id="dv"></div>
	</div>
</body>
```

**分四种情况**

(1).当父元素 **没有** 定位,子元素 **没有** 定位时

包含当前dv元素的不是定位元素,那么offsetLeft或offsetTop是dv盒子外边界相对于根元素内边界的距离.(此时根元素就是body,body可能没有内外边界,暂就这么理解)

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;(有左右border,左padding)

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

(2).当父元素 **有** 定位,子元素 **没有** 定位时

此时dv元素要相对于它的父元素,因为父元素定位了,不再相对于根元素.此时offsetLeft或offsetTop是dv盒子的外边界相对于父元素盒子的border内边界的距离.

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

(3).当父元素 **有** 定位,子元素 **有** 定位时

父元素相对定位还是绝对定位都不会对子元素的offset类有影响.

下面两种是子元素绝对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

```javascript
#dv {
    margin-left: 100px;
    margin-top: 100px;
    padding-left: 13px;
    padding-top: 12px;
    width: 100px;
    height: 100px;
    background-color: pink;
    border:10px red solid;
    position: absolute;
    left: 10px;
    top:10px;
}
```

子元素先定位,没有设置left的时候,父元素的padding-left还会有效果,(因为此时的left有一个默认值,默认值不是0,其实默认值就是padding-left的值).如果加了left:10,那么padding-left会失效,因为定位开始了,以left优先.top同理.

子元素#dv的:

offsetLeft=dv.left+dv.(margin-left)=10+100=110;

offsetTop=dv.top+dv.(margin-top)=10+100=110;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

下面两种是子元素相对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.(margin-left)=17+100=117;

offsetTop=bigdv.(padding-top)+dv.(margin-top)=23+100=123;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=bigdv.(padding-left)+dv.left+dv.(margin-left)=17+10+100=127;

offsetTop=bigdv.(padding-top)+dv.top+dv.(margin-top)=23+10+100=133;

offsetWidth=dv.border+dv.padding+dv.width=133;

offsetHeight=dv.border+dv.padding+dv.height=132;

(4).当父元素 **没有** 定位,子元素 **有** 定位时

下面两种是子元素绝对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=dv.left+dv.(margin-left)=10+100=110;

offsetTop=dv.top+dv.(margin-top)=10+100=110;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

下面两种是子元素相对定位的情况

**第一种情况:子元素dv没有设置left和top值.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.(margin-left)=150+30+17+100=297;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.(margin-top)=50+30+23+100=203;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

**第二种情况:子元素dv设置了left:10,top:10.**

子元素#dv的:

offsetLeft=bigdv.(margin-left)+bigdv.(border-left)+bigdv.(padding-left)+dv.left+dv.(margin-left)=150+30+17+10+100=307;

offsetTop=bigdv.(margin-top)+bigdv.(border-top)+bigdv.(padding-top)+dv.top+dv.(margin-top)=50+30+23+10+100=213;

offsetWidth=dv.border+dv.padding+dv.width=20+13+100=133;

offsetHeight=dv.border+dv.padding+dv.height=20+12+100=132;

### scroll系列:卷曲

```javascript
scrollLeft:元素向左卷曲出去的距离
scrollTop:元素向上卷曲出去的距离
scrollWidth:元素中内容的实际的宽度,如果没有内容,或者内容很少,元素的宽度
scrollHeight:元素中内容的实际的高度,如果没有内容,或者内容很少,元素的高度
//时时的获取向上卷曲出去的距离的值

//div的滚动事件
my$("dv").onscroll=function () {
console.log(this.scrollTop);
};

```

#### getScroll兼容代码

body、html、window的关系

window不能用scrollLeft(没有这个属性),用pageYOffset.而且pageYOffset属性是只读的,只能获取,不能设置.
`documentElement`就是html

`documentElement`和`body`有scrollLeft这个属性.

IE6 7 8需要用`documentElement`

谷歌需要用`body`

```javascript
function getScroll(){
    return {
        left:window.pageYOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    }
}
```

### client系列

`clientWidth`:可视区域的宽度,没有边框

`clientHeight`:可视区域的高度,没有边框

`clientLeft`:左边框的宽度

`clientTop`:上边框的宽度

`clientX`:可视区域的横坐标

`clientY`:可视区域的纵坐标

# 标准库

## ES6

> ES6的模块自动采用严格模式, 不管你有没有在模块头部加上"use strict";

严格模式主要有以下限制:

- 变量必须声明后再使用
- 函数的参数不能有同名属性, 否则报错
- 不能使用with语句
- 不能对只读属性赋值, 否则报错

例如: 字符串中的length修改是不会改变字符串的

- 不能使用前缀0表示八进制数, 否则报错
- 不能删除不可删除的属性, 否则报错
- 不能删除变量delete prop, 会报错, 只能删除属性delete global[prop]
- eval不会在它的外层作用域引入变量
- eval和arguments不能被重新赋值
- arguments不会自动反应函数参数的变化
- 不能使用arguments.callee
- 不能使用argument.callee.caller
- 禁止this指向全局对象
- 不能使用fn.caller和fn.arguments获取函数调用的堆栈
- 增加了保留字(比如protected  static  interface)

## Array

### 数组遍历方法

- forEach

```javascript
arr = [1,2,3];
arr.forEach(function(item) {
    console.log(item);
})
```



- map
- find
- findIndex
- filter
只留下数字的数组

```javascript
let ary = [1,2,'a',1,2];
let ary1 = ary.filter((item,index)=>{
    return typeof item == "number";
});
console.log(ary1);
```
- some

只要有一个符合, 结果就是true

```javascript
let ary = [1,2,'a',1,2];
let result = ary.some((item)=>{
    return typeof item == "string"
});
console.log(result);
//=> true
```



- every

只要有一个不符合, 结果就是false

```javascript
let ary = [1,2,'a',1,2];
let result = ary.every((item)=>{
    return typeof item == "string"
});
console.log(result);
//=> false
```



- reduce

默认从左边开始   迭代

```javascript
let arr1 = [1,2,3,4,5,6];
console.log(arr1.reduce(prev,item)=>{
    return prev + item;
});
// prev    item     prev+item
//  1       2       1+2
//  1+2     3       1+2+3
//.....

```



- reduceRight

默认从右边开始

```javascript
let arr1 = [1,2,3,4,5,6];
console.log(arr1.reduceRight(prev,item)=>{
    return prev + item;
});
```



### 数组空位

数组的项中没有值, 就表示空位.

undefied和null是不是空位, [undefined, null]没有空位

arr = [,1,, 5,]

```javascript
let arr = [,1,,5,];
// 用in可以查看对象中是否有该属性, 对于数组来说它的索引可以直接查看该位置是否有值
console.log(0 in arr);//=> false
console.log(1 in arr);//=> true

arr.forEach((item)=>{
	console.log(item);
})
//=> 1 5

arr.find((item)=>{
    console.log(item);
})
//=> undefined 1 undefined 5
```

浏览器也可以显示出空位

![1553308650534](media/1553308650534.png)

### 数组方法

#### concat()

> `concat()` 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。

- 语法:

`var new_array = old_array.concat(value1[, value2[, ...[, valueN]]])`

参数:

valueN: (可选) 将数组和/或值连接成新数组

返回值:

新的Array数组

- 例子:

1.

```javascript
var array1 = ['a', 'b', 'c'];
var array2 = ['d', 'e', 'f'];

console.log(array1.concat(array2));
//=> ["a", "b", "c", "d", "e", "f"]
```

2.

```javascript
var alpha = ['a', 'b', 'c'];
var numeric = [1, 2, 3];

let arr = alpha.concat(numeric);
console.log(arr);
//=> ['a', 'b', 'c', 1, 2, 3]
```

#### copyWithin() 原数组被改

> `copyWithin()` 方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。

- 语法:

`arr.copyWithin(target[, start[, end]])`

参数:

target: 

0为基底的索引, 赋值序列到该位置. 如果是负数, target将从末尾开始计算.

如果target大于等于arr.length, 将不会发生拷贝. 如果target在start之后, 赋值的序列将被修改以符合arr.length.

start: (可选)

0为基底的索引, 开始赋值元素的起始位置. 如果是负数, start将从末尾开始计算.

如果start被忽略, copyWithin将会从0开始赋值.

end: (可选)

0为基底的索引, 开始复制元素的结束位置. copyWithin将会拷贝到该位置, 但不包括end这个位置的元素. 如果是负数, end将从末尾开始计算.

如果end被忽略, copyWithin方法将会一直复制到数组结尾(默认为arr.length).

返回值:

改变后的数组

- 描述:

参数 target、start 和 end 必须为整数。

如果 start 为负，则其指定的索引位置等同于 length+start，length 为数组的长度。end 也是如此。

copyWithin 方法不要求其 this 值必须是一个数组对象；除此之外，copyWithin 是一个可变方法，它可以改变 this 对象本身，并且返回它，而不仅仅是它的拷贝。

- 例子:

1.start无, end无

```javascript
ary = ['a','b','c','d'];
console.log(ary.copyWithin(1));
//=> ["a", "a", "b", "c"]
```

2.start为正, end无

```javascript
ary = ['a','b','c','d'];
console.log(ary.copyWithin(0,2))
//=> ["c", "d", "c", "d"]
```

3.start为负, end无

```javascript
ary = ['a','b','c','d'];
console.log(ary.copyWithin(0,-2));
//=> ["c", "d", "c", "d"]
```

4.start为正, end为正

```javascript
ary = ['a','b','c','d'];
console.log(ary.copyWithin(0,3,4));
//=> ["d", "b", "c", "d"]
```

5.start为正, end为负

```javascript
ary = ['a','b','c','d'];
console.log(ary.copyWithin(0,2,-1));
//=> ["c", "b", "c", "d"]
```

6.

```javascript
var array1 = ['a', 'b', 'c', 'd', 'e'];
console.log(array1.copyWithin(0, 3, 4));
//=> ["d", "b", "c", "d", "e"]
console.log(array1.copyWithin(1, 3));
//=> ["d", "d", "e", "d", "e"]
```

7.

```javascript
[].copyWithin.call({length: 5, 3: 1}, 0, 3);
//=> {0: 1, 3: 1, length: 5}
// 解释

({0:undefined,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5}).copyWithin(0,3,5);
//结果为：
{0:1,1:undefined,2:undefined,3: 1,4:undefined,5:undefined,length: 5};
//也就是
{0:1,3:1,length:5}
```

#### entries()

> `entries()` 方法返回一个新的**Array Iterator**对象，该对象包含数组中每个索引的键/值对。

- 语法:

`arr.entries()`

返回值:

一个新的Array迭代器对象. Array Iterator是对象, 它的原型(\_\_proto\_\_:Array Iterator)上有一个next方法, 可用于遍历迭代器取得原数组的[key, value].

- 例子

1.

```javascript
var array1 = ['a', 'b', 'c'];
var iterator1 = array1.entries();
console.log(iterator1.next().value);
//=> Array [0, "a"]
console.log(iterator1.next().value);
//=> Array [1, "b"]
```

2.Array Iterator

```javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
console.log(iterator);

/*Array Iterator {}
	__proto__:Array Iterator
         next:ƒ next()
         Symbol(Symbol.toStringTag):"Array Iterator"
         __proto__:Object
*/
```

3.iterator.next()

```javascript
// iterator.next()返回一个对象，对于有元素的数组，
// 是next{ value: Array(2), done: false }；
// next.done 用于指示迭代器是否完成：在每次迭代时进行更新而且都是false，
// 直到迭代器结束done才是true。
// next.value是一个["key":"value"]的数组，是返回的迭代器中的元素值。
var arr = ["a", "b", "c"]; 
var iterator = arr.entries();
console.log(iterator.next());
/*
{value: Array(2), done: false}
	done:false
    value:(2) [0, "a"]
    __proto__: Object
*/
console.log(iterator.next());
/*
{value: Array(2), done: false}
	done: false
	value: Array(2)
		0: 1
		1: "b"
		length: 2
		__proto__: Array(0)
	__proto__: Object
*/
console.log(iterator.next());
/*
{value: Array(2), done: false}
	done: false
	value: Array(2)
		0: 2
		1: "c"
		length: 2
		__proto__: Array(0)
	__proto__: Object
*/
console.log(iterator.next());
/*
{value: undefined, done: true}
	done: true
	value: undefined
	__proto__: Object
*/

```

4.iterator.next方法运行

```javascript
var arr = ["a", "b", "c"];
var iter = arr.entries();
var a = [];

// for(var i=0; i< arr.length; i++){   // 实际使用的是这个 
for(var i=0; i< arr.length+1; i++){    // 注意，是length+1，比数组的长度大
    var tem = iter.next();             // 每次迭代时更新next
    console.log(tem.done);             // 这里可以看到更新后的done都是false
    if(tem.done !== true){             // 遍历迭代器结束done才是true
        console.log(tem.value);
        a[i]=tem.value;
    }
}
    
console.log(a);                         // 遍历完毕，输出next.value的数组
```

#### every()

> `every()` 方法测试数组的所有元素是否都通过了指定函数的测试。

- 语法

`arr.every(callback[, thisArg])`

参数:

callback: 用来测试每个元素的函数.

thisArg: 执行callback时使用的this值.

- 描述

`every` 方法为数组中的每个元素执行一次 `callback` 函数，直到它找到一个使 `callback` 返回 *false*（表示可转换为布尔值 false 的值）的元素。如果发现了一个这样的元素，`every` 方法将会立即返回 `false`。否则，`callback` 为每一个元素返回 `true`，`every` 就会返回 `true`。`callback` 只会为那些已经被赋值的索引调用。不会为那些被删除或从来没被赋值的索引调用。

`callback` 被调用时传入三个参数：元素值，元素的索引，原数组。

如果为 `every` 提供一个 `thisArg` 参数，则该参数为调用 `callback` 时的 `this` 值。如果省略该参数，则 `callback` 被调用时的 `this` 值，在非严格模式下为全局对象，在严格模式下传入 `undefined`。

`every` 不会改变原数组。

`every` 遍历的元素范围在第一次调用 `callback` 之前就已确定了。在调用 `every` 之后添加到数组中的元素不会被 `callback` 访问到。如果数组中存在的元素被更改，则他们传入 `callback`的值是 `every` 访问到他们那一刻的值。那些被删除的元素或从来未被赋值的元素将不会被访问到。

`every` 和数学中的"所有"类似，当所有的元素都符合条件才返回true。另外，空数组也是返回true。(空数组中所有元素都符合给定的条件，注：因为空数组没有元素)。

- 例子:

1.

```javascript
function isBelowThreshold(currentValue) {
  return currentValue < 40;
}

var array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
//=> true
```

2.下列检测数组中的所有元素是否都大于 10。

```javascript
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [12, 5, 8, 130, 44].every(isBigEnough);
//=> false
passed = [12, 54, 18, 130, 44].every(isBigEnough);
//=> true
```

#### fill()原数组被改

> `fill()` 方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

- 语法:

`arr.fill(value[, start[, end]])`

参数:

value:用来填充数组元素的值.

start: (可选)起始索引, 默认值为0.

end: (可选)终止索引, 默认值为this.length.

返回值:

修改后的数组.

- 描述

**fill** 方法接受三个参数 `value`, `start` 以及 `end`. `start` 和 `end` 参数是可选的, 其默认值分别为 `0` 和 `this` 对象的 `length `属性值。

如果 `start` 是个负数, 则开始索引会被自动计算成为 `length+start`, 其中 `length` 是 `this` 对象的 `length `属性值。如果 `end` 是个负数, 则结束索引会被自动计算成为 `length+end`。

`fill` 方法故意被设计成通用方法, 该方法不要求 `this` 是数组对象。

`fill` 方法是个可变方法, 它会改变调用它的 `this` 对象本身, 然后返回它, 而并不是返回一个副本。

当一个对象被传递给 **fill**方法的时候, 填充数组的是这个对象的引用。

- 例子

1.

```javascript
var array1 = [1, 2, 3, 4];
console.log(array1.fill(0, 2, 4));
//=> [1, 2, 0, 0]
console.log(array1.fill(5, 1));
//=> [1, 5, 5, 5]
console.log(array1.fill(6));
//=> [6, 6, 6, 6]
```

2.

```javascript
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}


// 当一个对象被传递给fill方法的时候, 填充数组的是这个对象的引用。所有数组元素中的元素指向同一引用,请注意.
var arr = Array(3).fill({}) // [{}, {}, {}];
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
```

#### filter()

> `filter()`方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。 

- 语法:

`var newArray = arr.filter(callback(element[, index[, array]])[, thisArg])`

参数:

callback:用来测试数组的每个元素的函数.返回true表示该元素通过测试, 保留该元素, false则不保留. 它接受以下三个参数:

​	element: 数组中当前正在处理的元素.

​	index: (可选)正在处理的元素在数组中的索引.

​	array: (可选)调用了filter的数组本身.

thisArg: (可选)执行callback, 用于this的值.

返回值:

一个新的、由通过测试的元素组成的数组，如果没有任何数组元素通过测试，则返回空数组。

- 描述

`filter` 为数组中的每个元素调用一次 `callback` 函数，并利用所有使得 `callback` 返回 true 或[等价于 true 的值]的元素创建一个新数组。`callback` 只会在已经赋值的索引上被调用，对于那些已经被删除或者从未被赋值的索引不会被调用。那些没有通过 `callback` 测试的元素会被跳过，不会被包含在新数组中。

`callback` 被调用时传入三个参数：

1. 元素的值
2. 元素的索引
3. 被遍历的数组本身

如果为 `filter` 提供一个 `thisArg` 参数，则它会被作为 `callback` 被调用时的 `this` 值。否则，`callback` 的 `this` 值在非严格模式下将是全局对象，严格模式下为 `undefined`。`callback` 函数最终观察到的 `this` 值是根据[通常函数所看到的 "this"的规则]确定的。

`filter` 不会改变原数组，它返回过滤后的新数组。

`filter` 遍历的元素范围在第一次调用 `callback` 之前就已经确定了。在调用 `filter` 之后被添加到数组中的元素不会被 `filter` 遍历到。如果已经存在的元素被改变了，则他们传入 `callback` 的值是 `filter` 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

- 例子

1.

```javascript
var words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);
// ES6箭头函数函数体没有{},是一种简写, 省略了return. 如: word=> word.length其实是 word=>{return word.length}
console.log(result);
//=> ["exuberant", "destruction", "present"]

```

2.

```javascript
let ary = [22,33,44,55];
let ary1 = ary.filter(function (el){
    return el>33;
})
console.log(ary1);
//=> [44,55]
```



3.在数组中搜索

```javascript
// ES6实现
const fruits = ['apple', 'banana', 'grapes', 'mango', 'orange'];

const filterItems = (query) => {
  return fruits.filter((el) =>
    el.toLowerCase().indexOf(query.toLowerCase()) > -1
  );
}

console.log(filterItems('ap')); // ['apple', 'grapes']
console.log(filterItems('an')); // ['banana', 'mango', 'orange']
```



#### forEach()

> `forEach()` 方法对数组的每个元素执行一次提供的函数。

- 语法: 

`arr.forEach(callback[, thisArg]);`

参数:

callback: 为数组中每一个元素执行的函数, 该函数接收三个参数

​	currentValue: 数组中正在处理的当前元素

​	index: (可选) 数组中正在处理的当前元素的索引

​	array: (可选) 方法正在操作的数组

thisAry: (可选) 可选参数. 当执行回调函数时用作`this`的值(参考对象)

返回值:

undefined

- 例子:

1.

```javascript
var array1 = ['a', 'b', 'c'];

array1.forEach(function(element) {
  console.log(element);
});

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

2.for循环转换为forEach

```javascript
const items = ['item1', 'item2', 'item3'];
const copy = [];

// before
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

// after
items.forEach(function(item){
  copy.push(item);
});
```



#### find()

>  `find()` 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回undefined

- 语法: 

`arr.find(callback[, thisArg])`

参数: 

callback 在数组每一项上执行的函数, 接收3个参数

​	element 当前遍历到的元素

​	index (可选)当前遍历到的索引

​	array (可选)数组本身

thisAry (可选)执行回调时用作this的对象

返回值:

返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined

- 例子:

```javascript
var array1 = [5, 12, 8, 130, 44];

var found = array1.find(function(element) {
  return element > 10;
});

console.log(found);//=> 12
```

```javascript
var inventory = [
    {name: 'apples', quantity: 2},
    {name: 'bananas', quantity: 0},
    {name: 'cherries', quantity: 5}
];

function findCherries(fruit) { 
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
```

#### push()原数组被改

> `push()` 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

- 语法

`arr.push(element1, ..., elementN)`

参数:

elementN: 被添加到数组末尾的元素.

返回值:

当调用该方法时, 新的length属性值将被返回.

- 描述

push方法将值追加到数组中。

`push` 方法有意具有通用性。该方法和 [`call()`] 或 [`apply()`]一起使用时，可应用在类似数组的对象上。`push` 方法根据 `length` 属性来决定从哪里开始插入给定的值。如果 `length` 不能被转成一个数值，则插入的元素索引为 0，包括 `length` 不存在时。当 `length` 不存在时，将会创建它。

唯一的原生类数组（array-like）对象是 [`Strings`]，尽管如此，它们并不适用该方法，因为字符串是不可改变的。

- 例子

1.下面的代码创建了 `sports` 数组，包含两个元素，然后又把两个元素添加给它。`total` 变量为数组的新长度值。

```javascript
var sports = ["soccer", "baseball"];
var total = sports.push("football", "swimming");

console.log(sports); 
// ["soccer", "baseball", "football", "swimming"]

console.log(total);  
// 4
```

2.该示例使用 [`apply()`] 添加第二个数组的所有元素。

注意当第二个数组(如示例中的moreVegs)太大时不要使用这个方法来合并数组，因为事实上一个函数能够接受的参数个数是有限制的。具体可以参考 [`apply()`]。

```javascript
var vegetables = ['parsnip', 'potato'];
var moreVegs = ['celery', 'beetroot'];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables); 
// ['parsnip', 'potato', 'celery', 'beetroot']
```

3.不能直接在原数组后面追加数组, 原数组后面只能追加元素. 否则用Array.prototype.push(arr1,arr2)

```javascript
arr = ['a','b','c'];
arr2 = ['d','e'];
console.log(arr.push(arr2));
//=> ["a", "b", "c", ['d','e']]
```

#### shift原数组被改

> `shift()` 方法从数组中**删除**第一个元素，并返回该元素的值。此方法更改数组的长度。

- 语法

`arr.shift()`

返回值:

返回从数组中删除的元素; 

如果数组为空则返回`undefined` 。 

- 描述

`shift` 方法移除索引为 0 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 1。如果 [`length`]属性的值为 0 (长度为 0)，则返回 [`undefined`]。

`shift` 方法并不局限于数组：这个方法能够通过 [`call`]或 [`apply`]方法作用于类似数组的对象上。但是对于没有 length 属性（从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

- 例子

1.移除数组中的一个元素

```javascript
let myFish = ['angel', 'clown', 'mandarin', 'surgeon'];

console.log('调用 shift 之前: ' + myFish);
// "调用 shift 之前: angel,clown,mandarin,surgeon"

var shifted = myFish.shift(); 

console.log('调用 shift 之后: ' + myFish); 
// "调用 shift 之后: clown,mandarin,surgeon" 

console.log('被删除的元素: ' + shifted); 
// "被删除的元素: angel"
```

2.

```javascript
var array1 = [1, 2, 3];

var firstElement = array1.shift();

console.log(array1);
//=> [2, 3]

console.log(firstElement);
//=> 1

```

#### unshift原数组被改

> **unshift()** 方法将一个或多个元素添加到数组的开头，并返回该数组的新长度。

- 语法

`arr.unshift(element1, ..., elementN)`

参数:

elementN: 要添加到数组开头的元素。

返回值:

当一个对象调用该方法时，返回其 `length`属性值。

- 描述

`unshift` 方法会在调用它的类数组对象的开始位置插入给定的参数。

`unshift` 特意被设计成具有通用性；这个方法能够通过 `call`或 `apply` 方法作用于类数组对象上。不过对于没有 length 属性（代表从0开始的一系列连续的数字属性的最后一个）的对象，调用该方法可能没有任何意义。

- 例子

1.

```javascript
var array1 = [1, 2, 3];

var result = array1.unshift(4, 5);
console.log(result);
//=> 5

console.log(array1);
//=> [4, 5, 1, 2, 3]
```

2.

```javascript
var arr = [1, 2];
console.log(arr.unshift(0));
//=> 3
//arr is [0, 1, 2]

console.log(arr.unshift(-2, -1));
//=> 5
//arr is [-2, -1, 0, 1, 2]

console.log(arr.unshift( [-3] ));
//=> 6
//arr is [[-3], -2, -1, 0, 1, 2]
```

#### splice()原数组被改

> `splice()` 方法通过删除或替换现有元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组。

- 语法

`array.splice(start[, deleteCount[, item1[, item2[, ...]]]])`

参数:

start: 指定修改的开始位置（从0计数）。如果超出了数组的长度，则从数组末尾开始添加内容；如果是负值，则表示从数组末位开始的第几位（从-1计数）；如果负数的绝对值大于数组的长度，则表示开始位置为第0位。

deleteCount: (可选)

整数，表示要移除的数组元素的个数。

如果 `deleteCount` 大于 `start` 之后的元素的总数，则从 `start` 后面的元素都将被删除（含第 `start` 位）。

如果 `deleteCount` 被省略，则其相当于 `array.length - start`。

如果 `deleteCount` 是 0 或者负数，则不移除元素。这种情况下，至少应添加一个新元素。

item1,item2,...: (可选) 要添加进数组的元素,从`start` 位置开始。如果不指定，则 `splice()` 将只删除数组元素。

返回值:

由被删除的元素组成的一个数组。如果只删除了一个元素，则返回只包含一个元素的数组。如果没有删除元素，则返回空数组

- 描述

如果添加进数组的元素个数不等于被删除的元素个数，数组的长度会发生相应的改变。

- 例子

1.从第 2 位开始删除 0 个元素，插入“drum”

```javascript
var myFish = ["angel", "clown", "mandarin", "surgeon"];
var removed = myFish.splice(2, 0, "drum");
console.log(removed);
//=> []
console.log(myFish);
//=> ["angel", "clown", "drum", "mandarin", "surgeon"]
```

2.从第 3 位开始删除 1 个元素

```javascript
var myFish = ['angel', 'clown', 'drum', 'mandarin', 'sturgeon'];
var removed = myFish.splice(3, 1);
console.log(removed);
//=> []
console.log(myFish);
//=> ["angel", "clown", "drum", "sturgeon"]
```

#### sort()原数组被改

> `sort()` 方法用[原地算法]对数组的元素进行排序，并返回数组。排序算法现在是[稳定的]。默认排序顺序是根据字符串Unicode码点。
>
> 由于它取决于具体实现，因此无法保证排序的时间和空间复杂性。

- 语法

`arr.sort([compareFunction])`

参数:

compareFunction: (可选) 用来指定按某种顺序进行排列的函数. 如果省略, 元素按照转换为的字符串的各个字符的Unicode位点进行排序

​	firstE1: 第一个用于比较的元素

​	secondE1: 第二个用于比较的元素

返回值: 

排序后的数组. 请注意, 数组已原地排序, 并且不进行复制.

- 描述

如果没有指明 `compareFunction` ，那么元素会按照转换为的字符串的诸个字符的Unicode位点进行排序。例如 "Banana" 会被排列到 "cherry" 之前。当数字按由小到大排序时，9 出现在 80 之前，但因为（没有指明 `compareFunction`），比较的数字会先被转换为字符串，所以在Unicode顺序上 "80" 要比 "9" 要靠前。

如果指明了 `compareFunction` ，那么数组会按照调用该函数的返回值排序。即 a 和 b 是两个将要被比较的元素：

​	如果 `compareFunction(a, b)` 小于 0 ，那么 a 会被排列到 b 之前；

​	如果 `compareFunction(a, b)` 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；

​	如果 `compareFunction(a, b)` 大于 0 ， b 会被排列到 a 之前。

​	`compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。

所以，比较函数格式如下：

```js
function compare(a, b) {
  if (a < b ) {           // 按某种排序标准进行比较, a 小于 b
    return -1;
  }
  if (a > b ) {
    return 1;
  }
  // a must be equal to b
  return 0;
}
```

要比较数字而非字符串，比较函数可以简单的以 a 减 b，如下的函数将会将数组升序排列

```js
function compareNumbers(a, b) {
  return a - b;
}
```

`sort` 方法可以使用 [函数表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/function) 方便地书写：

```js
var numbers = [4, 2, 5, 1, 3];
numbers.sort(function(a, b) {
  return a - b;
});
console.log(numbers);

也可以写成：
var numbers = [4, 2, 5, 1, 3]; 
numbers.sort((a, b) => a - b); 
console.log(numbers);

// [1, 2, 3, 4, 5]
```

对象可以按照某个属性排序：

```js
var items = [
  { name: 'Edward', value: 21 },
  { name: 'Sharpe', value: 37 },
  { name: 'And', value: 45 },
  { name: 'The', value: -12 },
  { name: 'Magnetic' },
  { name: 'Zeros', value: 37 }
];

// sort by value
items.sort(function (a, b) {
  return (a.value - b.value)
});

// sort by name
items.sort(function(a, b) {
  var nameA = a.name.toUpperCase(); // ignore upper and lowercase
  var nameB = b.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});
```

- 例子

1.如果省略参数，元素按照转换为的字符串的各个字符的Unicode位点进行排序。

```javascript
var months = ['March', 'Jan', 'Feb', 'Dec'];
months.sort();
console.log(months);
//=> ["Dec", "Feb", "Jan", "March"]

var array1 = [1, 30, 4, 21, 100000];
array1.sort();
console.log(array1);
//=> [1, 100000, 21, 30, 4]

```

2.

```javascript
let arr = [88,66,3,5,4];
let bb = arr.sort(function (a,b){
    return a-b;
})
console.log(bb);
//=> [3,4,5,66,88]
console.log(arr);
//=> [3,4,5,66,88]
```

#### pop()原数组被改

> `pop()`方法从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度。

- 语法:

`arr.pop()`

返回值:从数组中删除的元素(当数组为空时返回undefined)

- 描述

`pop` 方法从一个数组中删除并返回最后一个元素。

`pop` 方法有意具有通用性。该方法和 `call()`或 `apply()` 一起使用时，可应用在类似数组的对象上。`pop`方法根据 `length`属性来确定最后一个元素的位置。如果不包含`length`属性或`length`属性不能被转成一个数值，会将`length`置为0，并返回`undefined`。

如果你在一个空数组上调用 pop()，它返回  `undefined`。

- 例子

1.

```javascript
let myFish = ["angel", "clown", "mandarin", "surgeon"];

let popped = myFish.pop();

console.log(myFish); 
//=> ["angel", "clown", "mandarin"]

console.log(popped); 
//=> surgeon
```

#### slice()

> `slice()` 方法返回一个新的数组对象，这一对象是一个由 `begin`和 `end`（不包括`end`）决定的原数组的**浅拷贝**。原始数组不会被改变。

- 语法:

`arr.slice(begin, end);`

参数:

begin: (可选)

从该索引处开始提取原数组中的元素（从0开始）。

如果该参数为负数，`则表示从原数组中的倒数第几个元素开始提取，``slice(-2)`表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）。

如果省略 `begin`，则 `slice` 从索引 0 开始。

end: (可选)

在该索引处结束提取原数组元素（从0开始）。`slice`会提取原数组中索引从 `begin` 到 `end `的所有元素（包含begin，但不包含end）。

`slice(1,4)` 提取原数组中的第二个元素开始直到第四个元素的所有元素 （索引为 1, 2, 3的元素）。

如果该参数为负数， `则它表示在原数组中的倒数第几个元素结束抽取`。 `slice(-2,-1)`表示抽取了原数组中的倒数第二个元素到最后一个元素（不包含最后一个元素，也就是只有倒数第二个元素）。

如果 `end` 被省略，`则slice` 会一直提取到原数组末尾。

如果 `end 大于数组长度，slice 也会一直提取到原数组末尾。`

返回值:

一个含有提取元素的新数组

- 描述

`slice` 不修改原数组，只会返回一个浅复制了原数组中的元素的一个新数组。原数组的元素会按照下述规则拷贝：

- 如果该元素是个对象引用 （不是实际的对象），`slice` 会拷贝这个对象引用到新的数组里。两个对象引用都引用了同一个对象。如果被引用的对象发生改变，则新的和原来的数组中的这个元素也会发生改变。

- 对于字符串、数字及布尔值来说（不是 `String`、`Number` 或者 `Boolean` 对象），`slice` 会拷贝这些值到新的数组里。在别的数组里修改这些字符串或数字或是布尔值，将不会影响另一个数组。

如果向两个数组任一中添加了新元素，则另一个不会受到影响。

- 例子

1.

```javascript
var animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];
var result1 = animals.slice(2);
console.log(result1);
//=> ["camel", "duck", "elephant"]
console.log(animals);
//=> ['ant', 'bison', 'camel', 'duck', 'elephant'];

var result2 = animals.slice(2, 4)
console.log(result2);
//=> ["camel", "duck"]
console.log(animals);
//=> ['ant', 'bison', 'camel', 'duck', 'elephant'];

var result3 = animals.slice(1, 5)
console.log(result3);
//=> ["bison", "camel", "duck", "elephant"]
console.log(animals);
//=> ['ant', 'bison', 'camel', 'duck', 'elephant'];
```

#### map()

> `map()` 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

- 语法

`arr.map(callback(currentValue[, index[, array]]){}[,thisArg])`

参数:

callback:生成新数组元素的函数，使用三个参数：

​	currentValue: callback 数组中正在处理的当前元素。

​	index: (可选) callback 数组中正在处理的当前元素的索引。

​	array: (可选) callback  map 方法被调用的数组。

thisArg: (可选)执行 callback 函数时使用的this 值。

返回值:

一个新数组, 每个元素都是回调函数的结果.

- 描述

`map` 方法会给原数组中的每个元素都按顺序调用一次  `callback` 函数。`callback` 每次执行后的返回值（包括 `undefined`）组合起来形成一个新数组。 `callback` 函数只会在有值的索引上被调用；那些从来没被赋过值或者使用 `delete` 删除的索引则不会被调用。

`callback` 函数会被自动传入三个参数：数组元素，元素索引，原数组本身。

如果 `thisArg` 参数有值，则每次 `callback` 函数被调用的时候，`this` 都会指向 `thisArg` 参数上的这个对象。如果省略了 `thisArg ``参数,``或者赋值为 null` 或 `undefined`，则 this 指向全局对象 。

`map `不修改调用它的原数组本身（当然可以在 `callback` 执行时改变原数组）。

使用 map 方法处理数组时，数组元素的范围是在 callback 方法第一次调用之前就已经确定了。在 map 方法执行的过程中：原数组中新增加的元素将不会被 callback 访问到；若已经存在的元素被改变或删除了，则它们的传递到 callback 的值是 map 方法遍历到它们的那一时刻的值；而被删除的元素将不会被访问到。

- 例子

1.求数组中每个元素的平方根

```javascript
var numbers = [1, 4, 9];
var roots = numbers.map(Math.sqrt);
console.log(roots);
//=> [1, 2, 3]
console.log(numbers);
//=> [1, 4, 9]
```

2.

```javascript
var array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);

console.log(map1);
//=> [2, 8, 18, 32]
console.log(array1);
//=> [1, 4, 9, 16]
```

## set和map

set和map是新的数据类型

set和数组类似 就是类数组

map和对象类似



```javascript
let set = new Set([1,1,NaN,"aa","aa",true,undefined])
console.log(set)
//=> 类数组
```

![1553440505355](media/1553440505355.png)

Set会自动去重, 会把相同的项删除掉, 复杂数据类型会拿地址比较, 两个NaN虽然普通比较会不相等.但是Set用了Object.is()方法, 此时NaN是相等的.

```javascript
let arr=[NaN,NaN,1,1,12,3,12,32];
console.log([...new Set(arr)]);
//=> [NaN, 1, 12, 3, 32]

console.log(Object.is(NaN,NaN));//=> true
```

set对象的方法

### add()

## ES6的模块导入与导出

### export

export后必须跟语句，如声明、for、if等都是语句，export不能导出匿名函数，也不能导出某个已经声明的变量，如：

```javascript
export const bar = function (){}; // 合法
export bar; // 非法
export 1; // 非法
export function foo () {}; // 合法，后跟的是声明语句
export { foo }; // 合法，后面跟的{}理解为语句，就像if后面的{}一样
export { foo as bar}; // 合法
export { foo: foo }; // 非法，后面的{}被解析成对象
```

### export default

export default在整个模块中只能出现一次，后只能是具体的值，如1,2,3,再比如一个函数声明（非表达式），或者是一个类声明（与函数声明一个意思），或者匿名函数，只要是能用变量接收的都可以

```javascript
export default 1; //合法
export default function foo() {}; // 合法，因为function foo()能被变量接收， 如 var bar = function () {}
export default const bar = 1; // 非法，因为var a = const bar = 1;是不合法的
export default { foo }; // 合法，{}被理解为一个对象
export default { foo: foo } // 合法
```

导出语句只能出现在模块的顶级作用域中，不能被其他语句包括

### import

```javascript
import {x,y} from './test.js';
import * as some from './test.js'; // 命名空间导入
import './test.js';
import {default as test} from './test.js';
```

### 导入再导出

```javascript
export {some} from './test.js'
export * form './test.js'
```