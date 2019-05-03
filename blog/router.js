var express = require('express')
var User = require('./models/user')
var md5 = require('blueimp-md5')

var router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html',{
    // 使用swssion数据
    user:req.session.user
  })
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res, next) => {
  // 1.获取表单提交的数据
  // 2.查询数据库用户名密码是否正确
  // 3. 发送响应
  let body = req.body
  User.findOne({
    $or: [
      {
        email: body.email
      },
      {
        nickname: body.nickname
      }
    ]
  },function(err,data){
    if(err){
      return next(err)
    }

    // 如果邮箱和密码匹配
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    // 对密码进行md5重复加密
    body.password = md5(md5(body.password))

    new User(body).save(function (err,user) {
      if(err){
        return next(err)
      }

      //注册成功，使用session记录当前用户
      req.session.user = user

      res.status(200).json({
        err_code: 0,
        message: 'OK'
      })
    })
  })
})

router.get('/login', (req, res) => {
  res.render('login.html')
})

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

    // 如果邮箱和密码不匹配
    if (!user) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    //邮箱和密码匹配，登录成功，使用session记录当前用户
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: 'OK'
    })
  })
})

router.get('/logout', (req, res) => {
  // 退出
  // 1. 清除session数据
  // 2. 重定向到登录页面
  req.session.user = null
  res.redirect('/login')
})
// router.post('/register', async function (req, res) {
//   var body = req.body
//   try {
//     if (await User.findOne({ email: body.email })) {
//       return res.status(200).json({
//         err_code: 1,
//         message: '邮箱已存在'
//       })
//     }

//     if (await User.findOne({ nickname: body.nickname })) {
//       return res.status(200).json({
//         err_code: 2,
//         message: '昵称已存在'
//       })
//     }

//     // 对密码进行 md5 重复加密
//     body.password = md5(md5(body.password))

//     // 创建用户，执行注册
//     await new User(body).save()

//     res.status(200).json({
//       err_code: 0,
//       message: 'OK'
//     })
//   } catch (err) {
//     res.status(500).json({
//       err_code: 500,
//       message: err.message
//     })
//   }
// })

module.exports = router