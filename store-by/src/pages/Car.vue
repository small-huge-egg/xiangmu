<template>
  <div>
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;" version="1.1"
         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <symbol id="icon-add" viewBox="0 0 32 32">
          <title>add2</title>
          <path class="path1"
                d="M15 17h-13.664c-0.554 0-1.002-0.446-1.002-1 0-0.552 0.452-1 1.002-1h13.664v-13.664c0-0.554 0.446-1.002 1-1.002 0.552 0 1 0.452 1 1.002v13.664h13.664c0.554 0 1.002 0.446 1.002 1 0 0.552-0.452 1-1.002 1h-13.664v13.664c0 0.554-0.446 1.002-1 1.002-0.552 0-1-0.452-1-1.002v-13.664z"></path>
        </symbol>
        <symbol id="icon-ok" viewBox="0 0 32 32">
          <title>ok</title>
          <path class="path1"
                d="M31.020 0.438c-0.512-0.363-1.135-0.507-1.757-0.406s-1.166 0.435-1.529 0.937l-17.965 24.679-5.753-5.67c-0.445-0.438-1.035-0.679-1.664-0.679s-1.219 0.241-1.664 0.679c-0.917 0.904-0.917 2.375 0 3.279l7.712 7.6c0.438 0.432 1.045 0.681 1.665 0.681l0.195-0.008c0.688-0.057 1.314-0.406 1.717-0.959l19.582-26.9c0.754-1.038 0.512-2.488-0.538-3.233z"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path class="path1"
                d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path class="path1"
                d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z"></path>
          <path class="path2"
                d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path3"
                d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
          <path class="path4"
                d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z"></path>
        </symbol>
        <symbol id="icon-clock" viewBox="0 0 32 32">
          <title>clock</title>
          <path class="path1" fill="#605f5f"
                d="M16 29c-7.168 0-13-5.831-13-13s5.832-13 13-13c7.168 0 13 5.832 13 13s-5.832 13-13 13zM16 0c-8.822 0-16 7.178-16 16s7.178 16 16 16c8.822 0 16-7.178 16-16s-7.178-16-16-16z"></path>
          <path class="path2" fill="#605f5f"
                d="M23.958 21.837l-6.958-6.489v-6.282c0-0.827-0.673-1.5-1.5-1.5s-1.5 0.673-1.5 1.5v6.934c0 0.414 0.174 0.814 0.477 1.098l7.435 6.934c0.279 0.259 0.642 0.402 1.023 0.402 0.415 0 0.814-0.174 1.096-0.477 0.564-0.605 0.532-1.555-0.073-2.12z"></path>
        </symbol>
      </defs>
    </svg>
    <div class="container clear" >
      <div class="cart clear" >
        <div class="page-title-normal clear">
          <h2 class="page-title-h2"><span>My Cart</span></h2>
        </div>
        <div class="item-list-wrap clear">
          <div class="cart-item clear">
            <div class="cart-item-head clear">
              <ul>
                <li>Items</li>
                <li>Price</li>
                <!-- <li>Quantity</li>
                <li>Subtotal</li> -->
                <li>Edit</li>
              </ul>
            </div>
            <ul class="cart-item-list clear">
              <li v-for="(item,index) in shoplist" :key="index">
                <div class="cart-tab-1 clear">
                  <div class="cart-item-check">
                    <!-- <a href="javascipt:;" class="checkbox-btn item-check-btn" 
                    :class="{'check':item.checked=='1'}"
                     @click="editCart('checked',item)"> -->
                      <input type="checkbox" v-model="payList"  :value="item">
                      <!-- <svg class="icon icon-ok">
                        <use xlink:href="#icon-ok"></use>
                      </svg> -->
                    <!-- </a> -->
                  </div>
                  <div class="cart-item-pic clear">
                    <img :src="item.img_list_url" :alt="item.title">
                  </div>
                  <div class="cart-item-title clear">
                    <div class="item-name">{{item.title}}</div>
                  </div>
                </div>
                <div class="cart-tab-2 clear">
                  <div class="item-price">{{item.price}}</div>
                </div>
                
                <div class="cart-tab-5">
                  <div class="cart-item-opration">
                    <a href="javascript:;" class="item-edit-btn" @click="delCartConfirm(item,item.Id,index)">
                      <svg class="icon icon-del">
                        <use xlink:href="#icon-del"></use>
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="cart-foot-wrap">
          <div class="cart-foot-inner">
            <div class="cart-foot-l">
              <div class="item-all-check">
                <p>
            全选
             <input type="checkbox" v-model="all" @change="change"> 
        </p> 
              </div>
            </div>
            <div class="cart-foot-r">
              <div class="item-total">
                Item total: <span class="total-price">{{total | currency('$')}}</span>
              </div>
              <div class="btn-wrap">
                <a class="btn btn--red" :class="{'btn--dis':this.payList.length==0}" @click="checkOut">Checkout</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal :mdShow="modalConfirm" @close="closeModal">
      <p slot="message">你确定要删除此条数据嘛？</p>
      <div slot="btnGroup">
        <a class="btn btn--m" href="javascript:;" @click="delCart()">确认</a>
        <a class="btn btn--m" href="javascript:;" @click="modalConfirm = false">关闭</a>
      </div>
    </Modal>
  </div>
