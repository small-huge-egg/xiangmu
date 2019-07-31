<template>
  <div class="detail">
    <!-- 商品详情页 -->
  <div class="content clearfix">
    <!-- tab组件 -->
    <tab style="float:left" :imgs="JSON.parse(item.imgs)"></tab>
    <!-- 商品价格等信息 -->
    <div class="msg">
      <h2>{{item.title}}</h2>
      <p class="address">{{item.supplier}}</p>
      <p class="price">￥{{item.price}}</p>
      <div class="buy" @click="add(item)">添加到购物车</div>
    </div>
  </div>
  </div>
</template>
<script>
import $axios from '../assets/js/axios.js'
import Tab from '../components/tab'
export default {
  data() {
    return {
      item:{
        imgs:"[]",
        shoplist:[],
        flag: true
      },
      // num:0
    }
  },
  created(){
    console.log(this.$route.query)
  },
  methods:{
    add(item) {
      var obj = {
        token: this.$store.state.token,
        goodId: this.item.Id,
        count: 1
      };
      //进入if的条件   判断有没有登录
      if (this.$store.state.token) {
        var shoplist = $axios.get("/api/shoplist", {
          params: { token: this.$store.state.token }
        });
        var p = Promise.all([shoplist]);
        self = this;
        var list2;
        (async function() {
          var res = await p;
          list2 = res[0].data;
          var flag = true;
          list2.forEach(function(item2) {
            if (item2.Id == item.Id) {
              flag = false;
              self.$alert("不能重复添加商品",true)
              return false;
            }
          }, self);
          if (flag) {
            $axios.get("/api/add", { params: obj }).then(res => {
              self.$hideLoading();
              if (res.data.code == 0 || res.data.code == 2) {
                self.$alert("添加失败，请先登录", true);
                setTimeout(() => {
                  self.$router.push("/login");
                }, 1000);
              } else {
                self.$alert("添加成功", true);
                self.$hideLoading();
              }
            });
          }
        })();
      }
		}
  },
  beforeRouteEnter(to, from, next) {
    let detail = $axios.get('/api/detail', {params:{goodId:to.query.goodId}})
    let p = Promise.all([detail])
    ;(async function(){
      let res = await p
      next((vm)=>{
        vm.item = res[0].data[0]
        vm.$hideLoading()
        console.log(vm.item)
      })
    }())
  },
  components: {Tab}
}
</script>
<style scoped>
    .buy{
        width:200px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: red;
        color:white;
        border-radius: 25px;
        margin-top:50px;
    }
    .detail{
        background: white;
        min-height: 800px;
        overflow: hidden;
        margin-top:10px
    }
    .content{
        width: 1100px;
        margin:100px auto;
       
    }
    .content .msg{
      float:left;
            margin-top:20px;
            padding:50px;
    }
    .content .msg p{
      margin-top:8px
    }
    .content .msg h2{
                color:#444
            }
            .content .msg .address{
                color:rgb(104,65,165)
            }
            .content .msg .price{
                font-size:30px;
                font-weight: bolder;
                color:red
            }
</style>

