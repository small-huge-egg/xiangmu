<template>
    <div class="header_box">
        <header class="clearfix">
            <img src="/static/logo.png"  alt="" >
            <div class="search">
                <div class="search_view clearfix">
                    <input type="text" placeholder="请输入商品名称" @keyup.enter="toSearch" v-model="val">
                    <button @click="toSearch">搜索</button>
                </div> 
                <div class="search_text">
                    <span>所有分类：</span>
                    <router-link v-for="x in types" :to="{path:'/floor',query:{keyword:x}}" :key="x">{{x}}</router-link>
                </div>
            </div>
        </header> 
        <nav>
          <router-link to="/">首页</router-link>
          <a class=erweima href="###" @mouseenter="enter()" @mouseleave="leave()">了解我们

            <img src="/static/erweima.png" alt="" v-show="flag">
          </a>

          <a href="###">下载APP</a>
          <a @click="car">查看购物车</a>
          <div class="login">
            <div v-if="$store.state.token">
              <p>
                hello{{$store.state.userName}}
                <button @click="logout">退出登录</button>
              </p>
            </div>
            <div v-else>
              <router-link to="/login" class="ok">登陆</router-link>
              <router-link to="/reg" class="ok">注册</router-link>
            </div>
          </div>
        </nav>
    </div>
</template>

<script>
export default {
    data(){
        return{
            val:"",
            types:[],
            flag:false
        }
    },
    created(){
        //获取一级分类标题
       var type=this.$axios("/api/getTypeOne");
       var self=this
        ;(async function(){
            var res=await type;
            self.types=res.data
        })()
    },
    methods:{
        toSearch(){
            var v=this.val.replace(/^\s*|\s*$/g,"");
            if(v==""){
                this.$alert("搜索内容不能为空呀，亲",true);
            }else{
                this.$router.push({path:'/floor',query:{keyword:this.val}});
            }
        },
        logout(){
          this.$store.commit("setToken",{
            token:'',
            userName: ''
          })
          sessionStorage.removeItem("userInfo");
          this.$alert("退出成功",true)
          this.$router.replace("/")
        },
        car(){ //购物车
          var token = this.$store.state.token
          if(token) {
            // this.$showLoading()
            this.$router.push("/car?token="+this.$store.state.token)
          } else {
            this.$alert("请先登录",true)
            this.$router.replace("/login?url="+this.$route.fullPath)
          }
        },
        enter(){
          this.flag=true
        },
        leave(){
          this.flag=false
        }
    }
}
</script>

<style scoped>
    nav{
        padding: 10px 0;
        font-size: 16px;
        position: relative;
    }
    a{
      padding: 0 40px;
    }
    nav a:hover{
      color:cyan;
    }
    .login{
        position: absolute;
        right: 0;
        top: 8px;
    }
    .erweima{
      position: relative;
    }
    .erweima img{
      position: absolute;
      top: 31px;
      left: 15px;
      z-index: 10;
      width: 120px;
      height: 120px;
    }
    .ok {
      padding: 0;
    }
    .search_view{
        margin-top:30px;
    }
      .search_view input{
            float: left;
            outline: 0;
            width: 424px;
            height: 38px;
            border:1px solid #dedede;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            text-indent:1em;
        }
      .search_view button{
            float:left;
            height:40px;
            border:1px solid #dedede;
            background: none;
            width: 40px;
            color:#666;
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
            border-left:none;
            cursor: pointer;
        }
    
    .search_text{
        margin-top:6px;   
    }
    .search_text span{
      font-size: 14px;
      padding-right:5px; 
    }
    .search_text a{
      font-size:12px;
      padding:0 2px;
      color:#888;
    }
    .search_text a:hover{
      color:orange;
    }    
    .header_box{
      background: white;
      box-shadow: 0 2px 8px #999
    }
    header,nav{
      width:1100px;
      margin:0 auto;
    }
    header img{
      float:left;
      width: 260px;
      margin:30px;
    }
    .search{
      float:right;
    }

</style>