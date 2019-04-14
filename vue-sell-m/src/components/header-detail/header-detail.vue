<template>
  <div>
    <transition name="fade">
      <div class="header-detail" v-show="visible">
        <div class="detail-wrapper clear-fix">
          <div class="detail-main">
            <!-- 商家名称 -->
            <h1 class="name">{{seller.name}}</h1>
            <!-- 商家总体星星评分 -->
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <!-- 分隔符 优惠信息 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!-- 优惠详情 -->
            <ul class="supports" v-if="seller.supports">
              <li class="support-item" v-for="(item, index) in seller.supports" :key="item.id">
                <support-ico :size=2 :type="seller.supports[index].type"></support-ico>
                <span class="text">{{seller.supports[index].description}}</span>
              </li>
            </ul>
            <!-- 分隔符 商家公告 -->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <!-- 商家公告主要内容 -->
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <!-- 错号 关闭窗口 -->
        <div class="detail-close">
          <i class="icon-close" @click="hide"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Star from 'components/star/star'// 导入星星组件
import SupportIco from 'components/support-ico/support-ico'// 导入icon组件
export default {
  name: 'header-detail',
  props: {
    seller: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  },
  components: {
    Star,
    SupportIco
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  @import "~common/stylus/variable"
  @import "~common/stylus/icon"
  .header-detail
    position: fixed
    z-index: 20
    top: 0
    left: 0
    width: 100%
    height: 100%
    overflow: auto// kankankankankankan
    backdrop-filter: blur(13px)// css3新特性，可以不使其子元素也继承模糊属性
    opacity: 1
    color: $color-white
    background: $color-background-s
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: $color-background
    .detail-wrapper
      display: inline-block
      width: 100%
      .detail-main
        margin-top: 64px
        padding-bottom: 64px
        .name
          line-height: 16px
          text-align: center
          font-weight: 700
          font-size: $fontsize-large
        .star-wrapper
          margin: 16px 0 28px 0
          justify-content: center
          display: flex
          text-align: center
          padding: 2px 0
          text-align: center
        .title
          display: flex
          margin : 0 36px 24px 36px
          width: 80%
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(225,225,225,0.5)
          .text
            padding: 0 12px
            font-weight: 700
            font-size: $fontsize-medium
        .supports
          width: 80%
          margin: 0 auto
          .support-item
            display: flex
            align-items: center
            padding: 0 12px
            margin-bottom: 12px
            &:last-child
              margin-bottom: 28px
              .support-ico
                margin-right: 6px
                // bg-image('')
            .text
              margin-left: 6px
              line-height: 16px
              font-size: $fontsize-small
        .bulletin
          width: 80%
          margin: 0 auto
          .content
            padding: 0 12px
            line-height: 24px
            font-size: $fontsize-small
    .detail-close
      position: relative
      display: flex
      .icon-close
        margin: auto
        line-height: 24px
        font-size: 36px
        color: rgba(255,255,255,0.5)
</style>
