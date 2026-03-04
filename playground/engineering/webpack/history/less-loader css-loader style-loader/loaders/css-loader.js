function loader (source) {
  console.log('css-loader normal');
  console.log(source, 'source=====');
  const reg = /url\((.+?)\)/g
  let pos = 0;
  let current;
  const arr = ['const list = []']
  /**
   * [
        "url('./Screenshot_1667581037.png')",
        "'./Screenshot_1667581037.png'",
        index: 21,
        input: "body {\n  background: url('./Screenshot_1667581037.png');\n}\n",
        groups: undefined
      ]
   */
  while (current = reg.exec(source)) {
    let [matchUrl, g] = current
    console.log(reg.lastIndex, 111);
    let last = reg.lastIndex - matchUrl.length;
    arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`)
    // 把g替换成require的写法
    arr.push(`list.push('url('+require(${g})+')')`)
    pos = reg.lastIndex
  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`)
  arr.push(`module.exports = list.join('')`)
  return arr.join('\r\n')
}

loader.pitch = function (remainingRequest){
  console.log('css-loader pitch');
  console.log(remainingRequest, 'remainingRequest=====');
}

module.exports = loader