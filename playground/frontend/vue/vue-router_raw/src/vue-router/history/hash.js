import History from "./base";

/**
* @description 如果地址有hash不做处理，没有则默认hash为 /
*/
function ensureSlash () {
  if (window.location.hash) {
    return;
  }
  window.location.hash = '/';
}

/**
* @description #/ 截取 /
* @returns hash去除#号
*/
function getHash () {
  return window.location.hash.slice(1);
}
export default class HashHistory extends History {
  constructor(router) {
    // 1、History 构造函数先执行
    super(router) 

    // 2、默认hash模式需要加 #/
    ensureSlash();
  }
  /**
   * @description hash模式的核心功能就是 监听hash值的变化
   * 
   */
  setupListener () {
    // hashchange的性能不如高版本浏览器popstate好用，监听浏览器历史记录的变化
    window.addEventListener('hashchange', () => {
      // 根据当前hash值 去匹配对应的组件
      this.transitionTo(getHash())
    })
  }
  getCurrentLocation () {
    return getHash();
  }
  /**
   * @description 改变
   */
  push (location) {
    window.location.hash = location;
  }
}