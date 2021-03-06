<template>
<!-- 用来接收动态路由 -->
  <div class="ebook-reader">
    <!-- 创建容器展示电子书 -->
    <div id="read"></div>
    <!-- 书签蒙板 -->
    <div class="ebook-reader-mask"
         @click="onMaskClick"
         @touchmove="move"
         @touchend="moveEnd"
         @mousedown.left="onMouseEnter"
         @mousemove.left="onMouseMove"
         @mouseup.left="onMouseEnd">
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation } from '../../utils/localStorage'
import { flatten } from '../../utils/book'
import { getLocalForage } from '../../utils/localForage'

global.epub = Epub

export default {
  mixins: [ebookMixin],
  mounted() {
    const books = this.$route.params.fileName.split('|')
    const fileName = books[1]
    getLocalForage(fileName, (err, blob) => {
      if (!err && blob) { // 如果找到离线的电子书
        this.setFileName(books.join('/')).then(() => {
          this.initEpub(blob)
        })
      } else {
        this.setFileName(books.join('/')).then(() => {
            const url = process.env.VUE_APP_EPUB_URL + '/' + this.fileName + '.epub'
            this.initEpub(url)
          })
      }
    })
  },
  methods: {
    // 鼠标进入
    onMouseEnter(e) {
      this.mouseState = 1 // 表示鼠标掠过，1的时候不执行任何操作
      this.mouseStartTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    // 鼠标移动
    onMouseMove(e) { // 只有在鼠标非掠过的情况下才认为移动
      if (this.mouseState === 1) {
        this.mouseState = 2 // 表示鼠标不是掠过
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY
          this.$store.commit('SET_OFFSETY', offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    // 鼠标松开
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.$store.dispatch('setOffsetY', 0)
        this.firstOffsetY = null
        this.mouseState = 3 // 表示鼠标对屏幕无状态
      } else {
        this.mouseState = 4 // 表示鼠标状态是‘点了一下’
      }
      const time = this.mouseEndTime - this.mouseStartTime
      if (time < 100) {
        this.mouseMove = 1
      }
      e.preventDefault()
      e.stopPropagation()
    },
    // 下拉
    move(e) {
      let offsetY = 0
      if (this.firstOffsetY) { // 如果存在开始触摸的位置
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.$store.commit('SET_OFFSETY', offsetY) // 保存下拉偏移量
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },

    // 下拉结束
    moveEnd(e) {
      this.$store.dispatch('setOffsetY', 0)
      this.firstOffsetY = null
    },

    // 点击视图
    onMaskClick(e) {
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) {
        return
      }
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) { // 如果点击处偏左
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) { // 如果点击处偏右
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },

    // 跳到上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev().then(() => {
           this.refreshLocation()
        })
        this.hideTitleAndMenu() // 当翻页时隐藏
      }
    },

    // 跳到下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
           this.refreshLocation()
        })
        this.hideTitleAndMenu() // 当翻页时隐藏
      }
    },

    // 菜单展示/隐藏
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1)
        this.setFontFamilyVisible(false)
      }
      this.setMenuVisible(!this.menuVisible)
    },

    // 初始化主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName) // 从localStorage取出主题名字
       if (!defaultTheme) { // 如果本地存储没有存主题名字，将主题列表的第一个设为主题
          defaultTheme = this.themeList[0].name
          saveTheme(this.fileName, defaultTheme) // 存储名字
        }
      this.setDefaultTheme(defaultTheme) // 改变默认主题名字
      this.themeList.forEach(theme => { // 注册样式
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    },

    // 初始化字体大小
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) { // 如果本地没有字体大小数据
        saveFontSize(this.fileName, this.defaultFontSize) // 将默认字体保存其中
      } else { // 如果本地已经有数据，将字体改为本地存储的字体大小
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize) // 将字体大小保存在vuex中
      }
    },

    // 初始化字体样式
    initFontFamily() {
      let font = getFontFamily(this.fileName)
      if (!font) { // 如果本地没有字体数据
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else { // 如果本地已经有数据，将字体改为本地存储的字体
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font) // 将字体保存在vuex中
      }
    },

    // 初始化图书
    initRendition() {
      // epubjs的方法，渲染图书的
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default' // 为了在微信上可以显示
      })
       // 书展示完之后将默认保存
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle() // 初始化全局样式
      })
      // 渲染字体
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ])
      })
    },

    // 手势操作
    initGesture() {
      this.rendition.on('touchstart', event => { // 开始触摸
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => { // 触摸结束
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) { // 返回上一页
          this.prevPage()
        } else if (time < 500 && offsetX < -40) { // 执行下一页
          this.nextPage()
        } else {
          this.toggleTitleAndMenu() // 菜单展示/隐藏
        }
        event.preventDefault() // 禁止默认事件
        event.stopPropagation() // 禁止传播
      })
    },

    // 获取图书的基本信息
    parseBook() {
      this.book.loaded.cover.then(cover => { // 图书封面
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => { // 图书作者
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then((nav) => {
        const navItem = flatten(nav.toc) // 被拆分的一级目录
        function find(item, level = 0) {
          // 当当前项的parent属性为underfind时（代表是一级目录epubjs给的）,level=0
          // 当当前项的parent存在时，代表不是一级目录。然后寻找满足其他数组的id和item.parent相等的数组
          // 如果找到了就让当前项的level+1，并且让新找到的成立一个数组，然后继续找。。。
          return !item.parent ? level : find(navItem.filter(parentItem =>
          parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => { // 遍历每一项，添加level
          item.level = find(item)
        })
        this.setNavigation(navItem)
      })
    },

    // 初始化书
    initEpub(url) { // 初始化渲染电子书
      this.book = new Epub(url)
      this.$store.commit('SET_CURRENT_BOOK', this.book)
      this.$store.dispatch('setCurrentBook', this.book)
      this.initRendition()
      // this.initGesture()
      this.parseBook()
      // 分页算法
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) *
        (getFontSize(this.fileName) / 16)).then(locations => {
          this.navigation.forEach(nav => { // 给每一章添加pageList数组
            nav.pageList = []
          })
          locations.forEach(item => {
            const loc = item.match(/\[(.*)\]!/)[1]
            this.navigation.forEach(nav => {
              if (nav.href) {
                const href = nav.href.match(/^(.*)\.html$/)
                if (href) {
                  if (href[1] === loc) {
                    nav.pageList.push(item)
                  }
                }
              }
            })
            let currentPage = 1
            this.navigation.forEach((nav, index) => {
              if (index === 0) {
                nav.page = 1
              } else {
                nav.page = currentPage
              }
              currentPage += nav.pageList.length + 1
            })
          })
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    top: 0;
    left: 0;
    background: transparent;
    // z-index: 150;
    width: 100%;
    height: 100%;
  }
}
</style>
