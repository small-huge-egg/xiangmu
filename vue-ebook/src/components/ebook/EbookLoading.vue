<template>
  <div class="ebook-loading">
    <div class="ebook-loading-wrapper">
      <!-- 里面的三条线 -->
      <div class="ebook-loading-item" v-for="(item, index) in data" :key="index">
        <div class="ebook-loading-line-wrapper" v-for="(subItem, subIndex) in item" :key="subIndex">
          <div class="ebook-loading-line" ref="line"></div>
          <div class="ebook-loading-mask" ref="mask"></div>
        </div>
      </div>
      <!-- 中间的一条线 -->
      <div class="ebook-loading-center"></div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { px2rem } from '@/utils/utils'

  export default {
    data() {
      return {
        data: [
          [{}, {}, {}],
          [{}, {}, {}]
        ],
        maskWidth: [
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 },
          { value: 0 }
        ],
        lineWidth: [
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 },
          { value: 16 }
        ],
        add: true, // 表示需要添加还是减少
        end: false // 表示已经到头
      }
    },
    methods: {},
    mounted() {
      this.task = setInterval(() => {
        this.$refs.mask.forEach((item, index) => {
          const mask = this.$refs.mask[index]
          const line = this.$refs.line[index]
          let maskWidth = this.maskWidth[index]
          let lineWidth = this.lineWidth[index]
          if (index === 0) { // 如果是第一条动画线
            // 判断是添加还是减少（也就是线变短）
            if (this.add && maskWidth.value < 16) { // 如果需要添加，并且无色最长为16px
              maskWidth.value++ // 让无色变长
              lineWidth.value-- // 让白色变短
            } else if (!this.add && lineWidth.value < 16) { // 如果需要减少，并且白色最长只能为16
              maskWidth.value-- // 让无色变短
              lineWidth.value++ // 让白色变长
            }
          } else { // 如果不是第一条动画线
            if (this.add && maskWidth.value < 16) { // 并且需要添加
              let preMaskWidth = this.maskWidth[index - 1] // 获取上一个动画线的无色线
              if (preMaskWidth.value >= 8) { // 如果上一个动画线的无色线的值>8（表示上一条线正在往左走），让此时的这条线开始动弹
                maskWidth.value++ // 才开始让该条动画线的无色线增加
                lineWidth.value-- // 有色线减少
              }
            } else if (!this.add && lineWidth.value < 16) { // 如果需要减少无色线
              let preLineWidth = this.lineWidth[index - 1]
              if (preLineWidth.value >= 8) {
                maskWidth.value--
                lineWidth.value++
              }
            }
          }
          mask.style.width = `${px2rem(maskWidth.value)}rem`
          mask.style.flex = `0 0 ${px2rem(maskWidth.value)}rem`
          line.style.width = `${px2rem(lineWidth.value)}rem`
          line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
          if (index === this.maskWidth.length - 1) { // 如果是最后一条线
            if (this.add) { // 如果无色正在变长
              if (maskWidth.value === 16) { // 并且最后一天无色线长达16
                this.end = true // 表示已经到头，
              }
            } else { // 如果无色正在变短
              if (maskWidth.value === 0) {
                this.end = true
              }
            }
          }
          if (this.end) { // 如果到头，让add取反，end取反，相当于回头
            this.add = !this.add
            this.end = false
          }
        })
      }, 20)
    },
    beforeDestroy() {
      if (this.task) {
        clearInterval(this.task)
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../assets/styles/global";

  .ebook-loading {
    position: relative;
    z-index: 400;
    width: px2rem(63);
    height: px2rem(40);
    background: transparent;
    border: px2rem(1.5) solid #d7d7d7;
    border-radius: px2rem(3);
    .ebook-loading-wrapper {
      display: flex;
      width: 100%;
      height: 100%;
      .ebook-loading-item {
        display: flex;
        flex-direction: column;
        flex: 1;
        padding: px2rem(7) 0;
        box-sizing: border-box;
        .ebook-loading-line-wrapper {
          flex: 1;
          padding: 0 px2rem(7);
          box-sizing: border-box;
          @include left;
          .ebook-loading-mask {
            flex: 0 0 0;
            width: 0;
            height: px2rem(1.5);
          }
          .ebook-loading-line {
            flex: 0 0 px2rem(16);
            width: px2rem(16);
            height: px2rem(2);
            background: #d7d7d7;
          }
        }
      }
      .ebook-loading-center {
        position: absolute;
        left: 50%;
        top: 0;
        width: px2rem(1.5);
        height: 100%;
        background: #d7d7d7;
      }
    }
  }
</style>
