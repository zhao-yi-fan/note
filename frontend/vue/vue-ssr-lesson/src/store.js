import Vue from 'vue';
import Vuex from 'vuex'

Vue.use(Vuex);

export default () => {
  let store = new Vuex.Store({
    state: {
      username: 'jw'
    },
    mutations: {
      set_username (state) {
        state.username = 'zfpx'
      }
    },
    actions: {
      set_username ({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit('set_username')
            resolve()
          }, 1000)
        })
      }
    }
  });
  // 判断是在客户端还是在服务端，在客户端把__INITIAL_STATE__替换掉state
  if(typeof window !== 'undefined' && window.__INITIAL_STATE__){
    store.replaceState(window.__INITIAL_STATE__)
  }
  return store;
}