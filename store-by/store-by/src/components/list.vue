<template>
  <div>
    <ul class="clearfix">
      <li v-for="(item, index) in list" :key="index">
        <router-link :to="{path:'/detail', query:{goodId:item.id}}">
          <img v-lazy="item.img_list_url" alt="">
          <h4>{{item.title}}</h4>
          <p>
            <span class="price">￥{{item.price}}</span>
            <span v-html="item.mack"></span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    console.log(this)
    this.$showLoading()
    let self = this
    ;(async function() {
      let res = await self.$axios.get('/api/goodList')
      self.list = res.data
      self.$hideLoading()
    }())
  }
}
</script>
<style>
ul{
  width: 1100px;
  margin:0 auto
}
li{
  width:255px;
  margin:10px;
  overflow:hidden;
  float:left;
  background: white;
  transition:all .5s;
  padding:10px;
  box-sizing:border-box;
  border-radius: 8px;
}
li:hover{
  transform: translateY(-5px);
  box-shadow: 2px 0 8px #999;
}
li a{
  display: block;
}
li:hover img{
  transform: scale(1.1);
}
li img{
  width:100%;
  height: 235px;
  transition:all .5s .3s
}
.price{
  color:orangered;
  font-weight: bolder
}
p{
  padding:4px 0;
}
h4{
  color:#666;
  margin-top:8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap
}
span{
  padding:0 5px
}
</style>
