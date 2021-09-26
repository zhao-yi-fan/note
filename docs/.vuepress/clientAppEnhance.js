import { defineClientAppEnhance } from '@vuepress/client'
import aaa from './aaa.vue'
// import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// import hljs from 'highlight.js'
// import 'highlight.js/styles/googlecode.css'

// import moonUi from 'moon-ui'
// import 'moon-ui/dist/moon-ui.css'

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

export default defineClientAppEnhance(({ app, router, siteData }) => {
  app.use(ElementPlus)
  // app.use(Element)
  app.component('aaa', aaa)
})