import Vue from 'vue'
import Vuex from 'vuex'
import $router from '../router/index'
import {resetTokenAndClearUser} from '../utils/token'
import $requestAPI from '../api/index'
// 字符串工具类
Vue.use(Vuex)

/**
 * 用户退出
 */
function logout () {
  // 请求退出登录API
  $requestAPI.requestLogout().then(data => {
    if (data && data.code === '200') {
      resetTokenAndClearUser();
      // 清空store中选项卡及菜单内容
      this.state.openTab = [];
      this.state.activeIndex = '/index';
      // 退出至登录界面
      $router.push('/login');
    }
  });
}

/**
 * Action提交的是Mutation，不能够直接修改state中的状态，而Mutations是可以直接修改state中状态的；
 * Action是支持异步操作的，而Mutations只能是同步操作。
 */
const user = {
  state: {
    menuArrays: [], // 记录所有菜单信息
    menuRouteMap: new Map(), // 路由Map
    openTab: [], // 所有打开的路由
    activeIndex: '/index' // 激活状态
  },
  mutations: {
    // 用户退出
    logout: logout
  },
  actions: {
  }
}
export default user
