<template>
  <div class="ebook">
    <ebook-reader></ebook-reader>
    <router-view/>
  </div>
</template>
<script>
import EbookReader from '../../components/ebook/EbookReader.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    EbookReader
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
