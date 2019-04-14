<template>
    <div class="tab">
      <cube-tab-bar v-model="selectedLabel"
                    class="border-bottom-1px"
                    :showSlider=true
                    ref="tabBar"
                    :data="tabs">
      </cube-tab-bar>
      <div class="slide-wrapper">
        <cube-slide
          ref="slide"
          :loop=false
          :initial-index="index"
          :auto-play=false
          :show-dots=false
        >
          <!-- 商品 -->
          <cube-slide-item>
           <goods></goods>
          </cube-slide-item>
          <!-- 评论 -->
          <cube-slide-item>
            <ratings></ratings>
          </cube-slide-item>
          <!-- 商家详情 -->
          <cube-slide-item>
            <seller></seller>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'

  export default {
    name: 'tab',
    data () {
      return {
        index: 0,
        tabs: [{
          label: '商品'
        }, {
          label: '评价'
        }, {
          label: '详情'
        }]
      }
    },
    methods: {
      // changePage (current) {
      //   this.selectedLabel = this.tabLabels[current].label
      //   console.log(current)
      // },
      // scroll (pos) {
      //   const x = Math.abs(pos.x)
      //   const tabItemWidth = this.$refs.tabNav.$el.clientWidth
      //   const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
      //   const deltaX = x / slideScrollerWidth * tabItemWidth
      //   this.$refs.tabNav.setSliderTransform(deltaX)
      // },
      // resolveTitle (item) {
      //   return `${item.name}关注了问题 · ${item.postTime} 小时前`
      // },
      // resolveQuestionFollowers (item) {
      //   return `${item.answers} 赞同 · ${item.followers} 评论`
      // }
    },
    computed: {
      selectedLabel: {
        get() { // 回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.tabs[this.index].label
        },
        set(newVal) { // 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.index = this.tabs.findIndex((value) => {
            return value.label === newVal // 官方文档有说明
          })
        }
      }
    },
    components: {
      Goods,
      Ratings,
      Seller
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  /* 覆盖样式 */
  .tab
    display: flex
    flex-direction: column
    height: 100%
    .cube-tab
      padding: 10px 0
    .slide-wrapper
      flex: 1
      overflow: hidden
</style>
