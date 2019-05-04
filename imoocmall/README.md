# imoocmall

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
>开始时间：2019.05.04 17：00
# 目录：
* static: 静态资源，这里存放了项目所需的图片 
* src->assets：静态资源，更偏重于组件的资源。这里存放了css文件
* src->components: vue文件，一般为页面中一小块一小块的
* src->views: vue文件，一般为单页面
# src->views->GoodsList.vue
> 商品列表页面，导入了src->assets的css文件,导入了components->NavHeader.vue和NavFooter.vue
> 将GoodsList路由组件添加到route->index.js中
```javaScript
// GoodsList.vue
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader.vue'
  import NavFooter from '@/components/NavFooter.vue'
  components:{
    NavHeader,
    NavFooter
  }
// route->index.js 
  import GoodsList from '@/views/GoodsList' //@是配置的直达src的意思
  export default new Router({
    routes: [
      {
        path: '/',
        name: 'HelloWorld',
    !!!    component: GoodsList // 渲染组件
      }
    ]
  })
```
> 关于svg
* SVG优势:随着高清屏幕的普及，相比使用png等位图而言，使用SVG等矢量图形是一种全新的设计方式。更重要的是相比位图而言，SVG有着无可比拟的优势。这里我总结一下SVG具体的一些优势：
1. SVG是矢量图形文件，可以随意改变大小，而不影响图标质量。
2. 可以用CSS样式来自由定义图标颜色，比如颜色/尺寸等效果。
3. 所有的SVG可以全部在一个文件中，节省HTTP请求 。
4. 使用SMIL、CSS或者是javascript可以制作充满灵性的交互动画效果。
5. 由于SVG也是一种XML节点的文件，所以可以使用gzip的方式把文件压缩到很小。
* 使用
  * 首先用定义一个symbol标签，一定要设置id。
  * 在需要的位置插入svg标签，里面使用use,语法如下：
```html
<symbol id="icon-cart" viewBox="0 0 38 32">
  <title>cart</title>
  <path class="path1" d="M37.759 0h-4.133c-0.733 0.004-1.337 0.549-1.434 "></path>
  <path class="path2" d="M"></path>
  <path class="path3" d="z"></path>
  <path class="path4" d="Mz"></path>
</symbol>
<svg class="navbar-cart-logo">
  <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-cart"></use>
</svg>
```
>关于响应式布局
* 这里有个元素在屏幕大于767时隐藏,小于767px时显示
```css
/* 大于767时隐藏 */
.filter-nav .filterby {
    display: none;
    letter-spacing: .25em;
    /* 将字体转换为大写 */
    text-transform: uppercase;
    font-size: 12px;
}
/* 小于767px时显示 响应式布局*/
@media only screen and (max-width: 767px)
.filter-nav .filterby {
    display: block;
    float: right;
}
```
>关于鼠标放上去呈现的动画
```css
.accessory-list > ul > li:hover {
  border-color: #ee7a23;
  /* 上移 */
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  -webkit-box-shadow: 0 0 10px #999;
  box-shadow: 0 0 10px #999;
  -webkit-transition: all .5s ease-out;
  /* 动画 */
  transition: all .5s ease-out;
```
>关于插槽
* 这里把home和goods专门存放在NavBread.vue里面,并添加了一个插槽.
* 渲染到GoodsList.vue里面(添加子组件)
* 目的: 为了适当的展示与隐藏
```html
<!-- NavBread.vue -->
<nav class="nav-breadcrumb">
  <a href="/">Home</a>
  <slot></slot>
</nav>
<!-- GoodsList.vue -->
<nav-bread>
  <span>Goods</span>
</nav-bread>
```
> 关于选中价格区间
* 小技巧
  * 通过设置priceChecked==index来设置指定class的显示/隐藏
  * 通过设置priceChecked=='all'来设置全选标签class的显示/隐藏
    * 仅仅一个通priceChecked搞定两个任务
    * 缺点:不适用于选择全选时,其他项也被选中的情况
```html
<!-- 全选标签 -->
<dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}">All</a></dd>
<dd v-for="(item,index) in priceFilter" :key="index">
  <!-- 指定项标签 -->
  <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="priceChecked=index">{{item.startPrice}} - {{item.endPrice}}</a>
</dd>
<!-- data中设置 -->
priceChecked: 'all'
```
> 关于遮盖层的css
* 通过给整个body设置`background:rgba(0,0,0,0.5)`,`z-index='比较高'`
> 关于图片懒加载
* 命令行: `cnpm i vue-lazyload --save`
```javaScript
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
  loading: "/static/loading-svg/loading-bars.svg"
})
```









# 踩坑
>由于vue2.9以上的脚手架不会生成一个config.dev.js,无法通过该文件模拟mork接口
* so,经过百度了解到可以在webpack.dev.conf.js写入某些代码,经多次尝试摸索,如下:
```javaScript
// 方法1-------获取整个json文件内容
const express = require('express')
const app = express()
var goodsData = require('./../mock/goods.json')
const router = express.Router()
app.use(router)
// 在devServer中添加:
before(app) {
  app.get('/goods',(req, res) => {
    res.json({
      errno:0,
      data:goodsData
    })
  })
}
// 调用
methods: {
  getGoodsList() {
    axios.get("/goods").then((result) => {
      var res = result.data.data;
      this.goodsList = res.result;
    })
  }
}


// 方法2---------获取json文件的result即指定内容
// 因为这是在方法1还没想出来之前摸索出来的,比较模仿网上的思路
const express = require('express')
const app = express()
var goodsData = require('./../mock/goods.json')
var result = goodsData.result
const router = express.Router()
app.use('/api',router)

// 在devServer中添加:
before(app) {
  app.get('/api/goods',(req, res) => {
    res.json({
      errno:0,
      data:result
    })
  })
}
// 调用
// 通过/api/goods可以看见result的内容
```
* 总结:对比多个百度内容共同点与不同点,观察他们的思路,然后自己敲代码尝试摸索,方法1里面输出result的内容也是我试出来的,所以有两个data我也很难以置信.
* 经验证result.data:
```javaScript
// <!-- console.log(result.data): -->
{errno: 0, data:{...}} // 这里的data包含了mork的全部数据,so result.data.data.result
```