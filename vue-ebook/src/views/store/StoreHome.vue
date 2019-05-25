<template>
  <div class="store-home">
    <search-bar></search-bar>
    <scroll :top="94" @onScroll="onScroll">
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
  import { storeHomeMixin } from '@/utils/mixin'
  export default {
    mixins: [storeHomeMixin],
    components: {
      SearchBar,
      Scroll
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY) // 滚动的距离
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
