<template>
  <div>
    <div class="store-shelf">
      <shelf-title></shelf-title>
      <scroll class="store-shelf-scroll-wrapper" :top="0" :bottom="scrollBottom" @onScroll="onScroll" ref="scroll">
        <shelf-search></shelf-search>
        <shelf-list></shelf-list>
      </scroll>
      <shelf-footer></shelf-footer>
    </div>
  </div>
</template>
<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
import ShelfSearch from '@/components/shelf/ShelfSearch'
import ShelfList from '@/components/shelf/ShelfList'
import Scroll from '@/components/common/Scroll'
import ShelfFooter from '@/components/shelf/ShelfFooter'
import { storeShelfMixin } from '../../utils/mixin'
import { appendAddToShelf } from '../../utils/store'
import { shelf } from '../../api/store'

export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle,
    Scroll,
    ShelfSearch,
    ShelfList,
    ShelfFooter
  },
  data() {
    return {
      scrollBottom: 0
    }
  },
  watch: {
    isEditMode(isEditMode) { // 监听是否处于编辑模式，从而改变bottom的值
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => { // 记得更新哦
        this.$refs.scroll.refresh()
      })
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    },
    getShelftList() {
      shelf().then(response => {
        if (response.status === 200 && response.data && response.data.bookList) {
          this.setShelfList(appendAddToShelf(response.data.bookList))
        }
      })
    }
  },
  mounted() {
    this.getShelftList()
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
