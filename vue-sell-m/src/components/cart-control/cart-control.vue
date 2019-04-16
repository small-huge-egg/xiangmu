<template>
  <div class="cartcontrol">
    <transition name="move">
      <!-- 减号 当有商品的时候显示-->
      <div class="cart-decrease" v-show="food.count>0" @click.stop="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <!-- 数量-->
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!-- 加号-->
    <div class="cart-add icon-add_circle" @click.stop="add"></div>
  </div>
</template>
<script>
// import Vue from 'vue'
export default {
  name: 'cart-control',
  // data() {
  //   return {}
  // },
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    // 定义加入购物车
    add() {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    // 定义减号按钮方法
    decrease() {
      if (this.food.count) {
        this.food.count--
      } else {
        this.food.count = 0
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import "~common/stylus/variable"
.cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0)
      .inner
        display: inline-block
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0
        transform: translate3d(24px, 0, 0)
        .inner
          transform: rotate(180deg)
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147, 153, 159)
    .cart-add
      display: inline-block
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0, 160, 220)
</style>
