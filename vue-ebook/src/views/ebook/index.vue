<template>
  <div class="ebook" ref="ebook">
    <ebook-bookmark></ebook-bookmark>
    <ebook-header></ebook-header>
    <ebook-Title></ebook-Title>
    <!-- <ebook-reader></ebook-reader> -->
    <ebook-Menu></ebook-Menu>
    <ebook-footer></ebook-footer>
    <router-view/>
  </div>
</template>
<script>
// import EbookReader from '../../components/ebook/EbookReader.vue'
import EbookMenu from '../../components/ebook/EbookMenu.vue'
import EbookTitle from '../../components/ebook/EbookTitle.vue'
import EbookBookmark from '../../components/ebook/EbookBookmark.vue'
import EbookHeader from '../../components/ebook/EbookHeader'
import EbookFooter from '../../components/ebook/EbookFooter'
import { ebookMixin } from '@/utils/mixin'
import { getReadTime, saveReadTime } from '@/utils/localStorage'

export default {
  mixins: [ebookMixin],
  data() {
    return {

    }
  },
  components: {
    // EbookReader,
    EbookMenu,
    EbookTitle,
    EbookBookmark,
    EbookHeader,
    EbookFooter
  },
  watch: {
    offsetY(v) { // 监听y轴变化
      if (!this.menuVisible) {
        if (v > 0) { // 如果下拉
          this.move(v)
        } else if (v === 0) { // 如果松手
          this.restore()
        }
      }
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  methods: {
    restore() {
      this.$refs.ebook.style.top = 0
      this.$refs.ebook.style.transition = 'all 0.2s linear'
      setTimeout(() => {
        this.$refs.ebook.style.transition = ''
      }, 200)
    },
    move(v) {
      this.$refs.ebook.style.top = v + 'px'
    },
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  beforeDeatory() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
.ebook {
  width: 100%;
  height: 100;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
