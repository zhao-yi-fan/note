/**
 * 编写一个方法fn, 实现任意数求平均数(去除数字中的最大和最小, 然后再算平均数, 保留小数点后面两位)
 */

/*
let fn = function () {
    //=> arguments:类数组(不能直接调取数组原型上的方法)
    //1. 先给arguments排序(不能直接使用sort方法), 把排序后的值去掉首尾(去掉最大值和最小值)
    //2. 把剩下的值求和, 除以总长度, 求出平均值(保留小数点后两位)
    let ary = [];
    // 将arguments类数组转为数组
    for (let i = 0; i < arguments.length; i++) {
        ary.push(arguments[i]);
    }
    // 给ary排序
    ary.sort(function (a, b) {
        return a - b;
    });
    // 去掉ary首尾
    ary.pop();
    ary.shift();
    // 求ary总和
    let total = 0;
    for (let i = 0; i < ary.length; i++) {
        total += ary[i];
    }
    // 保留小数点后两位
    return (total / ary.length).toFixed(2);
}
console.log(fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2, 8.9));
*/

let fn = function () {
    //=> 把arguments类数组转换为数组ary(把类数组克隆一份一模一样的, 最后存储到数组中) => 数组的slice可以实现克隆的
    //=> *****把内置的slice方法执行 Array.prototype.slice() / [].slice()...
    // slice方法中的this是.前面的数组, 把this指向改为arguments, 这意味着数组无论是空数组还是非空数组都无所谓, this已经改为了arguments类数组了. 这样就解决了类数组不能调用数组中slice方法的问题了
    // 类数组借用数组原型上的方法执行, 实现相关的操作(借用slice实现把类数组转换为数组)
    // 前提: 类数组和数组类似, 都有length和索引(字符串也符合这个前提, 所以也可以这样做)


    // => 借用sort给arguments排序, 除此之外其他的很多数组的方法都可以被arg借用
    // [].sort.call(arguments, function (a, b) {
    //     return a - b;
    // })

    let ary = [].slice.call(arguments);

    ary.sort(function (a, b) {
        return a - b;
    }).pop();
    ary.shift();

    // 使用eval使字符串转换为js表达式, 求和并保留小数点后两位
    return (eval(ary.join('+')) / ary.length).toFixed(2);
}
console.log(fn(10, 9.8, 9.5, 8.7, 8.8, 8, 9.2, 8.9));



/*
// 重写数组的slice方法, 实现: ary.slice(0)相当于把ary克隆一份新数组, slice(不写0也是从0开始)
Array.prototype.mySlice = function () {
    let newAry = [];
    for(let i = 0; i<this.length; i++){
        newAry.push(this[i])
    }

    // // 将arguments类数组转为数组
    // for (let i = 0; i < arguments.length; i++) {
    //     ary.push(arguments[i]);
    // }
    return newAry;
};
let ary = [12, 23, 34];
ary.mySlice();//=> [12,23,34]
*/













