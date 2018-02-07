<template>
  <div class="my-order">
    <b-header :title="title"></b-header>
  </div>
</template>
<script>
import BHeader from 'base/b-header/b-header'
export default {
  data(){
    return {
      title:'我的订单'
    }
  },
  components:{
    BHeader
  },
  methods: {
  }
};
</script>

<style lang="stylus" scoped>

</style>
