import str, { aa, bb } from './source'
console.log(str, aa, bb, 11111111);

console.log(require('./source'));

if (module.hot) {
  module.hot.accept('./source', () => {
    const str = require('./source')
    console.log('source文件更新了', str);

    import('./source').then(res => {
      console.log(res);
    })
  })
}
