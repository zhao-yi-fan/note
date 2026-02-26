const babel = require('@babel/core')
const loaderUtils = require('loader-utils')
function loader (source) {
  const options = loaderUtils.getOptions(this)
  const cb = this.async()
  babel.transform(source, {
    ...options,
    sourceMap: true,
    filename: this.resourcePath.split('/').pop()
  }, (err, result) => {
    cb(err, result.code, result.map) // 异步
  })
}
module.exports = loader