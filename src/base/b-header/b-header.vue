<template>
  <div class="head" :class="{'move-head':headStatus}">
    <header class="head-tab">
    <span class="head-tab-back" @click="back"><i class="icon icon-fanhui"></i> 返回</span>
    <span class="head-tab-title">{{title}}</span>
  </header>
  </div>
</template>
<script>
import { vm } from "common/js/vm";
export default {
  data() {
    return {
      headStatus: false
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>

<style lang="stylus" scoped>
.head.move-head .head-tab {
  right: -70vw;
}

.head {
  padding-top: 0.88rem;

  .head-tab {
    box-sizing: border-box;
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
    width: 100vw;
    height: 0.88rem;
    color: #fff;
    background-color: #1d1d1d;
    border-bottom: 0.03rem solid #da1823;
    text-align: center;
    transition: all 0.2s ease-in-out;
    font-size: 0.3rem;
    line-height: 0.88rem;

    .head-tab-back {
      position: absolute;
      left: 4vw;
    }

    .head-tab-title {
      font-size: 0.34rem;
    }
  }
}
</style>
