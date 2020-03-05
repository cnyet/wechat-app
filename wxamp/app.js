/**
 * 小程序入口文件
 */
let Api = require('./http/api.js');
let request = require('./http/request.js');
let store = require('./utils/store.js');
let config = require('./env/index.js');
let env = 'Dev';
App.version = '1.0.0';
App.config = config[env]; // 根据环境变量获取对应的配置信息
App.config.env = env;
App.config.mockApi = config.mockApi;

App({
  config: config[env],
  Api: Api,
  get: request.fetch,
  post: (url, data, option={
    loading: true,
    toast: true, 
    isMask: false,
    isMock: false
  })=>{
    option.method='post';
    return request.fetch(url, data, option);
  },
  onLaunch () {  // 小程序初始化完成时触发，全局只触发一次
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.get(Api.getSession, { code: res.code }).then(response => {
          let session = response.data;
          store.setItem('open_id', session.openid, 'userInfo');
          store.setItem('session_key', session.session_key, 'userInfo');
        }).catch(err => {
          console.log(err);
        });
      }
    })
  }
})