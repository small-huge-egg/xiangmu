<template>
  <div class="search-bar">
    <!-- 标题栏 -->
    <div class="search-bar-title-wrapper">
      <!-- 返回按钮 -->
      <div class="title-icon-back-wrapper">
        <span class="icon-back icon"></span>
      </div>
      <!-- 标题 -->
      <div class="title-text-wrapper">
        <span class="title-text-title title">{{$t('home.title')}}</span>
      </div>
      <!-- 震动图标 -->
      <div class="title-icon-shake-wrapper">
        <span class="icon-shake icon"></span>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="search-bar-input-wrapper">
      <div class="search-bar-input">
        <span class="icon-search icon"></span>
        <input type="text"
                class="input"
                :placeholder="$t('home.hint')"
                v-model="searchText">
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { storeHomeMixin } from '@/utils/mixin'

  export default {
    mixins: [storeHomeMixin],
    data() {
      return {
        searchText: '',
        titleVisible: true
      }
    },
    watch: {
      offsetY(offserY) {
        if (offserY > 0) {
          this.hideTitle()
          console.log(offserY)
        } else {
          this.showTitle()
        }
      }
    },
    methods: {
      hideTitle() {
        this.titleVisible = false
      },
      showTitle() {
        this.titleVisible = true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .search-bar {
    position: relative;
    z-index: 150;
    width: 100%;
    background: white;
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    .search-bar-title-wrapper {
      position: relative;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      .title-icon-back-wrapper {
        position:absolute;
        left: px2rem(15);
        top: 0;
        height: px2rem(42);
        @include center;
      }
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
    .search-bar-input-wrapper{
      width: 100%;
      height: px2rem(52);
      padding: px2rem(10);
      box-sizing: border-box;
      .search-bar-input {
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
            color: #ccc;
          }
        }
      }
    }
  }
</style>
