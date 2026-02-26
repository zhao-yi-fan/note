var fs = require('fs')

// 所使用的所有文件操作的 API 都是异步的,所以模块的hello会先输出
// 就像你的 ajax 请求一样
// 文件操作中的相对路径可以省略 ./
// fs.readFile('data/a.txt', function (err, data) {
//     if (err) {
//         return console.log('读取失败');
        
//     }
//     console.log('data.toString()');
    
// })

// 在模块加载中, 相对路径中的 ./ 不能省略
// Error: Cannot find module 'data/foo.js'
// require('data/foo.js')

// require('./data/foo.js')('hello')


// 在操作文件的相对路径中
// ./data/a.txt 相对于当前文件
// data/a.txt   相对于当前文件
// /data/a.txt  绝对路径, 当前文件模块所处磁盘根目录
// c:/xx/xx...  绝对路径
// fs.readFile('/data/a.txt', function (err, data) {
//     // 如果找文件以 / 开头,会到存储该文件的根目录去寻找
//     console.log(err);
//     // { [Error: ENOENT: no such file or directory, open 'c:\data\a.txt']
//     // errno: -4058,
//     // code: 'ENOENT',
//     // syscall: 'open',
//     // path: 'c:\\data\\a.txt' }
    
//         if (err) {
//             return console.log('读取失败');
            
//         }
// })


// 这里如果忽略了. 则也是磁盘根目录
require('/data/foo.js')