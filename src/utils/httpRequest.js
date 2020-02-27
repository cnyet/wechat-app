/**
 * @author: yate
 * @description: 封装axios方法
 */
import axios from 'axios';
import { baseUrl } from '../api/env';

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common['Authorization'] = '';

// 添加请求时拦截器
axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  console.log(error);
  return Promise.reject(error);
});
// 添加响应时拦截器
axios.interceptors.response.use(function(response) {
  const res = response.data;
  return res;
}, function(error) {
  console.log(error);
  return Promise.reject(error);
});

export default {
  getByParam,
  postByParam,
  putByParam,
  patchByParam,
  deleteByParam
};

/**
 * get 请求
 * @param  {[type]} url    请求接口地址
 * @param  {[type]} params 请求参数
 * @return {[type]}        Promise
 */
function getByParam (url, config) {
  return new Promise(function(resolve, reject) {
    axios.get(url, config).then(function(res) {
      resolve(res.data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
/**
 * post 请求
 * @param  {[type]} url    请求接口地址
 * @param  {[type]} params 发送的数据
 * @return {[type]}        Promise
 */
function postByParam (url, data, config) {
  return new Promise(function(resolve, reject) {
    const defaultConfig = {
      transformRequest: [
        function(requestData, headers) {
          headers['Content-Type'] = 'application/json';
          return JSON.stringify(requestData);
        }
      ]
    };
    axios.post(url, data, (config || defaultConfig)).then(function(res) {
      resolve(res.data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
/**
 * put 请求
 * @description 调用一次与连续调用多次是等价的，已经被用来表示对资源进行整体覆盖
 * @param  {[type]} url    请求接口地址
 * @param  {[type]} params 发送的数据
 * @return {[type]}        Promise
 */
function putByParam (url, data, config) {
  return new Promise(function(resolve, reject) {
    const defaultConfig = {
      transformRequest: [
        function(requestData, headers) {
          headers['Content-Type'] = 'application/json';
          return JSON.stringify(requestData);
        }
      ]
    };
    axios.put(url, data, config || defaultConfig).then(function(res) {
      resolve(res.data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
/**
 * patch 请求
 * @description  patch 用于对资源进行部分修改，连续多个的相同请求会产生不同的效果
 * @param  {[type]} url    请求接口地址
 * @param  {[type]} params 发送的数据
 * @return {[type]}        Promise
 */
function patchByParam (url, data, config) {
  return new Promise(function(resolve, reject) {
    const defaultConfig = {
      transformRequest: [
        function(requestData, headers) {
          headers['Content-Type'] = 'application/json';
          return JSON.stringify(requestData);
        }
      ]
    };
    axios.patch(url, data, config || defaultConfig).then(function(res) {
      resolve(res.data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
/**
 * delete 请求
 * @description  用于删除指定的资源。
 * @param  {[type]} url    请求接口地址
 * @param  {[type]} params 发送的数据
 * @return {[type]}        Promise
 */
function deleteByParam (url, config) {
  return new Promise(function(resolve, reject) {
    axios.delete(url, config).then(function(res) {
      resolve(res.data);
    }).catch(function(err) {
      reject(err);
    });
  });
}
