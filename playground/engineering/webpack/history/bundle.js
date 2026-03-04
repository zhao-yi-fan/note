(function (modules) { // webpackBootstrap
  // The module cache 先定义一个缓存
  var installedModules = {};
  // "./src/index.js" : {}
  // The require function 配置了 实现了require方法  因为require是不能在浏览器中运行的
  function __webpack_require__ (moduleId) { // "./src/index.js"
    // Check if module is in cache 检查这个模块是否在缓存中
    if (installedModules[moduleId]) { // 不在缓存中
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache)
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false, // 是否加载完成
      exports: {}
    };
    // Execute the module function 第一个参数this指向，然后是module模块， module.exports空对象
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    // Flag the module as loaded
    module.l = true;
    // Return the exports of the module
    return module.exports;
  }

  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/index.js"); // 入口模块
})
  ({
    "./src/a.js": // key => 模块的路径
      (function (module, exports) { // value 函数
        eval("module.exports = 'zfpx'\n\n//# sourceURL=webpack:///./src/a.js?");
      }),
    "./src/index.js":
      (function (module, exports, __webpack_require__) {
        eval("let str = __webpack_require__( \"./src/a.js\")\r\nconsole.log(str)\n\n//# sourceURL=webpack:///./src/index.js?");
      })
  });