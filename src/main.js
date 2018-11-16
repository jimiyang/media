import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import less from 'less'
import App from './App'
import router from './router'
import axios from 'axios'
Vue.use(ElementUI)
require('!style-loader!css-loader!less-loader!./assets/less/style.less') 
Vue.config.productionTip = false
Vue.prototype.$ajax = axios
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
