Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  const fn = this;
  return function Fn(...restArgs) {
    console.log(this instanceof Fn);
    return fn.apply(this instanceof Fn ? this : context, [
      ...args,
      ...restArgs,
    ]);
  };
};

const obj = {
  sum: "123",
};

function fn(a, b, c, d) {
  console.log(arguments);

  return this.sum + a + b;
}

const newBindFn = fn.myBind(obj, 1, 2);
console.log(newBindFn(3, 4));
