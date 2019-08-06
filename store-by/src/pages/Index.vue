<template>
  <div>
      <banner></banner>
      <list :list="list" ref="list"></list>
      <div class="tip"></div>
  </div>
</template> 
<script>
import banner from "@/components/banner"
import list from "@/components/list" 
import $axios from "@/assets/js/axios";
export default {
  data(){
    return{
      list:[],
      page: 1,
      // 列表底部到文档底部距离
      distance: 0,
      flag: true,
      msg:'加载更多数据'
    }
  },
  beforeRouteEnter (to,from,next){
    let list = $axios.get("/api/goodList?page=1");
    let p = Promise.all([list])

    ;(async function(){
      var res= await p
      next(vm=>{
        vm.list=vm.list.length==0?res[0].data:vm.list
        vm.$hideLoading()
        
        // 在组件上定义ref指的是组件实例,如果想要顶层节点: vm.$refs.list.$el
        // dom更新之后
        vm.$nextTick(()=>{
          vm.distance=parseFloat(getComputedStyle(vm.$refs.list.$el,null).height)+vm.$refs.list.$el.offsetTop;
        })
      })
    }())
  },
  created(){
    // 绑定滚动事件
    window.addEventListener("scroll", () => {
      var H = window.innerHeight // 可视区高度
      // 已经滚动高度
      var st = document.body.scrollTop||document.documentElement.scrollTop
      // 触底条件
      if(this.distance<=H+st+200&&this.distance>H+st&&this.flag){
        this.flag = false
        this.msg="正在记载中,请稍后"
        this.$axios.get('/api/goodList?page='+(++this.page)).then(res=>{
          if(res.data.length){
            this.flag = true
            this.msg="加载更多内容"
            this.list=[...this.list,...res.data]
            // dom更新之后重新计算尺寸
            this.$nextTick(()=>{
              this.distance=parseFloat(getComputedStyle(this.$refs.list.$el,null).height)+this.$refs.list.$el.offsetTop;
              // console.log(this.$refs.list)
            })
          }else{
            this.msg="没有更多数据了"
          }    
        })
      }
    })
  },
  components:{banner, list}
}
</script>
<style>
.tip{
  width: 1100px;
  margin: 0 auto;
  background: rgba(255,255,255,0.8);
  line-height: 50px;
  border-radius: 4px;
  color:rgb(104, 65, 165);

}
</style>
