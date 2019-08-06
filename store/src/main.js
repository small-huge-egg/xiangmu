// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import VueLazyLoad from 'vue-lazyload' //导入懒加载插件
import infiniteScroll from 'vue-infinite-scroll'
import {currency} from './util/currency' // 导入货币过滤器

Vue.config.productionTip = false

Vue.filter("currency",currency)

Vue.use(Vuex)

Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-bars.svg"
})


Vue.use(infiniteScroll)
 
var store = new Vuex.Store({
  state:{
    cartCount:0,// 购物车数量
    nickName:'' // 用户名
  },
  mutations:{
    updateUserInfo(state,nickName){ // 用户名
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){ // 用于更改购物车数量
      state.cartCount += cartCount
    },
    initCartCount(state,cartCount){ // 用于保存购物车数量
      state.cartCount = cartCount
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 注册store,全局可用
  components: { App },
  template: '<App/>'
})
