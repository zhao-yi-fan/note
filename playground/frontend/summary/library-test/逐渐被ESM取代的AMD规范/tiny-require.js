// tiny-require.js
(function () {
  // 1. 缓存所有已定义模块的信息
  // 结构：{ 'moduleName': { name, deps, callback, exports, status: 'loading' | 'loaded' } }
  const modules = {};

  // 临时存放刚加载完、还未命名的模块
  let tempModule = null;

  /**
   * 模块定义：define(deps, callback) 或 define(name, deps, callback)
   */
  window.define = function (name, deps, callback) {
    // 兼容没有写名字的匿名模块 define(['dep1'], function(){})
    if (typeof name !== "string") {
      callback = deps;
      deps = name;
      name = null;
    }

    const module = {
      name: name,
      deps: deps || [],
      callback: callback,
      exports: null,
      status: "defined",
    };

    if (name) {
      modules[name] = module;
    } else {
      tempModule = module; // 匿名模块先存到临时变量
    }
  };

  // 标记 define 支持 AMD 规范
  window.define.amd = {};

  /**
   * 模块引入：require(deps, callback)
   */
  window.require = function (deps, callback) {
    // 构造一个虚拟的根模块，用来触发依赖链的加载
    const rootModule = {
      deps: deps,
      callback: callback,
    };

    loadModuleDeps(rootModule, function () {});
  };

  /**
   * 核心函数：加载某个模块的所有依赖，并返回该模块的导出值
   */
  function loadModuleDeps(module, onReady) {
    const deps = module.deps;
    if (deps.length === 0) {
      // 没有依赖，直接执行回调获取导出值
      const exports =
        typeof module.callback === "function"
          ? module.callback()
          : module.callback;
      onReady(exports);
      return;
    }

    let loadedCount = 0;
    const args = []; // 存放所有依赖模块的导出值

    // 遍历依赖，挨个加载
    deps.forEach((depName, index) => {
      getModule(depName, function (exports) {
        args[index] = exports;
        loadedCount++;
        // 当这个模块的所有依赖都加载完成
        if (loadedCount === deps.length) {
          // 执行当前模块的回调，并将它的导出值缓存起来
          const moduleExports =
            typeof module.callback === "function"
              ? module.callback.apply(null, args)
              : module.callback;

          onReady(moduleExports);
        }
      });
    });
  }

  /**
   * 获取或异步加载单个模块
   */
  function getModule(name, onReady) {
    const module = modules[name];

    // 情况 A：模块已经加载并执行过了，直接返回缓存的导出值
    if (module && module.status === "loaded") {
      onReady(module.exports);
      return;
    }

    // 情况 B：模块正在加载中，监听其完成（这里简化处理，将回调挂载到模块上）
    if (module && module.status === "loading") {
      module.onReadys = module.onReadys || [];
      module.onReadys.push(onReady);
      return;
    }

    // 情况 C：模块还不存在，说明需要动态创建 script 标签去网络请求
    const newModule = {
      name: name,
      status: "loading",
      onReadys: [onReady],
    };
    modules[name] = newModule;

    // 动态创建 script 标签加载 JS 文件
    const script = document.createElement("script");
    script.src = `./${name}.js`; // 假设模块文件名和名字一致
    script.async = true;

    script.onload = function () {
      // 文件加载完后，define() 会被触发，匿名模块的信息被暂存在 tempModule 中
      if (tempModule) {
        newModule.deps = tempModule.deps;
        newModule.callback = tempModule.callback;
        tempModule = null; // 释放临时变量
      }

      // 递归加载该模块自身的依赖
      loadModuleDeps(newModule, function (exports) {
        newModule.exports = exports;
        newModule.status = "loaded";
        // 执行所有等待该模块的 ready 回调
        newModule.onReadys.forEach((cb) => cb(exports));
      });
    };

    document.head.appendChild(script);
  }
})();
