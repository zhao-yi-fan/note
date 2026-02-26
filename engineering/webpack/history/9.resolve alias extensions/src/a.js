module.exports = 'aaaaa'
// require('core-js')
class B {

}

// generator语法，处理异步
function* gen (params) {
  yield 1;
}
console.log(gen().next())

// 'aaa'.includes('a')