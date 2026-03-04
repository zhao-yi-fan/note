const loaderUtils = require('loader-utils')
const mime = require('mime')
function loader (source) {
  console.log(this.resourcePath, 'this.resourcePath===');
  const { limit } = loaderUtils.getOptions(this)
  if (limit && limit > source.length) { // 1k是1024字节，二进制的长度是一个
    // buffer toString('base64')可以将buffer转base64
    return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
  } else {
    return require('file-loader').call(this, source)
  }
}
loader.raw = true
module.exports = loader