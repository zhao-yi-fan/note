let qs = require('qs')

let obj = {
  a: 1,
  b: 2,
  c: '123123'
}


console.log(qs.stringify(obj)); // a=1&b=2
// console.log(qs.parse('a=1&b=2'));  // { a: '1', b: '2' }

// console.log(qs.parse('foo[bar]=baz')); // { foo: { bar: 'baz' } }