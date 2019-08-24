# shoppingMall项目

## Vue基础

### vue环境搭建以及vue-cli使用

- 安装脚手架并使用vue命令

`npm i vue-cli -g`安装脚手架

> 之后可以使用命令`vue init webpack-simple Demo5`初始化一个vue框架的项目

![1550281670922](media/1550281670922.png)



> npm run dev报错

https://blog.csdn.net/weixin_39495540/article/details/79740790

![1550285634376](media/1550285634376.png)

> 解决以后

![1550285681660](media/1550285681660.png)

![1550285696525](media/1550285696525.png)

> 也可以使用命令`vue init webpack Demo6`初始化一个vue框架的项目

![1550289252516](media/1550289252516.png)

> 安装完以后也会报错
>
> 也可以按上面的方法重装`webpack-dev-server`, 但是会提示报错, 不用管,继续`npm run dev`即可

### vue基础语法

- 模板语法

Mustache语法: `{{msg}}`

Html赋值: `v-html=""`

绑定属性: `v-bind:id=""` id是绑定属性的名字

使用表达式: `{{ok?'YES':'NO'}}`

文本赋值: `v-text=""`过滤器: `{{message|capitalize}}和v-bind:id="raw|formatId"`

- Class和Style绑定

对象语法: `v-bind:class="{active:isActive,'text-danger':hasError}"`

数组语法:

```javascript
<div v-bind:class="[activeClass, errorClass]">
data: {
 activeClass:'active',
 errorClass: 'text-danger'
}
```

style绑定-对象语法:`v-bind:style="{color:activeColor,fontSize:fontSize+'px'}"`

- 条件渲染

> `v-if`
>
> `v-else`
>
> `v-else-if` 可以连写
>
> `v-show`
>
> `v-cloak`其实不是条件渲染, 为了配合使用

- vue事件处理器

> `v-on:click="greet"`或者`@click="greet"`
>
> 事件修饰符:
>
> 阻止冒泡:`v-on:click.stop``
>
> 阻止默认事件:``v-on:click.stop.prevent`
>
> `v-on:click.self`
>
> 只给这个事件绑定一次`v-on:click.once`

> `v-on:keyup.enter`
>
> `.enter`
>
> `.tab`
>
> `.delete`捕获"删除"和"退格"键
>
> `.esc`
>
> `.space`
>
> `.up`
>
> `.down`
>
> `.left`
>
> `.right`

- vue组件

> 全局组件和局部组件
>
> 父子组件通讯-数据传递: 本身是只能单向触发, 但是可以使用Emit Event和Pass Props来双向传递
>
> 
>
> ![1550293877133](media/1550293877133.png)
>
> Slot: 插槽

## Vue-router

### 路由基础介绍

- 前端路由

> 路由是根据不同的url地址展示不同的内容或页面
>
> 前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做, 之前是 通过服务端根据url的不同返回不同的页面实现的

- 什么时候使用前端路由

> 在单页面应用, 大部分页面结构不变, 只改变部分内容的使用

- 前端路由有什么优点和缺点

> 优点: 用户体验好, 不需要每次都从服务器全部获取, 快速展现给用户
>
> 缺点: 
>
> 不利于SEO
>
> 使用浏览器的前进, 后退键的时候回重新发送请求, 没有合理地利用缓存
>
> 单页面无法记住之前滚动的位置, 无法在前进, 后退的时候记住滚动的位置

- vue-router用来构建SPA

> `<router-link></router-link>`或者`this.$router.push({path:''})`
>
> `<router-view></router-view>`

- 动态路由匹配
- 嵌套路由
- 编程式路由
- 命名路由和命名视图

### 动态路由配置

- 动态路由

![1550295195570](media/1550295195570.png)

### 嵌套路由

### 编程式路由

- 什么是编程式路由

> 通过js来实现页面的跳转
>
> `$router.push("name")`
>
> `$router.push({path:"name"})`
>
> `$router.push({path:"name?a=123"})`或者`$router.push({path:"name",query:{a:123}})`
>
> `$router.go(1)`

