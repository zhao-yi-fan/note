// 1、Object.assign
const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };
const returnedTarget = Object.assign(target, source);
console.log(target); // { a: 1, b: 4, c: 5 }
console.log(source); // { b: 4, c: 5 }
console.log(returnedTarget); // { a: 1, b: 4, c: 5 }
console.log(target === returnedTarget); // true



// 2、Object.assign
const obj = { a: 1, b: { child: 3 } };
const copy = Object.assign({}, obj);
console.log(copy); // { a: 1 }
console.log(copy === obj); // false
console.log(copy.b === obj.b); // true

