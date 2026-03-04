const fs = require('fs')

function processResource (processOptions, loaderContext, finalCallback) {
  loaderContext.loaderIndex = loaderContext.loaders.length - 1;
  let resource = loaderContext.resource;
  loaderContext.readResource(resource, (err, resourceBuffer) => {
    if (err) return finalCallback(err);
    processOptions.resourceBuffer = resourceBuffer
    console.log(resourceBuffer.toString(), 1111);
    // pitch走完，读到了文件，下一步执行normal
    iterateNormalLoaders(processOptions, loaderContext, [resourceBuffer], finalCallback)
  })

}

function iterateNormalLoaders (processOptions, loaderContext, args, finalCallback) {
  // 小于0 将返回最终结果
  if (loaderContext.loaderIndex < 0) {
    return finalCallback(null, args)
  }
  let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex]
  // 如果当前loader已经执行，则index前移
  if (currentLoaderObject.normalExecuted) {
    loaderContext.loaderIndex--;
    return iterateNormalLoaders(processOptions, loaderContext, args, finalCallback)
  }

  let normalFunction = currentLoaderObject.normal
  currentLoaderObject.normalExecuted = true
  convertArgs(args, currentLoaderObject.raw)
  runSyncOrAsync(normalFunction, loaderContext, args, (err, ...values) => {
    if (err) return finalCallback(err)
    iterateNormalLoaders(processOptions, loaderContext, values, finalCallback)
  })
}

function convertArgs (args, raw) {
  if (raw && !Buffer.isBuffer(args[0])) { // 如果normal函数想要buffer，但是参数不是Buffer，进行转换
    args[0] = Buffer.from(args[0]);
  } else if (!raw && Buffer.isBuffer(args[0])) {
    args[0] = args[0].toString('utf8')
  }
}

function iteratePitchingLoaders (processOptions, loaderContext, finalCallback) {
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return processResource(processOptions, loaderContext, finalCallback);
  }
  let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex];
  if (currentLoaderObject.pitchExecuted) {
    loaderContext.loaderIndex++;
    return iteratePitchingLoaders(processOptions, loaderContext, finalCallback);
  }
  currentLoaderObject.pitchExecuted = true;
  let pitchFunction = currentLoaderObject.pitch;
  if (!pitchFunction) {
    return iteratePitchingLoaders(processOptions, loaderContext, finalCallback);
  }

  // 以同步或者异步的方式运行
  runSyncOrAsync(pitchFunction, loaderContext,
    [loaderContext.remainingRequest, previousRequest.remainingRequest, previousRequest.remainingRequest], (err, ...args) => {
      // 看看这个数组有没有一项不为undefined
      const hasArg = args.some(() => {
        return value !== undefined
      })
      if (hasArg) {
        loaderContext.loaderIndex--;
        iterateNormalLoaders(processOptions, loaderContext, finalCallback);
      } else {
        iteratePitchingLoaders(processOptions, loaderContext, finalCallback);
      }
    })
}

function runSyncOrAsync (fn, loaderContext, args, callback) {
  let isSync = true; // 默认是同步模式
  let isDone = false; // fn是否执行过了
  const innerCallback = loaderContext.callback = function (...args) {
    isSync = false;
    isDone = true;
    callback(null, ...args)
  }
  loaderContext.async = function () {
    isSync = false; // 在pitch中执行async方法，就使方法变成异步
    return innerCallback
  }
  let result = fn.apply(loaderContext, args) // pitch的返回值
  if (isSync) { // 如果是同步，在整个函数的执行期间都是同步模式
    isDone = true;
    callback(null, result)
  }
}

function createLoaderObject (request) {
  let loaderObj = {
    request, // loader的绝对路径
    normal: null, // loader的normal方法
    pitch: null, // loader的pitch方法
    raw: false, // true是buffer false是字符串 
    data: {}, // loader的数据 用来存自定义的信息
    pitchExecuted: false, // 是否执行过pitch方法
    normalExecuted: false // 是否执行过normal方法
  }
  let normal = require(request) // 加载 loader模块
  loaderObj.normal = normal;
  loaderObj.pitch = normal.pitch;
  loaderObj.raw = normal.raw;

  return loaderObj
}
function runLoaders (options, callback) {
  let resource = options.resource; // 获取 要加载的资源
  let loaders = options.loaders || []; // 获取所有的loader
  let loaderContext = options.context || {}; // 获取loader的上下文
  let readResource = options.readResource || fs.readFile; // 获取读取文件的方法
  // 把每一个loader的绝对路径都包装成一个对象
  let loaderObjects = loaders.map(createLoaderObject)
  loaderContext.resource = resource; // 要加载的资源
  loaderContext.readResource = readResource; // 读取文件的方法
  loaderContext.loaderIndex = 0; // 当前正在执行的loader的索引
  loaderContext.loaders = loaderObjects; // loader的数组
  loaderContext.async = null; // 异步的回调函数
  loaderContext.callback = null; // 同步的回调函数

  Object.defineProperty(loaderContext, 'request', {
    get () {
      return loaderContext.loaders.map(l => l.request).concat(loaderContext.resource).join('!')
    }
  })

  Object.defineProperty(loaderContext, 'previousRequest', {
    get () {
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(l => l.request).join('!')
    }
  })

  // 剩余的
  Object.defineProperty(loaderContext, 'remainingRequest', {
    get () {
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(l => l.request).concat(loaderContext.resource).join('!')
    }
  })

  Object.defineProperty(loaderContext, 'currentRequest', {
    get () {
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l => l.request).concat(loaderContext.resource).join('!')
    }
  })

  Object.defineProperty(loaderContext, 'data', {
    get () {
      return loaderContext.loaders[loaderContext.loaderIndex].data;
    }
  })
  let processOptions = {
    resourceBuffer: null, // 资源文件的buffer 转换前加载的内容
  }
  iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
    callback(err, {
      result,
      resourceBuffer: processOptions.resourceBuffer
    })
  })
}

exports.runLoaders = runLoaders