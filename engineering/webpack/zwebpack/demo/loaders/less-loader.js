const less = require('less')
function loader (source) {
  let css = ''
  less.render(source, (err, result) => {
    css = result.css
  })
  css = css.replace(/\n/g, '\\n') // 一个\代表转义，两个\代表换行
  return css
}

module.exports = loader