# typescript

- 对象

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