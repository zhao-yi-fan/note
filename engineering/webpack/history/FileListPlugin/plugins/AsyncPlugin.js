class AsyncPlugin {
  apply (compiler) {
    // compiler.hooks.emit.tapAsync('emit', (compilation) => {
    //   console.log('发射文件');
    // })

    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('过一秒，发射文件');
          resolve()
        }, 1000);
      })
    })
    compiler.hooks.emit.tapPromise('AsyncPlugin', (compilation) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('又过了一秒');
          resolve()
        }, 1000);
      })
    })
  }
}
module.exports = AsyncPlugin