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
# 插件：
* 安装localstorage库
  * `cnpm i --save web-storage-cache`
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
* 浏览器工具书签有资料，这里存放在public->fonts
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
# 搭建静态资源https://www.cnblogs.com/salix/p/5987017.html管理器
* 更多介绍（）
![](./img/服务器.png)
>常用命令：
* nginx -s reload
  * 重新加载nginx配置
* nginx -s stop
  * 关闭静态资源服务
* 在niginx目录下 start nginx ，开启静态服务，访问80端口
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
>关于设置主题：
```javaScript
function setTheme(index) {
  this.rendition.themes.select(this.themeList[index].name)
  this.defaultTheme = index
}
```
>关于注册主题：
```javaScript
function registerTheme(index) {
  this.themeList.forEach(theme => { // 注册样式
    this.rendition.themes.register(theme.name, theme.style)
  })
}
```
* 具体内容：
  * 当点击第index项的主题时，将themeList的index项的信息提取出来，将vuex的defaultTheme改变为index里的name,然后利用epubjs的select设置主题，并将主题名字保存在localStorage.
  * 在ebookReader里利用epubjs的register方法注册全部主题名字和样式，然后利用epubjs的select设置主题，避免刷新后在未设置主题时不给我之前的主题
```javaScript
// mixin.js
computed: {
  themeList() {
    return themeList(this)
  }
}

// ebookReader.vue
// 初始化主题
initTheme() {
  let defaultTheme = getTheme(this.fileName) // 从localStorage取出主题名字
    if (!defaultTheme) { // 如果本地存储没有存主题名字，将主题列表的第一个设为主题
      defaultTheme = this.themeList[0].name
      this.setDefaultTheme(defaultTheme) // 改变默认主题名字
      saveTheme(this.fileName, defaultTheme) // 存储名字
    }
  this.themeList.forEach(theme => { // 注册样式
    this.rendition.themes.register(theme.name, theme.style)
  })
  this.rendition.themes.select(defaultTheme)
},

// ebookSettingTheme.vue
setTheme(index) { // 设置主题
  const theme = this.themeList[index] // 取出相应的主题信息
  this.setDefaultTheme(theme.name).then(() => { // 改变默认主题为theme.name,
    this.currentBook.rendition.themes.select(this.defaultTheme) // 名字改了之后把这本书的主题给改了
  })
  saveTheme(this.fileName, theme.name) // 保存主题名称
}
```
> 关于菜单的主题颜色也改变：
* 因为改变主题颜色通过epubjs只能改变电子书主题，为了改变其他部分主题，使用动态添加link标签，将里面的href设为静态服务器上css文件的路径。
  * 通过addCss函数添加link,通过switch主题名字设置href的值传给addCss
  * 初始化调用，点击主题的时候调用，所以把addCss设为全局的方法放在book.js里，把switch主题名字设置href的方法放在了mixin.js里
