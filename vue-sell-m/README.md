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
# 小坑大花费
### 今天的坑是用stylus写样式，因为缩进问题导致图片没加载出来，因为他根本找不到此处有这个class,就不给我安排
### 更改cube-ui颜色文件，记住如果更改的颜色是自定义的颜色，请把冒号删掉