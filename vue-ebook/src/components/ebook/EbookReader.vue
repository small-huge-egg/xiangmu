<template>
<!-- 用来接收动态路由 -->
  <div class="ebook-reader">split
    <!-- 创建容器展示电子书 -->
    <div id="read"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Epub from 'epubjs'
global.epub = Epub
export default {
  mounted() {
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName)
      .then(() => { // 异步调用，所以用action
        this.initEpub()
      })
  },
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    // 跳到上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },

    // 跳到下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },

    // 菜单展示/隐藏
    toggleTitleAndMenu() {

    },

    initEpub() { // 初始化渲染电子书
      const url = 'http://localhost:8082/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', { // epubjs的方法，渲染图书的
        width: innerWidth,
        height: innerHeight,
        method: 'default' // 为了在微信上可以显示
      })
      this.rendition.display()
      console.log(this.rendition)
      this.rendition.on('touchstart', event => { // 开始触摸
        console.log(event)
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
        console.log('ddd')
      })
      this.rendition.on('touched', event => { // 触摸结束
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        console.log(event)
        console.log(offsetX, time)
        if (time < 500 && offsetX < -40) { // 返回上一页
          this.prevPage()
        } else if (time < 500 && offsetX < -40) { // 执行下一页
          this.nextPage()
        } else {
          this.toggleTitleAndMenu() // 菜单展示/隐藏
        }
        event.preventDefault() // 禁止默认事件
        event.stopPropagation() // 禁止传播
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
