<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab-wrapper">
      <tab></tab>
    </div>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'
import tab from 'components/tab/tab'
import { getSeller } from 'api'

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller().then((seller) => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    tab
  }
}
</script>
<style lang="stylus">
#app
  .tab-wrapper
    position: fixed// 为了底下有宽高
    top: 136px
    left: 0
    right: 0
    bottom: 0
</style>
