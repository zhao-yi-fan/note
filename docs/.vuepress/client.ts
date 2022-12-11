import { defineClientConfig } from '@vuepress/client'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

// import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css'

// import BunnyUi from 'bunny-ui'
// import 'bunny-ui/dist/bunnyUi.css'

// Vue.directive('highlight',function (el){
//   let blocks = el.querySelectorAll('pre code')
//   blocks.forEach(block => {
//     hljs.highlightBlock(block)

//   });
// })

// export default ({
//   Vue,
//   options,
//   router,
//   siteData
// }) => {
//   Vue.use(Element)
//   Vue.use(moonUi)
// }

export default defineClientConfig({
  enhance ({ app, router, siteData }) {
    console.log(app, router, siteData);
    // app.use(ElementPlus);
    // app.use(BunnyUi)

    router.beforeEach((to) => {
      console.log('before navigation')
    })

    router.afterEach((to) => {
      console.log('after navigation')
    })
  },
  setup () { },
  rootComponents: [],
})