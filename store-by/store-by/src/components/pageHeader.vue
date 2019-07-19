<template>
  <div class="header_box">
    <header class="clearfix">
      <img src="../assets/images/logo.png" alt="">
      <div class="search">
        <div class="search_view clearfix">
          <input type="text" placeholder="请输入商品名称">
          <button>搜索</button>
        </div>
        <div class="search_text">
          <router-link to="/">眼霜</router-link>
          <router-link to="/">眼霜</router-link>
          <router-link to="/">眼霜</router-link>
          <router-link to="/">眼霜</router-link>
        </div>
      </div>
    </header>
    <nav>
      <router-link to="/">首页</router-link>
      <a href="###">了解我们</a>
      <a href="###">下载App</a>
      <router-link to="/">个人中心</router-link>
    </nav>
  </div>
</template>
<script>
export default {
  
}
</script>
<style lang="scss" scoped>
nav{
  padding: 10px 0;
  font-size:16px;
  a{
    padding:0 40px;
    &:hover{
        color:rgb(104,56,165)
    }
  }
}
.search_view{
  margin-top:30px;
  input{
      float:left;
      outline:0;
      width:424px;
      height: 38px;
      border:1px solid #dedede;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      text-indent:1em
  }
  button{
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
}
.search_text{
  margin-top:6px;
  a{
    font-size:12px;
    padding:0 2px;
    color:#888;
    &:hover{
        color:orange;
    }
  }
}
.header_box{
  background: white;
  box-shadow: 0 2px 8px #999;
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
