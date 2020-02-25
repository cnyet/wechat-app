!function(n) {
  var dom = n.document, html = dom.documentElement;
  var event = 'orientationchange' in n ? 'orientationchange' : 'resize';
  function changeEvent () {
    var clientWidth = html.clientWidth || 375;
    if (clientWidth > 750) {
      clientWidth = 750;
    }
    html.style.fontSize = clientWidth / 10 + 'px';
  };
  if (dom.addEventListener) {
    n.addEventListener(event, changeEvent, false); // 网页横屏、竖屏、视窗大小改变都会触发的事件
    dom.addEventListener('DOMContentLoaded', changeEvent, false);  // 网页加载完毕以后绑定事件
  }
}(window);
