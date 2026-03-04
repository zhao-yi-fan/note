Function.prototype.myCall = function (context) {
  const restArgs = [...arguments].slice(1)
  context = context || globalThis
  context.fn = this
  const result = context.fn(...restArgs)
  delete context.fn
  return result;
}


const obj = {
  sum: '123'
}

function fn (a, b) {
  return this.sum + a + b

}

console.log(fn.myCall(obj, 1, 2))