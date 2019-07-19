<template>
  <div>
    <div class="toTop" @click="toTop" v-show="flag">
      返回<br>顶部
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        flag:true
    }
  },
  mounted(){
    this.checkScroll();
    window.addEventListener("scroll",()=>{
        this.checkScroll();
    })
  },
  methods:{
    toTop(){
        document.body.scrollTop=0;
        document.documentElement.scrollTop=0;
    },
    // 根据滚动条位置确定是否显示按钮
    checkScroll(){
        // 检测scrollTop是否达到500px;
        var st=document.body.scrollTop||document.documentElement.scrollTop;

        this.flag=st>500;

        // if(st>500){
        //     this.flag=true;
        // }else{
        //     this.flag=false
        // }

    }
  }
}
</script>

<style scoped>
.toTop{
    position: fixed;
    bottom:50px;
    right:50px;
    background: white;
    padding:5px 10px;
    color:#666;
    font-size:14px;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
    transition: .5s
}
.toTop:hover{
    background: rgb(104,51,165);
    color:white
}
</style>
