# 一、Vue介绍

- vue是一个渐进式框架
- vue全家桶：vuejs+vue-router+vuex+axios

## 特点

- 核心只关注视图层
- 易学，轻量，灵活的特点
- 适用于移动端项目
- 渐进式框架

## 渐进式的理解

- 声明式渲染（无需关心如何实现）
- 组件系统
- 客户端路由（vue-router）
- 大规模状态管理（vuex）
- 构建工具（vue-cli）

## vue的两个核心

响应的数据变化

- 当数据发生改变，视图会自动更新，不需要操作DOM

组合的视图组件

- ui页面映射为组件树
- 划分组件可维护、可复用、可测试

## MVC与MVVM

### MVC

- MVC——数据、表现、行为分离
- model数据，view视图，controller控制器
- MVC是单向的

### MVVM

- model数据，view视图，viewModel视图模型
- MVVM是双向的
- MVVM模式的框架：vue、angular

## 兼容性

​	因为vue中用了es5的Object.defineProperty语法，这个方法没有低版本的替代方法，所以vue不支持IE8及以下版本。

# 二、vue语法

## vm对象

```html
<!DOCTYPE html>
<html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <script src="vue.js"></script>
    </head>

    <body>
        <div id="app">
            hi
        </div>
    </body>
    <script>

        let vm = new Vue({ // vm就是viewModel
            el: '#app', // 挂载到的元素(querySelector)
            data: { // 用于存放数据,不能放方法,因为data中的this指向的是window
                msg: 'hello', // 可以通过vm.msg取到对应的内容
                arr: [1, 2, 3]
            },
            template: `<h1>{{msg}}</h1>` // 把el所对应的元素替换成template中的内容

        });

        // vm实例对象上的方法
        vm.$watch('msg', function (newVal, oldVal) {
            // msg一变,就会触发回调函数
            console.log(newVal, oldVal);
        });

        // 数据更新是异步的,会放到一个缓存队列中,等到最后更新一次
        vm.msg = 'xxx'; // 数据变化后更新视图的操作是异步之心的
        vm.msg = 'world'; // 更改两次msg,只会触发一次watch

        vm.$nextTick(() => {// 如果不使用$nextTick, vm.$el.innerHTML中的内容则是hello
            console.log(vm.$el.innerHTML);//=> world (vue挂载到的DOM元素中的内容)
            console.log(vm.$options); // 向vm实例传的参数有哪些 {data, el, template...}

        })

    </script>

</html>
```

## moustache模板语法

- `{{}}`中可以放运算、取值、三元
- `{{}}`只能写在标签内，不能写在属性中。在属性中要使用`v-bind`
  - 错误写法：`<img src='{{imgSrc}}'>`
- 只要在模板中使用了数据，就必须在vm实例上声明

```html
<body>
    <div id="app">
        {{msg}}<br>
        {{flag==true?'正确':'错误'}}<br>
        {{ {a:1,b:2} }}<br>
        {{msg+'xxx'}}

    </div>
    <script src="vue.js"></script>
    <script>
        let vm = new Vue({
            el: '#app',
            data: {
                msg: 'hello world', // 可以通过vm.msg取到对应的内容
                flag: true
            }
        });
        setTimeout(function () {
            vm.msg = '你好世界'; // 双向绑定: 数据变化会影响视图更新
        }, 3000);
    </script>
</body>
```

## 响应式数据变化

### 响应式的原理

- 响应式就是：当数据发生改变，视图会自动更新，不需要手动操作DOM
- 其原理就是：循环data中的数据，一次增加getter和setter方法
- 但是data对象中没有的项不会被增加getter和setter，也就不具有双向绑定的特性，如下：

