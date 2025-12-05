// 类 es6 类来调用的静态属性 私有的实例属性 共享的原型属性
// as 断言成xxx
// ！非空断言
// ？链判断运算符有值取值没值返回undefined
class Pointer {
  public x!: number; // 表示实例上有这个属性
  public y!: number;
  constructor(x: number, y?: number, ...args: number[]) {
    // 这些参数函数中的使用方式 这里都可以使用
    this.x = x;
    this.y = y as number;
  }
  static a = 1;
}
let pointer = new Pointer(1, 2, 3, 4, 5, 6);

// ----------------------------

// (public private protected) readonly 类的修饰符
// public 表示父类本身子类外面都可以获取这个属性
// protected 受保护的父类本身子类能访问到这个属性
// private 只有自己能访问到

// 如果constructor被标识成了private 或者 protected 则此类不能被new,被标识成了private 不能被子类继承

class Animal {
  private name!: string;
  public readonly age!: number; // readonly 表示此属性不能被修改
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  // 静态属性和静态方法通过类来调用的就是静态的（是可以被继承的)
  static type = "动物";
  static getName() {
    return "动物类";
  }
  say() {
    console.log("say");
  }
}

new Animal("zhufeng", 10);

class Cat extends Animal {
  address = "";
  constructor(name: string, age: number, address: string) {
    super(name, age); // Animal.call(this,name,age) 父类本身
    this.address = address;

    this.name;
    this.age = 11; // readonly 表示初始化后不能在被修改了
  }
  static getName() {
    //子类重写父类的方法
    console.log(super.getName()); // 静态方法中的super指代的是父类本身
    return "猫";
  }
  say() {
    // 原型中的super指代的是父类的原型
    super.say(); // Animal.prototype
    console.log("cat say");
  }
  //属性访问器，来访问私有属性
  private _eat: string = ""; // vue defineProperty
  get eat() {
    //原型属性
    return this._eat;
  }
  set eat(newVal) {
    this._eat = newVal;
  }
}
let tom = new Cat("Tom", 10, "美国");
console.log(Cat.getName());
tom.say();
console.log(tom.eat);

tom.eat = "fish";
console.log(tom.eat);

tom.name;

export {};
