import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from '../vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

Vue.use(VueRouter, {})

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    component: About,
    children: [
      {
        path: 'a',
        component: {
          render (h) { // js + html的语法
            return <h1>hello a</h1>
            // return h('h1',null,'hello a')
          }
        }
      },
      {
        path: 'b',
        component: {
          render (h) {
            return <h1>hello b</h1>
          }
        }
      },
    ]
  }
]
// 当前是spa应用，路径切换可以重新渲染组件（不刷新页面）
// 1、 hash 特点丑 兼容性好，loaction.hash = 'xx'
// 2、 history 特点漂亮 想正常路径一样 需要服务端支持 本地开发是因为webpack的history-fallback插件 history.pushState / window.addEventListener('popstate')
const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
