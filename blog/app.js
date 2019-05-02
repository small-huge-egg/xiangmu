let express = require('express')
let path = require('path')
let router = require('./router')
let bodyParser = require('body-parser')

let app = express()

app.use('/public/',express.static(path.join(__dirname,'./public/')))
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false })) 


// 把路由挂载到app上
app.use(router)

app.engine('html',require('express-art-template'))
app.set('views',path.join(__dirname,'./views/')) // 默认就是views目录

app.get('/', (req,res) => {
  res.render('index.html',{
    text:'张苏纳'
  })
})


app.listen(5000,(req,res) => {
  console.log('running...')
})