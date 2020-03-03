/**
 * @description 通用请求
 */
let store = require('../utils/store.js');
let system = store.getSystemInfo();
console.log(system);
const clientType = {
  'clientType': 'mp',
  'appName': 'wechat Demo',
  'model': system.model,
  'os': system.system,
  'screen': system.screenWidth + '*' + system.screenHeight,
  'version': App.version
};
module.exports = {
  fetch: function(url, data={},
  {
    method='get',
    loading=true, 
    toast=true, 
    isMask=false,
    isMock=false
    }) {
    return new Promise((resolve, reject) => {
      if (loading) {
        wx.showLoading({
          title: '加载中...',
        });
      }
      let errMsg = '出现异常';
      let env = isMock ? App.config.mockApi : App.config.baseApi;
      wx.request({
        url: env + url,
        data,
        method,
        header: {
          'clientInfo': JSON.stringify(clientInfo)
        },
        success: function (result) {
          let res = result.data;
          if (res.code === 0) {
            if (loading) {
              wx.hideLoading();
            }
            resolve(res.data);
          } else {
            if (toast) {
              wx.showToast({
                mask: true,
                title: res.message,
                icon: 'none'
              });
            } else {
              wx.hideLoading();
            }
            reject(res);
          }
        },
        fail: function (err={code: -1, msg: errMsg, errMsg}) {
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