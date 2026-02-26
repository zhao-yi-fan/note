var url = require('url')
var obj = url.parse('/pinglun?name=撒大声地&message=奥术大师多', true)
console.log(obj)
console.log(obj.pathname)

console.log(obj.query)


//没加true
// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?name=撒大声地&message=奥术大师多',
//     query: 'name=撒大声地&message=奥术大师多',
//     pathname: '/pinglun',
//     path: '/pinglun?name=撒大声地&message=奥术大师多',
//     href: '/pinglun?name=撒大声地&message=奥术大师多'
// }

//加了true
// Url {
//     protocol: null,
//     slashes: null,
//     auth: null,
//     host: null,
//     port: null,
//     hostname: null,
//     hash: null,
//     search: '?name=撒大声地&message=奥术大师多',
//     query: [Object: null prototype] { name: '撒大声地', message: '奥术大师多' },
//     pathname: '/pinglun',
//     path: '/pinglun?name=撒大声地&message=奥术大师多',
//     href: '/pinglun?name=撒大声地&message=奥术大师多' 
// }