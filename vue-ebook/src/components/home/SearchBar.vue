<template>
  <div>
    <div class="search-bar" :class="{'hide-title': !titleVisible, 'hide-shadow': !shadowVisible}">
      <!-- 标题栏 -->
      <transition name="title-move">
        <div class="search-bar-title-wrapper" v-show="titleVisible">
          <!-- 标题 -->
          <div class="title-text-wrapper">
            <span class="title-text-title title">{{$t('home.title')}}</span>
          </div>
          <!-- 震动图标 -->
          <div class="title-icon-shake-wrapper" @click="showFlapCard">
            <span class="icon-shake icon"></span>
          </div>
        </div>
      </transition>
      <!-- 返回按钮 -->
      <div class="title-icon-back-wrapper"  :class="{'hide-title': !titleVisible}" @click="back">
        <span class="icon-back icon"></span>
      </div>
      <!-- 搜索框 -->
      <div class="search-bar-input-wrapper" :class="{'hide-title': !titleVisible}">
        <div class="search-bar-blank" :class="{'hide-title': !titleVisible}"></div>
        <div class="search-bar-input">
          <span class="icon-search icon"></span>
          <input type="text"
                  class="input"
                  :placeholder="$t('home.hint')"
                  v-model="searchText"
                  @click="showHotSearch"
                  @key.13.exact="search">
        </div>
      </div>
    </div>
    <hot-search-list v-show="hotSearchVisible"
                     ref="hotSearch">
    </hot-search-list>
  </div>
</template>

<script type="text/ecmascript-6">
  import { storeHomeMixin } from '@/utils/mixin'
  import HotSearchList from './HotSearchList'

  export default {
    mixins: [storeHomeMixin],
    data() {
      return {
        searchText: '',
        titleVisible: true, // 标题可见
        shadowVisible: false, // 阴影隐藏
        hotSearchVisible: false // 热门搜索隐藏
      }
    },
    watch: {
      offsetY(offsetY) {
        if (offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      hotSearchOffsetY(offsetY) {
        if (offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
      }
    },
    methods: {
      search() { // 点击确定搜索
        this.$router.push({
          path: '/store/list',
          query: {
            keyword: this.searchText
          }
        })
      },
      showFlapCard() { // 点击推荐图标
        this.setFlapCardVisible(true)
      },
      back() { // 点击返回按钮
        if (this.offsetY > 0) {
          this.showShadow()
        } else {
          this.hideShadow()
        }
        if (this.hotSearchVisible) {
          this.hideHotSearch()
        } else {
          this.$router.push('/store/shelf')
        }
      },
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      },
      hideShadow() {
        this.shadowVisible = false
      },
      showShadow() {
        this.shadowVisible = true
      },
      hideHotSearch() {
        this.hotSearchVisible = false
        if (this.offsetY > 0) {
          this.hideTitle()
          this.showShadow()
        } else {
          this.showTitle()
          this.hideShadow()
        }
      },
      showHotSearch() {
        this.hideTitle()
        this.hideShadow()
        this.hotSearchVisible = true
        this.$nextTick(() => {
          this.$refs.hotSearch.reset()
        })
      }
    },
    components: {
      HotSearchList
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    width: 100%;
    height: px2rem(94);
    z-index: 150;
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-title {
      height: px2rem(52);
    }
    &.hide-shadow {
      box-shadow: none;
    }
    .search-bar-title-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      .title-text-wrapper {
        width: 100%;
        height: px2rem(42);
        @include center;
      }
      .title-icon-shake-wrapper {
        position: absolute;
        right: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
    }
    .title-icon-back-wrapper {
      position:absolute;
      left: px2rem(15);
      top: 0;
      height: px2rem(42);
      z-index: 200;
      transition: height annimationTime annimationType;
      @include center;
      &.hide-title {
        height: px2rem(52);
      }
    }
    .search-bar-input-wrapper{
      display: flex;
      position: absolute;
      top: px2rem(42);
      left: 0;
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      transition: top annimationTime annimationType;
      &.hide-title {
        top: 0;
      }
      .search-bar-blank {
        flex: 0 0 0;
        width: 0;
        transition: all annimationTime annimationType;
        &.hide-title {
          flex: 0 0 px2rem(31);
          width: px2rem(31);
        }
      }
      .search-bar-input {
        flex: 1;
        width: 100%;
        background: #f4f4f4;
        border-radius: px2rem(20);
        padding: px2rem(5) px2rem(15);
        box-sizing: border-box;
        border: px2rem(1) solid #eee;
        @include left;
        .icon-search {
          color: #999;
        }
        .input {
          width: 100%;
          height: px2rem(22);
          border: none;
          background: transparent;
          margin-left: px2rem(10);
          font-size: px2rem(12);
          color: #666;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            color: #ccc;
          }
        }
      }
    }
  }
</style>
