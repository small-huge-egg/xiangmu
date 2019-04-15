<template>
    <div class="tab">
      <!-- tab区域 -->
      <cube-tab-bar v-model="selectedLabel"
                    :useTransition=false
                    class="border-bottom-1px"
                    :showSlider=true
                    ref="tabBar"
                    :data="tabs">
      </cube-tab-bar>

      <!-- slide区域 -->
      <div class="slide-wrapper">
        <cube-slide
          ref="slide"
          :loop=false
          :initial-index="index"
          :auto-play=false
          :show-dots=false
          :options="options"
          @change="onChange"
          @scroll="onScroll"
        >
          <cube-slide-item v-for="(tab,index) in tabs" :key="index">
            <component ref="component" :is="tab.component" :data="tab.data"></component>
          </cube-slide-item>
        </cube-slide>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'tab',
    props: {
      tabs: {
        type: Array,
        dafault() { // 没有任何值的时候默认的值
          return {}
        }
      }
    },
    data () {
      return {
        index: 0, // 当前页面的索引值。cubbar slide都有用到他
        options: { // 实时派发滚动的距离
          listenScroll: true,
          probeType: 3, // 0不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum滚动动画运行过程中实时派发
          directionLockThreshold: 0 // 横向竖向滚动时避免斜向滚动
        }
      }
    },
    mounted() { // 因为onChange只在切换页面才触发所以让他生来就渲染
      this.onChange(this.index)
    },
    methods: {

      // cube-ui slide提供的事件  当slide页面切换时触发  参数：当前页面的索引值
      // silde 页面切换时触发change事件，返回当前的索引值,然后赋值给this.index
      // this.index改变的话，会触发selectedLabel重新计算，然后cube-tab就会进行新的计算，就可以完成切换了
      onChange (current) {
        this.index = current // 更改当前索引值
        console.log(current)
        const component = this.$refs.component[current] // 获取当前组件 因为在一个列表上，所以是一个数组
        console.log(component)
        component.fetch && component.fetch() // 当component定义了fetch方法我们才调用这个fetch方法，从而渲染对应数据
      },

      // 文档 slide 给出scroll事件，在滚动中实时触发，参数：Object {x, y} -滚动位置的坐标值
      onScroll (pos) {
        const tabBarWidth = this.$refs.tabBar.$el.clientWidth
        const slideWidth = this.$refs.slide.slide.scrollerWidth
        const transform = -pos.x / slideWidth * tabBarWidth
        /* setSliderTransform改变 cube-tab-bar 组件的下划线的 transformX，如果传 Number，
         会转成像素，也可以传带有单位的Number/String */
        this.$refs.tabBar.setSliderTransform(transform)
      }
    },
    computed: {
      selectedLabel: {
        get() { // 回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
          return this.tabs[this.index].label
        },
        set(newVal) { // 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
          this.index = this.tabs.findIndex((value) => {
             // value是cubeTab的参数之一，用来判断哪个tab的值作为选中值。默认值：label值
            return value.label === newVal // 官方文档有说明
          })
        }
      }
    },
    components: {
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
