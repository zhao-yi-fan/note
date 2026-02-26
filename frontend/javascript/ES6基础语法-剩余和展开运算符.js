/**
 * "..."在ES6语法中, 三个点有三种含义
 *      1. 剩余运算符
 *      2. 拓展运算符
 *      3. 展开运算符: 把数组(对象/类数组)中的每一项展开 xxx,xxx,xxx...
 */


// 拓展运算符============================
let ary = [12, 23, 34];
let [...arg] = ary; // ary.slice(0)效果一样,相当于克隆
console.log(...arg);//=> 12 23 34
console.log(arg);//=> [12, 23, 34]





// 剩余运算符====================



/*
// 获取传递值中的第一个和剩下的
function fn(context, ...arg) {
    console.log(context, arg);
    //=> 这里的arg是一个数组 / arguments是类数组
}
let obj = {};
fn(obj, 10, 20, 30);

function sum(...arg) {
    // 传递几个实参, arg中就存储多少个, 此时的arg和arguments一样的, 区别是arg是一个数组, arguments是一个类数组
}
*/



// 展开运算符===========================

// 数组
// let ary = [12, 23, 34];
// Math.max(...ary);//=> Math.max(12,23,34)
// let fn = function (a, b, c) {
//     console.log(a, b, c);
// }
// fn(ary);//=> a:ary b:undefined c:undefined
// fn(...ary);//=> fn(12,23,34) 把数组中的每一项分别传递给一个函数, 此时我们使用展开运算符把数组展开即可

// let ary = [12,23]
// let newAry = [...ary, 100];//=> [12, 23, 100]
// let newAry = [...ary, 100, ...ary];//=> [12, 23, 100, 12, 23]

// 对象
// let obj = { name: 'xxx', age: 20 };
// let newObj = { ...obj, sex: 0 };//=>{name: 'xxx', age: 20 ,sex; 0} 把原有对象展开(克隆)放到新对象中













