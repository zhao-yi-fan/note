// 同步钩子
class SyncHook {
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    console.log(name, 'name');
    this.hooks.push(fn)
  }
  call (...args) {
    this.hooks.forEach(hook => hook(...args))
  }
}

// 同步熔断钩子
class SyncBailHook { // 返回值不为undefined时停止后续代码执行
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    let ret = null;
    let index = 0;
    do {
      ret = this.hooks[index](...args)
    } while (ret === undefined && ++index < this.hooks.length)

  }
}

// 同步串行钩子
class SyncWaterfallHook { // 上一个执行结果传递给下一个
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    const [first, ...others] = this.hooks;
    const ret = first(...args)
    others.reduce((a, b) => {
      return b(a)
    }, ret)
  }
}

// 同步循环钩子
class SyncLoopHook { // 返回值不为undefined时循环执行
  constructor() {
    this.hooks = []
  }
  tap (name, fn) {
    this.hooks.push(fn)
  }
  call (...args) {
    this.hooks.forEach(hook => {
      let ret;
      do {
        ret = hook(...args)
      } while (ret !== undefined)
    })
  }
}


module.exports = {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook
}