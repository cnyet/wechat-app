// pages/map/map.js
// 引入SDK核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    region: "",
    location: "",
    address: "",
    markers: [{
      iconPath: "/static/location.png",
      id: 0,
      latitude: 31.2396900000,
      longitude: 121.4997200000,
      width: 20,
      height: 20
    }],
    polyline: [{
      points: [{
        longitude: 121.4997200000,
        latitude: 31.2396900000
      }, {
        longitude: 121.6603400000,
        latitude: 31.1441900000
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }]
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getMyLocation: function () {
    var self = this;
    wx.showLoading({
      title: "正在加载..."
    });
    wx.getLocation({
      type: '',
      altitude: true,
      success: function (res) {   
        var lat = res.latitude;
        var lon = res.longitude;
        // 调用接口
        qqmapsdk.search({
          keyword: '上海',
          page_size: 5,
          success: function (res) {    
            console.log(lat, lon)        
            var title = res.data.length ? res.data[0].address : "";           
            wx.openLocation({
              latitude: lat,
              longitude: lon,
              scale: 28,
              name: "你当前的位置",
              address: title
            });            
          },
          fail: function (res) {
            wx.showToast({
              title: res.message
            });
          },
          complete: function (res) { 
            wx.hideLoading();           
            console.log("ok");
          }
        })     
        
      },
      fail: function (res) {
        wx.showToast({
          title: "当前位置获取失败"
        });
      },
      complete: function (res) {

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 实例化API核心类
    qqmapsdk = new QQMapWX({
      key: 'V7PBZ-XBZWU-EI3VN-BTZVJ-64PCS-WBF2G'
    });
    wx.showLoading({
      title: "正在加载..."
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var  self = this;
    // 调用接口
    qqmapsdk.search({
      keyword: '上海',
      location: {
        longitude: 121.4997200000,
        latitude: 31.2396900000
      },
      page_size: 5,
      success: function (res) {
        var region = res.region.title;
        var title = res.data.length ? res.data[0].title : "";
        self.setData({
          region: region,
          location: title          
        })
        console.log(res);
      },
      fail: function (res) {
        wx.showToast({
          title: res.message
        });
      },
      complete: function (res) {
        wx.hideLoading();
        console.log("ok");
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})