```javascript
<div id="app">
    <span>{{aaa}}</span>
<span>{{obj.xxx}}</span>
</div>
<script src="vue.js"></script>
<script>    
    let vm = new Vue({
        el: '#app',
        data: {
            // data中没有初始化aaa
            obj: {} // data的obj中没有初始化obj.xxx
            // 这样就会导致视图中的aaa和obj.xxx不会随着数据的变化进行自动更新
        }
    })
// 以下两条语句也就不会使视图更新
vm.aaa = 1111;
vm.obj.xxx = 2222;
</script>
```

- 所以，使用变量时，一定要先初始化，否则新加的属性不会导致页面渲染
- 要在`data`中先初始化视图中用到的对象，才可以使其具有响应式，如下：

```javascript
let vm = new Vue({
    el:'#app',
    data:{
        aaa: '', // 初始化aaa属性
        obj: {xxx: ''} // 初始化obj中xxx属性
    }
})
```

### 数据响应的简易实现

```javascript

```



## 指令

- 指令(directive)--补充了html的属性

### v-bind:

> 动态地绑定一个或多个特性，或一个组件 prop 到表达式。

`v-bind:`

> 可以用于任何属性
>
> 可以直接简写成`:`

```html
<script src="vue.js"></script>


<div id="div1">
    <strong v-bind:title="age+'岁'">{{name}}</strong>
</div>
<script>
    let vm = new Vue({
        el:'#div1',
        data:{
            age: 18,
            name: 'iiicici'
        }
    })
</script>
```

> class,style属性有另外的写法
>
> `v-bind:class=""`和`v-bind:style=""`可以接收`字符串和数组`

> class_array: ['aa', 'bb', 'v', 'cc']
>
> class_str: 'aa bb cc active'

```html
<div id="div1">
    <img :src="url" alt="">
    <div :class="class_array"></div>
    <div :class="class_str"></div>
</div>

<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            url: 'https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3101490607,4089794115&fm=58&bpow=400&bpoh=660',
            class_array: ['aa', 'bb', 'v', 'cc'],
            class_str: 'aa bb cc active'
        }
    })
</script>
```



![1550971562964](media/1550971562964.png)

> style_str: 'width:200px;height:200px;background:yellow',
>
> style_json: { width: '200px', background: 'green', height: '200px' }

```html
<div id="div1">
    <div v-bind:style="style_str"></div>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            style_str: 'width:200px;height:200px;background:yellow',
            style_json: { width: '200px', background: 'green', height: '200px' }
        }
    })
</script>
```

![1550972514648](media/1550972514648.png)



### v-model

> 实现表单输入和应用状态之间的双向绑定

`v-model`数据双向绑定

> 数据(data)和input之间双向绑定
>
> 输入组件才能使用
>
> v-model进来的数据, 都是字符串

![1550893402585](media/1550893402585.png)

```html
<body>
    <div id="div1">
        <input type="text" name="" id="" v-model="n1">+
        <input type="text" name="" id="" v-model="n2">=
        <span>{{sum()}}</span>
    </div>
    <script>
        let vm = new Vue({
            el: '#div1',
            data: {
                n1: 0,
                n2: 10,
            },
            methods: {
                sum() {
                    return parseInt(this.n1)+parseInt(this.n2);
                }
            }
        })
    </script>
</body>
```

### v-text

`v-text`直接输出html代码

```html
<body>
    <div id="div1">
        <div v-text="str"></div>
        <!-- <div>{{str}}</div> 和这样写效果一样, 这样里面还可以加别的内容-->
    </div>
    <script>
        let vm = new Vue({
            el: '#div1',
            data: {
                str: '<p>11月26日，一段题为“张家口经开区国土局局长接访时玩手机”的视频在网络平台流传。</p>',
            }
        })
    </script>
</body>
```

![1550910012037](media/1550910012037.png)

### v-html

`v-html`innerHTML

```html
<body>
    <div id="div1">
        <div v-html="str"></div>
    </div>
    <script>
        let vm = new Vue({
            el: '#div1',
            data: {
                str: '<p>11月26日，一段题为“张家口经开区国土局局长接访时玩手机”的视频在网络平台流传。</p>',
            }
        })
    </script>
</body>
```

