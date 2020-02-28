<template>
  <div class="home">
    <header class="header">
      <img class="logo" alt="avatar" :src="avatar">
      <p class="userName">{{userName}}</p>
    </header>
    <footer class="footer">
      <a href="javascript:;" class="weui-btn weui-btn_primary" @click="wechatShare">分享</a>
      <a href="javascript:;" class="weui-btn weui-btn_warn">体验</a>
      <a href="javascript:;" class="weui-btn weui-btn_default">活动详情</a>
    </footer>
    <!--BEGIN toast-->
    <div v-show="showTips">
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast"></i>
            <p class="weui-toast__content">已完成</p>
        </div>
    </div>
    <!--end toast-->
  </div>
</template>
<script>
// import CONFIG from '../config';
import API from '../api';
import wx from 'weixin-js-sdk';
import { httpRequest, initShareInfo } from '../utils';
import COMMON from '../common';

export default {
  name: 'Home',
  data: function() {
    return {
      userName: '',
      avatar: '',
      showTips: false
    };
  },
  mounted() {
    this.checkuserAuth();
  },
  methods: {
    checkuserAuth() {
      const openId = this.$cookie.get('openId');
      if (!openId) {
        location.href = COMMON.HOME + API.wechatRedirect;
      } else {
        this.getUserInfo();
      }
    },
    getWechatConfig() {
      httpRequest.getByParam(API.wechatConfig + '?url='+location.origin).then(function(response){
        const res = response.data;
        if (res.code === 0) {
          const data = res.date;
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: data.jsApiList // 必填，需要使用的JS接口列表
          });
          //需在用户可能点击分享按钮前就先调用
          wx.ready(function () {
            initShareInfo();
          });
        }
      }).catch(function(err){
        console.log(err);
      });
    },
    getUserInfo() {
      httpRequest.getByParam(API.getUserInfo).then(res =>{
        const data = res.data;
        this.userName = data.nickname;
        this.avatar = data.headimgurl;
      }).catch(err => {
        console.log(err);
      });
    },
    wechatShare() {
      // 获取普通access_token
      httpRequest.getByParam(API.getBaseToken).then(res =>{
        console.log(res);
        if (res) {
          wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: res.appId, // 必填，公众号的唯一标识
            timestamp: res.timestamp, // 必填，生成签名的时间戳
            nonceStr: res.nonceStr, // 必填，生成签名的随机串
            signature: res.signature,// 必填，签名
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表
          });
          this.showTips = true;
          setTimeout(()=>{
            this.showTips = false;
          },1000);
          this.setShareContent();
        }
      }).catch(err => {
        console.log(err);
      });
    },
    setShareContent() {
      wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
        wx.onMenuShareTimeline({
          title: '测试', // 分享标题
          desc: '测试文本', // 分享描述
          link: 'http://m.imooc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: API.testImg, // 分享图标
          success: function (res) {
            console.log(res);
          }
        });
        wx.onMenuShareAppMessage({
          title: '测试', // 分享标题
          desc: '测试文本', // 分享描述
          link: 'http://m.imooc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: API.testImg, // 分享图标
          success: function (res) {
            console.log(res);
          }
        });
      });
    }
  }
};
</script>
<style lang="scss">
@import "../assets/styles/mixin.scss";
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  .logo {
    width: px2rem(160);
  }
  .userName{
    padding: 10px;
  }
  .header{
    flex: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .footer{
    width: 100%;
    flex: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
