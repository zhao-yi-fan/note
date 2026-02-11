// 第一题
setTimeout(() => {
  console.log(1);
  Promise.resolve().then(() => {
    console.log(2);
  });
});

new Promise((resolve) => {
  resolve();
  console.log(3);
})
  .then(() => {
    console.log(4);
    setTimeout(() => {
      console.log(5);
    });
  })
  .then(() => console.log(6));

async function async1() {
  console.log(7);
  await console.log(8);
  console.log(9);
}
async1();
console.log(10);

// 以上代码打印结果为：3 7 8 9 10 4 6 1 2 5
// 正确答案 3 7 8 10 4 9 6 1 2 5