![1550910103832](media/1550910103832.png)

## 事件

- vue事件

### v-on:

`v-on:`

> v-on:click="fn(x,x,x...)"
>
> 简写
>
> @click="fn(x,x,x...)"

```html
<body>
    <div id="div1">
        <span>{{a}}</span>
        <input type="button" value="+1" v-on:click="sum(3)">
        <!--<input type="button" value="+1" @click="sum(3)"> 简写方式-->
    </div>
    <script>
        let vm = new Vue({
            el: '#div1',
            data: {
                a: 1,
            },
            methods: {
                sum(b) {
                    this.a += b;
                }
            }
        })
    </script>
</body>
```

### v-show

`v-show`display

```html
<style>
    .box {
        width: 300px;
        height: 300px;
        background-color: #ccc;
    }
</style>
<script src="vue.js"></script>



<div id="div1">
    <input type="button" value="显示隐藏" @click="commit()">
    <div class="box" v-show="a"></div>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            a: true,
        },
        methods: {
            commit() {
                this.a = !this.a;
            }
        }

    })
</script>
```



> 显示

![1550927063135](media/1550927063135.png)

> 隐藏

![1550927080256](media/1550927080256.png)

### v-if

`v-if`删除元素

```html
<style>
    .box {
        width: 300px;
        height: 300px;
        background-color: #ccc;
    }
</style>
<script src="vue.js"></script>



<div id="div1">
    <input type="button" value="显示隐藏" @click="commit()">
    <div class="box" v-if="a"></div>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            a: true,
        },
        methods: {
            commit() {
                this.a = !this.a;
            }
        }

    })
</script>
```

> 显示

![1550926958118](media/1550926958118.png)

> 隐藏, 会直接删除元素

![1550926982074](media/1550926982074.png)

### v-for

`v-for`

> 1.数组  v-for="item,index in array"

```html
<div id="div1">
    <ul>
        <li v-for="a in users">{{a.name}},{{a.password}}</li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            users: [
                { name: 'blue', password: '123456' },
                { name: 'zhangsan', password: '11111' },
                { name: 'iiicici', password: '666666' }
            ]
        }
    });
</script>
```

![1550927595859](media/1550927595859.png)

> 2.json v-for="val,key in json"

```html
<div id="div1">
    <ul>
        <li v-for="user,index in users">{{index}}.用户名:{{user.name}},密码:{{user.password}}</li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            users: [
                { name: 'blue', password: '123456' },
                { name: 'zhangsan', password: '11111' },
                { name: 'iiicici', password: '666666' }
            ]
        }
    });
</script>
```

![1550928011576](media/1550928011576.png)

```html
<div id="div1">
    <ul>
        <li v-for="val,name in style">{{name}}:{{val}}</li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            style: {
                width: '200px',
                height: '300px'
            }
        }
    })
</script>
```

![1551059801548](media/1551059801548.png)

> `:key`属性
>
> 1.不能重复
>
> 2.不能变

```html
<div id="div1">
    <ul>
        <li v-for="user in users" :key="user.id">用户名:{{user.name}},密码:{{user.password}}</li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            users: [
                { id: 1, name: 'blue', password: '1111' },
                { id: 2, name: 'aaa', password: '2222' },
                { id: 3, name: 'cici', password: '3333' }
            ]
        }
    })
</script>
```

![1551061432904](media/1551061432904.png)

> 3.字符串 v-for="char,index in str"

```html
<div id="div1">
    <ul>
        <li v-for="s in str">
            {{s}}
        </li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {
            str:'sghjkl'
        }
    })
</script>
```

![1551059988199](media/1551059988199.png)

> 4.数字 v-for="i in num"

```html
<div id="div1">
    <ul>
        <li v-for="i in 10">
            {{i}}
        </li>
    </ul>
</div>
<script>
    let vm = new Vue({
        el: '#div1',
        data: {

        }
    })
</script>
```



