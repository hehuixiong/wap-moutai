<template>
  <div id="app" ref="app">
    <m-header @select="selectLeftTab" v-if="this.$store.state.head=='show'"></m-header>
    <!-- <keep-alive> -->
      <router-view></router-view>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
import MHeader from "components/m-header/m-header";
export default {
  components: {
    MHeader
  },
  methods: {
    selectLeftTab(toggle) {
      if (toggle == "on") {
        this.$refs.app.style.right = -70 + "vw";
      } else {
        this.$refs.app.style.right = 0;
      }
    }
  }
};
</script>


<style lang="stylus" scoped>
#app {
  width: 100%;
  height: 100%;
  position: relative;
  right: 0;
  transition: all 0.2s ease-in-out;
}
</style>
