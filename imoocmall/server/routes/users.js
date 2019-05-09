var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', (req, res, next) => {
  res.send('test');
});

// 登录接口
router.post('/login', (req, res, next) => { 
  //接收客户端传来的密码，账号
  let param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  User.findOne(param, (err,doc) => {
    if(err) { // 如果出错
      res.json({
        status: "1",
        msg: err.message
      })
    } else { // 已经没错
      if(doc){ // 拿到用户数据
        // 将用户id保存在cookie中
        res.cookie("userId",doc.userId,{
          path:'/',
          maxAge:1000*60*60 // 保存时间
        })
        // 将用户名保存在cookie中
        res.cookie("userName",doc.userName,{
          path:'/',
          maxAge:1000*60*60 // 保存时间
        })
        res.json({
          status: "0",
          msg: '',
          result:{ //把用户名返回给客户端
            userName: doc.userName 
          }
        })
      }
    }
  })
})

// 登陆退出接口
router.post('/logout', (req, res, next) => {
  res.cookie("userId","",{
    path:'/',
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
})

// 使cookie数据在刷新之后仍然存在
router.get('/checkLogin', (req, res, next) => {
  if(req.cookies.userId){ // 如果有cookie记录
    res.json({ 
      status:'0',
      msg:'',
      result: req.cookies.userName || '' // 把用户名传给'/'页面
    })
  } else { // 如果没有cookie记录
    res.json({ 
      status:'1',
      msg:'未登录',
      result: ''
    })
  }
})