![1551060125214](media/1551060125214.png)

### v-pre

> 提高性能
>
> 防止意外

### v-cloak

```html
<script src="vue.js" charset="utf-8"></script>
<style media="screen">
    *[v-cloak] {display:none}
</style>
</head>
<body>
    <div id="div1" v-cloak>
        {{a}}, {{b}}
    </div>
</body>
<script src="1.php" charset="utf-8"></script>
<script>
    let vm=new Vue({
        el: '#div1',
        data: {
            a: 12, b: 5
        }
    });
</script>
```

> 1.php

```php
<?php
sleep(3);
?>
```



> 三秒钟之前是{{a}},{{b}}这种效果

![1551061996228](media/1551061996228.png)

## 数据同步

```html
<body>
    <div id="div1">
        姓名：{{name}}<br>
        年龄：{{age}}
    </div>
</body>
<script>
    let el=document.getElementById('div1');

    let template=el.innerHTML;

    let _data={
        name: 'blue',
        age: 18
    };

    let data=new Proxy(_data, {
        set(obj, name, value){
            //alert(`有人视图设置 ${name}=>${value}`);
            obj[name]=value;

            //数据变了
            //console.log('数据变了');
            render();
        }
    });

    render();

    function render(){
        el.innerHTML=template.replace(/\{\{\w+\}\}/g, str=>{
            str=str.substring(2, str.length-2);

            return _data[str];
        });
    }
</script>
```



## 双向绑定

```html
<body>
    <div id="div1">
        <input type="text" v-model="name"><br>
        姓名：{{name}}<br>
        年龄：{{age}}
    </div>
</body>
<script>
    let el=document.getElementById('div1');

    let template=el.innerHTML;

    let _data={
        name: 'blue',
        age: 18
    };

    let data=new Proxy(_data, {
        set(obj, name, value){
            //alert(`有人视图设置 ${name}=>${value}`);
            obj[name]=value;

            //数据变了
            //console.log('数据变了');
            render();
        }
    });

    render();

    function render(){
        //渲染
        el.innerHTML=template.replace(/\{\{\w+\}\}/g, str=>{
            str=str.substring(2, str.length-2);

            return _data[str];
        });

        //找所有的v-model
        Array.from(el.getElementsByTagName('input'))
            .filter(ele=>ele.getAttribute('v-model'))
            .forEach(input=>{
            let name=input.getAttribute('v-model');
            input.value=_data[name];

            input.oninput=function (){
                data[name]=this.value;
            };
        });
    }
</script>
```

## 虚拟DOM--json

```html
<ul>
  <li>
    <h2></h2>
    <p></p>
  </li>
</ul>
```

> 用json写--虚拟DOM

```json
{
    tag: 'ul',
    child: [
        {tag: 'li', child: [
            ...
        ]}
    ]
}
```

## $ref的基本使用

1. 使用在一般标签上

```html
<div id="app">
    <input ref="count" type="text" v-model="active.name" required name="name" value="">
</div>
```

这样在vue中我们可以使用`$ref`来获取DOM节点, 进行一些DOM操作

示例: 控制input输入框的文字个数

```javascript
new Vue({
    el:'#app',
    data:{
        active:{'name':''}
    },
    watch:{
        active:{
            handler: function (){
                var _this=this;
                var _sum=4;//字数限制为4个
                _this.$ref.count.setAttribute('maxlength',_sum);
            },
            deep:true
        }
    }
})
```

2. 使用在子组件上, 可以用来获取子组件的属性值, 假设子组件里面有一个属性news

```html
<div id="app">
    <hdnews ref="hdnews"></hdnews>
    <hdinfo ref="hdinfo"></hdinfo>
</div>
```

```javascript
new Vue({
    el:'#app',
    mounted:function(){
        console.log(this.$ref.hdnews.news);
        console.log(this.$ref.hdinfo.news);
    }
})
```



