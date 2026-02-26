// 默认得到的适度向
// 适用对象中的成员必须 . 点某个成员来访问
// 有时候,对于一个模块,仅仅希望导出这个方法就可以了

var fooExports = require('./foo')
//foo is not defined
// console.log(foo);

console.log(fooExports);
