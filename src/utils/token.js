import {resetRouter} from '../router';

/**
 * token存储key
 * @type {string}
 */
const CONST_KEY_TOKEN = 'token';

/**
 * 清楚本地缓存，并重设路由
 */
export function resetTokenAndClearUser () {
  // 退出登陆 清除用户资料
  localStorage.setItem(CONST_KEY_TOKEN, '')
  localStorage.setItem('userImg', '')
  localStorage.setItem('userName', '')
  // 重设路由
  resetRouter()
}

/**
 * 获取token
 * @returns {string | null}
 */
export function getToken () {
  return localStorage.getItem(CONST_KEY_TOKEN);
}

/**
 * 设置token
 * @param val
 */
export function setToken (val) {
  localStorage.setItem(CONST_KEY_TOKEN, val);
}
