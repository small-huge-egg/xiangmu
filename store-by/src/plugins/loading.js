// js中访问图片资源 需要 import webpack会处理成打包后的正确访问路径
import Img from "./timg.gif";
import "./loading.css";
console.log(Img)
export default{
    install(Vue){ 

        // loading
        let node=document.createElement("div");
        node.id="vue_loading_plugin";
        document.body.appendChild(node);
        node.style.background="url("+Img+") center center no-repeat rgb(230,230,230)";

        // 过渡结束 如果透明度是0 则display:none
        node.addEventListener("transitionend",function(){

            var o=getComputedStyle(this,null).opacity;

            if(o==0){
                this.style.display="none"
            }

        })

        Vue.prototype.$showLoading=function(){

            node.style.display="block";
            // 加延迟控制浏览器渲染帧
            setTimeout(function(){
                node.style.opacity=0.9;
            },16.7)
                
        }

        Vue.prototype.$hideLoading=function(){
          setTimeout(()=>{
             node.style.display="none"
          },16.7)
            // var o=getComputedStyle(node,null).opacity;
            // if(o==0){
               
            // }
            // node.style.opacity=0;

        }

    }
}