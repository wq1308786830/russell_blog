import { message } from 'antd';
import tools from './index';

export const env = process.env.NODE_ENV;

export const Config = {
  foreignPrefix: 'http://104.156.250.95:7001/1.0',
  production: 'http://47.112.23.45:5001/1.0',
  development: 'http://localhost:5001/1.0',
};

function checkStatus(response) {
  if (response.status < 200 || response.status >= 300) {
    const error = new Error(response.statusText);
    error.response = response;
    error.errMessage = '网络错误~';
    throw error;
  } else if (response.data && response.data.message === 'GENERAL') {
    const error = new Error(response.statusText);
    error.response = response;
    error.errMessage = '哎呀，系统开小差啦！';
    throw error;
  }
  return response;
}

/**
 * 请求后端返回Promise
 *
 * @param  {string} url       请求api
 * @param  {object} [options] fetch需要的options配置
 * @param  {boolean} [isShowLoading] 是否展示loading
 * @return {Promise}          返回数据，Promise或者undefined
 */
async function request(url, options, isShowLoading) {
  const prefix = Config[env];

  if (isShowLoading) {
    tools.loading(true);
  }
  let res;
  try {
    const response = await fetch(prefix + url, options);
    checkStatus(response);
    res = await response.json();
  } catch (e) {
    tools.loading(false, undefined, () => {
      if (e.errMessage) {
        return message.e(e.errMessage);
      }
      return message.error('网络错误～');
    });
    throw e;
  }

  if (isShowLoading) {
    tools.loading(false);
  }
  return res;
}

/**
 * 调用非login接口且失败原因是`token失效`的需要重刷token
 * @param url 请求url
 * @param result 后端返回字段`result`
 * @param msg 后端返回字段`message`
 * @returns {boolean}
 */
const isNeedFreshCode = (url, result, msg) => {
  return !/login/.test(url) && (result === 'fail' && msg === 'token失效');
};

/**
 * 用户登录
 * @returns {boolean} 是否登陆成功
 */
function login() {
  try {
    localStorage.setItem('token', '1111111');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * 每个请求都会携带登录的token
 * @param url 请求url
 * @param options fetch options
 * @param showLoading 是否展示loading
 * @returns {Promise<void>} 请求返回结果
 */
const requestWithLogin = async (url, options, showLoading) => {
  const token = localStorage.getItem('token');

  let isLogin = false;
  if (token) {
    isLogin = true;
  } else {
    isLogin = await login();
  }

  const fetchOptions = {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    },
  };

  let resp;
  if (isLogin) {
    resp = await request(url, fetchOptions, showLoading);
    if (resp && isNeedFreshCode(url, resp.result, resp.message)) {
      isLogin = await login();
      if (isLogin) {
        resp = await request(url, fetchOptions, showLoading);
      } else {
        message.error('登录失败');
      }
    }
  }

  return resp;
};

/**
 * fetch下method=GET，options配置必须没有body
 * @param url 请求的url
 * @param {Object} params 请求参数
 * @param showLoading 是否展示loading
 * @returns {Promise<void>} 返回结果
 * @constructor
 */
const GET = (url, params = null, showLoading = false) => {
  let searchParams = tools.parseObj2SearchParams(params);
  searchParams = searchParams === '' ? searchParams : `?${searchParams}`;

  const options = {
    method: 'GET',
  };

  return requestWithLogin(`${url}${searchParams}`, options, showLoading);
};

const POST = (url, params = null, showLoading = false) => {
  const searchParams = tools.parseObj2SearchParams(params);

  const options = {
    method: 'POST',
    body: searchParams,
  };

  return requestWithLogin(url, options, showLoading);
};

const PUT = (url, params = null, showLoading = false) => {
  const searchParams = tools.parseObj2SearchParams(params);

  const options = {
    method: 'PUT',
    body: searchParams,
  };

  return requestWithLogin(url, options, showLoading);
};

const DELETE = (url, params = null, showLoading = false) => {
  const searchParams = tools.parseObj2SearchParams(params);

  const options = {
    method: 'DELETE',
    body: searchParams,
  };
  return requestWithLogin(url, options, showLoading);
};

export default {
  GET,
  POST,
  PUT,
  DELETE,
};
