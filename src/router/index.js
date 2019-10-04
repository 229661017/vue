import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
Vue.use(Router)

/**
 * 解决重复点击一个路由产生的 NavigationDuplicated {_name: "NavigationDuplicated", name: "NavigationDuplicated"}错误问题
 */
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
// 公共路由
const commonRouter = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
];
/**
 * 定义创建路由方法
 * @returns {VueRouter}
 */
const createRouter = () => new Router({
  mode: 'history',
  routes: commonRouter
});

const router = createRouter();
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
