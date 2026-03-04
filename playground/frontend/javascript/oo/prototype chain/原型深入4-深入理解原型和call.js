/**
 * 用来改变某一个函数中this关键字指向的
 *  call
 *  apply
 *  bind
 */

let name = "珠峰";
let fn = function () {
    console.log(this.name);
    
}
let obj = {
    name: "OBJ",
    fn: fn
};
let oo = {name: "OO"};
// fn();//=> this: window "珠峰"
// obj.fn();//=> this: obj "OBJ"


/**
 * call
 *  1.[fn].call([this], [param]...)
 *      fn.call: 当前实例(函数FN)通过原型链的查找机制, 找到Function.prototype上的call方法 => function call(){[native code]}
 *      fn.call(): 把找到的call方法执行
 * 
 *      当call方法执行的时候, 内部处理了一些事情
 *          => 首先把要操作函数中的this关键字变为CALL方法第一个传递的实参值
 *          => 把CALL方法第二个及第二个以后的实参获取到
 *          => 把要操作的函数执行, 并且把第二个以后的传递进来的实参传给函数
 */
// fn.call(oo);//=> this:oo
// fn.call(obj, 10, 20, 30);//=> this:obj

Function.prototype.call = function () {
    let param1 = argument[0],
        paramOther = [];//把arg中除了第一个以外的实参获取
    // this: fn 当前要操作的函数(函数类的一个实例)
    
    // 把fn中的this关键字修改为param1(就相当于把call中的this关键字中的this关键字修改为param1, 因为call中的this是fn)
    

    // 把fn执行, 把paramOther分别传递给fn
    // this(paramOther)  粗略的写
};
fn.call(obj)


//==========================
let sum = function (a, b) {
    console.log(this);
    
}
let opt = {n: 20};

// sum.call(opt, 20, 30);//=> call执行 call中的this是sum, 把this(call中的)中的"this关键字"改为opt, 把this(call中的)执行, 把20, 30传递给它 => sum中的this是opt a=20 b=30

sum.call.call(opt)
//1. sum.call 找到Function.prototype.call方法(也是一个函数, 也是函数类的一个实例, 也可以继续调用call/apply等方法) => A(函数)
//2. A.call(opt)  继续找到原型上的call方法, 把call方法执行, 把call中的this关键字指向为opt, 然后把A执行

// 例题
Function.prototype.call = function callAA() {
    // 1.把this(fn)中的"this关键字"修改为第一个参数值(obj)
    // 2.把this(fn)执行, 把第二个及以后接收的参数值传递给函数(10, 20)
    // this(10, 20)
}
fn.call(obj, 10, 20)



function fn1() {
    console.log(1);
    
}
function fn2() {
    console.log(2);
    
}
fn1.call(fn2);//=> 找到CALL-AA把它执行, CALL-AA中的this是fn1, 第一个参数传递的是fn2, 把fn2传递给this(call中的)中的this, 但是fn1中没有this, 所以就没有传this这一步骤. => 下一步是执行call中的this, 实际上就是把fn1执行 => 1
fn1.call.call(fn2);
//=> 找到callAA让它执行, callAA中的this是fn1.call, 把callAA中的this中的this改为fn2(callAA中有this, 肯定修改了), 然后把callAA中的this执行, 实际上执行的是fn1.callAA(另一个), 把接收到第二个及以后的参数传递给callAA, 没有参数传递, 所以直接执行fn1.callAA. => 先找到callAA, 把它执行, 此时它中的this是fn2, 先把this中的this修改为第一个参数, 但没有参数, 实际上让fn2中的this变成了undefined, 再执行callAA中的this(fn2). => 2
Function.prototype.call(fn1);
//=> 先找到callAA把它执行, 它中的this是Function.prototype. 然后把Function.prototype中的this修改为fn1, 再把Function.prototype执行, Function.prototype是一个匿名函数也是一个空函数, 执行没有任何输出
Function.prototype.call.call(fn1);
//=> 先找到callAA让它执行, 它中的this是Function.prototype.call. 然后把Function.prototype.call中的this修改为fn1, 再把Function.prototype.call执行. => callAA执行, 现在的this是fn1, 其实就是让fn1执行. => 1

Function.prototype.call.call(fn1);
//<==> fn1.call.call(fn2)
//因为 fn1.call===Function.prototype.call : true



fn1.call.call.call.call.call(fn2);
// call执行,把fn1.call.call.call.call中的this改为fn2, 把fn1.call.call.call.call执行. => 再call执行, 此时this是fn2, 把fn2中的this改为undefined, 执行fn2.
// 其实call有两个及两个以上的时候, call只执行两次就结束了, 因为第一次call执行中, 改变后一个call的this指向, 然后再让后一个call执行, 后一个call中的this已经被前一个call执行的时候指定了, 而且后一个call参数一定为undefined, 不能重新指定this的指向.所以call只会执行两次
//=> fn1.call.call.call.call===Function.prototype.call








