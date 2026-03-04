/**
 * 二进制转base64
 */
const fs = require('fs')
// 模拟获取二进制文件转base64
fs.readFile(__dirname + '/111.json', (err, data) => {
  if (err) throw err;
  console.log(data); // 二进制数据
  let str = Buffer.from(data, 'binary').toString('base64')
  console.log(str);
});


