/**
 * @description 通用请求
 */
let store = require('../utils/store.js');
let system = store.getSystemInfo();
const clientType = {
  'clientType': 'mp',
  'appName': 'wechat Demo',
  'model': system.model,
  'os': system.system,
  'screen': system.screenWidth + '*' + system.screenHeight,
  'version': App.version
};
module.exports = {
  fetch: function(url, data={}, option={
    method:'get',
    loading:true, 
    toast:true, 
    isMask:false,
    isMock:false
    }) {
    return new Promise((resolve, reject) => {
      let {method, loading, toast, isMock, isMask} = option;
      if (loading) {
        wx.showLoading({
          title: '加载中...',
        });
      }
      let env = isMock ? App.config.mockApi : App.config.baseApi;
      wx.request({
        url: env + url,
        data,
        method,
        header: option,
        success: function (result) {
          let res = result.data;
          if (result.statusCode === 200) {
            if (toast) {
              wx.showToast({
                mask: true,
                title: res.message || result.errMsg,
                icon: 'none'
              });
            } else {
              wx.hideLoading();
            }
            resolve(res);
          } else {
            if (toast) {
              wx.showToast({
                mask: true,
                title: res.message || result.errMsg,
                icon: 'none'
              });
            } else {
              wx.hideLoading();
            }
            reject(res);
          }
        },
        fail: function (err = { code: -1, msg: errMsg, errMsg: '出现异常'}) {
          reject(err);
          wx.showToast({
            title: err.errMsg,
            icon: 'none'
          })
        }
      })
    });
  }
};