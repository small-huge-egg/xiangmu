<template>
  <div class="ebook-bookmark" ref="bookmark">
    <!-- 文字部分 -->
    <div class="ebook-bookmark-text-wrapper">
      <!-- 箭头图标 -->
      <div class="ebook-bookmark-down-wrapper" ref="iconDown">
        <span class="icon-down"></span>
      </div>
      <!-- 文字 -->
      <div class="ebook-bookmark-text">{{text}}</div>
    </div>
    <!-- 书签图片部分 -->
    <div class="ebook-bookmark-icon-wraper" :style="isFixed ? fixedStyle : {}">
      <book-mark :width="15" :height="35" :color="color" ref="bookmark"></book-mark>
    </div>
  </div>
</template>
<script>
import { realPx } from '../../utils/utils'
import { ebookMixin } from '../../utils/mixin'
import BookMark from '@/components/ebook/Bookmark'

const BLUE = '#346cbc'
const WHITE = '#fff'

export default {
  mixins: [ebookMixin],
  data() {
    return {
      color: WHITE,
      text: '',
      isFixed: false
    }
  },
  components: {
    BookMark
  },
  computed: {
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${(window.innerWidth - this.$refs.bookmark.clientWidth) / 2}px`
      }
    },
    height() {
      return realPx(35)
    },
    threshold() {
      return realPx(55)
    }
  },
  watch: {
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.height && v < this.threshold) { // 状态2： 零界状态
        this.beforeThreshold(v)
      } else if (v >= this.threshold) { // 状态3： 超越零界状态
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) { // 状态1： 未超过书签的高度
        if (this.isBookmark) {
          this.beforeHeight()
        }
      } else if (v === 0) { // 状态4：归位
        this.restore()
      }
    }
  },
  methods: {
    addBookmark() {},
    removeBokmark() {},
    restore() { // 状态4： 归位 (注意如果有了过度动画，这里归位要等到动画结束的时候)
      setTimeout(() => {
        this.$refs.bookmark.style.top = `${-this.height}px` // 高度归位
        this.$refs.iconDown.style.transform = 'rotate(0deg)' // 向下箭头归位
      }, 200)
      if (this.isFixed) { // 如果存在固定定位，将书签存入vuex
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBokmark()
      }
    },
    beforeHeight() { // 状态1： 未超过书签的高度
      if (this.isBookmark) { // 如果是书签
        this.text = this.$t('book.pulldownDeleteMark') // 下拉删除书签
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    beforeThreshold(v) { // 状态2： 零界状态
      this.$refs.bookmark.style.top = `${-v}px`
      this.beforeHeight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') { // 设置箭头动画
        iconDown.style.transform = 'rotate(0deg)'
      }
    },
    afterThreshold(v) { // 状态3： 超越零界状态
      this.$refs.bookmark.style.top = `${-v}px`
      if (this.isBookmark) { // 如果是书签
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') { // 设置箭头动画
        iconDown.style.transform = 'rotate(180deg)'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  background: red;
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: #fff;
      display: all .2s linear;
      @include center;
    }
    .ebook-bookmark-text{
      font-size: px2rem(14);
      color: #fff;
    }
  }
  .ebook-bookmark-icon-wraper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(10);
  }
}
</style>
