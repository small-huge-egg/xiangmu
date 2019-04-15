# 安装滴滴样式
# 增加data.json文件，在vue.config.js引入后台数据
# 更改index.html，给他添加meta属性不让页面缩放
# 增加在网站上生成的图片文件
# 增加基本样式文件、增加index.styl文件，把icon,base导入
# 在main.js中导入index.styl//报错
# 增加variable.styl，并在其中导入cube-ui.js,设置颜色样式
# 增加mixin.styl，并在其中导入cube-ui.js
# 创建v-header文件夹，加入vue文件和图片
# 在组件下建立存放图片的文件夹support-ico，添加图片和vue文件，文件定义了图标显示什么以及尺寸
# 整改vue.config,js,把路径整改
# get新技能
1. axios执行get请求，三种方式，这里用的是通过params对象传递参数，并做了封装。
```
api/helpers:
export function get(url) {//定义get方法
  return function (params) {
    return axios.get(url, {
      params
    }).then((res) => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(() => {
    })
  }
}
api/index.js:
import { get } from './helpers'
const getSeller = get('/api/seller')//接受get方法
const getGoods = get('/api/goods')
export {
  getSeller,
  getGoods
}
app.vue:
 _getSeller() {
  getSeller().then((seller) => {
    this.seller = seller
  })
 }
```
2. css3 新特性backdrop-filter
  backdrop-filter: blur(10px)// 可以不使其子元素也继承模糊属性
> 它还有别的属性，可以设置动画 模糊颜色
3. 重新复习floor，ceil,向下向上计数。
* 星星个数计算想法： 设置一个数组，为了让数组前面的元素是亮的星星，把整颗亮星星个数计算出来，然后传入数组，在计算半颗星星传入数组，最后如果数组个数<5,把灭了的星星push进去
```
let score=Math.floor(this.score*2)/2;//0.5的倍数
let hasDecimal=score%1 !== 0;//说明有小数，有半星
```
4. 全屏弹窗之position:fixed
> fixed布局如果在一个组件内部嵌套的话，很容易遭受bug，诸如transition的影响，因此最好把全屏弹窗放在body下
* 引入cube-api 下的createAPI,不仅如alert一样稳定，而且会把组建放在body下
### 关于cube-api的createAPI介绍：
#### 该模块默认暴露出一个 createAPI 函数，可以实现以 API 的形式调用自定义组件。并且既可以在 Vue 实例上下文中调用，也可以在普通 js 文件中调用。
> 运用： 在需要运用全屏框的 组件上 添加点击事件，点击事件中运用createAPI:
```
const instance = this.$createAaBb(config, renderFn, single)。
代码：
showDetail() {
  this.headerDetailComp = this.headerDetailComp || this.$createHeaderDetail({
    $props: {
      seller: 'seller'
    }
  })
  this.headerDetailComp.show()
}
```
5. 利用cube-ui的tabBar，写滑动tab区域，用slide写可用手滑动翻页的区域。
### tab区域：
#### tab区域以及完成点击tab引起slide改变
> 思想： 单纯的tabbar只用把文档代码粘出来。但是我想在点击某一项tabbar时下面的slide随之改变。 于是看文档得知绑定一个 v-model，并且值必须是对应的label就可以完成切换。那么问题来了，怎样让tabbar改变时label也变呢？这时想到计算属性。
  * 把v-model的值绑定计算属性，其中get这个钩子函数用来读取当前label的值，计算并返回新的值。那么如何知道当前的label值呢，思路：由index得知label。由此用set这个钩子函数来监视index的变化，变化了咱们就执行get。那么set怎样改变index的值呢？官方文档有个value，value是cubeTab的参数之一，用来判断哪个tab的值作为选中值。默认值：label值。因此通过遍历tabs中value.label在数组中的位置来改变index
```
<cube-tab-bar
              v-model="selectedLabel" //必须项，该指令表示选中的是哪个tab,参数值必须与某一项tab的label属性对应。意思是值必须是对应的label值
              class="border-bottom-1px"
              :showSlider=true // 是否展示下划线
              ref="tabBar"
              :data="tabs"> // data是tabbar规定的一个数组类型用于传所要渲染的数据的，规定数组的每一项必须是一个对象类型，有一个默认的label，写数据的
</cube-tab-bar>
data () {
  return {
    index: 0,

    tabs: [
      {
        label: '商品'
      },
      {
        label: '评价'
      },
      {
        label: '详情'
      }
    ]
  }
}
computed: {
  selectedLabel: {
    get() { // 回调函数 当需要读取当前属性值是执行，根据相关数据计算并返回当前属性的值
      return this.tabs[this.index].label
    },
    set(newVal) { // 监视当前属性值的变化，当属性值发生变化时执行，更新相关的属性数据
      this.index = this.tabs.findIndex((value) => {
        return value.label === newVal // 官方文档有说明。value是cubeTab的参数之一，用来判断哪个tab的值作为选中值。默认值：label值
      })
    }
  }
},
```
### slide区域：
1. slide区域以及完成点击slide引起tab改变
> 思想：文档给出change事件，在slide页面切换时触发，参数：当前页面的索引值
  * 既然有change事件又有当前页面索引值作为参数，那么点击slide引起tab改变只用改变data中的index值就好了。因为index一旦改变，就会触发tabbar的model事件的计算属性，一旦触发计算属性，tabbar就会发生改变
