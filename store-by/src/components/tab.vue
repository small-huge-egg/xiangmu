<template>
    <div class="tab">
        <!-- 正常图 -->
        <img :src="imgs[num]" alt="" class="big_img" @mousemove="enter" @mouseleave="leave">
        <!-- 小图 -->
        <div class="tab_btn">
            <img :class="{con:index==num}" v-for="(s,index) in imgs" :key="s.Id" :src="s" @click="num=index" alt="" id="img">
        </div>
        <!-- 放大镜图 -->
        <div class="bigimgs" id="dsa">
            <img :src="imgs[num]" alt="" id="bigimg">
        </div>
    </div>
</template>
<script>
export default {
    props:["imgs"],
    data(){
        return{
            num:0
        }
    },
    methods:{
      enter(){
        // 小图
        var aimg = document.getElementById("img");
        // 放大镜图
        var bigimg = document.getElementById("bigimg");
        // 放大镜框
        var dsa = document.getElementById("dsa");
        dsa.style.display="block"
        var x = event.offsetX;
        var y = event.offsetY;
        if(x>374){
            x=374
        }
        if(x<125){
            x=125
        }
        if(y<124){
            y=124
        }
        if(y>374){
            y=374
        }
        bigimg.style.left = -x*2+250+"px"
        bigimg.style.top = -y*2+250+"px"
      },
      leave(){
        var dsa = document.getElementById("dsa");
        dsa.style.display="none"
      }
    }
}
</script>
<style scoped>
.bigimgs{
  display: none;
  width: 500px;
  height:500px;
  border: 1px solid #ccc;
  position: relative;
  left: 503px;
  top: -600px;
  overflow: hidden;
  box-shadow: 5px 5px 5px 5px #ccc;
}
#bigimg{
   width:200%;
    position: absolute;
    left: 0;
    top: 0;
   
}
.tab{
    width: 500px;
    position: relative;
}
    
.tab_btn img{
  width: 100px;
  box-sizing:border-box;
  border:2px solid #CCC;
}
.tab_btn .con{
  border:2px solid rgb(95, 58, 143)
}
/* 正常图 */
.big_img{
  width: 500px;
  border: 1px solid #CCC;
}
</style>