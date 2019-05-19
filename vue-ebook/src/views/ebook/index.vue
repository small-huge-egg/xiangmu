<template>
  <div class="ebook">
    <ebook-Title></ebook-Title>
    <!-- <ebook-reader></ebook-reader> -->
    <ebook-Menu></ebook-Menu>
    <router-view/>
  </div>
</template>
<script>
// import EbookReader from '../../components/ebook/EbookReader.vue'
import EbookMenu from '../../components/ebook/EbookMenu.vue'
import EbookTitle from '../../components/ebook/EbookTitle.vue'
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
    EbookTitle
  },
  mounted() {
    this.startLoopReadTime()
  },
  methods: {
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
</style>
