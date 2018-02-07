<template>
  <div class="fullpage-container">
    <div class="fullpage-wp" v-fullpage="opts">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShowPage: true,
      opts: {
        start: 0,
        dir: "v",
        loop: false,
        duration: 500,
        preventWechat: true,
        beforeChange: function(prev, next) {
          // console.log("before", prev, next);
        },
        afterChange: function(prev, next) {
          // console.log("after", prev, next);
        }
      }
    };
  },
  methods: {
    // showMessage() {}
  },
  created() {
    setTimeout(() => {
      this.isShowPage = false;
    }, 2000);
    window.addEventListener("resize", () => {
      // location.reload();
    });
  }
};
</script>