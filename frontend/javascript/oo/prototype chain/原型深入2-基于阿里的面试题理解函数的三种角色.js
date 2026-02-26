//阿里超经典面试题（有难度)

function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}

Foo.getName();//=> 2  把Foo当做一个对象, 找Foo的私有方法执行
getName();//=> 4  执行全局下的getName
Foo().getName();//=> 1  先把Foo当做普通函数执行, 执行返回的结果再调取getName执行
getName();//=> 1  执行的依然是全局下的getName
new Foo.getName();//=> 2  A:(Foo.getName) => new A()
new Foo().getName();//=> 3  B:new Foo() => B.getName()
new new Foo().getName();//=> 3  C:new Foo() => new C[Foo实例].getName() => D:C.getName => new D()(先计算new Foo()创建一个实例f, 然后new f.getName(), 先找到f.getName, 再把这个函数new一下, 最后其实相当于把f.getName当做一个类, 返回这个类的一个实例)






