// 引入axios组件
import axios from 'axios';
import router from '../router/index'
import {getToken, resetTokenAndClearUser} from '../utils/token'
// 引入 Element UI 弹窗
import { MessageBox } from 'element-ui';

// axios.defaults.withCredentials = true; // 带cookie请求
// axios.defaults.timeout = 5000; //  请求的超时时间 5000ms
/**
 * 请求拦截
 */
axios.interceptors.request.use(config => {
  let _token = getToken();
  if (_token) {
    config.headers['cache'] = false;
    config.headers['token'] = _token;
  }
  return config;
}, err => {
  MessageBox.alert('请求超时!', '消息提示');
  return Promise.reject(err);
});

/**
 *  响应拦截
 */
axios.interceptors.response.use(
  // 成功处理
  function (response) {
    // console.debug('NORMAL => 响应拦截器信息：' + JSON.stringify(response.data));
    return response;
  },
  // 错误处理
  function (error) {
    console.debug('ERROR => 响应拦截器信息:' + JSON.stringify(error));
    let _response = error.response;
    let _message = '';
    if (_response) {
      let _status = _response.status;
      switch (_status) {
        case 401: // 登录状态失效
          resetTokenAndClearUser();
          _message = _response.data.message;
          router.push('/login');
          break;
        case 404:
          _message = '未找到页面';
          break;
        default: {
          if (_response.data != null && _response.data.message != null) {
            _message = _response.data.message;
          } else {
            _message = '未知错误！，错误码[' + _status + ']';
          }
        }
      }
    } else {
      // localStorage.removeItem('token');
      console.log('Error', error.message);
      _message = '请求错误或服务器异常，请联系管理员！';
    }
    MessageBox.alert(_message, '消息提示');
    return Promise.reject(error);
  }
);

export default axios;
