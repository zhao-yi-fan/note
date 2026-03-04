import Vue from 'vue'
import router from '@/router'
import PersonClass from '@/utils/index'
import App from './App'
const p = new PersonClass({
  name: 'zyf'
})
console.log(p?.options?.name);


new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})