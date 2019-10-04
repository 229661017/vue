import $router from '../../router/index'
import $store from '../store'
import $requestAPI from '../../api/index'
import { getToken } from '../../utils/token'
import {getNameByUrlOrPath, getPathByUrl} from '../../utils/StringUtils'
import Vue from 'vue'
import { Loading } from 'element-ui'

/**
 * 文件说明
 * 动态请求菜单数据，并处理后，添加相关路由数据
 */

let hasMenus = false; // 是否有菜单数据
let loadingInstance;
$router.beforeEach(async (to, from, next) => {
  loadingInstance = Loading.service({
    lock: true,
    text: '玩命加载中，请稍后...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });

  if (getToken()) {
    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (hasMenus) {
        next()
      } else {
        try {
          let routes = {};
          // 请求菜单权限，并处理为路由数据
          await $requestAPI.currentPermissions().then(data => {
            // 处理请求后的菜单数据
            routes = menusToRoutes(data);
          });
          // 动态添加路由
          $router.addRoutes(routes.routeArrays);
          // $router.options.routes.push(routes.routeArrays);
          // 添加路由与菜单数组至store,供其它地方调用
          $store.commit('add_route_arrays', routes.routeArrays);
          $store.commit('add_menu_arrays', routes.menuData);
          // 更新菜单状态
          hasMenus = true
          next({path: to.path || '/'})
        } catch (error) {
          console.error(error)
          $store.commit('remove_token');
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // 更新菜单状态
    hasMenus = false
    if (to.path === '/login') {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
});

$router.afterEach(() => {
  if (loadingInstance) {
    loadingInstance.close();
  }
});

/**
 * 处理菜单数据，生成路由，并存储菜单数据
 * data: 处理后的菜单数据
 * routeArrays: 路由数据
 * @param data 初始菜单数据
 * @returns {{data: *, routeArrays: Array}}
 */
function menusToRoutes (data) {
  const routeArrays = []; // 全部路由数组
  const children = []; // 子路由数组
  const layoutRoute = {path: '/', component: () => import('../../components/Layout.vue'), redirect: '/index', name: 'layout', children};
  const indexRoute = { path: '/index', css: 'fa fa-home', title: '首页', name: 'index', component: () => import('../../components/Index.vue') };
  const errorRoute = {path: '/error', css: '', title: '错误页', name: 'error', component: () => import('../../components/Error.vue')};
  // 框架布局路由
  routeArrays.push(layoutRoute);
  // 框架进入后首页子路由
  children.push(indexRoute);
  eachData(data);
  function eachData (data) {
    data.forEach(item => {
      // 根据链接决定是否生成路由
      item.css = 'fa ' + item.css;
      item.href = getPathByUrl(item.href);
      if (item.href && item.href !== '/') {
        const componentId = getNameByUrlOrPath(item.href);
        children.push({
          path: item.href,
          component: Vue.component(componentId),
          title: item.name,
          css: item.css,
          name: componentId
        });
      }
      // 遍历二级菜单
      if (item.child && item.child.length > 0) {
        eachData(item.child);
      }
    });
  }
  // 错误页面
  children.push(errorRoute);
  // 最后添加404页面 否则会在登陆成功后跳到404页面
  routeArrays.push({path: '*', redirect: '/error'});
  const result = {menuData: data, routeArrays};
  return result;
}
