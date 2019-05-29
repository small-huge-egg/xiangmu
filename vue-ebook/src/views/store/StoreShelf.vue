<template>
  <div>
    <div class="store-shelf">
      <shelf-title></shelf-title>
    </div>
  </div>
</template>
<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
import { storeShelfMixin } from '../../utils/mixin'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfTitle
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .store-shelf {
    width: 100%;
    height: 100%;
    background: #fff;
  }
</style>
