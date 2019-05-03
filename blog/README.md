# npm init -y
# npm i express mongoose 
#  npm i art-template express-art-template
```javaScript
let express = require('express')
let path = require('path')

let app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))

app.engine('html',require('express-art-template'))

app.get('/',(req,res) => {
  res.send('hello')
})

app.listen(5000,(req,res) => {
  console.log('running...')
})
```
# npm install --save body-parser
# npm i jquery bootstrap
# npm i blueimp-md5
```
var md5 = require('blueimp-md5')
// 对密码进行md5重复加密
body.password = md5(md5(body.password))
```
# express--session
* 安装：`npm i express-session`
```javaScript
// app.js
app.use(session({
  secret: 'keyboard cat', // 配置加密字符串，会在原有加密基础上和这个字符串拼起来去加密
  resave: false,
  saveUninitialized: true // 无论是否使用session，都会给你一把钥匙
}))
// router.js
//注册成功，使用session记录当前用户
req.session.user = user
router.get('/', (req, res) => {
  res.render('index.html',{
    user:req.session.user
  })
})
```
```html
<ul class="nav navbar-nav navbar-right">
  <!-- 如果有user展示 -->
  {{ if user }}
  <a class="btn btn-default navbar-btn" href="/topics/new">发起</a>
  <li class="dropdown">
    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><img width="20" height="20" src="../public/img/avatar-max-img.png" alt=""> <span class="caret"></span></a>
    <ul class="dropdown-menu">
      <li class="dropdown-current-user">
        当前登录用户: {{ user.nickname }}
      </li>
      <li role="separator" class="divider"></li>
      <li><a href="#">个人主页</a></li>
      <li><a href="/settings/profile">设置</a></li>
      <li><a href="/logout">退出</a></li>
    </ul>
  </li>
  <!-- 没有user时 -->
  {{ else }}
  <a class="btn btn-primary navbar-btn" href="/login">登录</a>
  <a class="btn btn-success navbar-btn" href="/register">注册</a>
  {{ /if }}
</ul>
```
# 关于表单提交-ajax
```html
<input type="email" class="form-control" id="" name="email" placeholder="Email" autofocus>
<input type="password" class="form-control" id="" name="password" placeholder="Password">
<button type="submit" class="btn btn-success btn-block">登录</button>
```
```javaScript
<script>
$('#login_form').on('submit', function (e) {
  e.preventDefault()
  var formData = $(this).serialize() // 获取表单中定义name的东西的值
  console.log(formData)
  $.ajax({
    url: '/login',
    type: 'post',
    data: formData,
    dataType: 'json',
    success: function (data) {
      var err_code = data.err_code
      if (err_code === 0) {
        // window.alert('注册成功！')
        // 服务端重定向针对异步请求无效
        window.location.href = '/'
      } else if (err_code === 1) {
        window.alert('邮箱或者密码错误')
      } else if (err_code === 500) {
        window.alert('服务器忙，请稍后重试！')
      }
    }
  })
})
</script>
```
# express中间件
```javaScript
router.post('/login', (req, res, next) => {
  // 1.获取表单提交的数据
  // 2.查询数据库用户名密码是否存在
  // 3. 发送响应
  let body = req.body // 获取登录表单提交的信息
  User.findOne({
    email: body.email,
    password: md5(md5(body.password))
  },function(err,user){
    if(err){
      // 当调用next的时候，如果传递了参数，则直接往后找到带有四个参数的应用程序级别中间件
      // 当发生错误的时候，我们可以调用next传递错误对象
      // 然后就会被全局错误处理中间件匹配到并处理
      return next(err)
    }
// app.js
// 配置一个全局错误处理
app.use(function(err,req,res,next){
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})
```

## 1. 目录结构
```
app.js              项目的入口文件
controllers
models              存储使用mongoose设计的数据模型
node_modules        第三方包
package.json        包文件描述
package-lock.json   第三方包版本锁定文件
public              公共静态资源
README.md           项目说明文档
routes              如果业务比较多，代码量大，将路由业务分类存储到routes中
router.js           把所有的路由都放到该文件
views               存储视图目录
```
## 2. 模版页
* art-template子模版
* art-template继承模版
## 3. 路由设计
| 路径 | 方法 | get参数 | post参数 | 是否需要登录权限 | 备注 |
| ------ | ------ | ------ | ------ | ------ | ------ |
| / | get |  |  | 否 | 渲染首页 |
| /register | get |  |  | 否 | 渲染注册页面 |
| /register | post |  | email、nickname、password | 否 | 处理注册请求 |
| /login | get |  | | 否 | 渲染登录页面 |
| /login | post |  | email、password | 否 | 处理登录请求 |
| /logout | get |  | | 否 | 处理退出请求 |
>初始化路由页面：router.js
```javaScript
var express = require('express')

var router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

module.exports = router
```
>app.js引入router.js文件
```javaScript
let router = require('./router')
// 把路由挂载到app上
app.use(router)
```
## 4. 模型设计
## 5. 功能实现