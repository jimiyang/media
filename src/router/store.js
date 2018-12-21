import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    test: 'newmedia'
  },
  mutations: {
    changeLogin (state, data) {
      state.isLogin = data
    }
  }, // update  data
  getters: {}, // get data
  actions: {},
  modules: {}
})
