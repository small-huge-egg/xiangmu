<template>
  <div class="shelf-footer" v-show="isEditMode">
    <div class="shelf-footer-tab-wrapper"
        v-for="item in tabs"
        :key="item.index"
        @click="onTabClick(item)">
        <div class="shelf-footer-tab" :class="{'is-selected': isSelected}">
          <div class="icon-private tab-icon" v-if="item.index === 1 && !isPrivate"></div>
          <div class="icon-private-see tab-icon" v-if="item.index === 1 && isPrivate"></div>
          <div class="icon-download tab-icon" v-if="item.index === 2  && !isDownload"></div>
          <div class="icon-download-remove tab-icon" v-if="item.index === 2  && isDownload"></div>
          <div class="icon-move tab-icon" v-if="item.index === 3"></div>
          <div class="icon-shelf tab-icon" v-if="item.index === 4"></div>
          <div class="tab-text" :class="{'remove-text': item.index === 4}">{{label(item)}}</div>
        </div>
      </div>
    </div>
</template>
<script>
import { storeShelfMixin } from '../../utils/mixin'
import { saveBookShelf, removeLocalStorage } from '../../utils/localStorage'
import { download } from '../../api/store'
import { removeLocalForage } from '../../utils/localForage'
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      popupMenu: null
    }
  },
  computed: {
    tabs() {
      return [
        {
          label: this.$t('shelf.private'),
          label2: this.$t('shelf.noPrivate'),
          index: 1
        },
        {
          label: this.$t('shelf.download'),
          label2: this.$t('shelf.delete'),
          index: 2
        },
        {
          label: this.$t('shelf.move'),
          index: 3
        },
        {
          label: this.$t('shelf.remove'),
          index: 4
        }
      ]
    },
    isSelected() {
      return this.shelfSelected && this.shelfSelected.length > 0
    },
    isPrivate() { // 计算属性，计算是否处于私密状态
      if (!this.isSelected) { // 如果没有被点击，返回错误
        return false
      } else { // 被点击了，遍历被电击图书，如果都为私密，返回true
        return this.shelfSelected.every(item => item.private)
      }
    },
    isDownload() { // 计算属性，计算是否已经下载
      if (!this.isSelected) { // 如果没有被点击，返回错误
        return false
      } else { // 被点击了，遍历被电击图书，如果都被下载，返回true
        return this.shelfSelected.every(item => item.cache)
      }
    }
  },
  methods: {
    hidePopup() {
      this.popupMenu.hide()
    },
    setPrivate () { // 建立私密阅读
      let isPrivate
      if (this.isPrivate) { // 如果是私密，就去反
        isPrivate = false
      } else {
        isPrivate = true
      }
      this.shelfSelected.forEach(book => { // 遍历书架，保存书的私密状态
        book.private = isPrivate
      })
      this.onComplate()
      if (isPrivate) { // 如果是私密状态，弹出对应弹框
        this.simpleToast(this.$t('shelf.setPrivateSuccess'))
      } else {
        this.simpleToast(this.$t('shelf.closePrivateSuccess'))
      }
    },
    showPrivate() { // 展示私密阅读的弹窗
      this.popupMenu = this.popup({ // 调用弹窗组件，并传值
        title: this.isPrivate ? this.$t('shelf.closePrivateTitle') : this.$t('shelf.setPrivateTitle'),
        btn: [
          {
            text: this.isPrivate ? this.$t('shelf.close') : this.$t('shelf.open'),
            click: () => { // 点击打开，建立私密阅读
              this.setPrivate()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => { // 点击取消，隐藏弹出曾
              this.hidePopup()
            }
          }
        ]
      })
      this.popupMenu.show()
    },
    onTabClick(item) { // 点击某一项
      if (!this.isSelected) {
        return
      }
      switch (item.index) {
        case 1:
          this.showPrivate() // 点击第一项
          break
        case 2:
          this.showDownload() // 点击第2项
          break
        case 3:
        this.dialog().show()
          break
        case 4:
          this.showRemove()
          break
        default:
          break
      }
    },
    label(item) {
      switch (item.index) {
        case 1:
          return this.isPrivate ? item.label2 : item.label
        case 2:
          return this.isDownload ? item.label2 : item.label
        default:
          return item.label
      }
    },
    onComplate() {
      this.hidePopup()
      this.setIsEditMode(false) // 退出编辑模式
      saveBookShelf(this.shelfList) // 更改完状态后保存书架图书信息
    },
    showDownload () { // 展示下载的弹窗
      this.popupDownload = this.popup({ // 调用弹窗组件，并传值
        title: this.isDownload ? this.$t('shelf.removeDownloadTitle') : this.$t('shelf.setDownloadTitle'),
        btn: [
          {
            text: this.isDownload ? this.$t('shelf.delete') : this.$t('shelf.open'),
            click: () => { // 点击打开，建立下载弹窗
              this.setDownload()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => { // 点击取消，隐藏下载弹出
              this.hidePopup()
            }
          }
        ]
      })
      this.popupDownload.show()
    },
    removeSelectedBook() {
      Promise.all(this.shelfSelected.map(book => this.removeBook(book)))
        .then(books => {
          books.map(book => {
            book.cache = false
          })
          saveBookShelf(this.shelfList)
          this.simpleToast(this.$t('shelf.removeDownloadSuccess'))
        })
    },
    removeBook(book) {
      return new Promise((resolve, reject) => {
        removeLocalStorage(`${book.categoryText}/${book.fileName}-info`)
        removeLocalForage(`${book.fileName}`)
        resolve(book)
      })
    },
    async setDownload() { // 下载电子书(变为同步方法)
      this.onComplate()
      if (this.isDownload) {
        this.removeSelectedBook()
      } else {
        await this.downloadSelectedBook() // 下载勾选的图书
        saveBookShelf(this.shelfList)
        this.simpleToast(this.$t('shelf.setDownloadSuccess'))
      }
    },
    hideDownload() {},
    async downloadSelectedBook() { // 下载图书
      for (let i = 0; i < this.shelfSelected.length; i++) {
        await this.downloadBook(this.shelfSelected[i]) // 下载图书
          .then(book => {
            book.cache = true
          })
      }
    },
    downloadBook(book) { // 下载指定图书
      let text = ''
      const toast = this.toast({
        text
      })
      toast.continueShow() // 调用toast的持续可见方法
      return new Promise((resolve, reject) => {
        download(book, () => { // 成功,下载完毕
          toast.remove()
          resolve(book)
        }, reject, ProgressEvent => { // 下载进度
          const progress = Math.floor(ProgressEvent.loaded / ProgressEvent.total * 100) + '%'
          text = this.$t('shelf.progressDownload').replace('$1', `${book.fileName}.epub(${progress})`)
          toast.updateText(text) // 实时更新文字
        })
      })
    },
    showRemove() { // 展示移除书架弹窗
      let title
      if (this.shelfSelected.length === 1) {
        title = this.$t('shelf.removeBookTitle').replace('$1', `《${this.shelfSelected[0].title}》`)
      } else {
        title = this.$t('shelf.removeBookTitle').replace('$1', this.$t('shelf.selectedBooks'))
      }
      this.popupMenu = this.popup({ // 调用弹窗组件，并传值
        title: title,
        btn: [
          {
            text: this.$t('shelf.removeBook'),
            type: 'danger',
            click: () => {
              this.removeSelected()
            }
          },
          {
            text: this.$t('shelf.cancel'),
            click: () => { // 点击取消，隐藏弹出曾
              this.hidePopup()
            }
          }
        ]
      })
      this.popupMenu.show()
    },
    removeSelected() { // 移出书架
      this.shelfSelected.forEach(selected => { // 遍历被选择的书，将书架的中被勾选的书过滤掉并重新保存
        this.setShelfList(this.shelfList.filter(book => book !== selected))
      })
      this.setShelfSelected([]) // 将被勾选的书置为空
      this.onComplate() // 隐藏弹出层+退出编辑模式+保存书架列表
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 120;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-2) px2rem(4) 0 rgba(0, 0, 0, .1);
    .shelf-footer-tab-wrapper {
      flex: 1;
      width: 25%;
      height: 100%;
      .shelf-footer-tab {
        width: 100%;
        height: 100%;
        opacity: .5;
        @include columnCenter;
        &.is-selected {
          opacity: 1;
        }
        .tab-icon {
          font-size: px2rem(20);
          color: #666;
        }
        .tab-text {
          margin-top: px2rem(5);
          font-size: px2rem(12);
          color: #666;
          &.remove-text {
            color: $color-pink;
          }
        }
        .icon-shelf {
          color: $color-pink;
        }
      }
    }
  }
</style>
