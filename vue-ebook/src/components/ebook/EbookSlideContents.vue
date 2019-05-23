<template>
  <div class="ebook-slide-contents">
    <!-- 搜索框 -->
    <div class="slide-contents-search-wrapper">
      <!-- 搜索框 -->
      <div class="slide-contents-search-input-wrapper">
        <div class="slide-contents-search-icon">
          <span class="icon-search"></span>
        </div>
        <input type="text" class="slide-contents-search-input" v-model="searchText"
        :placeholder="$t('book.searchHint')" @click="showSearchPage" @keyup.enter.exact="search()">
      </div>
      <!-- 取消按钮 -->
      <div class="slide-contents-search-cancel" v-if="searchVisible"
      @click="hideSearchPage()">{{$t('book.cancel')}}</div>
    </div>
    <!-- 小目录 作者书名封皮 -->
    <div class="slide-contents-book-wrapper" v-show="!searchVisible">
      <div class="slide-contents-book-img-wrapper">
        <img :src="cover" class="slide-contents-book-img">
      </div>
      <div class="slide-contents-book-info-wrapper">
        <div class="slide-contents-book-title">
          <span class="slide-contents-book-title-text">{{metadata.title}}</span>
        </div>
        <div class="slide-contents-book-author">
          <span class="slide-contents-book-author-text">{{metadata.title}}</span>
        </div>
      </div>
      <div class="slide-contents-book-progress-wrapper">
        <div class="slide-contents-book-progress">
          <span class="progress">{{progress + '%'}}</span>
          <span class="progress-text">{{$t('book.haveRead2')}}</span>
        </div>
        <div class="slide-contents-book-time">{{getReadTime()}}</div>
      </div>
    </div>
    <!-- 整体目录 -->
    <scroll class="slide-contents-list" :top="156" :bottom="48" ref="scroll" v-show="!searchVisible">
      <div class="slide-contents-item" v-for="(item, index) in navigation" :key="index" @click="display(item.href)">
        <span class="slide-contents-item-label" :class="{'selected': section === index}" :style="contentItemStyle(item)">{{item.label.trim()}}</span>
        <span class="slide-contents-item-page">{{item.page}}</span>
      </div>
    </scroll>
    <!-- 搜索结果 -->
    <scroll class="slide-search-list" :top="66" :bottom="48" v-show="searchVisible">
      <div class="slide-search-item" @click="displayNavigation(item.cfi, true)"
      v-for="(item, index) in searchList" :key="index" v-html="item.excerpt"></div>
    </scroll>
  </div>
</template>
<script>
import { ebookMixin } from '../../utils/mixin'
import Scroll from '../common/Scroll'
import { px2rem } from '../../utils/utils'
export default {
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false,
      searchList: null, // 搜索结果
      searchText: '' // 搜索文本
    }
  },
  methods: {
    hideSearchPage() { // 点击取消搜索框按钮
      this.searchVisible = false // 搜索内容隐藏
      this.searchText = '' // 清空搜索
      this.searchList = null // 清空搜索框
    },
    showSearchPage() {
      this.searchVisible = true
    },
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    displayNavigation(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },
    search() { // 搜索全书
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(result => {
          this.searchList = result.map(item => {
            item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
            return item
          })
          // this.$refs.searchInput.blur()
        })
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(
          item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
      ).then(results => Promise.resolve([].concat.apply([], results)))
    }
  },
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";
  .ebook-slide-contents {
    width: 100%;
    font-size: 0;
    .slide-contents-search-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(36);
      margin: px2rem(20) 0 px2rem(10) 0;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-search-input-wrapper {
        flex: 1;
        border-radius: px2rem(3);
        @include center;
        .slide-contents-search-icon {
          flex: 0 0 px2rem(28);
          @include center;
          .icon-search {
            font-size: px2rem(12);
          }
        }
        .slide-contents-search-input {
          flex: 1;
          width: 100%;
          height: px2rem(32);
          font-size: px2rem(14);
          background: transparent;
          border: none;
          &:focus {
            outline: none;
          }
        }
      }
      .slide-contents-search-cancel {
        flex: 0 0 px2rem(50);
        font-size: px2rem(14);
        @include right;
      }
    }
    .slide-contents-book-wrapper {
      display: flex;
      width: 100%;
      height: px2rem(90);
      padding: px2rem(10) px2rem(15) px2rem(20) px2rem(15);
      box-sizing: border-box;
      .slide-contents-book-img-wrapper {
        flex: 0 0 px2rem(45);
        box-sizing: border-box;
        .slide-contents-book-img {
          width: px2rem(45);
          height: px2rem(60);
        }
      }
      .slide-contents-book-info-wrapper {
        flex: 1;
        // @include columnLeft;
        .slide-contents-book-title {
          font-size: px2rem(14);
          line-height: px2rem(16);
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include left;
          .slide-contents-book-title-text {
            @include ellipsis2(3);
          }
        }
        .slide-contents-book-author {
          font-size: px2rem(12);
          line-height: px2rem(14);
          padding: 0 px2rem(10);
          box-sizing: border-box;
          margin-top: px2rem(5);
          @include left;
          .slide-contents-book-author-text {
            @include ellipsis2(1);
          }
        }
      }
      .slide-contents-book-progress-wrapper {
        flex: 0 0 px2rem(70);
        // @include columnLeft;
        .slide-contents-book-progress {
          .progress {
            font-size: px2rem(14);
            line-height: px2rem(16);
          }
          .progress-text {
            font-size: px2rem(12);
            line-height: px2rem(14);
            margin-left: px2rem(2);
          }
        }
        .slide-contents-book-time {
          font-size: px2rem(12);
          line-height: px2rem(14);
          margin-top: px2rem(5);
        }
      }
    }
    .slide-contents-list {
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-contents-item {
        display: flex;
        padding: px2rem(20) 0;
        box-sizing: border-box;
        .slide-contents-item-label {
          flex: 1;
          font-size: px2rem(14);
          line-height: px2rem(16);
          @include ellipsis;
        }
        .slide-contents-item-page {
          flex: 0 0 px2rem(30);
          font-size: px2rem(10);
          @include right;
        }
      }
    }
    .slide-search-list {
      width: 100%;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .slide-search-item {
        font-size: px2rem(14);
        line-height: px2rem(16);
        padding: px2rem(20) 0;
        box-sizing: border-box;
      }
    }
  }
</style>
