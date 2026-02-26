const loaderUtils = require('loader-utils')
function loader (source) {
  const filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
    content: source
  })
  this.emitFile(filename, source)
  return `module.exports = "${filename}"`
}
loader.raw = true
module.exports = loader