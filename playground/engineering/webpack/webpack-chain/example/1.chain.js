const Chain = require('../index.js')
const config = new Chain();
config
  .entry('index') // 添加一个入口,名称叫index
  .add('src/index.js') // 为index这个入口添加文件路径
  .end() // 结束对当前入口的配置回到config实例
  .output // 修改输出配置
  .path('dist')
  .filename('[name].js')
  .end();

const options = config.toConfig()
console.log(options);
/* 

let o = {
  entry: {
    index: ['./src/index.js']
  },
  output: {
    path: 'dist',
    filename: '[name].js',
  }
} */
