let path = require('path');
console.log('__dirname:', __dirname); // /Users/zhaoyifan/myProject/study/node
console.log('__filename:', __filename); // /Users/zhaoyifan/myProject/study/node/path.resolve __dirname __filename区别.js

//=> 返回当前模块的绝对地址(不包含模块名称): c:\Users\99344\Desktop\zhufeng\10.NODEPROMISE <=> __dirname.
console.log(path.resolve()); // /Users/zhaoyifan/myProject/study/node

console.log(path.resolve(`${__dirname}/css`, `${__dirname}/less`)); // /Users/zhaoyifan/myProject/study/node/less

// join 和 resolve 的区别 
// 1. resolve 会把第一个参数当做绝对路径, 以后的参数都是相对路径, 但是如果后面的参数是绝对路径, 以后面的为准 2. join 只会把第二个参数拼接在第一个参数的后面
console.log('resolve:', path.resolve('a/b/c/d', '../less/tt', 'd/e/f', './...../')); // /Users/zhaoyifan/myProject/study/node/a/b/c/less/tt/d/e/f/.....
console.log('join:', path.join('a/b/c/d', '../../less/tt', '/d/e/f', './aaabb')); // a/b/less/tt/d/e/f/aaabb

// dirname 返回当前文件的目录名
console.log('dirname:', path.dirname('/a/a/c/d/e/', './f')); // /a/a/c/d

// relative 返回相对路径
console.log('relative:', path.relative('/a/a/c/d/e', './f')); // ../../../../../Users/zhaoyifan/myProject/study/node/f

// extname 返回文件的扩展名
console.log('extname:', path.extname('/a/a/c/d/e/f.js')); // .js