* 因为每次点击主题都调用了addCss方法，所以定义一个全局清除link的方法,并在·把switch主题名字设置href的方法·最前面调用删除之前link的函数
* 详情参照util->book.js和mixin.js
* 由此可见参数的重要性，这里面要是没有设置参数href会很复杂，通过switch设置href这个操作是关键
>关于进度条
* html部分：type="range",@change,@input事件
``` html
<input class="progress" type="range"
@change="onProgressChange($event.target.value)" @input="onProgressInput($event.target.value)>
```
* js部分
```javaScript
methods: {
  onProgressChange (progress) {
    this.setProgress(progress).then(() => {
      this.displayProgress()
      this.updateProgressBg()
    })
  },
  onProgressInput (progress) {
    this.setProgress(progress).then(() => {
      this.updateProgressBg()
    })
  },
  displayProgress () {
    const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
    this.currentBook.rendition.display(cfi)
  },
  updateProgressBg() { // backgroundSize设置为滑动位置至结束
    this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
  },
},
updated() {
  this.updateProgressBg()
}
```
>关于翻章节
```javaScript
preSection() { // 上一章
  if (this.section > 0 && this.bookAvailable) {
    this.setSection(this.section - 1).then(() => {
      this.displaySection()
    })
  }
},
nextSection() {
  if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
    this.setSection(this.section + 1).then(() => {
      this.displaySection()
    })
  }
},
displaySection () {
  const sectionInfo = this.currentBook.section(this.section)
  if (sectionInfo && sectionInfo.href) {
    this.currentBook.rendition.display(sectionInfo.href).then(() => {
      this.refreshLocation()
    })
  }
},
refreshLocation() {
  const currentLocation = this.currentBook.rendition.currentLocation()
  const progress = this.currentBook.locations.percentageFromCfi(currentLocation.start.cfi)
  this.setProgress(Math.floor(progress * 100))
}
```
> 分页算法
```javaScript
this.book.ready.then(() => {
  return this.book.locations.generate(750 * (window.innerWidth / 375) *
  (getFontSize(this.fileName) / 16)).then(locations => {
    this.setBookAvailable(true)
    this.refreshLocation()
  })
})
```
### 总结一下epubjs方法：
* 书定义：this.book = new Epub(url)
* 渲染书：this.rendition = this.book.renderTo('read',function{})
* 展示书：this.rendition.display()
* 监听书触摸事件：this.rendition.on
* 何时触摸：event.timeStamp
* 向前/后翻页：this.rendition.prev()，this.rendition.next()
* 设置字体：this.book.rendition.themes.fontSize(字体大小)
* 设置主题：this.book.rendition.themes.select(主题名字)
* 注册主题：this.book.rendition.themes.register(主题名字,主题样式)
* 设置字体样式：this.book.rendition.themes.font(字体样式名字)
* 改变字体样式之引入字体文件（只能放在我的enginx静态服务器下的一个文件夹里）：
```javaScript
this.rendition.hooks.content.register(contents => {
  Promise.all([
    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
    contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
  ]).then(() => {
    console.log('字体已经全部加在完毕')
  })
})
```
* 获取一级目录：this.currentBook.navigation.get(sectionInfo.href)
* 获取一级目录标题：this.currentBook.navigation.get(sectionInfo.href).label
* 图书观看百分比：cfi=this.currentBook.locations.cfiFromPercentage(this.progress / 100)
* 当前页的信息（包括第几页，百分比，开始、结束字符）：  const currentLocation = this.currentBook.rendition.currentLocation()
* 当前页的第一个字：const cfibase= currentLocation.start.cfi.replace(/!.*/, '')
* 渲染指定地点的图书：this.currentBook.rendition.display(cfi)
* 图书所有章节详情：this.currentBook.spine
* 图书的第几章详情：const sectionInfo = this.currentBook.section(第几章)
* 某章图书的链接，href是一个html，如果加个display就渲染了这一章：this.currentBook.section.href
* 当前章节的详情：this.currentBook.rendition.currentLocation()
* 当前章节的开始页面：this.currentBook.rendition.currentLocation().start.cfi
* 当前页面位于全书的百分比：this.currentBook.locations.percentageFromCfi（某一章）
* 获取图书封皮:this.book.loaded.cover
* 获取图书作者：this.book.loaded.metadata.creator
* 获取图书名字：this.book.loaded.metadata.title
* 设置高亮: this.currentBook.rendition.annotations.highlight(target)
```javaScript
// 获取图书的基本信息
parseBook() {
  this.book.loaded.cover.then(cover => { // 图书封面
    this.book.archive.createUrl(cover).then(url => {
      this.setCover(url)
    })
  })
  this.book.loaded.metadata.then(metadata => { // 图书作者
    this.setMetadata(metadata)
  })
},
```
* 获取图书章节目录(是个数组)：this.book.navigation.toc
* 全局搜索
```javaScript
search() { // 搜索全书
  if (this.searchText && this.searchText.length > 0) {
    this.doSearch(this.searchText).then(result => {
      console.log(this.searchList)
      this.searchList = result.map(item => {
        item.excerpt = item.excerpt.replace(this.searchText, `<span class="content-search-text">${this.searchText}</span>`)
        return item
      })
      // this.$refs.searchInput.blur()
    })
  }
},
doSearch(q) { // 该方法由epubjs提供
  return Promise.all(
    this.currentBook.spine.spineItems.map(
      item => item.load(this.currentBook.load.bind(this.currentBook)).then(item.find.bind(item, q)).finally(item.unload.bind(item)))
  ).then(results => Promise.resolve([].concat.apply([], results)))
}
```
> vue中鼠标的‘enter箭’：`@keyup.enter.exact="search()"`,加exact为了防止同时按别的键也触发enter事件
## vuex+mixin
> 因为每个使用vuex的组件都需要引入{mapGetters} from 'vuex',并且整个计算属性存放state元素，为了代码复用，于是把这些代码抽象出来放在src->utils->mixin.js，然后各个组件只需引入该文件`import {ebookMixin} from '路经'`然后定义`mixins:[ebookMixin]`即可。此外，actions也同样此操作
> 因为有些样式想要弄成全局样式，利用scss的@mixin定义对象，调用某个对象的时候直接`@include 对象名`。 用@function定义函数，这里调用的时候直接`padding:px2rem(12)`
```
$ratio: 375 / 10;

@function px2rem($px) {
  @return $px / $ratio + rem;
}
@mixin center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
## vue-i18n国际化
* 安装：` cnpm i --save vue-i18n`
* import VueI18n from 'vue-i18n'
* Vue.use(VueI18n)
* main.js:
  * import i18n from './lang'
  * 在main.js的实例中挂载i18n
* 使用:`<span">{{$t('book.selectFont')}}</span>`
## 动态切换主题+字体+书签手势操作
> 字体：epubjs的方法：`this.book.rendition.themes.fontSize`
```
setFontSize(fontSize) { // 设置字体字号
  this.book.rendition.themes.fontSize(fontSize)
}
```
## 安装localstorage库
* `cnpm i --save web-storage-cache`
* 引包`import Storage from 'web-storage-cache'`
* 实例化对象`const localStorage = new Storage()`
```javaScript
// 写入数据
export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}

// 获取数据
export function getLocalStorage(key) {
  return localStorage.get(key)
}
// 获取缓存
export function removeLocalStorage(key) {
  return localStorage.delete(key)
}

// 清空
export function clearLocalStorage(key) {
  return localStorage.clear()
}
```
# 书城首页







