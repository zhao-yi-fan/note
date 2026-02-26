/**
 * 需求一: 获取数组中的最大值(最小值)
 *      1. 给数组先排序(由大到小排序), 第一项就是最大值
 *      2. 假设法:假设第一个值是最大值, 一次遍历数组中后面的每一项, 和假设的值进行比较, 如果比假设的值要大, 把当前项赋值给max..
 *      3. 基于Math.max完成
 */

let ary = [12, 13, 14, 23, 24, 13, 15, 12];

// Math.max


// Math.max - 基于eval转换字符串为js表达式
/**
 * 前引
 * [12,13,14].toString();//=> "12,13,14"
    eval("12,13,14");//=> 14
    1.eval: 把字符串转换为js表达式
        eval("1+2")//=> 3
    2.括号表达式(小括号的应用)
        用小括号包起来, 里面有很多项(每一项用逗号分隔), 最后只获取最后一项的内容(但是会把其它的项也都过一遍)
        (function () {
            console.log(1);
        }, function () {
            console.log(2);
        })();//=> 2

        let a=1===1?(12,23,14):null;//=> 14

    *不建议大家过多使用括号表达式, 因为会改变this
        let fn = function(){console.log(this);}
        let obj = {fn:fn};
        // (fn, obj.fn)();//=> 执行的是第二个obj.fn, 但是方法中的this是window而不是obj
        (obj.fn)();//=> this:obj
 */


// eval("12,13,14") 输出确实是12,13,14.  但是外面还有一个小括号, 导致最终只输出了最后一项14
// 不过只要使eval()中只有一项, 就会把字符串转换成js表达式
// 就像eval("Math.max(12, 13, 14, 23, 24, 13, 15, 12)")//=> 24
// console.log(eval("Math.max(" + ary.toString() + ")"));



// Math.max - 基于apply的特征
// 利用了apply的一个特征: 虽然放的是一个数组, 但是执行方法的时候, 也是把数组中的每一项一个个的传递给函数
console.log(Math.max.apply(null, ary));
// 第一个参数不重要, 传递什么都可以, 这里传递的是null




// 排序 
// let max = ary.sort(function(a,b){
//     return b-a;
// })[0];
// console.log(max);




// 假设法

// let max = ary[0];
// for (let i = 0; i < ary.length; i++) {
//     let item = ary[i];
//     item > max ? max = item : null;
// }
// console.log(max);










