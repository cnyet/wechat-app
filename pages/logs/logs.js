//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    wx.showLoading({
      title: "正在加载..."
    });
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        wx.showToast({
          title: "查询成功"
        });
        wx.hideLoading();
        return util.formatTime(new Date(log))
      })
    })
  }
})
