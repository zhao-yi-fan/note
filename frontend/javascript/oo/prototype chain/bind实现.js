Function.prototype.myBind = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  const args = [...arguments].slice(1);
  const fn = this;
  return function Fn() {
    console.log(this instanceof Fn);
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
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
