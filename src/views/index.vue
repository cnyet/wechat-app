<template>
  <div class="home">
    <header class="header">
      <img class="logo" alt="avatar" :src="avatar">
      <p class="userName">{{userName}}</p>
    </header>
    <footer class="footer">
      <a href="javascript:;" class="weui-btn weui-btn_primary">分享</a>
      <a href="javascript:;" class="weui-btn weui-btn_warn">体验</a>
      <a href="javascript:;" class="weui-btn weui-btn_default">活动详情</a>
    </footer>
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
      avatar: ''
    };
  },
  mounted() {
    this.checkuserAuth();
    // const APPID = CONFIG.APPID;
    // const REDIRECT_URI = CONFIG.REDIRECT_URI;
    // const SCOPE = CONFIG.SCOPE;
    // location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${SCOPE}&state=STATE#wechat_redirect`;
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
