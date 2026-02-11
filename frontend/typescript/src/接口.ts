// 接口 描述对象的形状，根据接口提供一些新的类 为别人使用
// 计算fullname = firstName + lastName

// 接口可以被实现被继承type不能
// type可以写联合类型

/* 
// 1）描述对象
// 能用接口用接口，不能用换成type
interface IFullName {
  firstName: string;
  lastName: string;
}
//interface 可以描述（属性方法类）
const fullName = (obj: IFullName): IFullName => {
  return obj;
};
fullName({ firstName: "z", lastName: "f" });
 */

/* // 2）描述函数
interface IFullName {
  (firstName: string, lastName: string): string;
}
const fullName = (firstName: string, lastName: string): string => {
  return firstName + lastName;
}; */

/* 
// 混合类型计数器 一个函数返回一个函数，返回的函数有属性
interface ICount {
  count: number;
  (): number;
}
const fn: ICount = () => {
  return ++fn.count;
};
fn.count = 0;
console.log(fn());
console.log(fn());
 */

//接口特性
/* 
// 1）如果我定义的值比接口中的多可以采用类型断言直接断言成对应的接口
interface IVegetables {
  taste: string;
  color: string;
}
// const tomato: IVegetables = {
//   size: 10,
//   taste: "sour",
//   color: "red",
// } as IVegetables; 
*/

/*
// 2) 多个同名接口会进行合并操作
interface IVegetables {
  taste: string;
  color: string;
}
interface IVegetables {
  size: number;
}
const tomato: IVegetables = {
  size: 10,
  taste: "sour",
  color: "red",
}; */

/* 
// 3）接口可以扩展

interface IVegetables {
  taste: string;
  color: string;
}
interface Itomato extends IVegetables {
  size: number;
}
const tomato: Itomato = {
  size: 10,
  taste: "sour",
  color: "red",
};
 */

interface IVegetables {
  // 可选属性 仅读属性
  taste: string;
  color: string;
  [xxx: string]: any; // 限制死的 其他的随意
  // readonly size?:number,
  // type?:string
}
const tomato: IVegetables = {
  type: "fruit",
  taste: "sour",
  color: "red",
};
//如果接口中 [xxx:index] 可索引接口
interface IArr {
  [key: number]: any;
}

let arr: IArr = [1, {}, "a", "v"];

export {};