# vue-router

> 1. 容器
>
> `<router-view></router-view>`
>
> 2. 路由表
>
> ```
> let router = new VueRouter({
>     routes:[
>         {path,component},
>         {path,component},
>         {path,component},
>         ...
>     ]
> });
> ```
>
> 3. 添加到vm对象
>
> ```
> new Vue({
>     el,data,...,
>     router:router
> })
> ```
>
> 

```html
<script src="vue.js"></script>
<script src="vue-router.js"></script>

<div id="div1">
    <router-link to="/a">页面1</router-link>
    <router-link to="/b">页面2</router-link>
    <router-link to="/c">页面3</router-link>
    <div>文字</div>
    <router-view></router-view>
</div>
<script>
    //路由表
    let router = new VueRouter({
        routes: [
            {
                path: '/a',
                component: { template: '<div>aaaa</div>' }
            },
            {
                path: '/b',
                component: { template: '<div>bbbbb</div>' }
            },
            {
                path: '/c',
                component: { template: '<div>cccc</div>' }
            }
        ]
    });

    let vm = new Vue({
        el: '#div1',
        data: {},
        router:router
    });
</script>
```

![1551089758832](media/1551089758832.png)

> router-view 容器
>
> router-link   a标签

> 为什么要加#号

![1551090161426](media/1551090161426.png)

防止页面刷新, 便于收藏, 便于后退

> 选中之后会有额外class
>
> `router-link-exact-active`和 `router-link-active`
>
> 可以用这个class来做一些选中的事情

```html
<script src="vue.js"></script>
<script src="vue-router.js"></script>
<style>
    .links {
        overflow: hidden;
    }
    .links .nav {
        color: #ccc;
    }
    .links .router-link-active {
        color: black;
    }
</style>
<div id="div1">
    <div class="links">
        <router-link class="nav" to="/a">页面a</router-link>
        <router-link class="nav" to="/b">页面b</router-link>
        <router-link class="nav" to="/c">页面c</router-link>
    </div>
    文字
    <router-view></router-view>
</div>

<script>
    let router = new VueRouter({
        routes: [
            { path: '/a', component: { template: '<div>aaaaa</div>' } },
            { path: '/b', component: { template: '<div>bbbbb</div>' } },
            { path: '/c', component: { template: '<div>ccccc</div>' } }
        ]
    })
    let vm = new Vue({
        el: '#div1',
        data: {

        },
        router: router
    })
</script>
```

![1551091923021](media/1551091923021.png)

> `$route`表示的是当前的路由

```html
<style>
    .links {
        overflow: hidden;
    }

    .links .nav {
        color: #ccc;
    }

    .links .router-link-active {
        color: black;
    }
</style>



<div id="div1">
    <div class="links">
        <router-link class="nav" to="/news/58">页面a</router-link>
    </div>
    文字
    <router-view></router-view>
</div>

<script>
    let router = new VueRouter({
        routes: [
            {
                path: '/news/:id',
                name: 'news',
                component: { template: '<div>新闻:{{$route.params.id}}</div>' }
            }
        ]
    })
    let vm = new Vue({
        el: '#div1',
        data: {

        },
        router: router
    })
</script>
```

![1551093502317](media/1551093502317.png)

> 跳转的两种方式
>
> `<router-link to="/xxx/xxx">`一般配合path使用
>
> `<router-link :to="{name,params}">`一般配合name使用

> 路由跳转符合两个, 具体跳转规则
>
> 两个都符合的话, 哪个在前面就跳转哪个

```html
<div id="div1">
    <div class="links">
        <router-link class="nav" to="/news/aaa">页面</router-link>
    </div>
    <router-view></router-view>
</div>

<script>
    let router = new VueRouter({
        routes: [
            {
                path: '/news/aaa',
                component: { template: '<div>页面aaa</div>' }
            },
            {
                path: '/news/:id',
                component: { template: '<div>页面:id</div>' }
            },

        ]
    })
    let vm = new Vue({
        el: '#div1',
        data: {},
        router: router
    })
</script>
```

