import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/index.vue';
import Activity from '../views/activity.vue';
import Pay from '../views/pay.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: Index,
    meta: {
      title: '首页'
    }
  }, {
    path: '/activity',
    name: 'activity',
    component: Activity,
    meta: {
      title: '活动'
    }
  }, {
    path: '/pay',
    name: 'pay',
    component: Pay,
    meta: {
      title: '支付'
    }
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
