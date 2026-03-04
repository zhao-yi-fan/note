# less 基础

> 它是 css 预编译语言, 和它类似的还有 sass/stylus...

> css 是标记语言, 不是编程语言, 没有类、实例、函数、变量等东西; 而 less 等预编译语言就是让 css 具备面向对象编程的思想; 而浏览器不能直接识别和渲染 less 代码, 需要我们把 less 代码预先编译为正常的 css 后, 再交给浏览器渲染解析;

## less 的编译

- 在开发环境下编译(产品还没有开发完, 正在开发中, 这个是开发环境)

> 导入 less.js 即可

```
//=> rel="stylesheet/less" 这块有修改
<link rel="stylesheet/less" href="css/demo1.less">

// 导入js文件即可
<script src="//unpkg.com/less@2.5.3/dist/less.min.js"></script>
```

- 在生产环境下编译(产品开发完成了, 需要部署到服务器上)

> 项目上线, 不能把 less 部署, 这样用户每一次打开页面都需要重新的编译, 非常耗性能, 我们部署到服务器上的是编译后的 css

> 1. 在电脑的全局环境下安装 less 模块
>    $ npm install less -g
>    验证是否安装成功: $ lessc -v
> 2. 基于命令把我们的 less 编译成 css
>    $ lessc xxx/xxx.less xxx/xxx.min.css -x
>    把指定目录中的 less 编译称为 css(并且实现了代码的压缩), 把编译后的 css 存入到具体指定路径中的文件里

- 目前基于 webpack 和框架实现工程化开发的时候, 我们都是在 webpack 配置文件中, 配置出 less 的编译(需要安装 less/less-loader 等模块), 这样不管是开发环境下的预览, 还是部署到生产环境下, 都是基于 webpack 中的 less 模块编译的.
