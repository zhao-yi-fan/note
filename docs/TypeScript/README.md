# typescript

## 对象

```javascript
interface ISchool {
  readonly name: string,
  age: number,
  address?.string
}

let school:ISchool = {
  name: 'zf',
  age: 11,
  address: '回龙观东大街'
}

// 接口进行扩展
interface IZhufeng extends ISchool {
  type: string,
  [key:string]:any // 任意类型
}
let zhufeng:IZhufeng = {
  ...school,
  a:1,
  b:2
}


```

## 函数

```javascript
// 函数主要关系返回值 和 参数
function sum1(a: string, b: string): string {
  return a + b
}
sum1("a", "b")

// 声明一个类型 可以做或操作
type Sum = ((aa: number, bb: number) => number) | string

// 这种声明方式不可以或操作 但是可以继承
interface Sum1 {
  (a: number, b: number): number
}

// type仅仅是一个别名 一般在定义联合类型，定义临时变量时可以用
let sum2: Sum = (a: number, b: number): number => a + b



```

## 泛型
用来在代码执行时传入的类型，来确定结果

```javascript
function createArray<T>(len:number, value:T) {
  let result = []
  for (let i = 0; i < len; i++) {
    result.push(value)
  }
  return result
}

let arr = createArray(3, "hello")
```

## as const

:::info
对于数组和对象，可以使用 as const 来将其转换为只读类型
:::

```typescript
/* 
类型提示
const a: (string | number | {
  gender: string;
})[] 
 */
const a = ["jack", 123, { gender: "male" }];

/* 
类型提示
const b: readonly ["jack", 123, {
    readonly gender: "male";
}]
 */
const b = ["jack", 123, { gender: "male" }] as const;
```

## 定义一个固定格式的数组

一个方法传入一个字符串数组，返回一个对象，对象的key是数组的每一项，value是数组的每一项

初始值使用 `as { [key in K]: string }` 来定义
```typescript
const getArray = <K extends string>(keys: K[]) => {
  return keys.reduce((pre, cur) => {
    return { ...pre, [cur]: cur };
  }, {} as { [key in K]: string });
};
/* 
getArray的类型提示:
const getArray: <"name" | "age">(keys: ("name" | "age")[]) => {
    name: string;
    age: string;
}

newArr的类型提示:
const newArr: {
    name: string;
    age: string;
}
 */
const newArr = getArray(["name", "age"]);

```