![1551094516070](media/1551094516070.png)



> 命名路由
>
> 一般带`name`属性的都是大型路由
>
> ```
> new VueRouter({
>     routes:[
>         {path,component},
>         {path,name,component}
>     ]
> })
> ```
>
> 

> 获取路由信息:`$route`
>
> JS控制路由跳转:`$router`
>
> ```
> this.$router.push(
> 	string|object
> );
> ```
>
> 
>
> 为什么叫push?
>
> history是一个栈

> 监视路由
>
> 1. watch--不推荐
>
> 操作简单, 但是只能看不能干预
>
> 2. "路由守卫"
>
> 既能看也能干预

- 多任务视图

```html
<body>
    <div id="div1">
        <router-link to="/">首页</router-link>
        <router-link to="/news">新闻</router-link>
        <router-view name="header"></router-view>
        <router-view></router-view>
        <router-view name="footer"></router-view>
    </div>

</body>
<script>
    const headerCmp = { template: '<div>顶部</div>' };
    const indexCmp = { template: '<div>首页</div>' };
    const newsCmp = { template: '<div>新闻</div>' };
    const footerCmp = { template: '<div>底部</div>' };
    let router = new VueRouter({
        routes: [
            {
                path: '/',
                name: 'index',
                components: {
                    default: indexCmp,
                    header: headerCmp,
                    footer: footerCmp
                }
            },
            {
                path: '/news',
                name: 'news',
                components: {
                    default: newsCmp,
                    header: headerCmp,
                    footer: footerCmp
                }
            }
        ]
    });
    let vm = new Vue({
        el: '#div1',
        data: {},
        router
    })
</script>
```

![1551100665817](media/1551100665817.png)

## 数据通信

1. 用库

   axios

2. 原生fetch

## v1和v2区别

V1.0组件

```
new Vue({
    components:{
        
    }
});

Vue.component('xxx',{
    data(){
        
    },
    template:,
    method:{
        
    }
})
```

v2.0组件

```

```

## 组件

### 1.土办法

- 父级找子级

> parent.js
>
> 主要是在子级标签上加ref属性
>
> 父级用this.$refs

```js
import Vue from 'vue';
import Child from './child';

export default Vue.component('parent', {
    methods:{
        fn(){
            // this.$refs.c1.num++;
            this.$refs.c1.a();
        }
    },
    template: `
<div>
<div>
父级
<input type="button" value="+1" @click="fn()" />
</div>

<child ref="c1"/>
</div>
`
})
```

> child.js

```js
import Vue from 'vue';

export default Vue.component('child', {
    data() {
        return { num: 0 };
    },
    methods:{
        a(){
            this.num++
        }
    },
    template: `
<div>子级:{{num}}</div>
`
})
```

- 子级找父级

> 父级加:parent="this", 
>
> 子级注册props:['parent'], 用this.parent.xxx

> parent.js

```js
import Vue from 'vue';
export default Vue.component('parent', {
    data() {
        return { num: 0 }
    },
    methods: {
        add() {
            this.num += 5;
        }
    },
    template: `
<div>
<div>
父级: {{num}}
</div>

<child :parent="this"/>
</div>
`
})
```

> child.js

```js
import Vue from 'vue';

export default Vue.component('child', {
    props: ['parent'],
    data() {
        return {};
    },
    methods: {
        fn() {
            //this.parent.num++;
            this.parent.add();
        }
    },
    template: `
<div>
子级
<input type="button" value="+1" @click="fn()" />
</div>
`
})
```



- 组件事件


> 常用:
>
> `$emit`
>
> `$on`

> parent.js

```js
import Vue from 'vue';
import Child from './child';

export default Vue.component('parent', {
    data() {
        return {}
    },
    methods: {
        fn() {
            this.$refs.c1.$emit('add_num', 7);
        }
    },
    template: `
