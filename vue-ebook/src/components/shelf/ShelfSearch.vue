<template>
  <!-- 搜索栏目 -->
  <div class="shelf-search-wrapper" :class="{'search-top': ifInputClicked,
   'hide-shadow': ifHideShadow}">
    <div class="shelf-search" :class="{'search-top':ifInputClicked}">
      <!-- 搜索框 -->
      <div class="search-wrapper">
        <!-- 搜索图标 -->
        <div class="icon-search-wrapper">
          <span class="icon-search icon"></span>
        </div>
        <!-- 搜索框 -->
        <div class="search-input-wrapper">
          <input type="text"
                 class="search-input"
                 :placeholder="$t('shelf.search')"
                 @click="onSearchClick"
                 v-model="searchText"
          >
        </div>
        <!-- 取消图标 -->
        <div class="icon-clear-wrapper"
             v-show="searchText.length > 0"
             @click="clearSearchText"
        >
          <span class="icon-close-circle-fill"></span>
        </div>
      </div>
      <!-- 中英文 -->
      <div class="icon-locale-wrapper" v-if="!ifInputClicked" @click="switchLocale">
        <span class="icon-cn icon" v-if="lang === 'cn'"></span>
        <span class="icon-en icon" v-else></span>
      </div>
      <!-- 取消文字 -->
      <div class="cancel-btn-wrapper" @click="onCancelClick" v-else>
        <span class="cancel-text">{{$t('shelf.cancel')}}</span>
      </div>
    </div>
    <transition name="hot-search-move">
      <div class="shelf-search-tab-wrapper" v-if="ifInputClicked">
        <div class="shelf-search-tab-item" v-for="item in tabs" :key="item.id" @click="onTabClick(item.id)">
          <span class="shelf-search-tab-text" :class="{'is-selected': item.id === selectedTab}">{{item.text}}</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { setLocalStorage } from '../../utils/localStorage'
import { storeShelfMixin } from '../../utils/mixin'

export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      ifInputClicked: false, // 是否点击搜索框
      searchText: '', // 搜索框内容
      selectedTab: 1, // 默认选中
      ifHideShadow: true // 是否隐藏阴影
    }
  },
  computed: {
    lang() { // 获取当前的语言
      return this.$i18n.locale
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default'),
          selected: true // 选中状态
        },
        {
          id: 2,
          text: this.$t('shelf.progress'),
          selected: false
        },
        {
          id: 3,
          text: this.$t('shelf.purchase'),
          selected: false
        }
      ]
    }
  },
  watch: {
    offsetY(offsetY) { // 监听滚动，合理显示阴影
      if (offsetY > 0 && this.ifInputClicked) {
        this.ifHideShadow = false // 显示阴影
      } else {
        this.ifHideShadow = true // 隐藏阴影
      }
    }
  },
  methods: {
    // 点击搜索框
    onSearchClick() { // 告诉搜索框被点击且让书架的头部隐藏
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    // 点击取消搜索
    clearSearchText() { // 清空搜索框内容
      this.searchText = ''
    },
    // 点击取消文字
    onCancelClick() { // 改变搜索框状态并且让书架的头部显示
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    },
    // 点击中英文
    switchLocale() { // 切换语言图标的显示，并保存在本地中
      if (this.lang === 'en') {
        this.$i18n.locale = 'cn'
      } else {
        this.$i18n.locale = 'en'
      }
      setLocalStorage('locale', this.$i18n.locale)
    },
    onTabClick(id) {
      this.selectedTab = id
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-search-wrapper {
    position: relative;
    z-index: 105;
    width: 100%;
    height: px2rem(94);
    font-size: px2rem(16);
    background: #fff;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.search-top {
      position: fixed;
      left: 0;
      top: 0;
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-search {
      display: flex;
      position: absolute;
      top: px2rem(42);
      left: 0;
      z-index: 105;
      width: 100%;
      height: px2rem(52);
      transition: top $annimationTime linear;
      &.search-top {
        top: 0;
      }
      .search-wrapper {
        display: flex;
        flex: 1;
        margin: px2rem(8) 0 px2rem(8) px2rem(10);
        border: px2rem(1) solid #ccc;
        border-radius: px2rem(3);
        .icon-search-wrapper {
          flex: 0 0 px2rem(22);
          @include right;
          .icon-search {
            font-size: px2rem(12);
            text-align: center;
          }
        }
        .search-input-wrapper {
          flex: 1;
          padding: 0 px2rem(10);
          box-sizing: border-box;
          @include center;
          .search-input {
            width: 100%;
            font-size: px2rem(14);
            border: none;
            color: #333;
            &:focus {
              outline: none;
            }
            &::-webkit-input-placeholder {
              font-size: px2rem(14);
              color: #ccc;
            }
          }
        }
        .icon-clear-wrapper {
          flex: 0 0 px2rem(24);
          @include left;
          .icon-close-circle-fill {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .icon-locale-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .icon-cn .icon-en {
          font-size: px2rem(22);
          color: #666;
        }
      }
      .cancel-btn-wrapper {
        flex: 0 0 px2rem(55);
        @include center;
        .cancel-text {
          font-size: px2rem(14);
          color: $color-blue;
        }
      }
    }
    .shelf-search-tab-wrapper {
      position: absolute;
      top: px2rem(52);
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: px2rem(42);
      .shelf-search-tab-item {
        flex: 1;
        @include center;
        .shelf-search-tab-text {
          font-size: px2rem(12);
          color: #999;
          &.is-selected {
            color: $color-blue;
          }
        }
      }
    }
  }
</style>
