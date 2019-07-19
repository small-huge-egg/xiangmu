// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
import loading from './plugins/loading.js'
import Tip from './plugins/tip.js'
// eslint-disable-next-line camelcase
import vue_lazy from './plugins/vue_lazy'

// eslint-disable-next-line no-redeclare
import axios from 'axios'
// 引入重置样式
import '@/assets/css/reset.css'

Vue.use(loading)
Vue.use(Tip)
Vue.use(vue_lazy)

Vue.config.productionTip = false

Vue.prototype.$axios = axios.create({
  baseURL: 'http://192.168.4.201:9527'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
