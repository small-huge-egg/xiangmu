<template>
  <div>
    <!-- 该组件是商品目录下的底部购物车  父组件是goods-->
    <div class="shopcart">
      <div class="content">
        <!-- 左半边区域 -->
        <div class="content-left">
          <!-- 左半边 购物车图标 -->
          <div class="logo-wrapper">
            <!-- 购物车图标 中的 购物车图 -->
            <div class="logo" :class="{'highlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
            </div>
            <!-- 附着在购物车上的小红圈 -->
            <div class="num" v-show="totalCount>0">
              <bubble :num="this.totalCount"></bubble>
            </div>
          </div>
          <!-- 左半边 价格总计 -->
          <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
          <!-- 左半边 配送费区域 -->
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <!-- 右半边区域 -->
        <div class="content-right">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <!-- 购物车里的小球 -->
      <div class="ball-container">
        <div v-for="(ball, index) in balls" :key="index">
          <transition
            @before-enter="beforeDrop"
            @enter="droping"
            @after-enter="afterDrop"
          >
              <div class="ball" v-show="ball.show">
                <div class="inner inner-hook"></div>
              </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Bubble from 'components/bubble/bubble'

const BALL_LEN = 10 // 小球个数
// const innerClsHook = 'inner-hook'
function createBalls () { // 将小球放在ret数组中，并且隐藏他们
  let ret = []
  for (let i = 0; i < BALL_LEN; i++) {
    ret.push({
      show: false
    })
  }
  return ret
}
export default {
  name: 'shop-cart',
  props: {
    selectFoods: { // 被选择的食物
      type: Array,
      dafault() { // 没有任何值的时候默认的值
        return []
      }
    },
    deliveryPrice: { // 配送费
      type: Number,
      default: 0
    },
    minPrice: { // 起送的最小价格
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      balls: createBalls()
    }
  },
  components: {
    Bubble
  },
  created() {
    this.dropBalls = [] // 不放在data因为dropBalls仅仅是为了临时保存显示的小球，不做响应要求
  },
  methods: {
    drop(el) { // 接收从父组件goods传来的小球初始化位置的参数
      for (let i = 0; i < this.balls.length; i++) {
         const ball = this.balls[i]
         if (!ball.show) {
           ball.shoe = true
           ball.el = el
           this.dropBalls.push(ball) // 把显示的小球push进dropBalls去
           return
         }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1] // 最后一个被点的小球
      const rect = ball.el.getBoundingClientRect() // 获取最后一个被点小球相对于屏幕的位置
      const x = rect.left - 32
      const y = -(window.innerHeight - rect.top - 22) // 为负 因为开始小球在购物车，我们要把小球挪到菜品的加号那
      el.style.display = ''
      el.style.transform = el.style.webitTransform = `translate3d(0,${y}px,0)` // y方向
      const inner = el.getElementByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(${x}px,0,0)` // x偏移方向
    },
    droping(el, done) {
      this._reflow = document.body.offsetHeight
      el.style.transform = el.style.webitTransform = `translate3d(0,0,0)` // y方向 滚回原来位置
      const inner = el.getElementByClassName('inner-hook')[0]
      inner.style.transform = inner.style.webkitTransform = `translate3d(0,0,0)` // x 向原来位置进发
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) { // 结束动画，隐藏小球
      const ball = this.dropBalls.shift() // 获取到第一个小球
      if (ball) { // 如果存在显示的小球
        ball.show = false // 隐藏
        el.style.display = 'none'
      }
    }
  },
  computed: {
    totalPrice() { // 总共的价钱
      let total = 0
      this.selectFoods.forEach((food) => {
        console.log(this.selectFoods)
        total += food.count * food.price
      })
      return total
    },
    totalCount() { // 购物车总数
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() { // 滚去结算区域
      if (this.totalPrice === 0) { // 如果购物车价格为0
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) { // 价格小于起送费
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else { // 完美，走起
        return '去结算'
      }
    },
    payClass() { // 判断右边结算区样式
      if (!this.totalCount || this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "../../common/stylus/mixin.styl"

  .shopcart
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      color: rgba(255, 255, 255, 0.4)
      .content-left
        flex: 1
        .logo-wrapper
          display: inline-block
          vertical-align: top
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            text-align: center
            background: #2b343c
            &.highlight
              background: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            text-align: center
            border-radius: 16px
            font-size: 9px
            font-weight: 700
            color: #fff
            background: rgb(240, 20, 20)
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          padding-right: 12px
          box-sizing: border-box
          border-right: 1px solid rgba(255, 255, 255, 0.1)
          font-size: 16px
          font-weight: 700
          &.highlight
            color: #fff
        .desc
          display: inline-block
          vertical-align: top
          margin: 12px 0 0 12px
          line-height: 24px
          font-size: 10px
      .content-right
        flex: 0 0 105px
        width: 105px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          font-size: 12px
          font-weight: 700
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
    .ball-container
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0, 160, 220)
          transition: all 0.4s linear
    .shopcart-list
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0, -100%, 0)
      &.fold-enter-active, &.fold-leave-active
        transition: all 0.5s
      &.fold-enter, &.fold-leave-active
        transform: translate3d(0, 0, 0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7, 17, 27, 0.1)
        .title
          float: left
          font-size: 14px
          color: rgb(7, 17, 27)
        .empty
          float: right
          font-size: 12px
          color: rgb(0, 160, 220)

      .list-content
        padding: 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7, 17, 27)
          .price
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 24px
            font-size: 14px
            font-weight: 700
            color: rgb(240, 20, 20)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 6px

  .list-mask
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 40
    backdrop-filter: blur(10px)
    opacity: 1
    background: rgba(7, 17, 27, 0.6)
    &.fade-enter-active, &.fade-leave-active
      transition: all 0.5s
    &.fade-enter, &.fade-leave-active
      opacity: 0
      background: rgba(7, 17, 27, 0)
</style>
