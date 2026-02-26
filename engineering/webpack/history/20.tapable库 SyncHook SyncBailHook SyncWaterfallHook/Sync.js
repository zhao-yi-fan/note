// const {
//   SyncHook,
//   SyncBailHook,
//   SyncWaterfallHook,
//   SyncLoopHook,
//   AsyncParallelHook,
//   AsyncParallelBailHook,
//   AsyncSeriesHook,
// } = require('tapable')

const { SyncHook, SyncBailHook, SyncWaterfallHook, AsyncParallelHook, AsyncSeriesHook } = require('./tapable')


/* const Person = new SyncHook(['name', 'age'])
Person.tap('say', (...args) => {
  console.log('say', ...args);
})
Person.tap('eat', (...args) => {
  console.log('eat', ...args);
})
Person.call('tom', 18) */


/* const Person1 = new SyncBailHook(['name', 'age'])
Person1.tap('say', (...args) => {
  console.log('say', ...args);
  return '停止后续代码执行' // 返回值不为undefined时停止后续代码执行
})
Person1.tap('eat', (...args) => {
  console.log('eat', ...args);
})
Person1.call('tom', 18) */


/* const PersonWaterfall = new SyncWaterfallHook(['name', 'age'])
PersonWaterfall.tap('say', (...args) => {
  console.log('say', ...args);
  return 'sayok' // 上一个执行结果传递给下一个
})
PersonWaterfall.tap('eat', (...args) => {
  console.log('eat', ...args);
  return 'eatok'
})
PersonWaterfall.tap('play', (...args) => {
  console.log('play', ...args);
})
PersonWaterfall.call('tom', 18) */


// 返回值不为undefined时循环执行
/* const PersonWaterfall = new SyncLoopHook(['name', 'age'])
let total = 0;
PersonWaterfall.tap('say', (...args) => {
  console.log('say', ...args);
  total += 1;
  return total === 3 ? undefined : 'say' // 上一个执行结果传递给下一个
})
PersonWaterfall.tap('eat', (...args) => {
  console.log('eat', ...args);
})
PersonWaterfall.tap('play', (...args) => {
  console.log('play', ...args);
})
PersonWaterfall.call('tom', 18) */




/**
 * 异步并行
 * 注册 tapAsync tapPromise 
 * 执行 tap tapAsync tapPromise
 * */
/* const PersonAsyncParalle = new AsyncParallelHook(['name', 'age'])
PersonAsyncParalle.tapAsync('say', (name, cb) => {
  setTimeout(() => {
    console.log('say', name);
    cb()
  }, 1000)
})
PersonAsyncParalle.tapAsync('eat', (name, cb) => {
  setTimeout(() => {
    console.log('eat', name);
    cb()
  }, 1000)
})
PersonAsyncParalle.callAsync('tom', function()  {
  console.log('end');
}) */



/* const PersonAsyncParalle = new AsyncParallelHook(['name', 'age'])
PersonAsyncParalle.tapPromise('say', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('say', name);
      resolve()
    }, 1000)
  })
})
PersonAsyncParalle.tapPromise('eat', (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('eat', name);
      resolve()
    }, 1000)
  })
})
PersonAsyncParalle.promise('tom').then(function () {
  console.log('end');
}) */

// AsyncParallelBailHook 带保险的异步并行钩子




/* const PersonAsyncSeries = new AsyncSeriesHook(['name', 'age'])
PersonAsyncSeries.tapAsync('say', (name, age, cb) => {
  setTimeout(() => {
    console.log('say', name, age);
    cb()
  }, 1000)
})
PersonAsyncSeries.tapAsync('eat', (name, age, cb) => {
  setTimeout(() => {
    console.log('eat', name, age);
    cb()
  }, 1000)
})
PersonAsyncSeries.callAsync('tom', 18, () => {
  console.log('end');
}) */





const PersonAsyncSeries = new AsyncSeriesHook(['name'])
PersonAsyncSeries.tapPromise('say', (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('say', ...args);
      resolve()
    }, 1000)
  })

})
PersonAsyncSeries.tapPromise('eat', (...args) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('eat', ...args);
      resolve()
    }, 1000)
  })

})
PersonAsyncSeries.promise('tom').then(() => {
  console.log('end');
})