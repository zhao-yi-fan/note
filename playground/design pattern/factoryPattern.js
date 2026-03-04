/**
 * 工厂模式(Factory Pattern)
 *  1. 把实现相同功能的代码进行"封装", 以此来实现"批量生产"(后期想要实现这个功能, 我们只需要执行函数即可)
 *  2. "低耦合高内聚": 减少页面中的冗余代码, 提高代码的重复使用率
 */

function createPerson(name, age) {
     var obj = {};
     obj.name = name;
     obj.age = age;
     return obj;
 }
var per1 = createPerson('张三', 18);
var per2 = createPerson('张三', 18);