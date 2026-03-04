// 关于重名的几个概念:
/**
 * 1. 带var 和 function 关键字声明相同的名字, 这种也算重名了(其实是一个fn, 只是存储值的类型不一样)
 */

 // 变量提升: window.fn; window.fn = ...都是给window下加了相同的属性fn
//  var fn = 12;
//  function fn() {

//  }

/**
 * 2.关于重名的处理: 如果名字重复了, 不会重新的声明, 但是会重新的定义(重新赋值)[不管是变量提升还是代码执行阶段皆是如此]
 */

/**
 * 变量提升: 
 *      fn = ... (1)
 *         = ... (2)
 *         = ... (3)
 *         = ... (4)
 * 
 * 注意:1. var fn = 100 变量提升的时候, 因为fn已经声明了, 不需要再次声明.fn此时没有任何操作.
 *      2. 不能认为 var fn = undefined. 是因为没赋值,只声明了, 没有值的情况下是undefined,并不是赋值了undefined.
 *          所以认为是声明fn, 但是fn已经存在了.
 */

fn();//=> 4
function fn () {console.log(1);}
fn();//=> 4
function fn () {console.log(2);}
fn();//=> 4
var fn = 100;// => 带var的在提升阶段只把声明处理了,赋值操作没有处理,所以在代码执行的时候需要完成赋值 fn = 100
fn();//=>100()  Uncaught TypeError: fn is not a function
function fn () {console.log(3);}
fn();
function fn () {console.log(4);}
fn();



