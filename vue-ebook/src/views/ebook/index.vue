<template>
  <div class="ebook">
    <ebook-Title></ebook-Title>
    <!-- <ebook-reader></ebook-reader> -->
    <ebook-Menu></ebook-Menu>
    <router-view/>
  </div>
</template>
<script>
// import EbookReader from '../../components/ebook/EbookReader.vue'
import EbookMenu from '../../components/ebook/EbookMenu.vue'
import EbookTitle from '../../components/ebook/EbookTitle.vue'
import { ebookMixin } from '@/utils/mixin'

export default {
  mixins: [ebookMixin],
  data() {
    return {

    }
  },
  components: {
    // EbookReader,
    EbookMenu,
    EbookTitle
  }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
