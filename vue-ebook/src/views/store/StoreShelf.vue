<template>
  <div>
    <div class="store-shelf">
      <shelf-title></shelf-title>
      <scroll class="store-shelf-scroll-wrapper" :top="0" @onScroll="onScroll">
        <shelf-search></shelf-search>
        <shelf-list></shelf-list>
      </scroll>
    </div>
  </div>
</template>
<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
import ShelfSearch from '@/components/shelf/ShelfSearch'
import ShelfList from '@/components/shelf/ShelfList'
import Scroll from '@/components/common/Scroll'
import { storeShelfMixin } from '../../utils/mixin'
// import { shelf } from '../../api/store'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-shelf {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    z-index: 100;
    .store-shelf-scroll-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 101;
    }
  }
</style>
