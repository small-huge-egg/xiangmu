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
router.get("/", function (req,res,next) {
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
router.post("/goods/addCart", (req,res,next) =>{
  
})

module.exports = router;