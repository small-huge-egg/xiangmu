<template>
  <div class="floor" v-if="floor_list.length">
    <div class="floor" ref="floor" v-for="(floor_item, index) in floor_list" :key="index">
        <h2>{{floor_item.floor_title}}</h2>
        <list :list="floor_item.list"></list>
    </div>
    <ul class="nav">
        <li v-for="(x,index) in floor_list" :key="index" :class="{con:num==index}" @click="scrollTo(index)">{{x.floor_title}}</li>
    </ul>
  </div>
  <div class="no" v-else>没有您要搜索的宝贝，我们会及时补充</div>
</template>

<script>
import $axios from "@/assets/js/axios";
import list from "../components/list"
export default {
    methods:{
        scrollTo(index){
            // console.log(this.$refs)
            document.body.scrollTop=this.$refs.floor[index].offsetTop;
            document.documentElement.scrollTop=this.$refs.floor[index].offsetTop;
            this.num=index;
        }
    },
    created(){
        //添加滚动监听
      window.addEventListener("scroll",()=>{
          var H=window.innerHeight;
          var st=document.body.scrollTop||document.documentElement.scrollTop;
          var floor=this.$refs.floor
          if(floor.length){
            for(var i=0;i<floor.length;i++){
              if(H/2+st>floor[i].offsetTop){
                  this.num=i
              }
            }
          }
      })
      console.log(this.floor_list)
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{    
            $axios.get("/api/search",{params:{word:to.query.keyword}})
            .then(res=>{
                vm.$hideLoading();
                //处理数据
                // vm.floor_list=res.data
                let floor_list=[];
                for(var i=0;i<res.data.length;i++){
                    var flag=true;
                    for(var j=0;j<floor_list.length;j++){
                        if(floor_list[j].floor_title==res.data[i].type_two){
                            floor_list[j].list.push(res.data[i]);
                            flag=false;
                            break;
                        }
                    }
                    if(flag){
                        floor_list.push({
                            floor_title:res.data[i].type_two,
                            list:[res.data[i]]
                        })
                    }
                }
                console.log(floor_list)
                vm.floor_list=floor_list;
            })
        })
        // console.log(this.floor_list)
    },
    data(){
        return{
            floor_list:[],
            num:0
        }
    },
    components:{list},
    watch:{
      "$route"(){
        this.$axios.get("/api/search",{params:{word:this.$route.query.keyword}})
        .then(res=>{
          this.$hideLoading();
          //处理数据
          // vm.floor_list=res.data
          let floor_list=[];
          for(var i=0;i<res.data.length;i++){
              var flag=true;
              for(var j=0;j<floor_list.length;j++){
                  if(floor_list[j].floor_title==res.data[i].type_two){
                      floor_list[j].list.push(res.data[i]);
                      flag=false;
                      break;
                  }
              }
              if(flag){
                  floor_list.push({
                      floor_title:res.data[i].type_two,
                      list:[res.data[i]]
                  })
              }
          }
          console.log(floor_list)
          this.floor_list=floor_list;
        })
      }
    }
}
</script>

<style scoped>
.con{
    color:pink;
    background:cyan !important;
}
.floor{
    margin-top: 8px;
    /* background: #dedeed; */
}
h2{
    background: #fff;
    padding: 8px 0;
    text-align: center;
}
.nav{
    position: fixed;
    top: 200px;
    left: 20px;
    width: 80px;
}
.nav li{
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #fff;
    cursor: pointer;
    padding: 0;
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
