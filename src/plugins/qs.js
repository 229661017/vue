import Vue from 'vue'
import qs from 'qs' // 引入qs，并绑定到Vue原型
Vue.prototype.$qs = qs // 并绑定到Vue原型
