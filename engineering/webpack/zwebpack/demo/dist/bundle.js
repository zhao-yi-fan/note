(function (modules) {
  var installedModules = {};
  function __webpack_require__ (moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;
    return module.exports;
  }
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({
    
    "./inline-loader1!inline-loader2!./src/a.js": (function (module, exports, __webpack_require__) {
        eval(`console.log('aaa');`);
    }),
    
    "./src/1.less": (function (module, exports, __webpack_require__) {
        eval(`const style = document.createElement('style');
style.innerHTML = "body {\\n  background: red;\\n}\\n";
document.head.appendChild(style);`);
    }),
    
    "./src/index.js": (function (module, exports, __webpack_require__) {
        eval(`__webpack_require__("inline-loader1!inline-loader2!./src/a.js");
__webpack_require__("./src/1.less");`);
    }),
    
  });