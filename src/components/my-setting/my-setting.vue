<template>
  <div class="my-setting">
    <b-header :title="title"></b-header>
  </div>
</template>
<script>
import BHeader from 'base/b-header/b-header'
export default {
  data(){
    return {
      title:'信息设置'
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
