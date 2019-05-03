let express = require('express')
let path = require('path')
let router = require('./router')
let bodyParser = require('body-parser')
let session = require('express-session')

let app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 

// 在 Express 这个框架中，默认不支持 Session 和 Cookie
// 但是我们可以使用第三方中间件：express-session 来解决
// 1. npm install express-session
// 2. 配置 (一定要在 app.use(router) 之前)
// 3. 使用
//    当把这个插件配置好之后，我们就可以通过 req.session 来发访问和设置 Session 成员了
//    添加 Session 数据：req.session.foo = 'bar'
//    访问 Session 数据：req.session.foo
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))


// 把路由挂载到app上
app.use(router)


// 配置一个处理404的中间件
app.use((req,res) => {
  res.render('404.html')
})

// 配置一个全局错误处理
app.use(function(err,req,res,next){
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/')) // 默认就是views目录


app.listen(5000,(req,res) => {
  console.log('running...')
})