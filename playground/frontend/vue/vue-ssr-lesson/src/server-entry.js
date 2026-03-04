import createApp from './app.js'

export default (context) => {
  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp()
    router.push(context.url); // 跳转到路由
    // 如果服务端 启动时 直接访问 /foo 返回的页面永远都是 index.html 需要通过路由跳转到指定路径
    // 因为路由是import()动态路由，路由跳转会有异步操作 需要等待路由加载完成后 返回vue实例，服务端才可以渲染出完整的页面

    router.onReady(() => {
      // 获取当前匹配的组件 看一下这个组件中 有没有 asyncData方法
      // getMatchedComponents()方法是服务端给的
      let matchesComponents = router.getMatchedComponents();
      Promise.all(matchesComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({ store })
        }
      })).then(() => {
        // 把vuex中的状态 挂载在 上下文中的state上
        context.state = store.state;
        context.meta = app.$meta();
        // 会自动在window上挂载一个属性__INITIAL_STATE__
        resolve(app);
      })
    })
  })
}