### 命名路由和命名视图

- 什么是命名路由和命名视图

> 给路由定义不同的名字, 根据名字进行匹配
>
> 给不同的router-view定义名字,  通过名字进行对应组件的渲染 

## Vue-resource和Axios

### vue-resource使用

- Vue-Resource基础介绍

> 通过链接引入文件
>
> `<script src="https://cdn.jsdelivr.net/vue.resource/1.3.1/vue-resource.min.js"></script>`
>
> 通过npm安装
>
> `npm install vue-ressource --save`

![1550302879876](media/1550302879876.png)

- vue-resource的请求API是按照REST风格设计的, 它提供了7种请求API:

> `get(url,[options])`
>
> `head(url,[options])`
>
> `delete(url,[options])`
>
> `jsonp(url,[options])`
>
> `post(url,[body],[options])`
>
> `put(url,[body],[options])`
>
> `patch(url,[body],[options])`

![1550302182249](media/1550302182249.png)

- 全局拦截器interceptors

```javascript
Vue.http.interceptors.push((request, next)=>{
    // ...
    // 请求发送前的处理逻辑
    // ...
    next((response)=>{
        // ...
        // 请求发送后的处理逻辑
        // ...
        // 根据请求的状态, response参数会返回给successCallback或者errorCallback
        return response
    })
})
```

- Get请求
- Post请求
- JSONP请求
- 全局拦截器使用

### axios基础介绍

- 安装方式

> `<script src="https://unpkg.com/axios/dist/axios.min.js"></script>`
>
> `npm install axios --save`

- API

> `axios.request(config)`
>
> `axios.get(url[,config])`
>
> `axios.delete(url[,config])`
>
> `axios.head(url[,config])`
>
> `axios.options(url[,config])`
>
> `axios.post(url[,data[,config]])`
>
> `axios.put(url[,data[,config]])`
>
> `axios.patch(url[,data[,config]])`

```javascript
function getUserAccount(){
    return axios.get('/user/12345');
}
function getUserPermissions(){
    return axios.get('/user/12345/permissions');
}

axios.all([getUserAccount(), getUserPermissions()]).then(axios.spread(function(acct, perms){
    // Both request are now complete
}))
```



### 实现图片懒加载

- vue-lazyload

## Node.js基础

### Linux环境下配置Node环境

### 搭建基于Express框架的运行环境

> `npm i express-generator -g`全局安装express构建模块
>
> `express server`使用express构建一个server名字的构建文件夹
>
> 把server文件夹下的package中的配置赋值到项目外的package.json中, 再重新在项目下`npm install`, 把server文件夹下的package.json文件可以删除掉



> 不想使用.jade, 想使用html文件, 先下载ejs
>
> 在项目下安装`ejs`
>
> `npm i ejs --save`
>
> 再把server文件夹下的views文件夹下的.jade文件删除掉

![1550407842483](media/1550407842483.png)



## 基于Node.js开发商品列表接口

### Node的启动和调试方式

> 基于node启动
>
> 基于webstorm启动
>
> 基于pm2插件启动

### 基于Express实现商品列表查询接口

- 安装Mongoose

> 对MongoDB的封装

- 创建model
- 创建路由
- 基于mongoose,实现商品列表的查询功能 

## 在express中使用ejs模板

express默认使用的是jade模板引擎, 但是不是html语义特性.

如果想用html作为模板语言的话, 就要用ejs

### 安装

```
npm i ejs
```

### 修改app.js

修改app.js将view engine修改为ejs, 并将模板的后缀改为.html

```javascript
let ejs = require('ejs');
let express = require('express');
let app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.html',ejs.__express);
app.set('view engine','html');
```

### 创建测试页面

在views文件夹中创建index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <h2>hello, Express is very Good</h2>
</body>
</html>
```

![1554272730899](media/1554272730899.png)

然后在routes里修改index.js

```javascript
let express = require('express');
let router = express.Router();

