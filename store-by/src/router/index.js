import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 引入页面级组件
let Index = () => import('@/pages/Index.vue')
let Detail = () => import('@/pages/Detail.vue')
let FloorList = () => import('@/pages/FloorList.vue')
let Reg = () => import('@/pages/Reg.vue')
let Login = () => import('@/pages/Login.vue')
let Car = () => import('@/pages/Car.vue')
let Address = () => import('@/pages/Address.vue')
let OrderConfirm = () => import('@/pages/OrderConfirm.vue')



export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      component: Index 
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/floor',
      component: FloorList
    },
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/car',
      component: Car
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/orderConfirm',
      component: OrderConfirm
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
