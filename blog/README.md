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
## 1. 目录结构
```
app.js
controllers
models
node_modules        第三方包
package.json        包文件描述
package-lock.json   第三方包版本锁定文件
public              公共静态资源
README.md           项目说明文档
routes
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
| /login | get |  | | 否 | 处理退出请求 |
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