/**
 * 单例设计模式(singleton pattern)
 * 1. 表现形式
 * var obj = {
 *  xxx:xxx,
 *  ...
 * };
 * 在单例设计模型中, obj 不仅仅是对象名, 它被称为"命名空间[NameSpace]", 把描述事物的属性存放到命名空间中, 多个命名空间是独立分开的, 互不冲突
 * 命名空间: 就是开辟一个堆内存, 给堆内存起一个名字(开辟堆内存, 变量名指向堆内存的地址, 名字代表堆内存)
 * 
 * 2. 作用
 * => 把描述同一件事物的属性和特征进行"分组, 归类"(存储在同一个堆内存空间中), 因此避免了全局变量之间的冲突和污染.
 * var pattern1 = {name: 'xxx'}
 * var pattern2 = {name: 'xxx'}
 * 
 * 3. 单例设计模式命名的由来
 * => 每一个命名空间都是js中的Object这个内置基类的实例, 而实例之间是互相独立互不干扰的, 所以我们称它为"单例: 单独的实例"
 */

 /*
var name = "楼兰"
var age = 18;
var sex = "girl";

var name = "云朵"
var age = 19;
var sex = "boy";

var person1 = {
    name: "楼兰",
    age: 18
};
var person2 = {
    name: "云朵",
    age: 19
};
*/

/**
 * 高级单例模式
 * 1. 在给命名空间赋值的时候, 不是直接赋值一个对象, 而是先执行匿名函数, 形成一个私有作用域AA(不销毁的栈内存), 在AA中创建一个堆内存, 把堆内存地址赋值给命名空间.
 * 2. 这种模式的好处: 我们完全可以在AA中创造很对内容(变量或者函数), 哪些需要供外面调取使用的, 我们暴露到返回的对象中(模块化实现的一种思想)
 */
/*
var nameSpace = (function () {
    var n = 12;
    function fn() {
        //...
    }
    return {
        fn: fn
    }
})();
*/

/**
 * this
 *  1. 给当前元素的某个事件绑定方法, 当事件触发方法执行的时候, 方法中的this是当前操作的元素对象
 *      oBox.onclick = function () {
 *          //=> this.oBox        
 *      }
 *  2. 普通函数执行, 函数中的this取决于执行的主体, 谁执行的, this就是谁(执行主体: 方法执行, 看方法名前面是否有"点", 有的话, 点前面是谁this就是谁, 没有this是window)
 *      function fn() {//=> AAAFFF000
            console.log(1);
        }
        var obj = {
            fn: fn //=> fn: AAAFFF000
        };
        //=> 执行的是相同的方法(不同地方在于函数执行方法中的this是不一样的)
        obj.fn();//=> this.obj
        fn();//=> this.window

        //=> 自执行函数执行, 方法中的this是window
        ~function () {
            //=> this: window
        }();
 */

/*
var n = 2;
var obj = {
    n: 3,
    fn: (function (n) {
        n*=2;
        this.n+=2;
        var n=5;
        return function (m) {
            this.n *= 2;
            console.log(m + (++n));
        }
    })(n)//=> obj.n会报错
};
var fn = obj.fn;
fn(3);
obj.fn(3);
console.log(n, obj.n);
*/


/**
 * 模块化开发
 *  1. 团队协作开发的时候, 会把产品按照功能板块进行划分, 每一个功能板块有专人负责开发
 *  2. 把各个板块之间公用的部门进行提取封装, 后期在想实现这些功能, 直接的调取引用即可(模块封装)
 */
//=> 公共工具库
var utils=(function () {
    return {
        aa:function () {

        }
    }
})();

//=>皮肤模块开发者
var skipRender = (function () {
    var fn = function () {
        //...
    };
    //...
    return {
        init: function () {

        },
        fn:fn
    }
})();
skipRender.init();

//=>天气模块发开者
var weatherRender = (function () {
    var fn = function () {

    };
    return {
        init: function () {
            fn();//=>调取自己模块中的方法直接调取使用即可
            skipRender.fn();//=>调取别人模块中的方法
        }
    }
})();
weatherRender.init();