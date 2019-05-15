# vue-ebook

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# 时间
>2019.5.12 17:10
![](./img/1.png)
![](./img/2.png)
![](./img/3.png)
# 关于epub
* cnpm i --save epubjs
```javaScript
import Epub from 'epubjs'
global.epub = Epub
```
# 关于语法检查
* 关闭缩进rules:`'indent': 'off'`
* 关闭函数后面的括号必须有个空格：`'space-before-function-paren': 'off'`
# 关于vue ui
* 可以看见项目插件、依赖、配置、任务
# 项目准备
## 图标准备
> 图标
* 浏览器工具书签有资料，这里存放在src->styles->fonts、icon.css
* src-main.js导入：`import './assets/styles/icon.css'`
* `<span class="icon-bookmark"></span>`就可看见图标
## 准备Web字体
* 浏览器工具书签有资料，这里存放在src->public->fonts
* 使用方式1（通过js引入）：(无效)
  * main.js：`import 保存某种字体的文件目录`
  * app.vue把需要改变的字体：css:font-family: 'Days One' // 字体名字
* 使用方式2（通过html引入）：
  * index.html文件导入：`<link rel="stylesheet" href="<%= BASE_URL %>fonts/daysOne.css">`
  * app.vue把需要改变的字体：css:font-family: 'Days One' // 字体名字
## 项目依赖包下载+项目配置
* scss:`cnpm i --save-dev node-sass sass-loader`
## viewport配置
> 不允许缩放：index.html
* <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
## rem设置+自适应实现思路
> 引入rem
```javaScript
// app.vue
<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize  // 50px是上限
  html.style.fontSize = fontSize + 'px'
})
</script>
<style scoped>
.text {
  font-family: 'Days One';
  font-size: 1rem;
  color: pink;
}
</style>
```
> 再这基础上自适应布局：
```scss
// global.scss(全局样式文件)
$ratio: 375 / 10;
@function px2rem($px) {
  @return $px / $ratio + rem;
}
// app.vue
.text {
  font-family: 'Days One';
  font-size: px2rem(20); // 将上面的代码的1rem改为px2rem(20)
  color: pink;
}
```
* 这里$ratio值的设定是由用户决定的，可以根据自己的实际需要（或者UI设计稿）进行修改
* 这个值决定了px2rem输出的结果，如果设定为37.5，那么px2rem(20)，表示在375px宽度的屏幕下，显示为20px，计算方法如下：
* 第一步：375px宽度的屏幕，1rem=37.5px（因为在App.vue中指定了html的font-size=375px/10=37.5px，所以1rem=37.5px）
* 第二步：计算px2rem(20)=(20/37.5)rem
* 第三步：将rem转化为px：(20/37.5) * 1rem = 20/37.5 * 37.5px = 20px
* 如果屏幕为414px，那么px2rem(20)的计算结果为：
* px2rem(20)=(20/37.5)*41.4px=22.08px
* 从而实现了自适应布局，因为px2rem(20)会随屏幕宽度放大或缩小，这是一道数学题
* 直接输出结论：
  * 1、$ratio的值可以由用户随意设定
  * 2、当设置为37.5时，表示以屏幕宽度375px为基准
  * 3、如果屏幕宽度大于375px，使用px2rem()方法计算出的值会等比例扩大
  * 4、如果屏幕宽度小于375px，使用px2rem()方法计算出的值会等比例缩小

