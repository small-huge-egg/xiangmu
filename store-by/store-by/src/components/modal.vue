<template>
    <div class="view" v-show="show">
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:["show"]
}
</script>
<style scoped>
    .view{
        position: fixed;
        top:0;
        bottom:0;
        left:0;
        width:100%;
        background: rgba(0,0,0,0.6)
    }
    .box{
        position: absolute;
        top:100px;
        min-width: 500px;
        max-width:800px;
        left:50%;
        transform: translateX(-50%);
        min-height:100px;
        background: #dedede;
        border-radius: 10px;
        padding:50px;
        max-height:500px;
        overflow:auto
    }
</style>