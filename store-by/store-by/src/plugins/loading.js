import Img from './timg.gif'
import './loading.css'
console.log(Img)
export default {
  install (Vue) {
    // 生成loading
    let node = document.createElement('div')
    node.id = 'vue_loading_plugin'
    document.body.appendChild(node)
    node.style.background = 'url(' + Img + ') center center no-repeat rgb(230,230,230)'

    // 全局定义展示loading方法
    Vue.prototype.$showLoading = function () {
      node.style.display = 'block'
      setTimeout(() => {
        node.style.opacity = 0.8
      }, 32.7)
    }

    // 过渡结束 如果透明度是0 则display:none
    node.addEventListener('transitionend', function () {
      var o = getComputedStyle(this, null).opacity
      if (o === 0) {
        this.style.display = 'none'
      }
    })

    // 全局定义隐藏loading方法
    Vue.prototype.$hideLoading = function () {
      node.style.opacity = 0
      node.style.display = 'none'
    }
  }
}
