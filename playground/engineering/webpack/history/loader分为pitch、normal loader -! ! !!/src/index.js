// import './1.less'
console.log(111);

// loader分为pitching loader和normal loader
// pitching loader：在loader执行之前执行，用于loader之间的通信
// normal loader：在loader执行之后执行，用于loader之间的通信
// loader的执行顺序是从右到左，从下到上

// const a = require('inline-loader!./a') // 行内loader，不需要在use中配置
// !! 禁用前置 后置 普通loader，只有inline-loader
// ! 表示不要普通 loader
// -! 禁用前置 普通 loader
// !- 禁用普通 后置 loader
const a = require('-!inline-loader!./a') 
