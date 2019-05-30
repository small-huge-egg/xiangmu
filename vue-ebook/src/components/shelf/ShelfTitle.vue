<template>
  <!-- 书架头 -->
  <transition name="fade">
    <div class="shelf-title" :class="{'hide-shadow': ifHideShadow}" v-show="shelfTitleVisible">
      <!-- 书架 -->
      <div class="shelf-title-text-wrapper">
        <span class="shelf-title-text">{{$t('shelf.title')}}</span>
        <span class="shelf-title-sub-text" v-show="isEditMode">{{selectedText}}</span>
      </div>
      <!-- 清楚缓存 -->
      <div class="shelf-title-btn-wrapper shelf-title-left" @click="clearCache">
        <span class="shelf-title-btn-text">{{$t('shelf.clearCache')}}</span>
      </div>
      <!-- 编辑 -->
      <div class="shelf-title-btn-wrapper shelf-title-right">
        <span class="shelf-title-btn-text" @click="onEditClick">{{$t('shelf.edit')}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  data() {
    return {
      ifHideShadow: true // 是否隐藏阴影
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  computed: {
    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0 ? this.$t('shelf.selectBook')
       : (selectedNumber === 1 ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
       : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber))
    }
  },
  methods: {
    // 点击‘编辑’
    onEditClick() {
      this.setIsEditMode(!this.isEditMode)
    },

    // 点击清楚缓存
    clearCache() {}
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-title {
    position: relative;
    width: 100%;
    height: px2rem(42);
    z-index: 130;
    background: rgb(255, 255, 255);
    box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, .1);
    &.hide-shadow {
      box-shadow: none;
    }
    .shelf-title-text-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: px2rem(42);
      @include columnCenter;
      .shelf-title-text {
        font-size: px2rem(16);
        line-height: px2rem(20);
        font-weight: bold;
        color: #333;
      }
      .shelf-title-sub-text {
        font-size: px2rem(10);
        color: #333;
      }
    }
    .shelf-title-btn-wrapper {
      position: absolute;
      top: 0;
      box-sizing: border-box;
      height: 100%;
      @include center;
      .shelf-title-btn-text {
        font-size: px2rem(15);
        color: #666;
      }
      &.shelf-title-left {
        padding-left: px2rem(14);
        left: 0;
      }
      &.shelf-title-right {
        right: 0;
        padding-right: px2rem(15);
      }
    }
  }
</style>
