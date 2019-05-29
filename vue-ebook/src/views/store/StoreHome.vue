<template>
  <div class="store-home">
    <!-- 搜索栏 -->
    <search-bar></search-bar>
    <!-- 弹出的推荐 -->
    <flap-card :data="random"></flap-card>
    <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
      <div class="banner-wrapper">
        <img :src="banner" class="banner-img">
      </div>
      <!-- 猜你喜欢 -->
      <guess-you-like :data="guessYouLike"></guess-you-like>
      <!-- 热门推荐 -->
      <recommend :data="recommend" class="recommend"></recommend>
      <!-- 精选 -->
      <featured :data="featured" class="featured" :titleText="$t('home.featured')"
      :btnText="$t('home.seeAll')"></featured>
      <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
        <category-book :data="item"></category-book>
      </div>
      <category class="categories" :data="categories"></category>
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
  import SearchBar from '../../components/home/SearchBar'
  import Scroll from '../../components/common/Scroll'
  import FlapCard from '../../components/home/FlapCard'
  import GuessYouLike from '../../components/home/GuessYouLike'
  import Recommend from '../../components/home/Recommend'
  import Featured from '../../components/home/Featured'
  import CategoryBook from '../../components/home/CategoryBook'
  import Category from '../../components/home/Category'

  import { storeHomeMixin } from '@/utils/mixin'
  import { home } from '../../api/store'
  export default {
    mixins: [storeHomeMixin],
    data() {
      return {
        scrollTop: 94,
        random: null,
        banner: null, // 背景图片
        guessYouLike: null, // 猜你喜欢的书籍
        recommend: null,
        featured: null, // 精选书籍
        categoryList: null,
        categories: null
      }
    },
    components: {
      SearchBar,
      Scroll,
      FlapCard,
      GuessYouLike,
      Recommend,
      Featured,
      CategoryBook,
      Category
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
        console.log(data)
          this.banner = data.banner
          this.guessYouLike = data.guessYouLike
          this.recommend = data.recommend
          this.featured = data.featured
          this.categoryList = data.categoryList
          this.categories = data.categories
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
    .banner-wrapper {
      width: 100%;
      padding: px2rem(10);
      box-sizing: border-box;
      .banner-img {
        width: 100%;
        height: 150px;
      }
    }
    .recommend {
      margin-top: px2rem(20);
    }
    .featured {
      margin-top: px2rem(20);
    }
    .category-list-wrapper {
      margin-top: px2rem(20);
    }
    .categories {
      margin-top: px2rem(20);
    }
  }
</style>
