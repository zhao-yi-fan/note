> JavaScript中如何检测一个变量是String类型? 请写出函数实现

方法1:

```js
function isString(obj){
    return obj.constructor===String?true:false;
}
```

方法2:

```javascript
function isString(obj){
    return Object.prototype.toString.call(obj)==="[object String]"?true:false;
}
// 如:
let a = isString('iiicici');
console.log(a);//=> true
```

方法3:

**typeof**操作符返回一个字符串，表示未经计算的操作数的类型.

```javascript
function isString(obj){
    return typeof(obj)==="string"?true:false;
    // return typeof obj ==="string"?true:false;
}
```

> 请用js去除字符串空格

方法1: 使用replace正则匹配的方法

\s表示空格,换行,tab. \S表示之外的.

g表示全局,i表示不区分大小写

```
去除所有空格: str = str.replace(/\s*/g, "");
去除两头空格: str = str.replace(/^\s*|\s*$/g,"");
去除左空格: str = str.replace(/^\s*/,"");
去除右空格: str = str.replace(/(\s*$)/g, "");
```

str为要去除空格的字符串, 实例如下:

```javascript
var str=" 23 23 ";
var str2 = str.replace(/\s*/g,"");
console.log(str2);//=> 2323
```



