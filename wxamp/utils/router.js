/**
 * @descripton 通用路由管理
 */
const RouterPath = {
  'index': '/pages/index/index',
  'pay': '/pages/pay/index',
  'activity': '/pages/activity/index'
};
module.exports = {
  // 页面跳转
  push(path, option = {}) {
    if (typeof path === 'string') {
      option.path = path;
    } else {
      option = path;
    }
    let url = RouterPath[option.path];
    let { query, openType, duration } = option;
    if (query) {
      let params = this.parse(query);
      url += '?' + params;
    }
    // 如果需要延迟的话
    if (duration) {
      setTimeout(() => {
        this.to(openType, url);
      }, duration);
    } else {
      this.to(openType, url);
    }
  },
  to(openType, url) {
    let obj = { url };
    if (openType == 'redirect') {
      wx.redirectTo(obj);
    } else if (openType == 'reLaunch') {
      wx.reLaunch(obj);
    } else if (openType == 'back') {
      wx.navigateBack({
        delta: 1
      });
    } else {
      wx.navigateTo(obj);
    }
  },
  // 拼接url
  parse(data) {
    let arr = [];
    for(let key in Data) {
      arr.push(key + '=' +data[key]);
    }
    return arr.join('&');
  }
};