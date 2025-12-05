function f() {
  console.log(this.a);
}

var obj2 = {
  a: 40,
  f: f,
};

var obj1 = {
  a: 20,
  obj2: obj2,
};

var a = 3;
obj1.obj2.f();