<div>
<div>
父级
<input type="button" value="+1" @click="fn()" />
</div>

<child ref="c1"/>
</div>
`
})
```



> child.js

```js
import Vue from 'vue';

export default Vue.component('child', {
    data() {
        return { num: 0 };
    },
    methods: {
    },
    template: `
<div>
子级:{{num}}
</div>
`,
    created() {
        this.$on('add_num', function (n) {
            this.num += n;
        })
    }
})
```




> 不常用:
>
> `$off`
>
> `$once`

### 2.vuex



## vue2.0

> 需要装`vue-loader`和`vue-style-loader`和`vue-html-loader`和`vue-template-compiler`

- `vue-loader`的作用
  - 解析vue文件

- `vue-style-loader`的作用
  - 解析vue文件中style中的部分
  - 把src文件夹下css文件夹下的css文件自动引入到vue文件中的style里, 合并处理

- `vue-html-loader`的作用
  - 解析vue文件中的template标签中的html
- `vue-template-compiler`
  - 把vue文件中的template部分交给`vue-html-loader`处理
  - 把vue文件中的style部分交给`vue-style-loader`处理
  - 文件中的scripte部分不需要处理, 本身就可以处理

> 如果css需要用less,还需要安装`less`和`less-loader`

> fetch 和 axios 和 vue-resource选其中一个

# vue-cli启动器(脚手架)

> 命令行`vue list`
>
> 可以看到vue的模板, 但并不是全部

![1551423721912](media/1551423721912.png)

> browserify和browserify-simple一般不用
>
> pwa是和vue配的一个框架
>
> simple搭的是简易的目录结构, 基本不用
>
> 大部分用webpack, webpack-simple是简易的, 不用

> 可以到github上搜vue template,可以找到更多的模板

> 初始化一个项目 `vue init webpack [projectname]`

![1551424231969](media/1551424231969.png)

# 测试类型

> 有三大类

- 单元测试(最重要)

> 以某一个模块, 或是某一个文件, 或是某一个函数
>
> 单独测试一个东西
>
> 过一段时间测一下

- 集成测试

> 把几个库组合起来看会不会出现问题, 集成测试是在单元测试之后的
>
> 测试周期更长

- 压力测试

> 程序写完了, 就快发布了, 用工具在压力比较大的情况下进行测试

- 回归测试

> 把库修改了之后放回原来的仓库的时候, 进行测试, 确保没有问题

# 父子间通信

子组件:

```vue
<template>
    <div>
        <div>xxxxxxxxxxxx</div>
        <button :style="style">
            <slot/>
        </button>
        <div>xxxxxxxxxxxx</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            style: `width: 100px; height: 50px; background: ${this.color}; color: ${this.textColor}`
        }
    },
    props: ['color', 'textColor']
}
</script>

<style>
</style>
```

父组件:

```vue
<template>
	<zyf-button color='green' textColor='white'>你好</zyf-button> 
</template>
```



# vuex

<img src="media/vuex.png">

- state--存储,数据
- mutation--修改数据, 追踪: 同步
- action--封装: 组合; 异步
- mutations负责修改state
- 好处: 全局, 统一, 单一

- 能解决的问题:

1. 数据跨组件共享

2. 防止数据意外修改

3. 调试, 测试

- 安装

`npm i vue`

- 使用的三个步骤

```js
// vuex 1.引入
import Vuex from 'vuex';

// vuex 2.声明store对象
//strict:true只在开发模式为true,生产模式为false.通过深度对象比较来做检查,复杂的状态执行会非常慢
const store = new Vuex.Store({
  // strict: true,
  strict: ProcessingInstruction.env.NODE_ENV != 'production', //严格模式: 防止直接修改state
  state: { a: 12, b: 5 },//核心:数据
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
})

// vuex 3.挂载到vue
Vue.use(Vuex);

// 4.写进new Vue()中
new Vue({
    el:'#app',
    store
})
```

