// 5、如何实现数组去重？（乐视TV）
// [12, 13, 13, 13, 12, 13, 14]//=> 依次遍历数组中的每一项, 让每一项的值作为对象的属性名和属性值(属性值存啥都可以), 每一次存储之前验证当前对象中是否已经存在这个属性了(in/hasOwnProperty/属性值不是undefined...), 如果有这个属性了, 说明当前项在数组中已经存在了, 我们把当前项在原有数组中移出即可, 如果不存在, 存储到对象中即可
// function unique(ary) {
//     var obj = {};
//     for(var i = 0; i < ary.length; i++){
//         var item = ary[i];
//         if (obj.hasOwnProperty(item)) {
//             ary.splice(i, 1);
//             i--;
//             continue;
//         }
//         obj[item] = item;
//     }
// }

// 数组ary, ary[i]中的i是索引, ary[i]整体是i索引对应的项.
// 对象obj, obj[i]中的i是属性, obj[i]整体是i属性对应的属性值.


// 优化方案一: 
//      不使用splice删除(删除当前项, 后面索引移动位置, 如果后面有很多项, 导致性能消耗较大)
//      解决: 把最后一项替换成当前项, 在把最后一项删除即可(会改变原有数组的顺序, 如果不改变顺序的去重, 不能使用该方法)
/*
function unique(ary) {
    var obj = {};
    for(var i = 0; i < ary.length; i++){
        var item = ary[i];
        if (obj.hasOwnProperty(item)) {
            ary[i] = ary[ary.length - 1];
            ary.pop();// 删除最后一项 或者使用 ary.length--
            i--;
            continue;
        }
        obj[item] = item;
    }
     
    obj = null;//=> 优化二: obj没用后手动释放一下, 节约内存, obj没有被外面占用, 即使不手动释放, 栈内存释放后, 浏览器检测, obj指向的堆内存也会被浏览器自动释放, 手动是为了释放快一点.
    return ary;
}
var ary = [1,5,4,6,5,4,5,4,4,5,6,1,2,3,4,5,6,2,5,2,3];
var res = unique(ary);
console.log(res)
*/

//======= 注意: unique不用手动销毁, 栈内存不自动销毁的前提是内部变量被外部占用. 但是unique函数中ary变量并没有被占用, 函数执行完会自动销毁栈内存. 这是因为ary传递的不是值, 是内存地址, 在unique函数中修改的ary, 实际上就是修改的全局变量ary. 函数执行完毕又把地址返回, 无论让res接收或者不接收都与私有作用域无关, 这个地址一直代表的 全局作用域旁的堆内存.


// var ary = [12, 13, 45, 123, 4, 65, 65, 45, 4];
//=> 为啥ary.sort可以执行: 因为sort是array.prototype上的内置的属性方法, 而ary是它的一个实例, 可以基于__proto__找到原型上的这个方法, 然后调取使用
// ary.sort(function (a, b) {
//     return a - b;
// });
/**
 * 基于内置类的原型扩展方法, 供它的实例调取使用
 *      1. 我们增加的方法最好设置"my"前缀(前缀是什么自己定), 防止把内置方法重写
 */
// Array.prototype.myUnique指向匿名函数, 如果写成命名函数也可以, 但没什么用, 就是为了和内置方法显示一样.
// Array.prototype.myUnique = function myUnique() {
//     //=> 方法中的this一般都是当前类的实例(也就是我们要操作的数组)
//     //=> 操作this相当于操作ary, 方法执行完成会改变原有数组
//     var obj = {};
//     for (var i = 0; i < this.length; i++){
//         var item = this[i];
//         obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.length--, i--) : obj[item] = item;
//     }
//     obj = null;

// }
// ary.myUnique();//=> this:ary 此时方法执行完成的返回值是undefined(原有数组改变)
// console.log(ary);


// 下面三个虽然都是ary执行相同的方法, 但是this的指向都变了, 不过后两个种几乎不用
// ary.myUnique();//=> this: ary
// ary.__proto__.myUnique();//=> this: ary.__proto__(IE浏览器中屏蔽了我们对__proto__的操作) 这种方式很少用
// Array.prototype.myUnique();//=> this: Array.prototype 这种方式很少用


// ===========================
// 执行sort返回排序后的数组(也是array的一个实例), 执行reverse返回的也是一个数组, 执行pop返回的是删除的那一项(不是数组)
// js中的链式写法: 保证每一个方法执行返回的结果依然是当前类的实例, 这样就可以继续调取方法使用了
// var ary = [12, 13, 45, 123, 4, 65, 65, 45, 4];
// ary.sort(function (a,b) {
//     return a-b;
// }).reverse().pop();

// ary.sort(function (a,b) {
//     return a-b;
// }).reverse().pop().reverse();// 报错

// ary.sort(function (a,b) {
//     return a-b;
// }).reverse().slice(2, 7).join('+').split('+').toString().substr(2).toUpperCase();
// slice数组截取, 返回数组.  join数组每一项中间加东西, 返回字符串.  split把字符串带有东西的去掉, 返回数组.



// Array.prototype.myUnique = function myUnique() {
//     var obj = {};
//     for (var i = 0; i < this.length; i++){
//         var item = this[i];
//         obj.hasOwnProperty(item) ? (this[i] = this[this.length - 1], this.length--, i--) : obj[item] = item;
//     }
//     obj = null;
//     return this;
// }

// // 返回一个数组中的最大值
// var max = ary.myUnique().sort(function (a,b) {
//     return a-b;
// }).pop();
// 解决了很多问题:
// 1. 用对象键值对的方式来减少for循环导致的循环次数过多,内存消耗过大问题
// 2. 在对象键值对的方式里解决数组塌陷问题
// 3. 用splice删除后面每一项向前移位的问题
// 4. 手动释放堆内存优化问题
// 5. 扩展到内置类的原型上, 实例可以点出来
// 6. 通过return this还可以使用链式写法


//=> 思考题
// 让下面的运算成立, res=6
// var n =5;
// var res = n.plus(3).minus(2);
// console.log(res)
 
~function (pro) {
    pro.plus = function plus(val) {
        val === undefined ? val = 0 : true;
        val ? val : 0;
        return this + Number(val);
    }
    pro.minus = function minus(val) {
        val === undefined ? val = 0 : true;
        return this - Number(val);
    }
}(Number.prototype)
var n = 5;
var res = n.plus(3).minus(2);
console.log(res)



