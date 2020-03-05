/**
 * @description 数据本地存储
 */
const STORAGE_KEY = 'wechat-demo';

module.exports = {
  setItem(key, value, module_name) {
    if (module_name) {
      let value_info = this.getItem(key, module_name);
      if (typeof value_info != 'string') {
        value_info[key] = value;
      }
      // 将数据同步存储到本地缓存中指定的 key 中
      wx.setStorageSync(module_name, value_info); 
    } else {
      // 将数据同步存储到本地缓存中指定的 key 中
      wx.setStorageSync(key, value);
    }
  },
  getItem(key, module_name) {
    if (module_name) {
      let value = this.getItem(module_name);
      if (value) return value;
      return {};
    } else {
      // 从本地缓存中同步获取指定 key 的内容
      return wx.getStorageSync(key);
    }
  },
  clear(key) {
    key ? wx.removeStorageSync(key) : wx.clearStorageSync();
  },
  getSystemInfo() {
    return wx.getSystemInfoSync();
  }
};