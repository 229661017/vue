// 引入封装后的axios组件
import $axios from '../plugins/axios';

let base = process.env.API_ROOT
// 用户请求登录
export const requestLogin = params => { return $axios.post(`${base}/login`, params).then(res => res.data); };
// 用户退出登录
export const requestLogout = () => { return $axios.get(`${base}/logout`).then(res => res.data); };
// 根据token获取当前用户
export const currentUserByToken = params => { return $axios.get(`${base}/users/current?token=` + params).then(res => res.data); };
// 获取当前用户菜单权限
export const currentPermissions = () => { return $axios.get(`${base}/permissions/current`).then(res => res.data); };
