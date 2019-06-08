<template>
  <div>
    <div class="store-shelf">
      <shelf-title :title="shelfCategory.title"></shelf-title>
      <scroll class="store-shelf-scroll-wrapper"
              :top="0" :bottom="scrollBottom" @onScroll="onScroll" ref="scroll"
              v-if="ifShowList">
        <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
      </scroll>
      <div class="store-shelf-empty-view" v-else>{{$t('shelf.groupNone')}}</div>
      <shelf-footer></shelf-footer>
    </div>
  </div>
</template>
<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
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
  computed: {
    ifShowList() {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
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
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
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
    .store-shelf-empty-view {
      position: absolute;
      top: 50;
      left: 0;
      width: 100%;
      height: 100%;
      font-size: px2rem(14);
      color: #333;
      @include center;
    }
  }
</style>
