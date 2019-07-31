<template>
  <div class="reg">
    <h2>登陆</h2>
    <div>
      <input type="text" placeholder="请输入用户名" ref="userName"
       v-model="userName" @blur="checkUser" @input="userInput"/>
       <br>
      <span class="err">{{userErr}}</span>
    </div>
    <div>
      <input type="password" placeholder="请输入密码" 
      @blur="checkPwd" v-model="password" @input="pwdInput"/>
      <br>
      <span class="err">{{pwdErr}}</span>
    </div>
    <div class="reme">
      <input type="checkbox" v-model="remeberPwd" id="remeberPwd">
      <span id='sp'>记住密码</span> 
    </div>
    <button @click="reg">登陆</button>
  </div>
</template>
<script>
export default {
  data(){
    return {
      userName: "", // 不能为空,长度,敏感字符
      password: "",
      userErr: "",
      pwdErr: "",
      userSt:null,
      pwdSt: null,
      remeberPwd: false // 存在该用户
    }
  },
  created(){
    let cookies = document.cookie
    console.log(cookies)
    if(document.cookie){
      // document.cookie.split("userName=")[1].split(";")[0]
      // document.cookie.split("userName=")[1].split(";")[1].split("userPwd=")[1]
      this.userName = document.cookie.split("userName=")[1].split(";")[0]
      this.password = document.cookie.split("userName=")[1].split(";")[1].split("userPwd=")[1]
    }else{
      console.log("123")
    }
  },
  methods:{
    userInput(){
      clearTimeout(this.userSt)
      this.userSt = setTimeout(()=>{
        this.checkUser();
      },100)
    },
    checkUser(){
      if(this.userName==""){
        this.userErr="用户名不能为空"
        return false
      }
      if(!(/^.{6,12}$/.test(this.userName))){
        this.userErr="长度必须为6-12位"
        return false
      }
      if(/[$%\s#*@]/.test(this.userName)){
        this.userErr="不能包含非法字符"
        return false
      }
      this.userErr=''
      return true
    },
    pwdInput(){
      clearTimeout(this.pwdSt)
      this.pwdSt = setTimeout(()=>{
        this.checkPwd();
      },100)
    },
    checkPwd(){
      if(this.password==""){
        this.pwdErr= "密码不能为空"
        return false
      }
      if(!(/^.{6,12}$/.test(this.password))){
        this.pwdErr = "密码长度6-12位"
        return false
      }
      if(!(/^[A-z0-9_]{6,12}$/.test(this.password))){
        this.pwdErr = "包含数字.字母.下划线"
        return false
      }
      this.pwdErr=""
      return true
    },
    reg() { // 登陆
      let flag = this.checkUser()&&this.checkPwd()

      if(flag){
        this.$axios.get("/api/login",{params:{
          userName:this.userName,
          password:this.password
        }}).then(res=>{
          console.log(res.data)
          
          if(this.remeberPwd){ //如果点击了记住密码
            // sessionStorage.setItem("user",JSON.stringify({
            //   token:res.data.token,
            //   userName:res.data.userName,
            //   user
            // }))
            
          }
          if(res.data.code){ //1 成功
            this.loginok = true
            if(this.remeberPwd){
              let remeberUserPwd = this.password
            }
            this.$alert("登陆成功,走起",true)

            // 存入vuex
            this.$store.commit('setToken',{
              token: res.data.token,
              userName: res.data.userName
            })

            // 存入本地存储
            sessionStorage.setItem("userInfo",JSON.stringify({
              token:res.data.token,
              userName:res.data.userName,
            }))
            let d = new Date();
            d.setTime(d.getTime()+7*1000*60*60*24);
            var t=d.toGMTString();
            document.cookie="userName="+res.data.userName;";expires="+t;
            document.cookie="userPwd="+this.password;";expires="+t;
            console.log(document.cookie)
            // 跳转页面
            setTimeout(()=>{
              this.$router.replace(this.$route.query.url||"/")
            },2000) 
          }else{
            this.$alert("用户名或密码错误,请重新填写",true)
            this.$refs.userName.focus()
            this.userName=""
            this.password=""
          }
        })
        // this.userName=""
        // this.password=""
      }
    },
    remeber(){ // 记住密码
      if(this.loginok){

      }else{
        this.$alert("失败")
      }
    }
  },
  beforeRouteEnter(to,from,next){
    next(vm=>{
      vm.$hideLoading()
    })
  }
}
</script>
<style scoped>
  .reg {
    width: 400px;
    height: 500px;
    border-radius: 8px;
    margin: 50px auto;
    box-shadow: 2px 2px 20px #666;
    background: #fff;
    padding: 50px 20px
  }
  h2{
    text-align: center;
    line-height: 120px;
  }
  .reg>div {
    /* padding: 10px 0; */
    height: 80px;
    text-align: center;
  }
  input{
    width: 300px;
    height: 45px;
    text-indent: 1em;
    outline: 0;
    border:1px solid #999;
    border-radius: 4px;
  }
  .err{
    color: red;
    float:left;
    margin: 0 49px;
    font-size: 14px;
  }
  input:focus{
    border-color:rgb(104,65,165);
  }
  button {
    width: 200px;
    height: 40px;
    background: #dedede;
    outline: 0;
    border: 1px solid #888;
    display: block;
    margin: 20px auto;
    border-radius: 10px;
  }
  button:hover{
    background: rgb(104,65,165);
  }
  .reg>.reme{
    height: 20px;
  }
  .reme #sp{
    height: 30px;
    margin: auto;
    position:relative;
    bottom: 6px;
  }
  #remeberPwd {
    width: 15px;
    height: 20px;
    margin: auto;
  }
</style>
