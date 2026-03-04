function fn() {
    // 变量提升: 无
    // console.log(b);
    b = 13;
    console.log('b' in window); //=>true 
    console.log(b);
}
fn();
console.log(b)
