<template>
  <div id="app">
    <page-header></page-header>
    <keep-alive>
      <router-view></router-view> 
    </keep-alive>
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script>
import pageHeader from "@/components/pageHeader"
import scrollToTop from "@/components/scrollToTop"
import BacImg from "./assets/images/5.jpg"
export default {
  components: {
    pageHeader, 
    scrollToTop
  },
  created(){
    // 检测是否有本地存储,有则存入vuex
    let res = sessionStorage.getItem("userInfo");
    if(res){
      res=JSON.parse(res)
      this.$store.commit('setToken',{
        ...res
      })
    }
  }
}
</script>
<style>
body{
  background-image: url("/static/5.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed; 
}
</style>

