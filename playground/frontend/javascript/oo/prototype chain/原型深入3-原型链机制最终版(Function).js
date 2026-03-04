function Fn() {
    this.n = 100;
}
Fn.prototype.getN = function () {
    console.log(this.n);
    
};
Fn.AA = 200;
var f = new Fn();

// Object类中的代码字符串看不到, 一般会写"Native code"(原生代码)
// Object下的属性有definedProperty,监听一个对象中属性变化的   

// 所有的数字都是Number类的实例, 所有的字符串都是String类的实例, true/false是Boolean类的实例, null是Null类的实例, undefined是Undefined类的实例, 对象是Object类的实例, 只要是一个函数, 永远就是内置Function这个类的实例
// 虽然Object.prototype在控制台看不到有__proto__属性, 但是确实存在的
// console.dir(Object.prototype.__proto__);//=> null 属性有,但是看不到, 值确实是null
// console.dir(Object.prototype.aaaa);//=> undefined 属性没有的话是undefined

console.log(Function.prototype === Function.__proto__);
console.log(Object.prototype.hasOwnProperty === Object.hasOwnProperty);
console.log(Object.prototype.hasOwnProperty === Object.__proto__.__proto__.hasOwnProperty);// Object也可以使用prototype中的hasOwnProperty属性, Object通过__proto__属性找到所属类Function的prototype属性, 此时没有hasOwnProperty方法, 再继续向上查找, 通过prototype属性中的__proto__属性找到所属类Object中的prototype属性中的hasOwnProperty方法.








