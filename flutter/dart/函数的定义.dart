// file: dart_function_patterns.dart
// Dart 函数/方法定义常见写法合集（可直接复制）
// 备注：Dart 里“函数”既包括顶层函数，也包括类的方法、闭包等。
// 下面按“定义形式/参数形式/异步形式/成员形式”分组示例。

// ------------------------------------------------------------
// 1) 顶层函数（Top-level function）
// ------------------------------------------------------------

// 1.1 块体函数（block body）
int addBlock(int a, int b) {
  return a + b;
}

// 1.2 箭头函数（expression body / fat arrow）
int addArrow(int a, int b) => a + b;

// 1.3 返回 void
void logMsg(String msg) {
  // ignore: avoid_print
  print(msg);
}

// 1.4 返回可空类型
int? parseMaybeInt(String s) {
  final v = int.tryParse(s);
  return v; // 可能为 null
}

// ------------------------------------------------------------
// 2) 参数写法（位置参数 / 命名参数 / 可选参数）
// ------------------------------------------------------------

// 2.1 位置参数（required positional）
String join2(String a, String b) => "$a$b";

// 2.2 可选位置参数（optional positional）
//    用 [] 包裹，可给默认值
String join3(String a, [String b = "", String c = ""]) => "$a$b$c";

// 2.3 命名参数（named parameters）
//    用 {} 包裹，通常配合 required
String userLabel({required String name, int age = 18}) => "$name($age)";

// 2.4 命名参数 + 可空
String greet({String? name}) => "hi ${name ?? "anonymous"}";

// 2.5 “同时有”位置参数 + 命名参数
String formatUser(String id, {required String name, String? city}) =>
    "id=$id name=$name city=${city ?? "-"}";

// ------------------------------------------------------------
// 3) 泛型函数（Generic function）
// ------------------------------------------------------------

// 3.1 泛型：返回同类型
T identity<T>(T value) => value;

// 3.2 泛型：约束 extends
num sumNumList<T extends num>(List<T> xs) => xs.fold<num>(0, (a, b) => a + b);

// ------------------------------------------------------------
// 4) 匿名函数 / 闭包（Anonymous function / Closure）
// ------------------------------------------------------------

void closureDemo() {
  // 4.1 匿名块体函数
  final square1 = (int x) {
    return x * x;
  };

  // 4.2 匿名箭头函数
  final square2 = (int x) => x * x;

  // 4.3 捕获外部变量（closure）
  int counter = 0;
  int inc() => ++counter;

  // ignore: avoid_print
  print([square1(3), square2(4), inc(), inc()]);
}

// ------------------------------------------------------------
// 5) 把函数当参数 / 返回函数（First-class function）
// ------------------------------------------------------------

// 5.1 传入函数
int apply(int a, int b, int Function(int, int) op) => op(a, b);

// 5.2 返回函数
int Function(int) makeAdder(int base) => (int x) => base + x;

// ------------------------------------------------------------
// 6) typedef（函数类型别名）
// ------------------------------------------------------------

typedef IntBinOp = int Function(int, int);

int calc(int a, int b, IntBinOp op) => op(a, b);

// ------------------------------------------------------------
// 7) 异步函数（async / Future）
// ------------------------------------------------------------

Future<int> fetchValueAsync() async {
  // 模拟异步
  await Future.delayed(const Duration(milliseconds: 10));
  return 42;
}

// 7.2 简写：直接返回 Future
Future<String> fetchName() => Future.value("dart");

// ------------------------------------------------------------
// 8) 生成器（sync* / async*）
// ------------------------------------------------------------

// 8.1 同步生成器：返回 Iterable
Iterable<int> countSync(int n) sync* {
  for (var i = 0; i < n; i++) {
    yield i;
  }
}

// 8.2 异步生成器：返回 Stream
Stream<int> countAsync(int n) async* {
  for (var i = 0; i < n; i++) {
    await Future.delayed(const Duration(milliseconds: 5));
    yield i;
  }
}

// ------------------------------------------------------------
// 9) 类方法（实例方法 / 静态方法 / 私有方法）
// ------------------------------------------------------------

class MathUtil {
  // 9.1 实例方法
  int mul(int a, int b) => a * b;

  // 9.2 静态方法
  static int sub(int a, int b) => a - b;

  // 9.3 私有方法（库内可见）
  int _secret(int x) => x + 999;
}

// ------------------------------------------------------------
// 10) getter / setter（也是“函数式成员”）
// ------------------------------------------------------------

class CounterBox {
  int _value = 0;

  // getter（无参函数形式）
  int get value => _value;

  // setter（单参函数形式）
  set value(int v) => _value = v;
}

// ------------------------------------------------------------
// 11) 扩展方法（extension）
// ------------------------------------------------------------

extension StringX on String {
  bool get isBlank => trim().isEmpty;

  String repeat(int times) => List.filled(times, this).join();
}

// ------------------------------------------------------------
// main：跑一下示例（可删）
// ------------------------------------------------------------

Future<void> main() async {
  // logMsg("addBlock: ${addBlock(1, 2)}");
  // logMsg("addArrow: ${addArrow(3, 4)}");

  // logMsg("join3: ${join3('a', 'b', '3')}");
  // logMsg("userLabel: ${userLabel(name: 'yifan')}");

  // closureDemo();

  logMsg("apply(add): ${apply(2, 3, addArrow)}");
  // logMsg("makeAdder: ${makeAdder(10)(5)}");

  // logMsg("fetchValueAsync: ${await fetchValueAsync()}");

  // logMsg("countSync: ${countSync(5).toList()}");

  // final m = MathUtil();
  // logMsg("MathUtil.mul: ${m.mul(2, 3)}");
  // logMsg("MathUtil.sub: ${MathUtil.sub(10, 4)}");

  // final cb = CounterBox()..value = 7;
  // logMsg("CounterBox.value: ${cb.value}");

  // logMsg("'  '.isBlank: ${"  ".isBlank}");
  // logMsg("'ha'.repeat(3): ${"ha".repeat(3)}");
}