//4、

var num = 10;
var obj = { num: 20 };
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);

// 改
/**
 * 变量提升:
 *  var num;
 *  var obj;
 *  var fn;
 */
var num = 10,
    obj = { num: 20 };
obj.fn = (function (num) {
    num = this.num + 10;
    this.num = num + 10;
    return function () {
        this.num += ++num;
    }
})(num);
var fn = obj.fn;
fn();
obj.fn();
console.log(num, obj.num);