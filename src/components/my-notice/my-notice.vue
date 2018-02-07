<template>
  <div class="my-notice">
    <b-header :title="title"></b-header>
    <div class="content">
      dasfdsafdsadsa
    </div>
  </div>
</template>
<script>
import BHeader from "base/b-header/b-header";
export default {
  data() {
    return {
      title: "我的消息"
    };
  },
  components: {
    BHeader,
  },
  methods: {}
};
</script>

<style lang="stylus" scoped>
</style>