## global.scss和reset.scss
* global.scss作为唯一css入口文件
```
@import "./reset";
$ratio: 375 / 10;
@function px2rem($px) {
  @return $px / $ratio + rem;
}
```
* reset.scss是全局css默认样式
## 引入Vuex
# 搭建静态资源管理器
![](./img/服务器.png)
# 踩坑
>导入scss文件后随后的scss一直报错,原来是导入后面没加分号
>关于我对vuex的理解：
* mutations就是改变state里面的值而存在的，里面定义的函数传入的参数大部分都会是要改变成某某的值而存在的参数。然后就造成了其它组件引入，并且再把该参数commit传给vuex，继而改变state
```javaScript
mutations:{
    updateUserInfo(state,nickName){ // 用户名
      state.nickName = nickName
    },
    updateCartCount(state,cartCount){ // 用于更改购物车数量
      state.cartCount += cartCount
    },
    initCartCount(state,cartCount){ // 用于保存购物车数量
      state.cartCount = cartCount
    }
  }
```
# 阅读器开发
![](./img/需求1.png)
![](./img/难点1.png)
## 路由
```javaScript
routes: [
  {
    path: '/',
    redirect: '/ebook'
  },
  {
    path: '/ebook',
    component: () => import('./views/ebook/index.vue'),
    children: [ // 子路由
      {
        path: ':filename', // 动态路由，接收filename
        component: () => import('./components/ebook/EbookReader.vue')
      }
    ]
  }
]
```
## epubjs
>引入epub
```
import Epub from 'epubjs'
global.epub = Epub
```
>配置电子书
```javaScript
export default {
  mounted() {
    this.$store.dispatch('setFileName', this.$route.params.fileName.split('|').join('/'))
      .then(() => { // 异步调用，所以用action
        this.initEpub()
      })
  },
  computed: {
    ...mapGetters(['fileName'])
  },
  methods: {
    initEpub() { // 初始化渲染电子书
      const url = 'http://localhost:8082/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', { // epubjs的方法，渲染图书的
        width: innerWidth,
        height: innerHeight,
        method: 'default' // 为了在微信上可以显示
      })
      this.rendition.display()
    }
  }
}
```
>关于翻转
* 手势触摸思想：
  * 利用epubjs提供的on方法，可以使用js提供的触摸事件，touchstart(开始触摸)，touchend(结束触摸)，另外触摸事件可以使用dom方法，如clientx,所以当结束触摸的位置>开始触摸的位置且过程小于500和滑动距离>50,证明是在向前滑动,于是启动向前滑动事件（epubjs提供了prevPage方法），同理向后滑动(nextPage方法）
```javaScript
  this.rendition.on('touchstart', event => { // 开始触摸
    this.touchStartX = event.changedTouches[0].clientX
    this.touchStartTime = event.timeStamp
  })
  this.rendition.on('touchend', event => { // 触摸结束
    const offsetX = event.changedTouches[0].clientX - this.touchStartX
    const time = event.timeStamp - this.touchStartTime
    if (time < 500 && offsetX > 40) { // 返回上一页
      this.prevPage()
    } else if (time < 500 && offsetX < -40) { // 执行下一页
      this.nextPage()
    } else {
      this.toggleTitleAndMenu() // 菜单展示/隐藏
    }
    event.preventDefault() // 禁止默认事件
    event.stopPropagation() // 禁止传播
  })
prevPage() {
  if (this.rendition) {
    this.rendition.prev()
  }
},
// 跳到下一页
nextPage() {
  if (this.rendition) {
    this.rendition.next()
  }
},
```
### 总结一下epubjs方法：
* 书定义：this.book = new Epub(url)
* 渲染书：this.rendition = this.book.renderTo('read',function{})
* 展示书：this.rendition.display()
* 监听书触摸事件：this.rendition.on
* 何时触摸：event.timeStamp
* 向前/后翻页：this.rendition.prev()，this.rendition.next()
## vuex+mixin
> 因为每个使用vuex的组件都需要引入{mapGetters} from 'vuex',并且整个计算属性存放state元素，为了代码复用，于是把这些代码抽象出来放在src->utils->mixin.js，然后各个组件只需引入该文件`import {ebookMixin} from '路经'`然后定义`mixins:[ebookMixin]`即可。此外，actions也同样此操作
## vue-i18n
## 动态切换主题+书签手势操作