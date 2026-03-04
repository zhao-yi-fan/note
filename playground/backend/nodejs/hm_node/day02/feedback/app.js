// app application 应用程序
// 把当前模块所有的依赖项都声明再文件模块最上面
// 为了让目录结构保持统一清晰, 把所有的HTML文件都放到 views(视图) 目录中
// 我们为了方便的统一处理这些静态资源, 所以我们约定把所有的静态资源都存放在public目录中
// 哪些资源能被用户访问,哪些资源不能被用户访问,现在可以通过代码来进行非常灵活的控制
// / index.html
// /public 整个 public 目录中的资源都允许被访问
var http = require('http')
var fs = require('fs')
var url = require('url')
var template = require('art-template')

var comments = [
    {
        name: '张三1',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三2',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    },
    {
        name: '张三3',
        message: '今天天气不错',
        dateTime: '2015-10-16'
    }
]

// /pinglun?name=撒大声地&message=奥术大师多
// 对于这种表单提交的请求路径,由于其中具有用户动态填写的内容
// 所以你不可能通过去判断完整的url路径来处理这个请求

//结论: 对于我们来讲,其实只需要判定,如果你的请求路径是 /pinglun

http.
    createServer(function (req, res) {
        //使用 url.parse 方法将路径解析为一个方便操作的对象,第二个参数true表示直接将查询字符串转为一个对象(通过 query 属性来访问)
        var parseObj = url.parse(req.url, true)

        // 单独获取不包含查询字符串的路径部分(该路径不包含问号之后的内容)
        var pathname = parseObj.pathname
        if (pathname === '/') {
            fs.readFile('./views/index.html', function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }

                var htmlStr = template.render(data.toString(), {
                    comments: comments
                })
                //data什么时候转字符串?在使用模板引擎的时候,需要用到字符串的时候再转
                res.end(htmlStr)
            })
        } else if (pathname === '/pinglun') {
            //一次请求对应一次响应, 响应结束这次请求也就结束了
            //res.end(JSON.stringify(parseObj.query));
            
            // 我们已经使用 url 模块的 parse 方法把请求路径中的查询字符串给解析成一个对象了
            // 所以接下来要做的是:
            //  1.获取表单提交的数据 parseObj.query
            //  2.将当前时间日期添加到数据对象中,然后存储到数组中
            //  3.让用户重定向到首页 /
            //      当用户重定向请求 / 的时候,我数组中的数据已经发生变化了,所以用户看到的页面也就变了
            var comment = parseObj.query
            comment.dateTime = '2017-11-2 17:11:22'
            comments.push(comment)
            //服务端这个时候已经把数据存储好了,接下来就是让用户重新请求 / 首页,就可以看到留言内容了
            
            //如何通过服务器让客户端重定向:
            // 1. 状态码设置为302 临时重定向
            //      statusCode
            // 2. 在响应头中通过 Location 告诉客户端往哪儿重定向
            //如果客户端发现收到服务器的响应的状态码是 302 就会自动去响应头中找 Location , 然后对该地址发起新的请求
            //所以你就能看到客户端自动跳转了
            res.statusCode = 302
            res.setHeader('Location', '/')
            res.end()
        }else if (pathname === '/post') {
            fs.readFile('./views/post.html', function(err, data){
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }else if (pathname.indexOf('/public/') === 0) {
            // /public/css/main.css
            // /public/js/main.js
            // /public/lib/jquery.js
            //统一处理:如果请求路径是以 /public 开头的, 则我认为你要获取 Public 中的某个资源
            //所以我们就直接可以把请求路径当做文件路径来直接进行读取
            fs.readFile('.' + pathname, function (err, data) {
                if (err) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else {
            // 其它的都处理成 404 找不到
            fs.readFile('./views/404.html', function(err, data){
                if (err) {
                    return res.end('404 Not Found')
                }
                res.end(data)
            })
        }
    })
    .listen(3000, function () {
        console.log('running');

    })

    // Node 不适合从来没有接触过服务端的人学习
    // 如果想要真正的学好服务端, 还是老牌的 Java. PHP 这些平台
    // Node 不是特别适合入门服务端, 但不代表 Node 不强大
    // Node 很厉害, 具有经验的人可以玩的非常的牛
    // 不适合新手的原因就在于比较偏底层,而且太灵活
    // Java,PHP好入门的原因就在于: 这些平台屏蔽了一些底层
    // res.rediect('重定向')
    

    // 写案例步骤:
    // 1. / index.html
    // 2. 开放 public 目录中的静态资源
    //      当请求 /public/xxx 的时候,读取响应public 目录中的具体资源
    // 3. /post post.html
    // 4. /pinglun
    //      4.1 接收表单提交数据
    //      4.2 存储表单提交的数据
    //      4.3 让表单重定向到 /
    //          statusCode
    //          setHeader

    // 下一节知识点:
    // 模块系统
    // Express (第三方 Web 开发框架)
    //      这两天做的事,在框架里面就是一个 API 的事情
    //          使用框架的目的就是让我们更加专注于业务, 而不是底层细节