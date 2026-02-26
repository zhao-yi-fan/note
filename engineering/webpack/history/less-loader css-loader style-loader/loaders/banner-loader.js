const fs = require('fs')
const loaderUtils = require('loader-utils')
const validateOptions = require('schema-utils')
function loader (source) {
  const options = loaderUtils.getOptions(this)
  const cb = this.async()
  const schema = {
    type: 'object',
    properties: {
      text: {
        type: 'string'

      },
      filename: {
        type: 'string'
      }
    }
  }
  validateOptions(schema, options, 'banner-loader')
  if (options.filename) {
    this.addDependency(options.filename) // banner文件修改 告诉webpack重新打包
    fs.readFile(options.filename, 'utf8', (err, data) => {
      cb(err, `/**${data}**/${source}`)
    })
  } else {
    cb(null, `/**${options.text}**/${source}`)
  }
}

module.exports = loader