// 装饰器 前端中使用stage-3 可能后期会有变化

//扩展属性和方法
function addSay(target: any) {
  //修饰类本身当前参数就是类
  target.x = 1;
  target.prototype.say = function () {
    console.log("say");
  };
}

function toUpcaseCase(target: any, key: string) {
  // target是类的原型 key是属性名
  // target是类的原型 key是属性名
  let value = "";
  Object.defineProperty(target, key, {
    get() {
      return value.toUpperCase();
    },
    set(newValue) {
      value = newValue;
    },
  });
}
function double(num: number) {
  return function (target: any, key: string) {
    //类
    let value = target[key];
    Object.defineProperty(target, key, {
      get() {
        return value * num;
      },
    });
  };
}

function Enum(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor value configurable writable enumberable
  descriptor.enumerable = false;
}

function params(target: any, key: string, index: number) {
  console.log(target, key, index);
}

@addSay
class Person {
  say!: Function;
  @toUpcaseCase
  name: string = "zhufeng"; // 直接默认走set方法
  @double(3) // 可以传参
  static age: number = 10; // 修饰类静态属性时 不会走set方法

  @Enum
  getName(@params xx: string) {}
}
let person = new Person();
person.say();
console.log((Person as any).x);
console.log(Person.age);

export {};
