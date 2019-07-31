import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",
    userName: "",
    cartCount: 0,
    shoplist:[],
    payList:[]
  },
  mutations: {
    setToken(state,obj) {
      state.token = obj.token
      state.userName = obj.userName
      
    },

    setShopList(state,obj){

      // if(state.shoplist){
      //   state.shoplist.forEach((val)=>{
      //     if(item.Id==val.Id){
      //       this.$alert("不能重复添加",true)
      //     }
      //   })
      // }


      state.shoplist = shoplist
    },
    setPayList(state,payList){




      state.payList = payList
    },
    updateCartCount(state,cartCount){ // 用于更改购物车数量
      state.cartCount += cartCount
    },
    initCartCount(state,cartCount){ // 用于保存购物车数量
      state.cartCount = cartCount
    }
  }
})