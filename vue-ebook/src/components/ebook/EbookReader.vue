<template>
<!-- 用来接收动态路由 -->
  <div class="ebook-reader">
    <!-- 创建容器展示电子书 -->
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '../../utils/mixin'
import { getFontFamily, saveFontFamily, getFontSize, saveFontSize, getTheme, saveTheme, getLocation } from '../../utils/localStorage'
import { flatten } from '../../utils/book'

global.epub = Epub

export default {
  mixins: [ebookMixin],
  mounted() {
    this.setFileName(this.$route.params.fileName.split('|').join('/'))
      .then(() => { // 异步调用，所以用action
        this.initEpub()
      })
  },
  methods: {
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
        ]).then(() => {
          console.log('字体已经全部加在完毕')
        })
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
          // 当当前项的parent存在时，代表不是一级目录。然后寻找满足其他数组的id和item.parent相等的的数组
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
    initEpub() { // 初始化渲染电子书
      const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.$store.commit('SET_CURRENT_BOOK', this.book)
      this.$store.dispatch('setCurrentBook', this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) *
        (getFontSize(this.fileName) / 16)).then(locations => {
          this.setBookAvailable(true)
          this.refreshLocation()
        })
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
