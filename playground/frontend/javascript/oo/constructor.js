/**
 * 基于构造函数创建自定义类 (constructor)
 *  1. 在普通函数执行的基础上"new xxx()", 这样就不是普通函数执行了, 而是构造函数执行, 当前的函数名称之为"类名", 接收的返回结果是当前类的一个实例
 *  2. 自己创建的类名最好第一个单词首字母大写
 *  3. 这种构造函数设计模式执行, 主要用于组件, 类库, 插件, 框架等的封装, 平时编写业务逻辑一般不这样处理
 */

// function Fn () {

// }
// Fn();//=> 普通函数执行, 此时Fn是普通函数


/**
 * js中创建值有两种方式
 *  1. 字面量表达式(单例模式)
 *  2. 构造函数模式
 */
// 构造函数模式
// function Fn () {

// }
// var f = new Fn();//=> Fn是类 f是类的一个实例
// var f2 = new Fn();//=> f2也是Fn的一个实例, f2和f是独立分开的, 互不影响

// // 单例模式
// var obj1 = {};//=> obj1是Object的一个实例
// var obj2 = {};//=> obj2是Object的一个实例


// 基本数据类型基于两种不同的模式创建出来的值是不一样的
// 基于字面量方式创建出来的值是基本类型值
// 基于构造函数创建出来的值是引用类型
//   num2 是数字类的实例, num1也是数字类的实例, 它只是js表达数字的方式之一, 都可以使用数字类提供的属性和方法

// var obj = {};//=> 字面量方式(单例模式)
// var obj = new Object();//=> 构造函数模式
// // 不管是哪一种方式创建出来的都是Object类的实例, 而实例之间是独立分开的, 所以 var xxx={} 这种模式就是js中的单例模式


// var num1 = 12;
// var num2 = new Number(12);
// console.log(typeof num1);//=> "number"
// console.log(typeof num2);//=> "object"
// // toFixed()保留小数点后几位
// console.log(num2.toFixed(2));//=> "12.00"
// console.log(num1.toFixed(2));//=> "12.00"

// 字面量 和 构造函数创建出来的有区别吗?
//      对于 引用类型 创建出来的没有区别, 字面量创建的是对象, 构造函数创建出来的也是实例, 都是object的对象
//      对于 基本类型 创建出来的有区别, 字面量创建出来的是基本类型值, 构造函数创建出来的是引用类型值.
//      但是本质没有区别, 除了类型不一样之外(只是js中的不同表达形式), 但确实都是Number类的一个实例, 在Nuber类中定义的属性和方法都可以用.


// =====================================================
// function Fn() {
//     var n = 10;
//     this.name = name;
//     this.age = age + n;
// }

//=> 普通函数执行
/*
//1. 形成一个私有的作用域
//2. 形参赋值
//3. 变量提升
//4. 代码执行
//5. 栈内存释放问题
Fn();
*/

//=> 构造函数执行

/**
 * 步骤
 * 1. 向普通函数执行一样, 形成一个私有的作用域(栈内存)
 *  - 形参赋值
 *  - 变量提升
 * 2. [构造函数执行独有] 在js代码自上而下执行之前, 首先在当前形成的私有栈中创建一个对象(创建一个堆内存: 暂时不存储任何的东西),
 *      并且让函数中的执行主体(this)指向这个新的堆内存(this===创建的对象)
 * 3. 代码自上而下执行
 * 4. [构造函数执行独有]代码执行完成, 把之前创建的堆内存地址返回(浏览器默认返回)
 */
/*
也就是开始创建的对象其实就是当前Fn这个类的一个实例, 我们让this指向这个实例, 代码执行中的this.xxx = xxx 都是
给实例设置"私有属性", 最后浏览器会把默认创建的实例返回, 供外面接收.
再次执行new Fn, 就是把上面的操作克隆一份, 会形成新的实例(新的内存空间), 所以说实例是独立分开的.
*/
// var f1 = new Fn('xxx', 20);
// var f2 = new Fn('aaa', 30);
// console.log(f1 === f2);//=> false: 两个不同的实例(两个不同的堆内存地址)
// console.log(f1.age);//=> 30
// console.log(f2.name);//=> 'aaa'
// console.log('name' in f1);//=>ture name&age在两个不同的实例都有存储, 但是都是每个实例自己私有的属性
// console.log(f1.n);//=>undefined 只有this.xxx=xxx的才和实例有关系, n是私有作用域中的一个私有变量而已(this是当前类的实例)

// =================================================================

/**
 * 构造函数执行, 不写return,浏览器会默认返回创建的实例, 但是如果我们自己写了return呢?
 *  1. 如果return的是一个基本值, 返回的结果依然是类的实例, 没有收到影响
 *  2. 如果return的是引用值, 则会把默认返回的实例覆盖, 此时接收到的结果不再是当前类的实例了.
 * 
 * 构造函数执行的时候, 尽量减少return的使用, 防止覆盖实例
 */

function Fn () {
    var n = 10;
    this.m = n;
    return 2;
}
var f = new Fn();
console.log(f);//=> { m: 10 }

function Fn () {
    var n = 10;
    this.m = n;
    return {name: '哈哈'};
}
var f = new Fn();
console.log(f);//=> { name: '哈哈' }


function Fn () {
    var n = 10;
    this.m = n;
    console.log(1);
}
var f = new Fn();
console.log(f);
//=> 1  
//   Fn { m: 10 }

function Fn () {
    var n = 10;
    this.m = n;
    return;//=> 这样return是结束代码执行的作用, 并且不会覆盖返回的实例
    console.log(1);
}
var f = new Fn();
console.log(f);//=> { m: 10 }

/*
Fn;// 函数本身
Fn();// 函数执行
new Fn();//创建一个实例
new Fn;//在构造函数执行的时候, 如果Fn不需要传递实参, 我们可以省略小括号, 意思还是创建实例(和加小括号没有区别)
*/

//=> instanceof: 检测某一个实例是否隶属于这个类
// console.log(f instanceof Fn);//=> true
// console.log(f instanceof Array);//=> false
// console.log(f instanceof Object);//=> true(万物皆对象: 所有的对象, 包含创建的实例都是Object的实例)


//=> in: 检测当前对象是否存在某个属性
// console.log('m' in f);//=> true
// console.log('n' in f);//=> false
// console.log('toString' in f);//=> true toString 是它的公有属性

//=> hasOwnProperty: 检测当前属性是否为对象的私有属性(不仅要有这个属性, 而且必须还是私有的才行)
console.log(f.hasOwnProperty('m'));//=>true
console.log(f.hasOwnProperty('n'));//=>false 连这个属性都没有
console.log(f.hasOwnProperty('toString'));//=>false 虽然有这个属性, 但是 不是私有的属性


// 思考题: 编写一个方法hasPubProperty, 检测当前属性是否为对象的公有属性, 和hasOwnProperty对应
function hasPubProperty (obj, attr) {
    //=>obj: 要检测的对象
    //=>attr: 要检测的属性
    //...
}
hasPubProperty(f, 'm');//=> false
hasPubProperty(f, 'n');//=> false
hasPubProperty(f, 'toString');//=> true



