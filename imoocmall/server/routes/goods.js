var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../models/goods')

// 连接mongooDB数据库
// mongoose.connect('mongodb://127.0.0.1:27017')
mongoose.connect('mongodb://localhost:27017/mocall', {useNewUrlParser: true});


mongoose.connection.on("connected", function () {
  console.log("mongooDB connected ok")
})

mongoose.connection.on("error", function () {
  console.log("mongooDB connected fail")
})

mongoose.connection.on("disconnected", function () {
  console.log("mongooDB connected disconnected")
})

// 查询商品列表数据
router.get("/list", function (req,res,next) {
  // 排序价格并设置分页
  // 接收前端请求的page,pageSize,sort
  let page = parseInt(req.query.page);
  let pageSize = parseInt(req.query.pageSize);
  let sort = parseInt(req.query.sort);
  let skip = (page-1)*pageSize;
  var priceLevel = req.query.priceLevel;
  let priceGt = '',priceLte='';
  let params = {};
  if(priceLevel!='all'){ // 如果设置了价格区间
    switch (priceLevel) {
      case '0':priceGt = 0;priceLte = 100;break;
      case '1':priceGt = 100;priceLte = 500;break;
      case '2':priceGt = 500;priceLte = 1000;break;
      case '3':priceGt = 1000;priceLte = 5000;break;
    }
    params = {
      salePrice:{
        $gt:priceGt,
        $lte:priceLte
      }
    }
  }else{ // 如果没有设置价格区间
    params={}
  }
  let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
  goodsModel.sort({'salePrice':sort});
  goodsModel.exec(function (err,doc) { // 立即执行查询
    if (err) {
      res.json({
        status:'1',
        msg:err.message
      })
    } else {
      res.json({
        status: '0',
        msg: '',
        result: {
          count: doc.length, // 当前页的data数量
          list: doc
        }
      })
    }
  })
})


// 加入到购物车
router.post("/addCart", (req,res,next) =>{ // 向服务器提交数据
  // 假设已经登陆,登录用户的id如下
  let userId = req.cookies.userId;
  // 获取user模型
  // 获取客户端传来的productId
  let productId = req.body.productId;
  let User = require('../models/user');
  // 获取用户信息并且给该用户插数据
  User.findOne({
    userId: userId
  },(err,userdoc) => {
    if(err) { // 如果出错
      res.json({
        status: "1",
        msg: err.message
      })
    } else { // 已经没错
      if(userdoc){ // 拿到用户数据
        // 判断用户购物车是否已经有该商品
        let goodsItem = '';
        userdoc.cartList.forEach((item) => {
          if(item.productId == productId){
            goodsItem = item;
            item.productNum++
          }
        })
        if(goodsItem){  // 如果有该商品了，直接保存
          userdoc.save((err2,doc2) => {
            if(err2) { // 如果保存失败
              res.json({
                status: "1",
                msg:err2.message
              })
            } else { // 保存成功
              res.json({
                status: "0",
                msg:'',
                result: 'suc'
              })
            }
          })
        }else{ // 没有该商品，插入goods数据
          Goods.findOne({productId:productId},(err1,doc) => { // 展示商品数据
          if(err1) { // 如果出错
            res.json({
              status: "1",
              msg:err1.message
            })
          } else { // 如果没错
            if(doc) { // 如果成功找到数据
              doc.productNum = 1;
              doc.checked = 1;

              userdoc.cartList.push(doc) // 加入购物车，将新数据添加到用户名下
              // console.log("4546ddssffdfaddffff5"+userId)
              userdoc.save((err2,doc2) => {
                if(err2) { // 如果保存失败
                  res.json({
                    status: "1",
                    msg:err2.message
                  })
                } else { // 保存成功
                  res.json({
                    status: "0",
                    msg:'',
                    result: 'suc'
                  })
                }
              })
            }
          }
        })
        }
      } 
    }
  })
})



module.exports = router;