router.get('/',function(req,res,next){
	res.render('index',{title:'Express, Very Good'});
})
```

## pm2

PM2是Node.js应用程序的生产过程管理器，具有内置的负载平衡器。它允许您永远保持应用程序的活动状态，在不停机的情况下重新加载应用程序，并简化常见的系统管理任务。

pm2以进程的形式启动服务.

比如:

`node bin\www`

启动服务之后是不可以继续其他操作, 只能打开另一个服务窗口干其他事情

pm2是进程, 启动了之后还可以继续其他操作

### 启动

`pm2 start app.js`

### 关闭

`pm2 stop app.js`

### 查看日志

`pm2 log`

![1554363065007](media/1554363065007.png)

## Nodejs+Express+mysql服务端开发

### 初始化最简单express项目

新建一个目录server, 在该目录下运行`npm init`

安装express`npm i express`

新建index.js文件, 添加如下代码:

```javascript
let express = require('express');
let app = express();
app.get('/',function(req,res){
    res.send('hello, express');
});
app.listen(3000);
```

运行`node index.js`

打开浏览器访问http://127.0.0.1:3000

页面显示,hello express

### 以express命令初始化项目

#### 准备工作

- 安装Express可执行命令

`npm i express-generator -g`安装全局变量

- 初始化项目

`express server`创建express目录, server是目录名

- 执行如下命令

`cd server`进入项目根目录

`npm i`安装依赖

![1554365244786](media/1554365244786.png)

/bin:用来启动应用(服务器)

/public:存放静态资源目录

/routes: 路由用于确定应用程序如何响应对特定端点的客户机请求,包含一个URI(或路径)和一个特定的HTTP请求方法(GET, POST等).每个路由可以具有一个或多个处理程序函数, 这些函数在路由匹配时执行.

/views: 模板文件所在目录 文件格式为.jade

目录app.js程序main文件 这个是服务器启动的入口.

#### 启动服务器

`npm start`

或者

`node ./bin/www`

在浏览器中访问http://127.0.0.1:3000

![1554365748550](media/1554365748550.png)

#### 基本使用

app.js这里介绍下主要代码:

```javascript
let express= require('express');//加载express模块
let path = require('path');//路径模块
let favicon = require('serve-favicon');//请求网页的logo
let logger = require('morgan');//在控制台中, 显示req请求的信息
let cookieParser = require('cookie-parser');//这就是一个解析cookie的工具. 通过req.cookies可以去到传过来的cookie, 并把他们转成对象.
let bodyParser = require('body-parser');//node.js中间件, 用于处理JSON,Raw,Text和URL编码的数据.

//路由信息(接口地址),存放在routes的根目录
let index = require('./routes/index');
let users = require('./routes/users');
let add = require('./routes/add');
let edit = require('./routes/edit');
let del = require('./routes/del');
let app = express();

//模板开始
app.set('views',path.join(__dirname,'views'));//设置视图根目录
app.set('view engine','jade');//设置视图格式(后面会改成html格式的文件)

//载入中间件
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));

//配置路由, ('自定义路径', 上面设置的接口地址)
app.use('/',index);
app.use('/search',users);//查
app.use('/add',add);//增
app.use('/edit',edit);//改
app.use('/del',del);//删

// 错误处理
app.use(function(req,res,next){
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
})

