import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'

Vue.use(Router)
Vue.use(Resource)
export default new Router({
  // 设置 链接激活时使用的 CSS 类名。 默认值可以通过路由的构造选项 linkActiveClass 来全局配置
  linkActiveClass: 'active',
  routes: [{
    path: '',
    redirect: '/goods'
  }, {
    path: '/goods',
    name: 'goods',
    component: goods
  }, {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  }, {
    path: '/seller',
    name: 'seller',
    component: seller
  }]
})