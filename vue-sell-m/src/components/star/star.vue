<template>
  <div class="star" :class="starType">
    <span :class="itemClass" class="star-item" v-for="(itemClass,index) in itemClasses" :key="index"></span>
  </div>
</template>
<script>
const LENGTH = 5 // 总星星个数
const CLS_ON = 'on' // 整个亮星星
const CLS_HALF = 'half' // 半个星星
const CLS_OFF = 'off' // 无色星星

export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() { // 获得星星图片前半部分即尺寸部分,size是通过父组件传过来的
      return 'star-' + this.size
    },
    itemClasses() {
      let result = []
      const score = Math.floor(this.score * 2) / 2
      const hasDecimal = score % 1 !== 0 // 是否有半颗星星
      const integer = Math.floor(score) // 整颗亮星星个数
      for (let i = 0; i < integer; i++) {
        result.push(CLS_ON)
      }
      if (hasDecimal) {
        result.push(CLS_HALF)
      }
      while (result.length < LENGTH) {
        result.push(CLS_OFF)
      }
      return result
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import '~common/stylus/mixin'

  .star
    display: flex
    align-items: center
    .star-item
      background-repeat: no-repeat
    // 如果是24尺寸的星星
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
    // 如果是36尺寸的星星
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    // 如果是48尺寸的星星
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &.last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
</style>
