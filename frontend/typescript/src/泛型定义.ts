// 一个方法传入一个字符串数组，返回一个对象，对象的key是数组的每一项，value是数组的每一项
// 初始值使用 as { [key in K]: string } 来定义
const getArray = <K extends string>(keys: K[]) => {
  return keys.reduce((pre, cur) => {
    return { ...pre, [cur]: cur };
  }, {} as { [key in K]: string });
};
/* 
const newArr: {
    name: string;
    age: string;
}
 */
const newArr = getArray(["name", "age"]);
