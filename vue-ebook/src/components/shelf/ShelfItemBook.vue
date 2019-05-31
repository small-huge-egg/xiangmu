<template>
  <div class="shelf-item-book">
    <img :src="data.cover" class="shelf-item-book-cover">
  </div>
</template>
<script>
export default {
  props: {
    data: Object
  },
  mounted() {
    console.log('555')
    console.log(this.data)
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item-book {
    width: 100%;
    height: 100%;
    .shelf-item-book-cover {
      width: 100%;
      height: 100%;
    }
  }
</style>
