
//用来获取机器信息的
var os = require('os')

//用来操作路径的
var path = require('path')

//获取当前及其的CPU信息
console.log(os.cpus());

//memory  内存
console.log(os.totalmem());

//扩展名字
console.log(path.extname(''));
