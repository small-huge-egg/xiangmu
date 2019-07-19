<template>
  <div>
    <page-header></page-header>
    <router-view></router-view> 
    <scroll-to-top></scroll-to-top>
  </div>
</template>
<script>
import pageHeader from "@/components/pageHeader"
import scrollToTop from "@/components/scrollToTop"
export default {
  components: {
    pageHeader,
    scrollToTop
  }
}
</script>
<style>
</style>
