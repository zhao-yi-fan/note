// let ary = [12, 13, 14, 23, 24, 13, 15, 12];

// let max = Math.max.apply(null, ary);
// console.log(max);

// 基于ES6中的展开运算符
// let max = Math.max(...ary);
// console.log(max)


/**
 * 解构赋值: 按照一个数据值的结构, 快速解析获取到其中的内容
 *      1. 真实项目中一般都是针对于数组或者对象进行解构赋值
 */

// 数组解构赋值=====================
// let ary = [12, 23, 34];

// let a = ary[0],
//     b = ary[1],
//     c = ary[2];
// 太低级


//====================================
// let ary = [12, 23, 34];
// let [a, b, c] = ary;// 让等号左边出现和右边相同的数据结构, 左边可以创建一些变量快速获取到右边对应位置的值(解构赋值)
// console.log(a, b, c);

// 只取第一项
// let [a] = ary;
// console.log(a);

// 只取最后一项
// let [, , c] = ary;
// console.log(c);

// 只取第一项和最后一项
// let [a, , c] = ary;
// console.log(a, c);

// 获取第一项, 把剩下的项作为一个数组返回
// ...在此处称之为剩余运算符: 除了前面以外的项, 都放在一个数组中
// let ary = [12, 23, 34, 45, 56];
// let [a, ...b] = ary;
// console.log(a, b);//=> 12 [23, 34, 45, 56]

// let [a, ...b, c] = ary;//=> Uncaught SyntaxError: Rest element must be last element 剩余运算符处于解构中最后的位置




//=> 在解构的时候可以给变量设置默认值: 对应解构中有值, 就设置不了. 没有值, 才可以设置.
//=> 如果当前变量对应解构中的这一项没有值, 变量用默认值undefined, 可以设置初始值.
// let ary = [12];
// let [a, b] = ary;//=>
// console.log(a, b)//=> 12 undefined

// let [a, b = 0] = ary;
// console.log(a, b)//=> 12 0

//=> 如果变量对应解构中的这一项有值, 那么设置初始值也没有用.如果解构中的值是null, 那么还是null. 如果解构中的值是undefined, 那么就会是设置的初始值.
// let ary = [12];
// let [a, b = 0] = ary;
// console.log(a, b)//=> 12 0

// let ary = [12, null];
// let [a, b = 0] = ary;
// console.log(a, b)//=> 12 null

// let ary = [12, undefined];
// let [a, b = 0] = ary;
// console.log(a, b)//=> 12 0




// a&b互换位置
// let a = 12,
//     b = 13;

// 1.
// let c = a;
// a = b;
// b = c;
// console.log(a, b);

// 2.
// a = a + b;
// b = a - b;
// a = a - b;
// console.log(a, b);

// 3.
// [a, b] = [b, a];// [13, 12]
// console.log(a, b);



// 对象解构赋值==============================
//=> 对象解构赋值默认情况下要求: 左侧变量名和对象中的属性名一致才可以
// let obj = {name: 'xxx', age: 25, sex: 0};
// let { name, age } = obj;//=> xxx 25
// console.log(name, age);

// let { sex } = obj;
// console.log(sex);//=> 0

// 给解构的属性名起别名作为我们使用的变量
// let {age: ageAA} = obj;
// console.log(age);//=>Uncaught ReferenceError: age is not defined
// console.log(ageAA);//=> 25

// 获取一个不存在的属性会undefined
// let {friend: friendAA} = obj;
// console.log(friend);//=> Uncaught ReferenceError: friend is not defined
// console.log(friendAA);//=> undefined


// 给不存在的属性设置默认值
// let {friend = 0} = obj;
// console.log(friend);//=> 0


//=> 把传递的对象解构了(不传递值, 默认赋值为空对象: 现在传递对象或者不传递, 形参接收到的都是对象), 解构的时候, 可以把传递进来对象中, 如果某个属性不存在, 我们赋值默认值
// 函数形参赋值默认值
let fn = function ({
    name = '珠峰',
    age = 0,
    sex = '女'
} = {}) {
    console.log(name, age, sex);
};
//=> 传入一个对象, 对传入的对象进行解构, 不走"={}"这一步, 传入的是什么就照{name = '珠峰',age = 0,sex = '女'} 这样进行解构 
/*
其实是这样写的
let fn = function (option = {}) {
    // 解构
    let {
        name = 'xxx',
        age = 25
    } = option
}
上面是把两步操作合成了一步
*/

fn({
    name: 'xxx',
    age: 25
});

//=> 如果没有实参, 函数会自己创建一个空对象, 把空对象进行解构, 空对象什么属性都没有, 解构就相当于固定初始化了变量而已.
// fn();


// 题
// 令a = 'xxx', b=12, c=[23,34,45]
let value = { name: 'xxx', age: 25, score: [12, 23, 34, 45] };
let { name: a, score: [b, ...c] } = value;
console.log(a, b, c);











