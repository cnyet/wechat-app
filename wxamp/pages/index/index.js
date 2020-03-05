const app = getApp();
const Api = require('../../http/api.js');
const store = require('../../utils/store.js');
const router = require('../../utils/router.js');

Page({
  data: {
    userInfo: null,
    hasUserInfo: false
  },
  onLoad () {
    let session = store.getItem('userInfo');
    console.log(session);
    if (session.open_id && session.user_name && session.avatar) {
      this.setData({ 
        userInfo: session,
        hasUserInfo: true
      });
    }
  },
  getUserInfo (e) {
    let userInfo = e.detail.userInfo;
    let session = store.getItem('open_id', 'userInfo');
    userInfo.openId = session.open_id;
    this.setData({ userInfo });
    app.post(Api.login, { 
      openId: session.open_id,
      userName: userInfo.nickName,
      province: userInfo.province,
      avatar: userInfo.avatarUrl,
      sex: userInfo.gender,
    }).then(res => {
      this.setData({
        hasUserInfo: true
      });
      store.setItem('user_name', userInfo.nickName, 'userInfo');
      store.setItem('avatar', userInfo.avatarUrl, 'userInfo');
    }).catch(err => {
      console.log(err);
    });
  },
  wechatShare() {
    console.log('分享');
  },
  onShareAppMessage(obj) {
    return {
      title: '分享测试页面',
      path: '../activity/index',
      imageUrl: '../../assets/images/01.jpg'
    };
  },
  wechatPay() {
    router.push('pay');
  },
  wechatActivity() {
    router.push('activity');
  }
})
