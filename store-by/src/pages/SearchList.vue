<template>
  <div>
    <h1>{{$route.query.keyword}}</h1>
    <list :list="list" v-if="list.length"></list>
    <div class="no" v-else>没有您要搜索的宝贝，我们及时补充</div>
  </div>
</template>
<script>
import $axios from '../assets/js/axios.js'
import list from '../components/list'
export default {
  data() {
    return {
      list: []
    }
  },
  beforeRouteEnter (to,from,next) {
    console.log(list)

    let search = $axios.get("/api/search",{params:{word:to.query.word}})
    let p = Promise.all([search])
    ;(async function(){
      let res = await p
      next(vm => {
        vm.$hideLoading()
        vm.list = res[0].data
      })
    }()) 
    console.log(list)
  },
  watch: {
    // 同组件渲染
    "$route"(){
      this.showLoading()
      let search = $axios.get("/api/search",{params:{word:this.query.word}})
      let p = Promise.all([search])
      let self = this
      ;(async function(){
        let res = await p
        self.$hideLoading()
        self.list = res[0].data
      }()) 
    }
  },
  components:{list}
}
</script>
<style scoped>
h1{
  text-align: center;
  border-bottom:1px solid #999;
  color:#666
}
.no{
  width:1100px;
  height:800px;
  line-height: 800px;
  text-align: center;
  color:rgb(104,65,165);
  font-size:30px;
  background: white;
  margin:10px auto
}
</style>
