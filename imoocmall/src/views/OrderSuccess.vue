<template>
    <div>
      <nav-header></nav-header>
      <nav-bread>
        <span>order ConfirmOk</span>
      </nav-bread>
      <div class="container">
        <div class="page-title-normal">
          <h2 class="page-title-h2"><span>check out</span></h2>
        </div>
        <!-- 进度条 -->
        <div class="check-step">
          <ul>
            <li class="cur"><span>Confirm</span> address</li>
            <li class="cur"><span>View your</span> order</li>
            <li class="cur"><span>Make</span> payment</li>
            <li class="cur"><span>Order</span> confirmation</li>
          </ul>
        </div>

        <div class="order-create">
          <div class="order-create-pic"><img src="/static/ok-2.png" alt=""></div>
          <div class="order-create-main">
            <h3>Congratulations! <br>Your order is under processing!</h3>
            <p>
              <span>Order ID：{{$route.query.orderId}}</span>
              <span>Order total：{{orderTotal | currency}}</span>
            </p>
            <div class="order-create-btn-wrap">
              <div class="btn-l-wrap">
                <router-link class="btn btn--m" to="/cart">Cart List</router-link>
              </div>
              <div class="btn-r-wrap">
                <router-link class="btn btn--m" to="/">Goods List</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav-footer></nav-footer>
    </div>
</template>
<script>
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import Modal from '@/components/Modal.vue'
import NavBread from '@/components/NavBread.vue'
import axios from 'axios'
export default{
  data(){
    return{
      orderTotal: 0
    }
  },
  mounted(){
    this.init()
  },
  methods:{
    init(){ // 初始化订单成功付款页面
      let orderId = this.$route.query.orderId
      if(!orderId){
        return;
      }
      axios.get('/users/orderDetail',{
        params:{orderId:orderId} //get传参       
      }).then((response)=>{
       if(response.data.status==0){
         this.orderTotal = response.data.result.orderTotal
       }
      })
    },
  },
  components:{
    NavHeader,
    NavFooter,
    Modal,
    NavBread
  }
}
</script>
