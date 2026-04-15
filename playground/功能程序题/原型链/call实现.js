Function.prototype.myCall = function (context, ...args) {
  context = context || globalThis
  const key = Symbol();
  context[key] = this;
  const result = context.fn(...args)
  delete context[key];
  return result;
}


const obj = {
  sum: '123'
}

function fn (a, b) {
  return this.sum + a + b

}

console.log(fn.myCall(obj, 1, 2))