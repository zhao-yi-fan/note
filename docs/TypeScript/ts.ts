// 泛型 用来在代码执行时传入的类型，来确定结果

function createArray<T>(len:number, value:T) {
  let result = []
  for (let i = 0; i < len; i++) {
    result.push(value)
  }
  return result
}

let arr = createArray(3, "hello")
