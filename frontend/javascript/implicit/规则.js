// https://juejin.cn/post/6844903557968166926

// https://juejin.cn/post/6844903694039777288

/**
 * @description ToBoolean指其他类型转换为布尔类型的操作。
 * js中的假值只有false、null、undefined、空字符、0和NaN，其它值转为布尔型都为true。
 */

console.log(Boolean(null)) // false
console.log(Boolean(undefined)) // false
console.log(Boolean('')) // flase
console.log(Boolean(NaN)) // flase
console.log(Boolean(0)) // flase
console.log(Boolean([])) // true
console.log(Boolean({})) // true
console.log(Boolean(Infinity)) // true


/**
 * @description toNumber
 */

// 【重】null => 0
// console.log(Number(null));

// 【重】undefined => NaN
// console.log(Number(undefined));

// '' => 0
// console.log(Number(''));

// '10' => 10
// console.log(Number('10'));

// '10a' => NaN
// console.log(Number('10a'));

// true => 1
// console.log(Number(true));

// false => 0
// console.log(Number(false));

// [] => 0
// console.log(Number([]));

// ['10'] => 10
// console.log(Number(['10']));

// ['0'] => 0
// console.log(Number(['0']));

// {} => NaN
// console.log(Number({}));




/**
 * @description toString
 */


 console.log(String(null)) // 'null'
 console.log(String(undefined)) // 'undefined'
 console.log(String(true)) // 'true'
 console.log(String(10)) // '10'
 console.log(String(1e21)) // '1e+21'
 console.log(String([1,2,3])) // '1,2,3'
 console.log(String([])) // ''
 console.log(String([null])) // ''
 console.log(String([1, undefined, 3])) // '1,,3'
 console.log(String({})) // '[object Object]'