</template>
<script>

import Modal from '@/components/modal.vue'
import './../assets/css/checkout.css'
import './../assets/css/reset.css'
import $axios from '../assets/js/axios.js'
export default {
  components:{Modal},
  data() {
    return{
      shoplist: [],// 购物车
      modalConfirm: false, // 确定
      productId:'',
      delItem:'',
      all:false,
      payList: [], // 付款
      inde:0
    }
  },
  mounted(){
    this.init()
  },
  beforeRouteEnter(to, from, next) {
    let shoplist1 = $axios.get('/api/shoplist', {params:{token:to.query.token}})
    let p = Promise.all([shoplist1])
    ;(async function(){
      let res = await p
      next((vm)=>{
        vm.shoplist = res[0].data
        vm.$hideLoading()
        console.log(vm.shoplist)
      })
    }())
  },
  methods: {
    // 获取购物车数据
    init(){
      this.$axios.get('/api/shoplist',{params:{token:this.$store.state.token}}).then((response) => {
        if(response.status==200){ // 如果登陆了
          this.shoplist = response.data // 接收后台传来的userName数据
          // this.quchong(response)
          for(let i=0;i<this.shoplist-1;i++){
          if(!this.shoplist[index].count){
            this.shoplist[index].count = 1
          }else{
            this.shoplist[index].count++
          }}
          
        }
      })
      this.payList = this.$store.state.payList
    },
    // 购物车去重
    // quchong(){
    //   console.log(this.$store.state.cartCount)
    //   this.shoplist.forEach((item) => { // 遍历购物车列表，更改checked
        
    //     if(item.productNum=0||!item.productNum){
    //       item.productNum  = 1
    //     }else{
    //       item.productNum  += 1
    //     }
    //   })
    // },
    change:function(){
      if(this.all){
          this.payList=this.shoplist;
      }else{
          this.payList=[];
      }
    },

    // 点击删除图标
    delCartConfirm(item,productId,index){
      this.delItem = item
      this.productId = productId;// 保存商品id，为了点击确定删除时有数据
      // 显示弹出层
      this.modalConfirm = true;
      this.inde = index
    },

    // 点击确定删除
    delCart(){
      // 关闭弹出层
      // 删除数据库数据
      this.$axios.get('/api/del',{params:{
        token:this.$store.state.token,
        goodId:this.productId // 向服务器提交商品id
      }}).then((response) => {
        if(response.data.code==1){
    
          // payList中是否存在该商品
          this.payList.forEach(function(item,i){
              if(item.Id==this.shoplist[this.inde].Id){
                  this.payList.splice(i,1);
              }
          },this)
          this.shoplist.splice(this.inde,1);

          this.modalConfirm = false;// 关闭弹出层
          this.init() // 重更新渲染页面
          this.$store.commit("updateCartCount",-this.delItem.productNum)
        }else{
          console.log("shibao")
        }
      })
    },

    // 点击关闭弹出层
    closeModal(){
      this.modalConfirm = false;
    },

    // 编辑购物车
    editCart(flag,item,index){
     
    },

    // 全选按钮
    toggleCheckAll(){
      let flag = !this.checkAllFlag
      this.shoplist.forEach((item) => { // 遍历购物车列表，更改checked
        item.checked = flag?'1':'0'
      })
    },
    
    // 点击去结算按钮
    checkOut(){
      if(this.payList.length>0){
        this.$router.push({
          path:"/address?token="+this.$store.state.token
        });
        // 将payList存入购物车
        // this.$store.commit('方法名称','按需传递参数')
        this.$store.commit('setPayList',this.payList)
			
      }


    }
    
  }, 
  computed:{ 
    // 计算商品是否全被选定(只要shoplist的checked=1的项等于购物车商品总数就行)
    checkAllFlag(){ // 时刻计算checkAllFlag
      return this.checkedCount == this.shoplist.length
    },
   
    checkedCount(){
      let i = 0;
      this.shoplist.forEach(item=>{
        if(item.checked=='1') i++
      })
      return i
    },
   total:function(){
        // payList发生变化计算总价
        var num=0;
        this.payList.forEach((item) => {
            num+=Math.floor(item.price)
        })
        return num;
    }
  },
  watch:{
    payList:function(){
      // 勾选单个chenkbox触发payList内容变化，监听payList长度判断是够全部勾选
      this.all=this.payList.length==this.shoplist.length;
    },
    shoplist:function () {
      if(this.all){
        this.shoplist = this.payList
      }
      if(this.shoplist.length==0){
        this.all = false
      }
    }
  }
}
</script>
<style scoped>
.cart-foot-wrap .item-all-check .item-check-btn{
  background:fuchsia !important
}
.input-sub,.input-add{
    min-width: 40px;
    height: 100%;
    border: 0;
    color: #605F5F;
    text-align: center;
    font-size: 16px;
    overflow: hidden;
    display: inline-block;
    background: #f0f0f0;
  }
  .item-quantity .select-self-area{
    background:none;
    border: 1px solid #f0f0f0;
  }
  .item-quantity .select-self-area .select-ipt{
    display: inline-block;
    padding:0 3px;
    width: 30px;
    min-width: 30px;
    text-align: center;
  }
</style>
