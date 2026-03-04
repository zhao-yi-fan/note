import Vue from 'vue';
import App from './App.vue'
import createRouter from './router.js'
import createStore from './store.js'

let router = createRouter()
let store = createStore()
// 在客户端的话，每个客户端请求会创建一个新的vue实例，如果放到服务端的话，只会共用一个实例，所以需要改造。
// 为了兼容服务端，要把这个方法改造成函数
export default () => { // 创建实例的函数
  // 服务端不需要挂载，客户端需要挂载
  let app = new Vue({
    router,
    store,
    render: (h) => h(App)
  });
  return { app, router, store };
}