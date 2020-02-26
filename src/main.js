import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueCookie from 'vue-cookie';

Vue.config.productionTip = false;
Vue.use(VueCookie);
// 调用 axios 插件
Vue.use(VueAxios, axios);
// 在请求或响应被 then 或 catch 处理前添加拦截器
axios.interceptors.request.use(function(config) {
  return config;
}, function(error) {
  console.log(error);
  return Promise.reject(error);
});
axios.interceptors.response.use(function(response) {
  const res = response.data;
  console.log(res);
  return res;
}, function(error) {
  console.log(error);
  return Promise.reject(error);
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
