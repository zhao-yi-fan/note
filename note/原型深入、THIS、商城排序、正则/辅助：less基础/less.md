# less

## less基础

> 它是css预编译语言, 和它类似的还有sass/stylus...

> css是标记语言, 不是编程语言, 没有类、实例、函数、变量等东西; 
>
> less等预编译语言就是让css具备面向对象编程的思想; 
>
> 而浏览器不能直接识别和渲染less代码, 需要我们把less代码预先编译为正常的css后, 再交给浏览器渲染解析;

## less的编译

### 在开发环境下编译

> 产品还没有开发完, 正在开发中, 这个是开发环境
>
> 导入less.js即可

```html
<!-- rel="stylesheet/less" 这块有修改, 需要在最后加/less -->
<link rel="stylesheet/less" href="css/demo1.less">

<!-- 导入js文件即可 -->
<script src="js/less-2.5.3.min.js"></script>
```

### 在生产环境下编译

> 产品开发完成了, 需要部署到服务器上
>
> 项目上线, 不能把less部署, 这样用户每一次打开页面都需要重新的编译, 非常耗性能, 我们部署到服务器上的是编译后的css
>
> 1. 在电脑的全局环境下安装less模块
>       $ npm install less -g
>       验证是否安装成功: \$ lessc -v
>
> 2. 基于命令把我们的less编译成css
>
>       $ lessc xxx/xxx.less xxx/xxx.min.css -x
>       把指定目录中的less编译称为css(并且实现了代码的压缩), 把编译后的css存入到具体指定路径中的文件里
>
>       然后调用编译后的css文件
>
>       <link rel="stylesheet" href="css/demo1.min.css">
>

![1545929449448](media/1545929449448.png)

- 目前基于webpack和框架实现工程化开发的时候, 我们都是在webpack配置文件中, 配置出less的编译(需要安装less/less-loader等模块), 这样不管是开发环境下的预览, 还是部署到生产环境下, 都是基于webpack中的less模块编译的.

## less中最常用的基础语法

### 变量

> 用变量存储一个公共值, 后期需要使用这个值, 直接调取变量即可, 以后如果值需要修改, 只需要更改变量的值, 那么所有用到这个变量的地方都跟着修改了

```less
// 变量
@link-color: #222;
// 使用
.box {
    .centerPos(200, 200);
    width: 200px;
    height: 200px;
    background: url("@{bg-src}/news_1.png") no-repeat;
    a {
        color: @link-color;
    }
}

.hover {
    color: @link-color;
}
```

### 拼接

> url("@{bg-src}/news_1.png") 
>
> 用`@{变量}`来拼接变量

```less
// 代码拼接
@bg-src: "../img";
// 使用
.box {
    .centerPos(200, 200);
    width: 200px;
    height: 200px;
    background: url("@{bg-src}/news_1.png") no-repeat;

    a {
        color: @link-color;
    }
}
```

### 嵌套  &符号使用

> &符号就表示紧贴着

```less
.pub {
    .bg {/* .pub .bg 后代选择器*/
        a {
           
        }
    }
    & > .bg {/* .pub > .bg 子代选择器*/

    }
    &.bg {/* .pub.bg 交集选择器*/

    }
    &:hover {/* .pub:hover 伪类选择器*/

    }
}
```

### 作用域 作用域链 变量提升

```less
@H: 200;
.pub {
    @H: 100;
    .bg {
        a {
            width: unit(@H, px);/* 300 和js一样,有变量提升, 作用域链*/
        }
        @H: 300;
    }
}
```

### 函数

- .centerPos(@w:100, @h:100){}

> 冒号后面表示不传值的默认值.

- unit方法

> less提供了内置unit()方法, 用来数值和单位分离
>
> eg: margin-top: unit(-(@h/2), px);

```less
.transition(@property:all,@duration: .5s,
@timing-function: linear,@delay:0s){
    -webkit-transition: @arguments;
    transition: @arguments;
}

.centerPos(@w:100, @h:100){
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: unit(-(@h/2), px);
    margin-left: unit(-(@w/2), px);
}
// 函数的使用
.cc {
    .transition;/* 默认值 */
    .transition(@duration: 1s);
}
.box {
    .centerPos(200, 200);
    width: 200px;
    height: 200px;
    background: url("@{bg-src}/news_1.png") no-repeat;

    a {
        color: @link-color;
    }
}
```

### 导入公共部分

> @import (reference) "common";
>
> reference: 只把内容导入过来使用, 但是不会编译common中的内容

> common.less文件

```less
// 函数
.transition(@property:all,@duration: .5s,
@timing-function: linear,@delay:0s){
    -webkit-transition: @arguments;
    transition: @arguments;
}


.centerPos(@w:100, @h:100){
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: unit(-(@h/2), px);
    margin-left: unit(-(@w/2), px);
}
```

> demo1.less文件

```less
@import (reference) "common";/* 只把内容导入过来使用, 但是不会编译common中的内容 */

.cc {
    .transition;/* 默认值 */
    .transition(@duration: 1s);
}

// 变量
@link-color: #222;

// 拼接
@bg-src: "../img";

// 嵌套 作用域 作用域链 &符号 
@H: 200;
.pub {
    @H: 100;
    .bg {/* .pub .bg */
        a {
            width: unit(@H, px);/* 300 和js一样,有变量提升, 作用域链*/
        }
        @H: 300;
    }
    & > .bg {/* .pub > .bg */

    }
    &.bg {/* .pub.bg */

    }
    &:hover {/* .pub:hover */

    }
}

.box {
    .centerPos(200, 200);
    width: 200px;
    height: 200px;
    background: url("@{bg-src}/news_1.png") no-repeat;

    a {
        color: @link-color;
    }
}

.hover {
    color: @link-color;
}
```