# 搜索页
>向下滑动屏幕时的交互细节分析：
1. 标题和推荐图标向下渐隐
* 设置show方法，然后加个动画
2. 搜索框向上移动到标题位置
* 添加class，设置top=0,再加个动画transition: top .2s linear
3. 搜索框逐渐变窄以适应屏幕（难点）
* 将搜索框设置为flex布局，同时添加一个占位div,在开始时占位div的flex为000，后来变成 0 0 返回图标的宽度
4. 返回按钮向下居中
* 添加class，设置高度为52即可，然后加个transition: heigh .2s linear
5. 标题下方产生阴影
* 很多地方需要添加阴影，根据场景需求，注意改变dom需要在$nextTick这个回调函数中进行，以及父组件调用子组件中的方法： this.$refs.hotSearch.reset()，直接打点调用。子组件不需要做什么


>推荐的交互细节分析：
1. 弹出卡片
2. 卡片翻转动画（难点）
* 注意卡片的起始，卡片重复的点，卡片重置
* 分析由于半页半页翻转，于是把图片拆分成两个图片，利用flex布局实现各占一半，利用`background-position：center right`实现背景图片垂直居中，水平居右，右边半图同理，还有no-repeat设置
* 分析是右边的旋转，但是背面是第二张图，所以利用`backface-visibility: hidden`隐藏正面旋转的背面，但是这样仅仅隐藏了前一张的背面，要使他的背面呈现第二张图，那么就要初始化第二张图即旋转个180°，这样她俩就贴着了
* 于是动起来的时候让前一页的rotateDegree+10，颜色减5,后一页的度数减10，颜色加5，然后他俩都旋转了90°后，正式换图片，使后一张的Index+2
* 这里规定了rotate方法专门用来获取dom,使其旋转指定角度和旋转时颜色变化；规定了flapCardRotate方法专门用来规定如何变化；规定了startFlapCardAnimation方法正式添加定时器实现动画
* 当第一张图旋转180°后并且后一张图旋转了90°后，进入下一张图片，因此创建next方法，首先把之前的前一张和后一张图片设置旋转（旋转度数归为0，颜色也变为最初），然后使前一张++，后一张++。为了实现循环，设置当前一张>=len,就让前一张Index=0,back同理。
  * 注意这里虽然图片有所切换，但index值要++，不然看不见，于是得一算法：
```javaScript
// 动态改变z-index
this.flapCardList.forEach((item, index) => {
  item.zIndex = 100 - ((index - this.front + len) % len)
})
```
* 为了实现关闭动画弹窗后动画至于初始状态，因此规定reset方法重置旋转玩家，重置每张图片背景色，重置每张图旋转角度，重置zindex

