<template>
  <div class="store-home">
    <search-bar></search-bar>
    <flap-card></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div>4545</div>
      <div>45454</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
      <div>454545</div>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import FlapCard from '../../components/home/FlapCard'
  import { storeHomeMixin } from '@/utils/mixin'
  export default {
    mixins: [storeHomeMixin],
    data() {
      return {
        scrollTop: 94
      }
    },
    components: {
      SearchBar,
      Scroll,
      FlapCard
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY) // 滚动的距离
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
