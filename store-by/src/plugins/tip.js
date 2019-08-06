import './tip.css'

export default {
  install (Vue) {
    // 弹出框的展示和隐藏

    // 创建弹出节点并插入
    let node = document.createElement('div')
    node.id = 'vue_alert_plugin'
    node.innerHTML = '<p></p><div>x</div>'
    // 点击关闭按钮,关闭
    node.children[1].onclick = function () {
      node.style.display = 'none'
    }
    document.body.appendChild(node)

    // 定义全局方法,展示弹出框
    Vue.prototype.$alert = function (msg, flag) {
      node.style.display = 'block'
      node.children[0].innerHTML = msg
      if (flag) { // 关闭
        setTimeout(() => {
          node.style.display = 'none'
        }, 2000)
      }
    }

    // 模态框的显示与隐藏
    let node2 = document.createElement('div')
    node2.style.display = 'none'
    node2.innerHTML = '<p></<p><button>确定</button><button>取消</button>'
    document.body.appendChild(node2)

    // 定义全局方法
    Vue.prototype.$confirm = function (msg, f) {
      node2.style.display = 'block'
      node2.children[0].innerHTML = msg
      node2.children[1].onclick = function () {
        f(1)
        node2.style.display = 'none'
      }
      node2.children[2].onclick = function () {
        f(0)
        node2.style.display = 'none'
      }
    }
  }
}