```
onChange (current) {
  this.index = current // 更改当前索引值
  console.log(this.index)
}
```
2. 当slide滑动时让tabbar的底部横条也对应滚动一定距离
> 思想：文档 slide 给出*scroll事件*，在滚动中实时触发，参数：Object {x, y} -滚动位置的坐标值。那么可以设置滚动时改变横条的位置
  * 利用实时触发滚动的这个事件，设置底部横条位置。看文档得知tabbar有一个实例方法：*setSliderTransform*,改变 cube-tab-bar 组件的下划线的 transformX
```
onScroll (pos) {
  const tabBarWidth = this.$refs.tabBar.$el.clientWidth
  const slideWidth = this.$refs.slide.slide.scrollerWidth
  const transform = -pos.x / slideWidth * tabBarWidth
  /* setSliderTransform改变 cube-tab-bar 组件的下划线的 transformX，如果传 Number，
    会转成像素，也可以传带有单位的Number/String */
  this.$refs.tabBar.setSliderTransform(transform)
}
options: { // 实时派发滚动的距离
  listenScroll: true,
  probeType: 3,// 0 不派发scroll事件，1：非实时；2：滑动过程中；3：不仅在屏幕滑动的过程中，而且momentum 滚动动画运行过程中实时派发
  directionLockThreshold: 0 // 横向竖向滚动时避免斜向滚动。如果项目中只是一个方向滚动，那就不用设置，现在这个项目是俩个方向滚动，所以要设置为0
}
<!-- slide区域 -->
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
```
* 需要注意不管是点击tabbar还是滑动slide,都会引起页面的滚动，即都会触发slide滑动，这样会引起底部横条缓动异常，so,关闭tabbar的默认缓动，怎么关看tabbar文档。
### tab组件的抽象和封装
> 因为所有的数据都是直接写在tab组件，为了避免以后增加/减少tabbar导致tab组件的修改，需要对tab中的数据抽离出来，只留下功能代码
#### 动态组件
>   牵扯到tab的数据的封装,因此需要动态创建组件。动态组件概念：让多个组件使用同一个挂载点，并动态切换
  * 通过使用保留的 <component> 元素，动态地绑定到它的 is 特性，可以实现动态组件
```
<cube-slide-item v-for="(item,index) in tabs" :key="index">
  <component ref="component" :is="tabs.component" :data="tabs.data"></component>
</cube-slide-item>
```
4. scroll-nav组件
> 启用cube-ui中的ScrollNav，
```
<cube-scroll-nav
  :side=true // ScrollNav配置 设置为 true 代表是一个侧边样式效果；
  :data="goods" //  ScrollNav配置  默认传入的数据，这个数据会被传入内部使用的 cube-scroll 组件，当 data 发生变化时，scroll 组件会自动刷新；
  :options="scrollOptions" // 用于配置一些click、directionLockThreshold参数
  v-if="goods.length" // 为了避免数据浪费 详情请往下看
>
<cube-scroll-nav-panel // 该组件和cube-scroll-nav组件相辅相成
  v-for="good in goods" // 渲染从后台获取到的食物数据
  :key="good.name"
  :label="good.name" // ScrollNav配置 必须，面板的唯一标示的值(如热销榜)
  :title="good.name" // 面板标题内容，可以是 HTML 字符串
>
 (1)、options参数配置

scrollOptions: {
  click: false, // 会点击俩次，底层用的是scroll，所以设置click为false
  directionLockThreshold: 0
}
（2）、获取数据的方法为fetch
fetch () {
  getGoods().then((goods) => {
    this.goods = goods
  })
}
//什么时候调用呢？我们一般是在组件的mounted里面调用，但是在这个项目中，如果我们在评论或者商家页面，商品页面有可能是在mounted，这时就会进行数据加载，这样的话，会影响当前页面的显示，所以，我们应该在切换组件的时候调用这个方法
```
* 可以在Tab组件的onChange方法里调用：
```
// 切换的时候，调用对应组件里面的fetch
onChange (current) {
  this.index = current // 更改当前索引值
  const instance = this.$refs.component[current]
  if (instance && instance.fetch) {
    instance.fetch()
  }
}
```
# 小坑大花费
### 今天的坑是用stylus写样式，因为缩进问题导致图片没加载出来，因为他根本找不到此处有这个class,就不给我安排
### 更改cube-ui颜色文件，记住如果更改的颜色是自定义的颜色，请把冒号删掉
### 在完成点击slide引起tab改变时，我大脑抽筋把文档给的change事件写成o@click事件了，一直没效果也不报错。
### 调用onChange，明日任务
(https://www.cnblogs.com/zhaobao1830/p/9978505.html)