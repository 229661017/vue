import Vue from 'vue'
import App from './App'
import router from './router' // 引入路由
import store from './store/store'
import './views/_globals' // 引入全局Vue组件
import './plugins/element.js' // 引入Element ui 组件
import './plugins/qs' // 引入qs
import 'font-awesome/css/font-awesome.min.css' // font-awesome
// 全局图标
import './icons/index'
import './store/modules/permission' // 引入权限验证

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