app.use(function(err,req,res,next){
    // set local, only providing err in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development'?err:{};
    
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
```

定义一个路由的基本格式为:

`app.METHOD(PATH, HEADLER)`

其中:

app是express的实例

METHOD是HTTP的各种请求方法.

PATH是服务器上的路径.

HANDLER是在路由匹配时执行的函数.

以上的定义代表

在根路由(/)上(应用程序的主页)对GET请求进行响应.

以下是目录结构图:

![1554368690414](media/1554368690414.png)

例子中没用jade, 改用了html.



先从路由开始

index.js

```javascript
let express = require('express');
let router = express.Router();
// 编写执行代码
router.get('/',function(req,res,next){
    //使用绝对定位打开views下面的html文件
    res.sendFile("/JJ-Note/nodeTest/example/example/views"+"index.html")
});

module.exports = router;

```

再次打开add.js

```javascript
let express = require('express');
let router = express.Router();
let URL = require('url');
//加载mysql模块
let mysql = require('mysql');
//创建连接
let connection = mysql.createConnection({
    host:'loaclhost',
    user:'root',
    password:'',
    database:'shopping_mall'
})

//执行创建连接
connection.connect();

//SQL语句
let sql = 'SELECT * FROM name';
let addSql = 'INSERT INTO name(id,name,sex) VALUES(?,?,?)';

router.get('/',function(req,res,next){
    //解析请求参数
    let params = URL.parse(req.url,true).query;
    let addSqlParams = [params.id, params.name, params.sex];
    //增
    connection.query(addSql,addSqlParams,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
        }
        console.log(params.id);
        res.send(result);
    });
});

module.exports = router;
```

## nodejs中mysql用法

1、建立数据库连接：createConnection(Object)方法

​      该方法接受一个对象作为参数，该对象有四个常用的属性host，user，password，database。与php中链接数据库的参数相同。属性列表如下：

```javascript
host: 连接数据库所在的主机名. (默认: localhost)
port: 连接端口. (默认: 3306)
localAddress: 用于TCP连接的IP地址. (可选)
socketPath: 链接到unix域的路径。在使用host和port时该参数会被忽略.
user: MySQL用户的用户名.
password: MySQL用户的密码.
database: 链接到的数据库名称 (可选).
charset: 连接的字符集. (默认: 'UTF8_GENERAL_CI'.设置该值要使用大写!)
timezone: 储存本地时间的时区. (默认: 'local')
stringifyObjects: 是否序列化对象. See issue #501. (默认: 'false')
insecureAuth: 是否允许旧的身份验证方法连接到数据库实例. (默认: false)
typeCast: 确定是否讲column值转换为本地JavaScript类型列值. (默认: true)
queryFormat: 自定义的查询语句格式化函数.
supportBigNumbers: 数据库处理大数字(长整型和含小数),时应该启用 (默认: false).
bigNumberStrings: 启用 supportBigNumbers和bigNumberStrings 并强制这些数字以字符串的方式返回(默认: false). 
dateStrings: 强制日期类型(TIMESTAMP, DATETIME, DATE)以字符串返回，而不是一javascript Date对象返回. (默认: false)
debug: 是否开启调试. (默认: false)
multipleStatements: 是否允许在一个query中传递多个查询语句. (Default: false)
flags: 链接标志.
```

还可以使用字符串连接数据库例如：

```javascript
var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');
```

2、结束数据库连接end()和destroy()

end()接受一个回调函数，并且会在query结束之后才触发，如果query出错，仍然会终止链接，错误会传递到回调函数中处理。

destroy()立即终止数据库连接，即使还有query没有完成，之后的回调函数也不会在触发。

3、创建连接池 createPool(Object)  Object和createConnection参数相同。
可以监听connection事件，并设置session值

```javascript
pool.on('connection', function(connection) {
    connection.query('SET SESSION auto_increment_increment=1')
});
```

connection.release()释放链接到连接池。如果需要关闭连接并且删除，需要使用connection.destroy()

pool除了接受和connection相同的参数外，还接受几个扩展的参数

```javascript
createConnection: 用于创建链接的函数. (Default: mysql.createConnection)
waitForConnections: 决定当没有连接池或者链接数打到最大值时pool的行为. 为true时链接会被放入队列中在可用是调用，为false时会立即返回error. (Default: true)
connectionLimit: 最大连接数. (Default: 10)
queueLimit: 连接池中连接请求的烈的最大长度，超过这个长度就会报错，值为0时没有限制. (Default: 0)
```

4、连接池集群

允许不同的host接

```javascript
// create
var poolCluster = mysql.createPoolCluster();

