import createMatcher from "./create-matcher";
import BrowserHistory from "./history/history";
import HashHistory from "./history/hash";
import { install, _Vue } from "./install";

export default class VueRouter {
  constructor(options) {
    // 根据用户的配置生成一个映射表，稍后跳转时，根据路径找到对应的组件来进行渲染

    // 创建匹配器后，核心的方法就是匹配
    // this.matcher : {match, addRoutes}
    this.matcher = createMatcher(options.routes || [])

    // 根据当前的mode 创建不同的history 管理策略
    switch (options.mode) {
      case 'hash':
        this.history = new HashHistory(this)
        break;

      case 'history':
        this.history = new BrowserHistory(this)
        break;
    }
  }
  match (location) {
    return this.matcher.match(location)
  }
  push (location) {
    this.history.push(location)
  }

  /**
   * @description 路由初始化。 初始化后 需要先根据路径做一次匹配，后续根据hash值的变化再次匹配
   * @param {*} app app根实例
   */
  init (app) {
    const history = this.history; // history实例

    const setupListener = () => {
      history.setupListener(); // 监听hash值的变化
    }

    history.transitionTo(history.getCurrentLocation(), setupListener); // 跳转到哪里

    // 传递一个回调函数 用来更新 响应式route的值
    history.listen((route) => {
      app._route = route;
    })

  }
}


VueRouter.install = install;