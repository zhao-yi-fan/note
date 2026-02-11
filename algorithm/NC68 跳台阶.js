function jumpFloor(n) {
  if (n <= 2) return n;

  let a = 1, b = 2;
  for (let i = 3; i <= n; i++) {
    const sum = a + b;
    a = b;
    b = sum;
  }
  return b;
}

console.log(jumpFloor(3)); // 55


/* 

function jumpFloor(number) {
  if(number === 0 || number === 1 || number === 2){
    return number
  }
  return jumpFloor(number - 1) + jumpFloor(number - 2)
}
module.exports = {
  jumpFloor: jumpFloor,
};


*/
