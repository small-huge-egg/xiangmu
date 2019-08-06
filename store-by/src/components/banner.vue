<template>
    <div class="view" @mouseenter="enter" @mouseleave="leave">
        <div class="btns">
          <div v-for="(x,index) in list" :key=index
           @click="num=index" :class="{con:index==num}"></div>
        </div>
            <img @transitionend="end" v-for="(x,index) in list" :key=index 
            :style="{opacity:index==num?1:0}" :src="'../../static/'+x+'.jpg'">
        <button @click="prev" id="prev"><</button>
        <button @click="next" id="next">></button>
        </div>   
</template>

 
<script>
export default {
  data() {
    return{
      num:0,
      list:["1","2","3","4"],
      flag:true,
      timer:null 
    }     
  },
  created:function() {
    //this指向根实例
    this.timer=setInterval(this.next,500)
  },
  methods:{
    next:function() {
      if(this.flag){
        this.flag=false;
        this.num++;
        if(this.num>this.list.length-1){
          this.num=0;
        }
      }      
    },
    prev:function() {
      console.log("123");

      if(this.flag){
        this.flag=false;
        this.num--;
        this.num=this.num<0?this.list.length-1:this.num
      }
    },
    // 过渡结束
    end:function() {
      this.flag=true;
    },
    enter:function() {
        clearInterval(this.timer)
    },
    leave:function() {
      this.timer=setInterval(this.next.bind(this),500)
    }
  }
}
</script>


<style>
/* .banner{
    width: 1200px;
    background: pink;
    height: 500px;
    margin: 10px auto;
    line-height: 500px;
    text-align: center;
    font-size: 20px
} */
.view{
    width: 1100px;
    height: 500px;
    position: relative;
    padding: 0 50px 0 50px;
    margin: 10px auto;
}
.view img{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.5s
}
.btns{
    position: absolute;
    left: 50%;
    transform:translateX(-50%);
    bottom: 10px;
    z-index:1;
}
.btns div{
    display: inline-block;
    width: 40px;
    height: 8px;
    background-color: rgba(51,51,51,0.15);
    border-radius: 8px;
    border:none;
    text-align: center;
    margin: 2px;
    opacity: 0.6;
    cursor: pointer;
}
.btns .con{
    background-color: #666;
}
.view button{
    position: absolute;
    opacity: 0.8;
    top: calc(50% - 25px);
}
#prev{
    left: 0;
    bottom: 250px;
    cursor: pointer;
    width: 28px;
    height: 70px;
    background: rgba(104,110,119,0.34);
}
#next{
    right: 0;
    bottom:250px;
    cursor: pointer;
    width: 28px;
    height: 70px;
    background: rgba(104,110,119,0.34);
}
</style>
