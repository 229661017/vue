// 字符串工具类
import {getNameByUrlOrPath} from '../utils/StringUtils'

/**
 * 添加菜单数组
 * @param state
 * @param data
 */
function addMenuArrays (state, data) {
  this.state.menuArrays = data;
}

/**
 * 添加路由
 * @param state
 * @param data
 */
function addRouteArrays (state, data) {
  // 遍历菜单，根据url规则生成响应链接的ID，与名称对应
  const menuRouteMap = new Map();
  eachData(data);
  /**
     * 遍历数组
     * @param data
     */
  function eachData (data) {
    data.forEach(route => {
      // console.log(route);
      if (route.name) {
        menuRouteMap.set(route.name, route);
      }
      if (route.children && route.children.length > 0) {
        eachData(route.children);
      }
    });
  }
  this.state.menuRouteMap = menuRouteMap;
}

/**
 * 添加选项卡
 * @param state
 * @param data
 */
function addTabs (state, data) {
  // console.debug('1. add_tabs:' + JSON.stringify(state) + ',' + JSON.stringify(data));
  const routeId = getNameByUrlOrPath(data.route);
  const route = this.state.menuRouteMap.get(routeId);
  data.css = route.css;
  data.title = route.title;
  if (!data.title) {
    data.title = routeId;
  }
  console.log(data);
  this.state.openTab.push(data);
}

/**
 * 删除选项卡
 * @param state
 * @param route
 */
function deleteTabs (state, route) {
  // console.debug('delete_tabs:' + JSON.stringify(state) + ',' + JSON.stringify(route));
  let index = 0;
  for (let option of state.openTab) {
    if (option.route === route) {
      break;
    }
    index++;
  }
  this.state.openTab.splice(index, 1);
}

/**
 * 设置激活选项卡
 * @param state
 * @param index
 */
function setActiveIndex (state, index) {
  // console.debug('set_active_index:' + JSON.stringify(state) + ',---' + JSON.stringify(index));
  this.state.activeIndex = index;
}

/**
 * Action提交的是Mutation，不能够直接修改state中的状态，而Mutations是可以直接修改state中状态的；
 * Action是支持异步操作的，而Mutations只能是同步操作。
 */
const tabsview = {
  state: {
    menuArrays: [], // 记录所有菜单信息
    menuRouteMap: new Map(), // 路由Map
    openTab: [], // 所有打开的路由
    activeIndex: '/index' // 激活状态
  },
  mutations: {
    // 添加菜单数组
    add_menu_arrays: addMenuArrays,
    // 添加路由数组
    add_route_arrays: addRouteArrays,
    // 添加tabs
    add_tabs: addTabs,
    // 删除tabs
    delete_tabs: deleteTabs,
    // 设置当前激活的tab
    set_active_index: setActiveIndex
  },
  actions: {
  }
}
export default tabsview
