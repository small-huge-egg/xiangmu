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
>时间：2019.05.04 17：00--2019.05.04 22：00      5
>时间：2019.05.05 18：30--2019.05.06 00：30      6
>时间：2019.05.06 13：20--2019.05.06 
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
# 引入express
> 全局安装express generator生成器
* `cnpm i -g express-generator`,可通过express --version查看express版本
> 生成express项目
* 在项目目录命令行输入：`express server`
*注意server->app.js*
```javaScript
app.use(express.json()); // 是express不是bodyParser
app.use(express.urlencoded({ extended: false })); // 是express不是bodyParser
// 而且
var bodyParser = require('body-parser'); // 没有哦
```
* 该项目未彻底将前后端分离，so如下步骤：
  * 将server->package.json的dependencies内容复制到项目的package.json文件对应位置，并删除server->package.json
    * cnpm i
    * node bin/www 后可在locallhost:3000下看见成功信息
* 将express->app.js的jade文件转换为html文件
  * cnpm i ejs --save
```javaScript
var ejs = require('ejs')

// view engine setup
app.engine('.html',ejs.__express) // 新增
app.set('view engine', 'html');   // 修改

// 命令行重启
node server/bin/www
```
# 后台
> 总结一下，这里用到了mongoDB的mongoose，用到了express。
> 思想：
* 将所需数据导入数据库；
* 通过express创建node.js文件导入数据库的内容：
  * 构建goods表的数据模型并暴露出去目的是为了路由的引入
  * 之后在routes下建立goods.js导入数据模型并连接数据库就可以在路由下进行数据的增删改查，通过查的方法把数据内容传给前端
    * 注意这里在app.js新建一个goods路由，才能通过3000/goods获取到数据
* 通过跨域使前端通过8080端口获取goods内容
# mongodb导入数据
* 命令行：` mongoimport -d db_demo -c users --file 文件拖进去`
# 基于Express开发商品列表查询接口(后端实现)
## 安装mongoose
> Mongoose是在node.js异步环境下对mongodb进行便捷操作的对象模型工具,同时它也是针对mongoDB操作的一个对象模型库，封装了mongoDB对文档的一些增删改查等常用方法，让nodejs操作mongoDB数据库变得更加容易。
* `cnpm i mongoose --save`
## 获取数据库内容
1. 设计Schema: `server下新建models文件夹，models->goods.js`并输出这个模型
  * 设计文档结构（表结构）
