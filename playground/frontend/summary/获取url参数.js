/**
 * 1、URLSearchParams方法 IE不兼容
 * 
 */

// const urlSearchParams = new URLSearchParams(window.location.search)
const urlSearchParams = new URLSearchParams('?uuid=123&id=1&a=2')
console.log(urlSearchParams);

const params = Object.fromEntries(urlSearchParams.entries()) // urlSearchParams中有entries方法
console.log(params) // { uuid: '123', id: '1', a: '2' }



/**
 * 2、split方法
 * 
 */
function getParams(url) {
  const res = {}
  if(url.includes('?')){
    const str = url.split('?')[1]
    const arr = str.split('&');
    arr.forEach(item => {
      const key = item.split('=')[0];
      const value = item.split('=')[1];
      res[key] = encodeURIComponent(value)
    })
  }
  return res
}
