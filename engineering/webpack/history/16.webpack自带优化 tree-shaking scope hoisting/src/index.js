// 在生产环境下 esm 引入可以tree-shaking
// import calc from './a'

// 在生产模式下 commonjs 引入可以不会tree-shaking，会把变量放在default变量上
const calc = require('./a')

console.log(calc.default.sum(1, 2),33333333333);


// 在生产模式下 scope hoisting 作用域提升 
const a = 1;
const b = 1;
const c = 1;
const d = a + b + c; // 会简化为 const d = 3;

console.log(d,'dddddddddddddd');