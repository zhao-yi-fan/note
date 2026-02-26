const loaderUtils = require('loader-utils')
function loader (source) {
  console.log('style-loader normal');
  console.log(source, 'source=====');
  // 引入时module.exports不导出，而是执行一段脚本
  return `
  const style = document.createElement('style');
  style.innerHTML = ${JSON.stringify(str)};
  document.head.appendChild(style);
  `
}

// 在style-loader上 写了pitch
// style-loader      css-loader!less-loader!./index.less

loader.pitch = function (remainingRequest) { // 剩余的请求
  console.log('style-loader pitch');
  console.log(remainingRequest, 'remainingRequest=====');
  console.log(loaderUtils.stringifyRequest(this, '!!' + remainingRequest));
  // 让style-loader 去处理css-loader!less-loader!./index.less
  // require路径 返回的就是css-loader处理好的结果 require('!!css-loader!less-loader!./index.less')
  return `
  const style = document.createElement('style');
  style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
  document.head.appendChild(style);
  `

}

module.exports = loader