import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router/route'
import store from './router/store'
import common from './until/public.js'
// import {ajax as axios} from './api/api.js'
Vue.use(common)
// Vue.use(axios)
// console.log(axios)
/* eslint-disable  */
require ('!style-loader!css-loader!less-loader!../static/less/style.less') 
Vue.config.productionTip = false
// Vue.prototype.$ajax = axios
Vue.prototype.$common = common
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    if (window.sessionStorage.getItem('changeLogin') === '100') {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
/* eslint-enable */
