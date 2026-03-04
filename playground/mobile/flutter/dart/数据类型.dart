void main() {
  // var定义变量不要求数据类型，泛型
  // var会对数据类型自动识别
  var a = 1;
  a = 10;
  // a = "123";
  print(a);

  // 定义常量：var const final
  // 相同点：一旦定义，不能再赋值。声明和赋值必须同时进行
  // 不同点：final声明之后可以修改，const声明之后不能修改。
  // const要求更加严格，const定义的是编译器的常量，不能是运行结果，final就二者都行
  // final
  /* final b = {"name": "zf"};
  b["name"] = "zhufeng";
  print(b); */
  // const
  const c = {"name": "zf"};
  ;
  // c["name"] = "zhufeng";
  print(c);

  // 对象/map/键值对 取值必须用中括号

  final n1 = sum(1, 2);
  print(n1);
  // const n2 = sum(1,2);
}

sum(m, n) => m + n;
