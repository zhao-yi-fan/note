function say() {
    console.log('hello world');
    
}

//如果不加分号的话.
//TypeError: say(...) is not a function      
say()

//分号写在这里,如果写在say();这里的话,可能say();后面还会继续写代码,还要继续加分号
// ;(function () {
//     console.log('hello');
    
// })()


// ;['苹果', '香蕉'].forEach(function (item) {
//     console.log(item);
    
// })


// ` 是 EcmaScript 6中新增的一种字符串包裹方式, 叫做: 模板字符串
//  它支持换行和非常方便拼接变量
// var foo = `
// 大家好
// hello            床前明月光
// world
// hhh`
// console.log(foo)


;`hello`.toString()


//当你采用了无分号的代码风格的时候后,只需要注意以下情况就不会有上面的问题了
//      当一行代码是以:
//      (
//      [
//      `
//      开头的时候,则在前面补上一个分号用以避免一些语法解析错误.
//  所以你会发现在一些第三方的代码中能够看到以上来就以一个 ; 开头.
//  结论:
//      无论你的代码是否有分号,都建议如果一行代码是以 ( [ ` 开头的,则最好都在其前面补上一个分号.
//      有些人还喜欢玩一些花哨的东西,例如! # $ ,也和分号有一样的作用,但不推荐使用    !`hello`.toString()