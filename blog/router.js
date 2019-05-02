var express = require('express')
var User = require('./models/user')

var router = express.Router()

router.get('/', (req, res) => {
  res.render('index.html')
})

router.get('/register', (req, res) => {
  res.render('register.html')
})

router.post('/register', (req, res) => {
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
      return res.status(500).json({
        err_code: 500,
        message: err.message
      })
    }

    // 如果邮箱和密码匹配
    if (data) {
      return res.status(200).json({
        err_code: 1,
        message: 'Email or password is invalid.'
      })
    }

    new User(body).save(function (err,user) {
      if(err){
        return res.status(500).json({
          err_code: 500,
          message: '服务端错误'
        })
      }
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

router.post('/login', (req, res) => {
  res.render('login.html')
})

module.exports = router