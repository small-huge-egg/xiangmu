<template>
  <div class="shelf-item">
    <component :is="item" :data="data"></component>
  </div>
</template>
<script>
import { storeShelfMixin } from '../../utils/mixin'
import ShelfBook from './ShelfItemBook'
import ShelfCategory from './ShelfItemCategory'
import ShelfAdd from './ShelfItemAdd'
export default {
  mixins: [storeShelfMixin],
  components: {
    ShelfBook
  },
  props: {
    data: Object
  },
  computed: {
    item() {
      console.log(this.data)
      return this.data.type === 1 ? this.book : (this.data.type === 2 ? this.category : this.add)
    }
  },
  data() {
    return {
      book: ShelfBook,
      category: ShelfCategory,
      add: ShelfAdd
    }
  }
}
</script>
<style lang="scss" scoped>
  @import "../../assets/styles/global";
  .shelf-item {
    width: 100%;
    height: 100%;
    z-index: 100;
    // background: mediumspringgreen;
  }
</style>