- 小案例

可以直接用mutations中的方法, 不用经过actions, 只不过actions是对mutations的封装.

如果想直接使用mutations中的方法, 用下面这种方式

`$store.commit('[mutation_name]',payload)`

主入口:

```js
const store = new Vuex.Store({
  // strict: true,
  strict: process.env.NODE_ENV != 'production', //严格模式: 防止直接修改state
  state: { a: 12, b: 5 },//核心:数据
  mutations: {
    add(state,n){
      state.a+=n;
    }
  },
  actions: {},
  getters: {},
  modules: {}
})
```

视图层:

```vue
<template>
  <div>
    <input type="button" value="+5" @click="fn()">
  </div>
</template>
<script>
export default {
  name: "cmp1",
  methods: {
    fn() {
      //核心
      this.$store.commit("add", 5);
    }
  }
};
</script>
```

- 用actions 修改state数据

`$store.dispatch('[action_name]', payload);`

视图层

```vue
<script>
export default {
    name: "cmp1",
    methods: {
        fn() {
            // this.$store.commit("add", 5);
            this.$store.dispatch("add", 7);
        }
    }
};
</script>
```

主入口

```js
const store = new Vuex.Store({
    // strict: true,
    strict: process.env.NODE_ENV != 'production', //严格模式: 防止直接修改state
    state: { a: 12, b: 5 },//核心:数据
    mutations: {
        add(state, n) {
            state.a += n;
        }
    },
    actions: {
        add(context, n) {
            context.commit('add', n);
        }
    },
    getters: {},
    modules: {}
})
```

- state是一个存放数据的json

- mutation其实是一个函数, 一般认为是对一个操作的封装

修改数据唯一合法的地方

一个mutation可以改多个state

```
mutation(state,arg){
    state.a+=xx;
    state.b+='xxx';
}
```

- action也是一个函数

同一个action,可以修改很多mutation

比如购买一个商品会更改购买状态, 钱包的钱, 积分等等.

```
action(context,arg){
	context.commit('mutation',arg);
}
```

- 操作getters经常在computed里面.

在computed里既可以读又可以修改.

读取就用getters读取.写入就是对action的调用

```vue
computed: {
        count: {
            get() {
                return this.$store.getters.count;
            },
            set(value) {
                this.$store.dispatch('set_a', value - 5);
                this.$store.dispatch('set_b', 5);
            }
        }
    }
```

computed不用频繁的更新, 读取服务器上数据的时候, 这个特性更好用

- 批量增加getters上的方法给computed用

vue辅助方法:

> mapState  把state映射成computed  注意: mapState情况下, 只是简单的想获取数据, 不需要数据之间有运算, 就可以使用mapState.

> mapActions  把action映射成methods

> mapGetters  把getters映射成computed  注意:mapGetters, 数据之间还需要封装一层等等, 就可以使用mapGetters

# 面试题

问题一：构建的 vue-cli 工程都到了哪些技术，它们的作用分别是什么？

1.vue.js: vue-cli工程的核心， 主要特点是 双向数据绑定 和 组件系统

2.vue-router: vue官方推荐使用的路由框架。

3.vuex: 专为vue.js应用项目开发的状态管理器， 主要用于维护vue组件间共用的一些 变量 和方法。

4.axios(或者fetch, ajax): 用于发起GET, POST等http请求， 基于Promise设计。

5.vux等： 专为vue设计的移动端UI组件库。

6.创建一个emit.js文件， 用于vue事件机制的管理.

7.webpack: 模块加载和vue-cli工程打包器

问题二：vue-cli 工程常用的 npm 命令有哪些？

下载node_modules资源包的命令:

`npm install`

启动vue-cli开发环境的npm命令:

`npm run dev`

vue-cli生成 生产环境部署资源的 npm 命令:

`npm run build`

用于查看vue-cli生产环境部署资源大小的npm命令:

`npm run build --report`

