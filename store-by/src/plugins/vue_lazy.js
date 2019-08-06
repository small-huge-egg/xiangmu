import loading from './lazyload.gif'
export default {
  install (Vue) {
    Vue.directive('lazy', {
      inserted: function (el, binding) {
        // 设定loading图
        el.style.background = 'url(' + loading + ') no-repeat center center'
        function f () {
          let H = window.innerHeight
          let st = document.documentElement.scrollTop || document.body.scrollTop
          let ot = el.offsetTop
          if (ot + 200 < H + st) {
            el.src = binding.value
            // 当前图片加载完毕, 隐藏loading
            el.onload = function () {
              el.style.background = 'none'
            }
            window.removeEventListener('scroll', f)
          }
        }
        f()
        window.addEventListener('scroll', f)
      }
    })
  }
}
