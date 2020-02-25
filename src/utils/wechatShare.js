import wx from 'weixin-js-sdk';

export function InitShareInfo() {
  const shareInfo = {
    title: '分享标题', // 分享标题
    desc: '分享描述', // 分享描述
    link: 'http://m.imooc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'https://img.mukewang.com/545847990001d46402200220-100-100.jpg', // 分享图标
  };
  wx.onMenuShareTimeline(shareInfo);
  wx.onMenuShareAppMessage(shareInfo);
  wx.onMenuShareQQ(shareInfo);
  wx.onMenuShareQZone(shareInfo);

  wx.updateAppMessageShareData(shareInfo);
  wx.updateTimelineShareData(shareInfo);
}
