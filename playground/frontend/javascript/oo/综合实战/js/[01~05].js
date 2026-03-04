// 一、选择题
// 1、

console.log(a);
var a = 12;
function fn() {
    console.log(a);
    var a = 13;
}
fn();
console.log(a);

/*
 A、undefined  12 13             
 B、undefined undefined 12   
 C、undefined undefined 13         
 D、有程序报错
*/

//2.
console.log(a);
var a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);

/*
 A、undefined  12 13             
 B、undefined undefined 12   
 C、undefined undefined 13         
 D、有程序报错
*/

//3.
console.log(a);
a = 12;
function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);

/*
 A、undefined  12 13             
 B、undefined undefined 12   
 C、undefined undefined 13         
 D、有程序报错
*/

//4.
var foo = 1;
function bar() {
    if (!foo) {
        var foo = 10;
    }
    console.log(foo);
}
bar();

/*
 A、1     
 B、10     
 C、undefined    
 D、报错
*/

//4.
// /**
//  * 变量提升:
//  *  var foo;
//  *  bar aaafff000;
//  */
// var foo=1; 
// function bar(){
//     /**
//      * 形参赋值: 无
//      * 变量提升:
//      *      var foo; (不管条件是否成立, 都要进行变量提升, 新浏览器中对于判断体中的函数只是提前声明)
//      */
//     if(!foo){//=> !undefined => true
//         var foo=10; 
//     }
//     console.log(foo); 
// }
// bar();
// //=> 10

//5.
var n = 0;
function a() {
    var n = 10;
    function b() {
        n++;
        console.log(n);
    }
    b();
    return b;
}
var c = a();
c();
console.log(n);


/*
 A、1 1 1   
 B、11 11 0  
 C、11 12 0  
 D、11 12 12
*/