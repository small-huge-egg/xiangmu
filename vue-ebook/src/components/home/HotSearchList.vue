<template>
  <div>
    <transition name="hot-search-move">
      <scroll class="hot-search-wrapper"
              :top="52"
              @onScroll="onScroll"
              ref="scroll">
        <hot-search :label="$t('home.hotSearch')"
                    :btn="$t('home.change')"
                    :hotSearch="searchList.hotSearch">
        </hot-search>
        <div class="line"></div>
        <hot-search :label="$t('home.historySearch')"
                    :btn="$t('home.clear')"
                    :hotSearch="searchList.historySearch">
        </hot-search>
      </scroll>
    </transition>
  </div>
</template>
<script>
import { storeHomeMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll'
import HotSearch from '@/components/home/HotSearch'

export default {
   mixins: [storeHomeMixin],
   data() {
     return {
       searchList: {
        hotSearch: [ // 热搜索榜单
          {
            type: 1,
            text: 'Self-Reported Population Health',
            num: '1.8万'
          },
          {
            type: 1,
            text: 'Verrechnungspreise',
            num: '3.9万'
          },
          {
            type: 1,
            text: 'eat',
            num: '4.8万'
          },
          {
            type: 1,
            text: 'movie',
            num: '2.9万'
          },
          {
            type: 1,
            text: 'guangjie',
            num: '1.8万'
          }
        ],
        historySearch: [ // 历史搜索
          {
            type: 2,
            text: 'Nginx'
          },
          {
            type: 2,
            text: 'Java'
          },
          {
            type: 2,
            text: 'Vue.js'
          },
          {
            type: 2,
            text: 'ES6'
          },
          {
            type: 2,
            text: 'C#'
          },
          {
            type: 2,
            text: 'webpack'
          }
        ]
       }
     }
   },
   components: {
     Scroll,
     HotSearch
   },
   methods: {
     onScroll(offsetY) {
       this.setHotSearchOffsetY(offsetY)
     },
     reset() {
       this.$refs.scroll.scrollTo(0, 0)
     }
   }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global";

.hot-search-wrapper {
  width: 100%;
  height: 100%;
  background: #fff;
  .line {
    width: 100%;
    height: 0;
  }
}
</style>
