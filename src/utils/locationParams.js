/**
 * @description: 根据参数名，获取URL的传递过来的参数
 * @author: yates
 * @date: 2020-02-20
 */
export function getLocationParam (name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var result = location.search.substr(1).match(reg);
  if (result !== null) {
    return decodeURIComponent(result[2]);
  }
}
