<template>
  <div class="flap-card-wrapper" v-show="flapCardVisible">
    <div class="flap-card-bg" :class="{'animation': runFlapCardAnimation}">
      <!-- 卡片们 -->
      <div class="flap-card" v-for="(item, index) in flapCardList" :key="index"
        :style="{zIndex: item.zIndex}">
        <!-- 卡片圆圈 -->
        <div class="flap-card-circle">
          <div class="flap-card-semi-circle flap-card-semi-circle-left"
          :style="semiCircleStyle(item, 'left')" ref="left"></div>
          <div class="flap-card-semi-circle flap-card-semi-circle-right"
          :style="semiCircleStyle(item, 'right')" ref="right"></div>
        </div>
      </div>
      <!-- 烟花 -->
      <div class="point-wrapper">
        <div class="point" v-for="item in pointList" :key="item"
          :class="{'animation': runPointAnimation}"></div>
      </div>
    </div>
    <!-- 关闭按钮 -->
    <div class="close-btn-wrapper" @click="close">
      <span class="icon-close icon"></span>
    </div>
  </div>
</template>
<script>
 import { storeHomeMixin } from '@/utils/mixin'
 import { flapCardList } from '@/utils/store'
export default {
  mixins: [storeHomeMixin],
  data() {
    return {
      flapCardList,
      front: 0,
      back: 1,
      intervalTime: 25,
      runFlapCardAnimation: false, // 管理烟花
      pointList: null, // 烟花小球数组
      runPointAnimation: false // 烟花动画默认不显示
    }
  },
  props: {
    // random
  },
  created() {
    this.pointList = []
    for (let i = 0; i < 18; i++) {
      this.pointList.push(`point${i}`)
    }
  },
  watch: {
    // 监听vuex中的flapCardVisible，监听是不需要加this的，而且注意这里的v参数
    flapCardVisible(v) { // 展示推荐
      if (v) { // 如果flapCardVisible=true
        this.runAnimation()
      }
    }
  },
  methods: {
    // 关于烟花的展示与关闭
    startRunPointAnimation () { // 开始显示烟花动画
      this.runPointAnimation = true
      setTimeout(() => { // 75秒之后关闭烟花动画
        this.runPointAnimation = false
      }, 750)
    },
    runAnimation () { // 展示推荐所需执行的方法
      this.runFlapCardAnimation = true
      // 异步：三秒后执行反转动画和烟花，为了使放大展示完
      setTimeout(() => {
        this.startFlapCardAnimation() // 开始旋转动画
        this.startRunPointAnimation()
      }, 300)
    },
    close() {
      this.setFlapCardVisible(false)
      this.stopAnimation()
    },
    // 初始化圆圈
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
    },
    // 规定旋转元素是谁
    rotate(index, type) {
      const item = this.flapCardList[index] // 当前的数组元素
      let dom
      if (type === 'front') {
        dom = this.$refs.right[index]
      } else {
        dom = this.$refs.left[index]
      }
      dom.style.transform = `rotateY(${item.rotateDegree}deg)` // y轴旋转指定度数
      dom.style.backgroundColor = `rgb(${item.r}, ${item._g}, ${item.b})`
    },
    flapCardRotate() { // 确定旋转度数以及旋转元素透明度
      const frontFlapCard = this.flapCardList[this.front] // 前一张
        const backFlapCard = this.flapCardList[this.back] // 背面，这里指的是下一张作为背面

        frontFlapCard.rotateDegree += 10 // 正面每次加10度
        frontFlapCard._g -= 5 // 正面颜色每次淡5
        backFlapCard.rotateDegree -= 10 // 背面每次减10度
        backFlapCard._g += 5
        // 当正面旋转90°，背面旋转90°，即到达中间时，换图片
        if (frontFlapCard.rotateDegree === 90 && backFlapCard.rotateDegree === 90) {
          backFlapCard.zIndex += 2
        }
        this.rotate(this.front, 'front')
        this.rotate(this.back, 'back')
        // 当前一张转动180，且后一张转动回0的时候
        if (frontFlapCard.rotateDegree === 180 && backFlapCard.rotateDegree === 0) {
          this.next()
        }
    },
    next() {
      // 先把前面两张图归为正常
      const frontFlapCard = this.flapCardList[this.front] // 前一张
      const backFlapCard = this.flapCardList[this.back] // 背面，这里指的是下一张作为背面
      frontFlapCard.rotateDegree = 0
      backFlapCard.rotateDegree = 0
      frontFlapCard._g = frontFlapCard.g
      backFlapCard._g = backFlapCard.g
      this.rotate(this.front, 'front')
      this.rotate(this.back, 'back')
      // 进入下一张
      this.front++
      this.back++
      const len = this.flapCardList.length
      if (this.front >= len) {
        this.front = 0
      }
      if (this.back >= len) {
        this.back = 0
      }
      // 动态改变z-index
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - ((index - this.front + len) % len)
      })
      this.prepare()
    },
    prepare() { // 使背面的左侧半圆与右侧半圆重叠
      const backFlapCard = this.flapCardList[this.back]
      // 先给背面的rotateDegree弄成180，这样翻页的时候背面才可以跟着前一面动
      backFlapCard.rotateDegree = 180
      backFlapCard._g = backFlapCard._g - 5 * 18
      this.rotate(this.back, 'back')
    },

    // 反转动画的开始与关闭
    startFlapCardAnimation() {
      this.prepare()
      this.task = setInterval(() => { // 定时翻转
        this.flapCardRotate()
      }, this.intervalTime)
      setTimeout(() => { // 2.5秒后取消显示反转动画
        this.stopAnimation()
      }, 2500)
    },

    // 停止一切动画
    stopAnimation() {
      this.runFlapCardAnimation = false
      if (this.task) {
        clearInterval(this.task)
      }
      this.reset()
    },
    reset() { // 重置
      this.front = 0
      this.back = 1
      this.flapCardList.forEach((item, index) => {
        item.zIndex = 100 - index
        item._g = item.g
        item.rotateDegree = 0
        this.rotate(index, 'front')
        this.rotate(index, 'back')
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  @import "../../assets/styles/flapCard";
  .flap-card-wrapper {
    @include absCenter;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.6);
    @include center;
    .flap-card-bg {
      position: relative;
      width: px2rem(64);
      height: px2rem(64);
      border-radius: px2rem(5);
      background: #fff;
      transform: scale(0);
      opacity: 0;
      &.animation {
        animation: flap-card-move .3s ease-in both;
      }
      @keyframes flap-card-move {
        0% {
          transform: scale(0);
          opacity: 0;
        }
        50% {
          // 放大
          transform: scale(1.2);
          opacity: 1;
        }
        75% {
          // 缩小
          transform: scale(.9);
          opacity: 1;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      .flap-card {
        @include absCenter;
        width: px2rem(48);
        height: px2rem(48);
        .flap-card-circle {
          display: flex;
          width: 100%;
          height: 100%;
          .flap-card-semi-circle {
            flex: 0 0 50%;
            width: 50%;
            height: 100%;
            background-repeat: no-repeat;
            // 隐藏被旋转的 div 元素的背面
            backface-visibility: hidden;
          }
          .flap-card-semi-circle-left{
            border-radius: px2rem(24) 0 0 px2rem(24);
            // 背景图片垂直居中，水平居右
            background-position: center right;
            transform-origin: right;
          }
          .flap-card-semi-circle-right{
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
            transform-origin: left;
          }
        }
      }
      .point-wrapper {
        z-index: 1500;
        @include absCenter; // 居中且绝对定位
        .point {
          border-radius: 50%;
          @include absCenter;
          &.animation {
            @for $i from 1 to length($moves) {
              &:nth-child(#{$i}) {
                @include move($i);
              }
            }
          }
        }
      }
    }
    .close-btn-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(30);
      width: 100%;
      z-index: 1100;
      @include center;
      .icon-close {
        width: px2rem(45);
        height: px2rem(45);
        font-size: px2rem(25);
        border-radius: 50%;
        background: #333;
        color: #fff;
        @include center;
      }
    }
  }
</style>
