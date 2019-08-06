# 7.19

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
# 迷惑点
## 路由与axios
>容易把他俩的params搞错
* 传参通过query时,用this.$route.query接收路由信息,传参通过params时,用this.$route.params接收路由信息
* axios通过get获取数据时,传参通过params