```javaScript
// models->goods.js
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({ // 设计文档结构（表结构）
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "productImage":String
})

// 将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库的集合（表）名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//
//    返回值：模型构造函数
module.exports = mongoose.model('Good',productSchema) // 将文档结构发布为模型并暴露出去
```
2.  创建路由并连接mongooDB数据库， `server->routes新建routes->goods.js`
```javaScript
// routes->goods.js
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接mongooDB数据库
mongoose.connect('mongodb://127.0.0.1:27017/mocall')

mongoose.connection.on("connected", function () {
  console.log("mongooDB connected ok")
})

mongoose.connection.on("error", function () {
  console.log("mongooDB connected fail")
})

mongoose.connection.on("disconnected", function () {
  console.log("mongooDB connected disconnected")
})

router.get("/", function (req,res,next) {
  res.send('hello,goods list')
  
})

// 记得把路由暴露给app.js
module.exports = router;
```
3. 暴露路由
```javaScript
// server->app.js
var goodsRouter = require('./routes/goods');
app.use('/goods', goodsRouter) // 此时可以通过localhost：3000访问goods表的内容
```
4. proxyTable跨域
* 在项目目录中找到根目录下config文件夹下的index.js文件。由于是在开发环境下使用，自然而然是要配置在dev里面：
```javaScript
proxyTable: {
  '/goods': { // 使localhost:8080端口通过'/goods'可以访问到3000端口的数据
    target:'http://localhost:3000'
  }
}
```
5. 可能需要修改goodList.vue里面的请求数据的data,成功渲染页面
> 注意这里相当于从后台获取了数据，因此可以把之前mork的数据删了，相应的从操作也可以删了，不然报错
## 关于后台排序
```javaScript
router.get("/", function (req,res,next) {
  // 排序价格并设置分页
  // 接收前端请求的page,pageSize,sort
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = parseInt(req.query.sort);
  let skip = (page-1)*pageSize;
  let params = {};
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) { // 立即执行查询
    if (err) {
      res.json({
        status:'1',
        msg:err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
})
```
## 关于前台排序
```javaScript
// 点击价格排序 
// GoodsList.vue
data(){
  return{
    sortFlag:true,// 升序排序
    page:1,// 页码
    pageSize:8// 每页展示个数
  }
}
// 获取后台购物数据
getGoodsList() {
  // 传递参数
  let param = {
    page: this.page,
    pageSize: this.pageSize,
    sort: this.sortFlag?1:-1
  }
  axios.get("/goods",{
    params: param
  }).then((result) => {
    if(result.data.status==0){
      this.goodsList = result.data.result.list;
    }else{
      this.goodsList=[]
    }
  })
},
sortGoods() {
  this.sortFlag = !this.sortFlag
  this.page = 1 // 点完置1
  this.getGoodsList() // 重新渲染页面
},
```
## 关于vue-infinite-scroll插件
>vue-infinite-scroll插件可以无限滚动实现加载更多，其作用是是当滚动条滚动到距离底部的指定高度时触发某个方法。 
* 文档:(https://www.npmjs.com/package/vue-infinite-scroll)
* 安装：`cnpm i vue-infinite-scroll -S`
* 引用：`import infiniteScroll from 'vue-infinite-scroll' Vue.use(infiniteScroll)`
* 具体使用
```html
<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
  加载中...
</div>
```
```javaScript
data () {
  busy: false //是否正在加载过程中
}
methods: {
  loadMore: function() {
    this.busy = true; //等于true时代表正在执行加载，这时禁用滚动触发。

    //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
    setTimeout(() => {
      //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
      this.busy = false;
    }, 1000);
  }
}
```
* 注意
  * busy为true的时候代表正在执行加载，这时候滚动不会触发方法，但并不会隐藏标签中的内容，这个地方需要自己做处理。（设置class，高度置0）
```javaScript
if (this.pageNo >= totalPage) {
  this.busy = true //已经是最后一页了，不需要再触发滚动加载了
  this.loadMoreHide = true  //已经是最后一页了，不需要高度了
} else {
  this.busy = false
  this.loadMoreHide = false
}
```
## 关于点击价格区间对应切换
> 发送给后端用户点击的index值，后台获取并设置对应的价格区间，最后find方法添加价格区间参数过滤掉不需要的内容
* 知识点：
  * $gt：大于
  * $lte: 小于
```javaScript
// goods.js
et priceGt = '',priceLte='';
  let params = {};
  if(priceLevel!='all'){ // 如果设置了价格区间
    switch (priceLevel) {
      case '0':priceGt = 0;priceLte = 100;break;
      case '1':priceGt = 100;priceLte = 500;break;
      case '2':priceGt = 500;priceLte = 1000;break;
      case '3':priceGt = 1000;priceLte = 5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt, // 大于
        $lte:priceLte // 小于
      }
    }
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
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
# 命令行报错总结
* 未联网下安装插件，如执行cnpm i ...报错
```
Get /binary-mirror-config/latest from https://registry.npm.taobao.org error: ConnectionTimeoutError: Connect timeout for 5000ms, GET https://registry.npmjs.com/binary-mirror-config/latest -2 (connected: false, keepalive socket: false, agent status: {"createSocketCount":4,"createSocketErrorCount":0,"closeSocketCount":4,"errorSocketCount":0,"timeoutSocketCount":0,"requestCount":0,"freeSockets":{},"sockets":{},"requests":{}}, socketHandledRequests: 1, socketHandledResponses: 0)
headers: {}
    at Timeout._onTimeout (C:\Users\小巨蛋\AppData\Roaming\npm\node_modules\cnpm\node_modules\urllib\lib\urllib.js:852:15)
    at ontimeout (timers.js:436:11)
Error: Cannot find module 'bug-versions/package.json' // !!!!!!!关键
```