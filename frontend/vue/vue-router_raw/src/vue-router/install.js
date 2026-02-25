export let _Vue; // 可以在install之后把Vue共享出去
import RouterLink from "./components/router-link";
import RouterView from "./components/router-view";

// 需要将install方法单独的进行拆分
export function install (Vue, options) {
  _Vue = Vue;

  // Vue.prototype.router = router 这样会挂载到原型上，比如在eventBus使用方式的时候，压根没有使用router，但是也挂载到原型上，是不太好的。
  
  // 需要将当前的根实例提供的router属性共享给所有子组件
  // 所有子组件初始化的时候 都会去调用Vue.extend Vue.options

  Vue.mixin({
    beforeCreate () {
      console.log(this, this.$options.name,'this====');
      // 获取每个实例，给实例添加属性
      if (this.$options.router) { // this为根组件
        this._routerRoot = this; // 根实例挂载到_routerRoot属性上
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else { // this为子孙辈组件
        this._routerRoot = this.$parent && this.$parent._routerRoot;

      }
      // 根._routerRoot => 父亲._routerRoot => 儿子._routerRoot => 孙子._routerRoot
    }
  })

  Object.defineProperty(Vue.prototype, '$route', {
    get () {
      return this._routerRoot._route // current 对象里面放的都是属性 path matched
    }
  })

  Object.defineProperty(Vue.prototype, '$router', {
    get () {
      return this._routerRoot._router // addRoute match
    }
  })

  Vue.component('router-link', RouterLink);
  Vue.component('router-view', RouterView);

}