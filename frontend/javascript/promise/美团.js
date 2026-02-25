console.log('1');

setTimeout(function () {
  console.log('2');
});

(async function () {
  console.log('3');
  await new Promise(function (resolve, reject) {
    setTimeout(function () {
      console.log('4');
      resolve();
    }, 0);
  });
  console.log('5');
})();

setTimeout(function () {
  console.log('6');
  Promise.resolve().then(function () {
    console.log('7');
  });
});

console.log('8');

// 1 3 8 2 4 5 6 7