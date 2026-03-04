const less = require('less')
function loader (source) {
  console.log('less-loader normal');
  console.log(source, 'source=====');
  let css = ''
  less.render(source, (err, result) => {
    css = result.css
  })
  return css
}
loader.pitch = function (remainingRequest){
  console.log('less-loader pitch');
  console.log(remainingRequest, 'remainingRequest=====');
}
module.exports = loader