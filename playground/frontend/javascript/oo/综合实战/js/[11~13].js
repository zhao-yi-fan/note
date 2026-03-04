//二、问答题（需要画图）
//1、


// 私有变量和全局变量没有直接关系, 但是会存在间接关系, 全局变量给函数赋值了地址, 都操作的同一个空间. 函数在形成了一个闭包后, 会切断私有变量和全局变量的干扰, 当这种切断是切断的直接干扰,仍然会有间接的干扰
/**
 * 变量提升:
 *  var ary;
 *  fn = aaafff111;
 *  var res;
 */
var ary = [1, 2, 3, 4];//=> ary = bbbfff111[ary全局变量] [0, 2, 3, 4]
function fn(ary) {
    /**
     * 形参赋值: ary = bbbfff111 [ary是私有变量]
     */
    ary[0] = 0;
    ary = [0];//=> ary = bbbfff222  [0(100)]
    ary[0] = 100;
    return ary;//=> bbbfff222
}
var res = fn(ary);//res = fn(bbbfff111) = bbbfff222
console.log(ary);//=>[0, 2, 3, 4]
console.log(res);//=> [100]
//=> [0, 2, 3, 4]
//=> [100]


//2、
/**
 * 变量提升:
 * fn = aaafff111;
 * var f;
 */
function fn(i) {
    /**
     * 第一次aaafff111执行:
     * i = 10;(11)
     * return bbbfff111
     */
    /**
     * 第二次aaafff111执行:
     * i = 20;(21)
     * return bbbfff222
     */
    /**
     * 第三次aaafff111执行:
     * i = 30;(31)
     * return bbbfff333;
     */
    return function (n) {
        /**
         * 第一次bbbfff111执行:
         * n = 20
         * => 20 + (i++)=20 + 10=30
         */
        /**
         * 第二次bbbfff222执行:
         * n = 40;
         * => 40 + (i++)=40 + 20=60
         */
        /**
         * 第三次bbbfff333执行:
         * n = 50;
         * => 50 + (i++)=50 + 30=80
         */
        /**
         * 第四次bbbfff111执行:
         * n = 30;
         * => 30 + (i++)= 30 +11=41
         */
        console.log(n + (i++));
    }
}
var f = fn(10);
f(20);//=> 30
fn(20)(40);//=> 60
fn(30)(50);//=> 80
f(30);//=> 41
//=> 30  60  80  41

//3、

var i = 10;
function fn() {
    return function (n) {
        console.log(n + (++i));
    }
}
var f = fn();
f(20);
fn()(20);
fn()(30);
f(30);