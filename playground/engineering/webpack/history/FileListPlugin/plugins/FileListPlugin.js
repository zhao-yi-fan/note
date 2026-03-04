class FileListPlugin {
  constructor(options) {
    this.filename = options.filename
  }
  apply (compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (stats) => {
      const assets = stats.assets
      let content = `## 文件名    资源大小\r\n`
      // [{'main.js', {size: Function}}]
      Object.entries(assets).forEach(([filename, obj]) => {
        content += `- ${filename}    ${obj.size()}\r\n`
      })
      // 资源对象
      assets[this.filename] = {
        source: function () {
          return content
        },
        size: function () {
          return content.length
        }
      }
    })
  }
}
module.exports = FileListPlugin