poolCluster.add(config); // anonymous group
poolCluster.add('MASTER', masterConfig);
poolCluster.add('SLAVE1', slave1Config);
poolCluster.add('SLAVE2', slave2Config);

// Target Group : ALL(anonymous, MASTER, SLAVE1-2), Selector : round-robin(default)
poolCluster.getConnection(function (err, connection) {});

// Target Group : MASTER, Selector : round-robin
poolCluster.getConnection('MASTER', function (err, connection) {});

// Target Group : SLAVE1-2, Selector : order
// If can't connect to SLAVE1, return SLAVE2. (remove SLAVE1 in the cluster)
poolCluster.on('remove', function (nodeId) {
    console.log('REMOVED NODE : ' + nodeId); // nodeId = SLAVE1 
});

poolCluster.getConnection('SLAVE*', 'ORDER', function (err, connection) {});

// of namespace : of(pattern, selector)
poolCluster.of('*').getConnection(function (err, connection) {});

var pool = poolCluster.of('SLAVE*', 'RANDOM');
pool.getConnection(function (err, connection) {});
pool.getConnection(function (err, connection) {});

// destroy
poolCluster.end();
```

链接集群的可选参数

```javascript
canRetry: 值为true时，允许连接失败时重试(Default: true)
removeNodeErrorCount: 当连接失败时 errorCount 值会增加. 当errorCount 值大于 removeNodeErrorCount 将会从PoolCluster中删除一个节点. (Default: 5)
defaultSelector: 默认选择器. (Default: RR)
RR: 循环. (Round-Robin)
RANDOM: 通过随机函数选择节点.
ORDER: 无条件地选择第一个可用节点.
```

5、切换用户/改变连接状态

```javascript
Mysql允许在比断开连接的的情况下切换用户
	connection.changeUser({user : 'john'}, function(err) {
	  	if (err) throw err;
	});
```
```
参数
user: 新的用户 (默认为早前的一个).
password: 新用户的新密码 (默认为早前的一个).
charset: 新字符集 (默认为早前的一个).
database: 新数据库名称 (默认为早前的一个).
```

6、处理服务器连接断开

```javascript
var db_config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'example'
};

var connection;

