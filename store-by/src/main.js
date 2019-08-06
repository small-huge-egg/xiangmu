// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
import loading from './plugins/loading.js'
import Tip from './plugins/tip.js'
// eslint-disable-next-line camelcase
import vue_lazy from './plugins/vue_lazy'
import {currency} from './plugins/currency' // 导入货币过滤器

// eslint-disable-next-line no-redeclare
import $axios from './assets/js/axios'
// 引入vuex
import store from './store/index'

// 引入重置样式
import '@/assets/css/reset.css'

Vue.use(loading)
Vue.use(Tip)
Vue.use(vue_lazy)

Vue.filter("currency",currency)

Vue.config.productionTip = false
 
Vue.prototype.$axios = $axios

/* eslint-disable no-new */
let app = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store,
  created() {
    this.$showLoading()
    // 每次路由跳转的时候都要展示loading,然后才能next放行
    this.$router.beforeEach((to, from, next) => {
      this.$showLoading()
      next()
    })
  }
})
