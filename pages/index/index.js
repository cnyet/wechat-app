//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    userInfo: {},
    loading: false,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tableObj: {
      1: new Array(3),
      2: new Array(3),
      3: new Array(3)
    }
    
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })        
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  changeColor: function(e){
    var randomArr = [];
    var count = 0;
    var num = 0;    
    this.setData({
      loading: true
    });

    while (count<9){
      num = Math.round(Math.random() * 9);
      randomArr.push(num);
      count++;
    }
    console.log(randomArr)
    this.setData({
      loading: false,
      tableObj: {
        1: randomArr.slice(0,3),
        2: randomArr.slice(3, 6),
        3: randomArr.slice(6, 9)
      }
    });
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
