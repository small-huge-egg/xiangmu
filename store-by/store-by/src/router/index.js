import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入页面级组件
let Index = () => import('@/pages/Index.vue')

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    }
  ]
})
