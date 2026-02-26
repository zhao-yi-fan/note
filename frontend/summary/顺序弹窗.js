// ABCDE五个接口，调用结果顺序不一致，
// 结果只能返回true false，为true的弹窗，false的不弹窗。弹窗只能按顺序弹窗，A->E哪个为true依次弹窗。
// 假设 A~E 都是：() => Promise<boolean>
// show(i) 返回 Promise，在弹窗关闭时 resolve
async function main() {
  const res = await Promise.all([A(), B(), C(), D(), E()]);
  for (let i = 0; i < res.length; i++) {
    if (res[i]) await show(i); // 按顺序依次弹
  }
}

Promise.all([A(), B(), C(), D(), E()])
  .then(rs =>
    rs.reduce(
      (p, r, i) => r ? p.then(() => show(i)) : p,
      Promise.resolve()
    )
  );
