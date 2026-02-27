/**
 * 模块标识
 * 
 * Node.js 中的模块加载规则：
 * 1. 文件操作的所有 API 都是异步的，所以模块的 hello 会先输出（类似 ajax 请求）
 * 2. 文件操作中的相对路径可以省略 ./
 * 3. 在模块加载中（require），相对路径的 ./ 不能省略
 *    - Error: Cannot find module 'data/foo.js'
 *    - 正确写法: require('./data/foo.js')
 * 
 * 相对路径 vs 绝对路径：
 * - ./data/a.txt 相对于当前文件
 * - data/a.txt   相对于当前文件（可省略 ./）
 * - /data/a.txt  绝对路径，当前文件模块所处磁盘根目录
 * - c:/xx/xx    绝对路径
 * 
 * 注意：如果路径以 / 开头，会到磁盘根目录寻找文件
 */

var fs = require('fs')

// 读取文件示例
// fs.readFile('data/a.txt', function (err, data) {
//     if (err) {
//         return console.log('读取失败')
//     }
//     console.log(data.toString())
// })

// 加载模块示例（./ 不能省略）
// require('./data/foo.js')('hello')

// 路径以 / 开头会从磁盘根目录查找
// fs.readFile('/data/a.txt', function (err, data) {
//     console.log(err)
//     if (err) {
//         return console.log('读取失败')
//     }
// })

// 省略 . 的路径也会从磁盘根目录查找
require('/data/foo.js')
