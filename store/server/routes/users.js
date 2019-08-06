var express = require('express');
var router = express.Router();
require('./../util/util')

var User = require('./../models/user')

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource djkjsljl');
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
      }else{ // 没有查到该用户
        res.json({
          status: "1",
          msg: '用户名或密码错误',
          result:''
        })
      }
    }
  })
})

// 登陆退出接口
router.post('/logout', (req, res, next) => {
  res.cookie("userId","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
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


// 查询当前用户的购物车数据
router.get('/cartList',(req, res, next) =>{
  let userId = req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({ 
          status: '0',
          msg: '',
          result: doc.cartList
        })
      }
      
    }
  })
})

// 删除购物车中某件商品
router.post('/cartDel', (req, res, next) => {
  // 获取商品id和用户id
  let userId = req.cookies.userId;
  let productId = req.body.productId; // 客户端返回的productId
  User.update({userId:userId},{
    $pull:{
      'cartList': {
        'productId': productId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({ 
          status: '0',
          msg: '',
          result: 'suc'
        })
      }
    }
  })
})

// 编辑购物车数量接口
router.post('/cartEdit', (req, res, next) => {
  // 获取商品id和用户id
  let userId = req.cookies.userId;
  let productId = req.body.productId; // 客户端传来的productId
  let productNum = req.body.productNum; // 客户端传来的productNum
  let checked = req.body.checked
  User.update({"userId":userId,"cartList.productId":productId},{
    "cartList.$.productNum":productNum, // 更改cartList下的productNum
    "cartList.$.checked":checked
  },(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      // if(doc){
        res.json({ 
          status: '0',
          msg: '',
          result: 'suc'
        })
      // }
    }
  })
})


// 商品选中
router.post("/editCheckAll",(req, res, next) => {
  let userId = req.cookies.userId;
  let checkAll = req.body.checkAll?'1':'0'
  User.findOne({userId:userId}, (err,doc) => { // 不用update因为这里要遍历更改所有商品
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        doc.cartList.forEach(item => { // 更改购物车所有商品选中状态
          item.checked = checkAll
        });
        // 保存更改
        doc.save((err1,doc1) => {
          if(err1){
            res.json({ 
              status: '1',
              msg: err.message,
              result: ''
            })
          } else{
            res.json({ 
              status: '0',
              msg: '',
              result: 'suc'
            })
          }
        })
      }
    }
  })
})

// 查询用户地址接口
router.get('/addressList',(req, res, next) =>{
  let userId = req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc){
        res.json({ 
          status: '0',
          msg: '',
          result: doc.addressList
        })
      }
      
    }
  })
})

// 设置默认地址接口
router.post("/setDefault",(req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  if(!addressId){
    res.json({
      status:'1003',
      msg:'addressId is null'
    })
  }else{
    User.findOne({userId:userId}, (err,doc)=>{
      if(err){
        res.json({ 
          status: '1',
          msg: err.message,
          result: ''
        })
      }else{
        let addressList = doc.addressList;
        addressList.forEach(item=>{ // 循环遍历地址列表数组
          if(item.addressId==addressId){ 
            item.isDefault = true // 设置为默认地址
          }else{ //其他项地址置为false
            item.isDefault = false
          }
        })
        // 保存更改
        doc.save((err1,doc1)=>{
          if(err){
            res.json({ 
              status: '1',
              msg: err.message,
              result: ''
            })
          }else{
            res.json({ 
              status: '0',
              msg: '',
              result: ''
            })
          }
        })
      }
    })
  }
})

// 删除地址接口
router.post('/delAddress', (req, res, next) => {
  // 获取商品id和用户id
  let userId = req.cookies.userId;
  let addressId = req.body.addressId; // 客户端返回的addressId
  User.update({userId:userId},{
    $pull:{
      'addressList': {
        'addressId': addressId
      }
    }
  },(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      res.json({ 
        status: '0',
        msg: '',
        result: 'suc del'
      })
    }
  })
})


// 去付款
router.post("/payMent",(req, res, next) => {
  let userId = req.cookies.userId;
  let addressId = req.body.addressId;
  let orderTotal = req.body.orderTotal;
  User.findOne({userId:userId}, (err,doc) => {
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      if(doc) {
        console.log("dsj")
        let address = '';
        let goodsList = []
        // 获取当前用户的地址信息
        doc.addressList.forEach(item=>{
          if(addressId == item.addressId){ // 保存地址信息
            address = item
          }
        })
        // 获取用户购物车信息
        doc.cartList.forEach(item=>{
          if(item.checked==1){ // 保存地址信息
            goodsList.push(item)
          }
        })
        let platform = '622';
        let r1 = Math.floor(Math.random()*10);
        let r2 = Math.floor(Math.random()*10);
        let sysDate = new Date().Format('yyyyMMddhhmmss');
        let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
        let orderId = platform+r1+sysDate+r2;
        // 创建订单
        let order = {
          orderId:orderId,// 订单id
          orderTotal:orderTotal, // 订单总价
          addressInfo:address, // 地址信息
          goodsList:goodsList,// 商品列表
          orderStatus:'1',// 订单状态
          createDate:createDate // 订单生成日期
        }
        doc.orderList.push(order)
        // 保存订单信息到数据库
        doc.save((err1,doc1) => {
          if(err1){
            res.json({ 
              status: '1',
              msg: err.message,
              result: ''
            })
          }else{
            res.json({ 
              status: '0',
              msg: '',
              result: {
                orderId:order.orderId,
                orderTotal:order.orderTotal
              }
            })
          } 
        })
      }
    }
  })
})

//根据订单id查询订单信息
router.get("/orderDetail",(req,res,next) => {
  // 获取用户id
  let userId = req.cookies.userId;
  // 接受客户端传来的信息
  let orderId = req.query.orderId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({ 
        status: '1',
        msg: err.message,
        result: ''
      })
    }else{
      let orderList = doc.orderList
      if(orderList.length>0){ // 如果有订单（一般都有不然进不到这个页面）
        let orderTotal = 0;
        orderList.forEach(item=>{// 找到数据库中orderId=前段传来的id的那个订单列表
          if(item.orderId==orderId){ 
            orderTotal = item.orderTotal
          }
        });
        if(orderTotal>0){ //如果金额>0,就当订单存在
          res.json({ 
            status: '0',
            msg: "",
            result: {
              orderTotal:orderTotal,
              orderId:orderId
            }
          })
        }else{ // 如果金额<=0,就当订单不存在
          res.json({ 
            status: '120002',
            msg: "无此订单",
            result: ''
          })
        }
      }else{
        res.json({ 
          status: '120001',
          msg: "当前用户未创建订单",
          result: ''
        })
      }
    }
  })
}) 

// 查询购物车商品数量
router.get("/getCartCount",(req,res,next) => {
  // 获取用户id
  let userId = req.cookies.userId;
  User.findOne({userId:userId},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    }else{
      let cartList = doc.cartList
      let cartCount = 0
      cartList.map(item=>{
          cartCount += parseInt(item.productNum);
      })
      res.json({
        status:'0',
        msg:'',
        result:cartCount
      })
    }
  })
})

module.exports = router;
