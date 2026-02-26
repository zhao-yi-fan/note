var foo = 'bbb'

// console.log(exports);


//exports对象挂载了的,就可以被外界访问,可以导出
exports.foo = 'hello'


exports.add = function(x, y){
    return x + y
}

function add(x, y){
    return x - y
}

var age = 18

exports.age = age

exports.readFile = function(path, callback){
    console.log('文件路径: ', path);
    
}