function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
    // the old one cannot be reused.

    connection.connect(function(err) {              // The server is either down
        if(err) {                                     // or restarting (takes a while sometimes).
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
        }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
    // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();
```

7、转义查询值

为了避免SQL注入攻击，需要转义用户提交的数据。可以使用connection.escape() 或者 pool.escape()
例如：

```javascript
var userId = 'some user provided value';
var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
connection.query(sql, function(err, results) {
    // ...
});
或者使用？作为占位符
connection.query('SELECT * FROM users WHERE id = ?', [userId], function(err, results) {
    // ...
});
不同类型值的转换结果
Numbers 不变
Booleans 转换为字符串 'true' / 'false' 
Date 对象转换为字符串 'YYYY-mm-dd HH:ii:ss'
Buffers 转换为是6进制字符串
Strings 不变
Arrays => ['a', 'b'] 转换为 'a', 'b'
嵌套数组 [['a', 'b'], ['c', 'd']] 转换为 ('a', 'b'), ('c', 'd')
Objects 转换为 key = 'val' pairs. 嵌套对象转换为字符串.
undefined / null ===> NULL
NaN / Infinity 不变. MySQL 不支持这些值,  除非有工具支持，否则插入这些值会引起错误.
转换实例：
var post  = {id: 1, title: 'Hello MySQL'};
var query = connection.query('INSERT INTO posts SET ?', post, function(err, result) {
    // Neat!
});
console.log(query.sql); // INSERT INTO posts SET `id` = 1, `title` = 'Hello MySQL'
或者手动转换
var query = "SELECT * FROM posts WHERE title=" + mysql.escape("Hello MySQL");

console.log(query); // SELECT * FROM posts WHERE title='Hello MySQL'
```

8、转换查询标识符

如果不能信任SQL标识符(数据库名、表名、列名)，可以使用转换方法mysql.escapeId(identifier)；

```javascript
var sorter = 'date';
var query = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId(sorter);

console.log(query); // SELECT * FROM posts ORDER BY `date`
支持转义多个
var sorter = 'date';
var query = 'SELECT * FROM posts ORDER BY ' + mysql.escapeId('posts.' + sorter);

console.log(query); // SELECT * FROM posts ORDER BY `posts`.`date`
可以使用??作为标识符的占位符
var userId = 1;
var columns = ['username', 'email'];
var query = connection.query('SELECT ?? FROM ?? WHERE id = ?', [columns, 'users', userId], function(err, results) {
    // ...
});

console.log(query.sql); // SELECT `username`, `email` FROM `users` WHERE id = 1
```

9、准备查询

可以使用mysql.format来准备查询语句，该函数会自动的选择合适的方法转义参数。

```javascript
var sql = "SELECT * FROM ?? WHERE ?? = ?";
var inserts = ['users', 'id', userId];
sql = mysql.format(sql, inserts);

```

10、自定义格式化函数

```javascript
connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};

connection.query("UPDATE posts SET title = :title", { title: "Hello MySQL" });
```

11、获取插入行的id

当使用自增主键时获取插入行id，如：

```javascript
connection.query('INSERT INTO posts SET ?', {title: 'test'}, function(err, result) {
    if (err) throw err;

    console.log(result.insertId);
});
```

12、流处理

有时你希望选择大量的行并且希望在数据到达时就处理他们，你就可以使用这个方法

```javascript
var query = connection.query('SELECT * FROM posts');
query
    .on('error', function(err) {
    // Handle error, an 'end' event will be emitted after this as well
})
    .on('fields', function(fields) {
    // the field packets for the rows to follow
})
    .on('result', function(row) {
    // Pausing the connnection is useful if your processing involves I/O
    connection.pause();

    processRow(row, function() {
        connection.resume();
    });
})
    .on('end', function() {
    // all rows have been received
});
```

13、混合查询语句（多语句查询）



 因为混合查询容易被SQL注入攻击，默认是不允许的，可以使用var connection = mysql.createConnection({multipleStatements: true});开启该功能。



 混合查询实例：

```javascript
connection.query('SELECT 1; SELECT 2', function(err, results) {
    if (err) throw err;

    // `results` is an array with one element for every statement in the query:
    console.log(results[0]); // [{1: 1}]
    console.log(results[1]); // [{2: 2}]
});
```

同样可以使用流处理混合查询结果：

```javascript
var query = connection.query('SELECT 1; SELECT 2');

query
    .on('fields', function(fields, index) {
    // the fields for the result rows that follow
})
    .on('result', function(row, index) {
    // index refers to the statement this result belongs to (starts at 0)
});
```

如果其中一个查询语句出错，Error对象会包含err.index指示错误语句的id，整个查询也会终止。

混合查询结果的流处理方式是做实验性的，不稳定。

14、事务处理

connection级别的简单事务处理

```javascript
connection.beginTransaction(function(err) {
    if (err) { throw err; }
    connection.query('INSERT INTO posts SET title=?', title, function(err, result) {
        if (err) { 
            connection.rollback(function() {
                throw err;
            });
        }

        var log = 'Post ' + result.insertId + ' added';

        connection.query('INSERT INTO log SET data=?', log, function(err, result) {
            if (err) { 
                connection.rollback(function() {
                    throw err;
                });
            }  
            connection.commit(function(err) {
                if (err) { 
                    connection.rollback(function() {
                        throw err;
                    });
                }
                console.log('success!');
            });
        });
    });
});
```

15、错误处理

```javascript
err.code = string
err.fatal => boolean
```