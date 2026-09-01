const less = require('less')
function loader (source) {
  console.log('less-loader normal');
  console.log(source, 'source=====');
  const callback = this.async()
  less.render(source, (err, result) => {
    if (err) return callback(err)
    callback(null, result.css)
  })
}
loader.pitch = function (remainingRequest){
  console.log('less-loader pitch');
  console.log(remainingRequest, 'remainingRequest=====');
}
module.exports = loader
