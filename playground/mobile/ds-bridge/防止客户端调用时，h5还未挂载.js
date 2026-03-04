/**
 * 防止“原生早醒”导致 window.xxx 未定义 —— 极简版
 *
 * 思路：
 * 1. 提前在 window 上挂一个统一入口：window.invokeFromNative
 * 2. 原生只调用这个入口：invokeFromNative('methodName', payload)
 * 3. JS 还没准备好时，把调用先丢进队列
 * 4. DOMContentLoaded 时统一把队列里的调用放出来
 */

;(function () {
  // 缓存原生过早发来的调用
  var queue = []
  var ready = false

  // 原生统一从这里进，不要直接调 window.someFn
  window.invokeFromNative = function (methodName, payload) {
    if (!ready) {
      queue.push({ methodName: methodName, payload: payload })
      return
    }

    var fn = window[methodName]
    if (typeof fn === 'function') {
      fn(payload)
    } else {
      console.warn('[invokeFromNative] 方法不存在:', methodName, payload)
    }
  }

  // DOMContentLoaded 说明业务 JS 基本都挂好了，这时统一释放早期调用
  document.addEventListener('DOMContentLoaded', function () {
    ready = true

    for (var i = 0; i < queue.length; i++) {
      var item = queue[i]
      var fn = window[item.methodName]
      if (typeof fn === 'function') {
        fn(item.payload)
      } else {
        console.warn('[invokeFromNative] flush 时方法不存在:', item.methodName, item.payload)
      }
    }

    queue = []
  })
})()