3. 烟花动画（难点）
* scss知识点：
  * scss的属性用$名字声明，方法用@mixin 方法名声明
  * 获取$moves数组的第$index项：nth($moves, $index)
  * 动画名字设置要用#{$动画名}包裹
  * for循环数组是 @for $i from 1 to 某数组指定长度
* 烟花展示新建一个flap.scss文件，设置一个对象数组$moves存放18个小球的颜色、大小、开始位置横纵坐标、结束横纵坐标位置。然后设置一个方法，接收一个$index参数给$index项设置相应的item（从$moves中取得第$index项）$item: nth($moves, $index);，添加动画必备的`animation: #{$keyframesName} $animationTime $animationType $animationIterator;`。这样就实现直接通过遍历数组中的x,y坐标信息使小球绽放在不同位置后消失
* 卡片隐藏：一定时间后关闭烟花动画直接采用将class置为false，但是要想隐藏整个动画dom,这里采用将整体opacity=0,transform: scale(0).但是这样会使动画弹出来后就被立即隐藏了。于是添加annimation: .3s ease-in both.注意这个both属性会使弹出动画停留在最后一刻，即100%的时候。
* 注意异步函数的调用，有效控制各个动画出现时间
* 关于scss的for循环代码：
```css
.point {
  border-radius: 50%;
  @include absCenter;
  &.animation {
    @for $i from 1 to length($moves) { // scss的循环，从1到$moves的长度
      &:nth-child(#{$i}) { // 给每个元素设置flapCaed.scss的move($i)方法
        @include move($i);
      }
    }
  }
}
```
4. 弹出推荐图书
> mock.js
* 源码：(https://github.com/nuysoft/Mock)
* 安装：`cnpm i mockjs --D`
* 替换原生的XMLHttpRequest,使用简便
* 丰富的数据类型
* 无法支持blob类型，无法模拟下载
* 引入：`import Mock from 'mockjs'`


# 列表页






# 详情页







# 难点：
![]('./img/难点1.png')
![]('./img/难点2.png')
### 做目录时，由于数组里面可能嵌套数组然后再嵌套数组，为了改成一维数组在显示目录时直接将不规则数组传进去就好了。其次这样全部拆成了一级目录，为了分配二级目录好设置css的margin，利用filter和epubjs的id,parent将多级目录形成新数组，并将多级目录的级数通过level计算
```javaScript
// 将多维数组转化为一维数组
// book.js
export function flatten(array) {
  return [].concat(...array.map(item => [].concat(item, ...flatten(item.subitems))))
}
// EbookMenu.vue
this.book.loaded.navigation.then((nav) => { // 获取到全书章节之后
  const navItem = flatten(nav.toc) // 被拆分的一级目录
  function find(item, level = 0) {
    // 当当前项的parent属性为underfind时（代表是一级目录epubjs给的）,level=0
    // 当当前项的parent存在时，代表不是一级目录。然后寻找满足其他数组的id和item.parent相等的的数组
    // 如果找到了就让当前项的level+1，并且让新找到的成立一个数组，然后继续找。。。
    return !item.parent ? level : find(navItem.filter(parentItem =>
    parentItem.id === item.parent)[0], ++level)
  }
  navItem.forEach(item => { // 遍历每一项，添加level
    item.level = find(item)
  })
  this.setNavigation(navItem)
})
```





### 关于等待目录渲染结束之前的loading:具体参照EbookLoading.vue
* 这里用了两个v-for,第一个v-for是指左右两边
* 第二个v-for包含在第一个里面，表示左边三个线，右边三个线
* 第二个v-for里面有无色线和白线
* 通过setInterval，设置动画时长，循环遍历每个无色线，通过add值和end值决定无色线的方向，通过增加、减少无色线与有色线长短造成动画视觉
* 为了使每个线与上一条线参差不齐的视觉感受，让上一条线无色线为8的时候才让下一条线开始动弹。
  * 注意多条判断决定走向方向以及是否到头以及是否为第一条线





### 关于书签
* 功能：在未设置书签时下拉屏幕时显示‘下拉添加书签’，当拉到一定高度时显示‘松开设置为书签’；在已设置书签时下拉屏幕时显示‘下拉删除书签’，当拉到一定高度时显示‘松开删除该书签’
  * 首先监听touchmove事件，获取手势移动的高度
    * 通过 `@touchmove="move"@touchend="moveEnd"`触发触摸事件，`e.changedTouches[0].clientY`获取触摸位置，声明一个变量，如果变量存在，就表示为第二次触摸的位置，不存在则存储位置
```javaScript
// ebookReader
// 下拉
    move(e) {
      let offsetY = 0
      if (this.firstOffsetY) { // 如果存在开始触摸的位置
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.$store.commit('SET_OFFSETY', offsetY) // 保存下拉偏移量
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },

    // 下拉结束
    moveEnd(e) {
      this.$store.dispatch('setOffsetY', 0)
      this.firstOffsetY = null
    },
```
  * 当监听到手势事件时，需要对indexview进行移动,所以要将indexview整个绝对定位，下拉时改变他的top值 
```javascript
// index.vue
watch: {
  offsetY(v) { // 监听y轴变化 ------------------- 监听vuex里的值，v居然代表值
    if (v > 0) { // 如果下拉
      this.move(v)
    } else if (v === 0) { // 如果松手
      this.restore()
    }
  }
},
mounted() {
  this.startLoopReadTime()
},
methods: {
  restore() {
    this.$refs.ebook.style.top = 0
    this.$refs.ebook.style.transition = 'all 0.2s linear'
    setTimeout(() => { // 为了避免多次下拉时卡顿现象------------原来seTimeout还有这个功能
      this.$refs.ebook.style.transition = ''
    }, 200)
  },
  move(v) {
    this.$refs.ebook.style.top = v + 'px'
  },
```
  * 在顶部增加一个书签组件，向下时书签组件就会出现，并且该组件需要判断展示了多高，来进行字以及书签图标更改
    * 这里的复杂点在于下拉时状态的改变，四个状态：下拉初始：下拉到一定位置字不再下拉，零界状态：再下拉到一定位置字和图标位置保持不变（吸顶效果），状态3： 超越零界状态，状态4： 归位 
```javaScript
// 下拉初始即状态1：判断是否为书签，如果是书签注意字体以及书签图定位的改变；如果不是则同理
// 零界状态即状态2：注意吸顶效果（到达某个高度时让这一块开始向上运动（top改变方向与书的方向相反）），还要注意和状态1同样的问题
// 状态3： 超越零界状态：与状态2同理
// 状态4： 归位 (注意如果有了过度动画，这里归位要等到动画结束的时候)和存书签的操作
setTimeout(() => {
  this.$refs.bookmark.style.top = `${-this.height}px` // 高度归位
  this.$refs.iconDown.style.transform = 'rotate(0deg)' // 向下箭头归位
}, 200)
```
>鼠标拖动事件————书签
>因为要记录鼠标进入和离开的位置，所以这里使用mousemove,但只想在点击鼠标的时候才触发下拉事件，于是这里给鼠标状态赋值，如果鼠标状态为1，表示鼠标进入未按下，将鼠标状态改为2。
```javaScript
// ebookReader.vue
<!-- 书签蒙板 -->
<div class="ebook-reader-mask"
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd">
</div>
// 鼠标进入
onMouseEnter(e) {
  this.mouseState = 1 // 表示鼠标掠过，1的时候不执行任何操作
  this.mouseStartTime = e.timeStamp
  e.preventDefault()
  e.stopPropagation()
},
// 鼠标移动
onMouseMove(e) { // 只有在鼠标非掠过的情况下才认为移动
  if (this.mouseState === 1) {
    this.mouseState = 2 // 表示鼠标不是掠过
  } else if (this.mouseState === 2) {
    let offsetY = 0
    if (this.firstOffsetY) {
      offsetY = e.clientY - this.firstOffsetY
      this.$store.commit('SET_OFFSETY', offsetY)
    } else {
      this.firstOffsetY = e.clientY
    }
  }
  e.preventDefault()
  e.stopPropagation()
},
// 鼠标松开
onMouseEnd(e) {
  if (this.mouseState === 2) {
    this.$store.dispatch('setOffsetY', 0)
    this.firstOffsetY = null
    this.mouseState = 3 // 表示鼠标对屏幕无状态
  } else {
    this.mouseState = 4 // 表示鼠标状态是‘点了一下’
  }
  const time = e.timeStamp - this.mouseStartTime
  if (time < 100) {
    this.mouseState = 4
  }
  e.preventDefault()
  e.stopPropagation()
},
```





# 坑
### 为了其它组件获取这本书从而改变这本书下的一些样式，如字体大小，背景等，于是我在vuex定义了一个currentBook，设置了mutation,getter,action,并在初始化这本书的时候`this.setCurrentBook=this.book`,但是我在其它组件上调用currentBook的时候为空，vuex上也显示currentBook为空，于是找错
* 先从store下手，两天反复核对了好几遍没发现store有任何错误
* 于是console.log了很多setCurrentBook，current,current仍然为空。注意setCurrentBook是我action定义的方法。
* 想过重新建一个store2,但是由于原本代码封装性太强弄一下太麻烦，其实我误会了，很简单的，我的store文件夹有个book.js专门用来定义state和mutation,actions.js专门用来定义actions,getters.js专门用来定义getter的函数，然后这些文件导出并被index.js文件引用。为了实现代码简单，我又创建了minxin.js用来将ction,getter方法进行封装解构， 往下看
* 最终还是换了个简单的方法，不整封装了，直接`this.$store.commit('SET_CURRENT_BOOK', this.book),this.$store.dispatch('setCurrentBook', this.book)`就成功了，查看current的值也正确了。
* 至今不知道为什么封装的就不能改变current值,其他的值完全ok
* 最重要的是我找错步骤是不对的，当我未从store找到错误时，我应该换个方式改变currenBook的值，即原始方法弄，而不是继续通过封装的方式改变
### 一直报错：‘Cannot read property '3' of null’
>这里告诉我报错在某个页面，但一直没有从中找到3的信息，后几天突然想到book.js中的section=3，于是改为0，不再报错
>报错' Cannot read property 'section' of null"',但是显示错误在另一个页面，vue的浏览器插件能够正常显示section,于是百度发现，应该是逻辑问题
* 只需添加判断if(this.section){}即可
# 总结
1. 建立框架页面index.vue
2. 通过动态路由动态的向EbookReader.vue组件传入电子书的路径
* 注意这里直接在路由/ebook下声明`children: [{path:':fileName' }]`,而且为了简化代码，直接让component接收一个匿名的箭头函数，返回`import('vue文件路径')`
* 获取动态路由的值：this.$route.params
3. 在EbookReader组建中实现了电子书的解析和渲染
4. 通过vuecli3.0的环境变量管理和引入环境变量`VUE_APP_RES_URL`
* 新建.env.development文件，输入`VUE_APP_RES_URL=http://localhost:8082`
* 于是EbookReader中就可以这样使用
  const url = process.env.VUE_APP_RES_URL + '/epub/' + this.fileName + '.epub'
* 其他任意场景需要http://localhost:8082都可直接输入process.env.VUE_APP_RES_URL，无需引入文件
5. 通过手势操作实现了电子书的手动翻页，主要就是通过epub.js的on方法监听touchstart与touchend,然后利用event.changedTouches[0].clientX监听横轴触摸位置，利用event.timeStamp监听每次触摸的时间
6. 利用vueI18n实现中英两种语言的配置
7. 通过mixins机制实现代码的耦合
8. 主题的实现
* 阅读器主要通过epub.js实现，利用rendition.themes.select(主题)切换主题
* 而app界面的主题主要通过动态添加和删除css实现的
9. 阅读进度
* 通过html5的range控件实现滑动条
* 通过ebub.js的locations实现阅读进度和百分比的显示（这里面的保存进度、跳转到指定页面后更改进度以及展示渲染后的页面还是比较复杂的，逻辑必须清晰）。
* 通过epub.js的section获取指定章节，利用section(第几章).href渲染指定章节
* 阅读时间的统计
10. 阅读器的目录
* 封装了一个flatten函数，运用了es6的新特性将一个树状的数据结构转变为了一个一维数组（...解构与[].concat耦合）
* 通过find方法判断出了每一个对象所处的层级，实现了多级目录的缩进展示
* 通过官方提供的方法实现了电子书的全文搜索功能，并实现了搜索关键字的高亮显示以及阅读器的高亮（主要通过epub的annotations.highlight(搜索关键字)实现，里面有将二维数组整成一位数组的算法）
11. 书签功能
* 主要通过touchmove和touchend实现手势交互
* 通过绝对定位改变top值实现了整个页面的下拉效果
* 通过动态加载transition实现了界面的回弹动画
* 通过css实现了书签
* 设计了不同的状态来区分手势（下拉）的不同阶段触发不同的操作
* 实现添加书签功能，注意如何获取书签文本内容
* 删除书签功能，通过filter方法
12. 添加了书签功能对鼠标事件的支持