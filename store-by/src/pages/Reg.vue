<template>
<div class="regR">
  <div class="reg">
    <h2>注册</h2>
    <div>
      <input type="text" placeholder="请输入用户名"
       v-model="userName" @blur="checkUser" @input="userInput"/>
       <br>
      <span class="err">{{userErr}}</span>
    </div>
    <div>
      <input type="password" placeholder="请输入密码" id="inputValue"
      @blur="checkPwd" v-model="password" @input="pwdInput" auto-complete="off"/>
      <br>
      <span class="err">{{pwdErr}}</span>
    </div>
    <div class='input_span'>
			<label>强度:</label>
			<span id="one" ref="one"></span>
			<span id="two" ref="two"></span>
			<span id="three" ref="three"></span>
		</div>
		<div id="font">
				<span>弱</span>
				<span>中</span>
				<span>强</span>
		</div>
    <button @click="reg">注册</button>
  </div></div>
</template>
<script>
export function checkStrong(sValue) {
		var modes = 0;
		//正则表达式验证符合要求的
		if(sValue.length < 1) return modes;
		if(/\d/.test(sValue)) modes++; //数字
		if(/[a-z]/.test(sValue)) modes++; //小写
		if(/[A-Z]/.test(sValue)) modes++; //大写  
		if(/\W/.test(sValue)) modes++; //特殊字符

		//逻辑处理
		switch(modes) {
			case 1:
				return 1;
				break;
			case 2:
				return 2;
				break;
			case 3:
			case 4:
				return sValue.length < 10 ? 3 : 4
				break;
		}
		return modes;
	}
export default {
  data(){
    return {
      userName: "", // 不能为空,长度,敏感字符
      password: "",
      userErr: "",
      pwdErr: "",
      userSt:null,
      pwdSt: null,
      msgText:'',
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
        this.userErr="长度6-12位"
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
    reg() {
      let flag = this.checkUser()&&this.checkPwd()
      if(flag){
        this.$axios.get("/api/register",{params:{
          userName:this.userName,
          password:this.password
        }}).then(res=>{
          console.log(res.data)
          if(res.data.code){ //1 注册成功
            this.$alert("注册成功,及将为您跳转到登录页面",true)
            setTimeout(()=>{
              this.$router.replace("/login")
            },2000) 
          }else{
            this.$alert("用户名被占用",true)
          }
        })
        this.userName = ''
        this.password = ""
      }
    }
  },
  watch:{
    password(newValue, oldValue) {
				this.msgText = checkStrong(newValue);
				if(this.msgText > 1 || this.msgText == 1) {
					$("#one").css("background", "red");
				} else {
					$("#one").css("background", "#eee");
				}
				if(this.msgText > 2 || this.msgText == 2) {
					$("#two").css("background", "orange");
				} else {
					$("#two").css("background", "#eee");
				}
				if(this.msgText == 4) {
					$("#three").css("background", "#00D1B2");
				} else {
					$("#three").css("background", "#eee");
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
    margin-left: 20px;
    width: 240px;
    height: 45px;
    text-indent: 1em;
    outline: 0;
    border:1px solid #999;
    border-radius: 4px;
  }
  .err{
    color: red;
  }
  .reg .input_span{
    height:20px;
  }
  .reg .input_span label{
    /* margin-left:0; */
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
    margin: -6px auto;
    border-radius: 10px;
  }
  button:hover{
    background: rgb(104,65,165);
  }
  #inputValue{
		width:240px;
		margin-left: 20px;
		padding-left: 10px;
		border-radius: 3px;
	}
	.input_span span {
		display: inline-block;
		width: 85px;
		height: 10px;
		background: #eee;
		line-height: 20px;
	}
	
	#one {
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		border-right: 0px solid;
		margin-left: 20px;
		margin-right: 3px;
	}
	
	#two {
		border-left: 0px solid;
		border-right: 0px solid;
		margin-left: -5px;
		margin-right: 3px;
	}
	
	#three {
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		border-left: 0px solid;
		margin-left: -5px;
	}
	#font span:nth-child(1){
		color:red;
		margin-left: 80px;
	}
	#font span:nth-child(2){
		color:orange;
		margin: 0 60px;
	}
	#font span:nth-child(3){
		color:#00D1B2;
	}
</style>
