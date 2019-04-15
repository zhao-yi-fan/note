## 富文本编辑器

网易富文本编辑器

tinymce

## FormData

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



## form标签的enctype属性

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

## token的意义和用法

### uuid库生成token值

```
const guid = require('uuid/v4');

token=guid().replace(/\-/g,'');
```



### token的来源

当客户端多次向服务器端请求数据时, 服务器就需要多次从数据库中查询用户名和密码并进行对比, 判断用户名和密码是否正确, 并作出相应提示. 但这样无疑会增加服务器端的运行压力, 是否可以有一种方式只需要验证用户就是之前的用户而不需要每次在客户端请求数据时都需要查询数据库判断用户名和密码是否正确. 在这种请求下, 引入了token来解决服务器端多次访问数据库问题.

1.什么是Token?

Token是服务器端生成的一串字符串, 作为客户端进行请求时辨别客户身份的一个个令牌. 当用户第一次登录后, 服务器生成一个token便将此token返回给客户端, 以后客户端只需带上这个token前来请求数据即可, 无需再次带上用户名和密码.

2.使用Token的目的

Token的目的是为了验证用户登录情况以及减轻服务器的压力, 减少频繁的查询数据库, 使服务器更加健壮.

### Token的运用流程

1. 当用户首次登录成功之后, 服务器端就会生成一个token值, 这个值,会在服务器保存token值(保存在数据库中),再将这个token值返回给客户端.
2. 客户端拿到token值之后, 进行保存(保存位置由服务器端设置).
3. 以后客户端再次发送网络请求(一般不是登录请求)的时候, 就会将这个token值附带到参数中发送给服务器.
4. 服务器接收到客户端的请求之后, 会取出token值与保存在本地(数据库)中的token值进行比较.
5. 如果两个token值相同, 说明用户登录成功过! 当前用户处于登录状态.
6. 如果没有这个token值, 没有登录成功.
7. 如果token值不同: 说明原来的登录信息已经失效, 让用户重新登录.
8. Django Rest framework中JWT的使用稍有差异,这里不做详细说明.