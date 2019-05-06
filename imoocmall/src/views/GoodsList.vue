<template>
  <div>
    <!-- 大头 -->
    <nav-header></nav-header>
    <!-- 头部插槽 -->
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
              <dd v-for="(item,index) in priceFilter" :key="index">
                <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{item.startPrice}} - {{item.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in goodsList" :key="item.productId">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <!-- 使用鼠标滚动插件 -->
              <div class="load-more" :class="{'load-more-hide':loadHide}" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
                加载中...
                <img src="./../assets/loading-spinning-bubbles.svg" alt="">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'

  export default{
    data(){
      return {
        goodsList: [],// 所有商品
        // 价格区间
        priceFilter:[ 
          {
            startPrice: '0.00',
            endPrice: '100.00'
          },
          {
            startPrice: '100.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          }
        ],
        // 设置价格区间选中
        priceChecked: 'all',
        // 控制class="filterby-show"的值,来控制是否展示价格区间
        filterBy: false,
        overLayFlag: false,
        // 升序排序
        sortFlag:true,
        // 页码
        page:1,
        // 每页展示个数
        pageSize:8,
        // 鼠标滚动插件设置
        busy:true,
        loadHide:false
      }
    },
    mounted() {
      this.getGoodsList()
    },
    methods: {
      // 获取后台购物数据
      getGoodsList(flag) { 
        // 传递参数
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag?1:-1,
          priceLevel: this.priceChecked
        }
        axios.get("/goods",{
          params: param
        }).then((result) => {
          if(result.data.status==0){
            if(flag==true){
              this.goodsList = this.goodsList.concat(result.data.result.list);
              if(result.data.result.count==0){ // 当没有数据后，禁用鼠标的加载中
                this.busy = true
                this.loadHide = true
              }else{
                this.busy = false
              }
            }else{
              this.goodsList = result.data.result.list;
              this.busy = false
            }
            
          }else{
            this.goodsList=[]
          }
        })
      },

      // 点击价格排序 
      sortGoods() {
        this.sortFlag = !this.sortFlag
        this.page = 1 // 点完置1
        this.getGoodsList() // 重新渲染页面
      },


      // 点击'Filter by',增加class=...的属性,使价格区间展示,并使遮罩显示
      showFilterPop() {
        this.filterBy = true
        this.overLayFlag = true
      },
      closePop() {
        this.filterBy = false
        this.overLayFlag = false
      },
      // 点击一个价格区间后关闭弹窗并将点的哪个传给priceChecked，最后重新渲染页面
      setPriceFilter(index) {
        this.page = 1
        this.priceChecked = index
        this.closePop()
        this.getGoodsList()
      },

      // 鼠标滚动时
      loadMore() {
        this.busy = true
        setTimeout(() => {
          let flag = true; // 告诉页面渲染函数页码需要累加
          this.page++;
          this.getGoodsList(flag)
          }, 500);
        }
      },
    components:{
      NavHeader,
      NavFooter,
      NavBread
    }
  }
</script>
