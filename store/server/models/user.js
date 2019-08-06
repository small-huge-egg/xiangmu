var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  "userId":String,
  "userName":String,
  "userPwd":String,
  "orderList":Array,
  "cartList": [ // 购物车信息
    {
      "productId":String,
      "productName":String,
      "salePrice":Number,
      "productImage": String,
      "checked":String,
      "productNum":String
    }
  ],
  "addressList":[ // 地址信息
    {
      "addressId": String,
      "userName": String,
      "streeName": String,
      "postCode": Number,
      "tel": Number,
      "isDefault": Boolean
    } 
  ]
});

module.exports = mongoose.model("User",userSchema)