/**
 * 在当前作用域下, 不管条件是否成立都要进行变量提升
 *      带var 的还是只声明
 *      带function 的在老版本浏览器渲染机制下, 声明和定义都处理, 
 *      但是为了迎合ES6中的块级作用域, 新版浏览器对于函数 (在条件判断中的函数), 不管条件是否成立, 都只是先声明, 没有定义, 类似var
 */

// console.log(a);// undefined
// if (1 === 2) {
//     var a = 12;
// }
// console.log(a);// undefined

/**
 * 变量提升
 *      var a; => 在全局作用域下声明的全局变量也相当于给win设置了一个属性
 *      window.a = undefined
 */
// console.log(a);// => undefined
// if ('a' in window) {
//     var a = 100;
// }
// console.log(a);// => 100


// 高版本浏览器: chrome v40++
/**
 * 变量提升: 无
 */
f = function () {return true;}; // => window.f = function () {return true;}  (TRUE)
g = function () {return false;};// => window.g = function () {return false;} (FALSE)
//自执行函数
//只要是函数执行就会有私有作用域
~function () {
    /**
     * 变量提升: 带var的和带function的都要进行变量提升,只不过,新版本的支持ES6,带function的只剩下声明了,没有定义了.
     *      function g;    // => g是私有变量,g 是 undefined
     */
    if (g() && [] == ![]) {// g 是 undefined,不能执行  => TypeError: g is not a function
        f = function () {return false;};
        function g() {return true;}
    }
}();
console.log(f());
console.log(g());


// 低版本浏览器: IE 9--
/**
 * 变量提升: 无
 */
f = function () {return true;}; // => window.f = function () {return true;}  (TRUE)
g = function () {return false;};// => window.g = function () {return false;} (FALSE)
//自执行函数
//只要是函数执行就会有私有作用域
~function () {
    /**
     * 变量提升: 带var的和带function的都要进行变量提升
     *      function g = AAAFFF111;  指向堆内存  
     */
    if (g() && [] == ![]) {// g 是私有变量,执行返回true, [] == ![] 也是true
        f = function () {return false;}; 
        // f 不是私有的, 向上级作用域找,最终把window.f修改了 window.f = function () {return false;}  (FALSE)
        function g() {return true;} // 此时的g 是私有的, 和全局的window.g 没有关系
    }
}();
console.log(f());// => false    修改成false
console.log(g());// => false    没有被私有变量的g 修改
// [] == ![]    
// 给数组取反 ![]  空数组转成boolean是true,
// 只有 NaN undefined null 0 空字符串这五个为false
// 所以 [] 是true, ![] 是 false.
// [] == false, 对象和布尔比较, 需要都转换成数字
// 0 == 0,结果是true
// 最终, [] == ![] 结果是 true
