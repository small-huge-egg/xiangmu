var mongoose = require('mongoose')
var Schema = mongoose.Schema

var productSchema = new Schema({
  "productId":String,
  "productName":String,
  "salePrice":Number,
  "checked":String,
  "productNum":Number,
  "productImage":String
})

// 将文档结构发布为模型
// mongoose.model 方法就是用来将一个架构发布为 model
//    第一个参数：传入一个大写名词单数字符串用来表示你的数据库名称
//                 mongoose 会自动将大写名词的字符串生成 小写复数 的集合名称
//                 例如这里的 User 最终会变为 users 集合名称
//    第二个参数：架构 Schema
//
//    返回值：模型构造函数
module.exports = mongoose.model('Good',productSchema)