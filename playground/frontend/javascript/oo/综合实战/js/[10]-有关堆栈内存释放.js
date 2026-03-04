//10、

var a = 9;
function fn() {
    a = 0;
    return function (b) {
        return b + a++;
    }
}
var f = fn();
console.log(f(5));// 5
console.log(fn()(5));// 5
console.log(f(5));// 6
console.log(a);// 2

/*
 A、6 6 7 2   
 B、5 6 7 3   
 C、5 5 6 3   
 D、以上答案都不正确 
*/