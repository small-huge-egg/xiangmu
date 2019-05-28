<template>
  <div class="store-home">
    <!-- 搜索栏 -->
    <search-bar></search-bar>
    <!-- 弹出的推荐 -->
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import FlapCard from '../../components/home/FlapCard'
  import { storeHomeMixin } from '@/utils/mixin'
  import { home } from '../../api/store'
  export default {
    mixins: [storeHomeMixin],
    data() {
      return {
        scrollTop: 94,
        random: null
      }
    },
    components: {
      SearchBar,
      Scroll,
      FlapCard
    },
    methods: {
      onScroll(offsetY) {
        this.setOffsetY(offsetY) // 滚动的距离
        if (offsetY > 0) {
          this.scrollTop = 52
        } else {
          this.scrollTop = 94
        }
        this.$refs.scroll.refresh()
      }
    },
    mounted() {
      home().then(response => { // 随机推荐一本书
        if (response && response.status === 200) {
          const data = response.data
          const randomIndex = Math.floor(Math.random() * data.random.length)
          this.random = data.random[randomIndex]
        }
      })
    }
  }
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-home {
    width: 100%;
    height: 100%;
  }
</style>
