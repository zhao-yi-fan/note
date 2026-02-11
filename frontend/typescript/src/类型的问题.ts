//什么时候标识类型什么时候不用标识
//ts自带类型推导的功能
let name；//当没有赋值的时候默认是any
name = 'zhufeng'
//默认在初始化的是会进行类型推导
let name1 = 'zhufeng';

// -----------------
// number Number string String
//在使用基本数据类型时会将原始类型包装成对象类型
11..toString() // Number(11).toString()
let number1:number = 11;
let number2:Number = 11;
let number3:number = Number(11); // 11
let number4:number=new Number(11)//{}错误语法不能把实例赋予给基本类型
//类也是一个类型他可以描述实例
let number5:Number = new Number(11)


export {} // 加上这句话就变成一个模块了，不然会和全局的变量冲突 比如name变量
