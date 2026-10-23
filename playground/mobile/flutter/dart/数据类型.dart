void main() {
  // var定义变量不要求数据类型，泛型
  // var会对数据类型自动识别
  var a = 1;
  a = 10;
  // a = "123";
  print(a);

  // 定义常量：var const final
  // 相同点：变量只能赋值一次，之后不能重新赋值。
  // 不同点：final 可以先声明、后完成一次赋值；const 必须在声明时赋值。
  // const 要求编译期常量，final 的值可以在运行时确定。
  // final
  /* final b = {"name": "zf"};
  b["name"] = "zhufeng";
  print(b); */
  // const
  const c = {"name": "zf"};
  // c["name"] = "zhufeng";
  print(c);

  // 对象/map/键值对 取值必须用中括号

  final n1 = sum(1, 2);
  print(n1);
  // const n2 = sum(1,2);
}

sum(m, n) => m + n;
