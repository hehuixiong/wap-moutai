<template>
  <div class="loading-center-absolute">
    <i class="object"></i>
    <i class="object"></i>
    <i class="object"></i>
  </div>
</template>
<style lang="stylus" scoped>
.loading-center-absolute {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  margin: auto;
  height: 0.6rem;
  width: 0.6rem;
  transform: rotate(-135deg);

  i:first-child {
    left: 0;
    top: 0;
    width: 80%;
    height: 80%;
    animation-delay: 0.6s;
  }

  i:nth-child(2) {
    left: 10%;
    top: 10%;
    width: 60%;
    height: 60%;
    animation-delay: 0.4s;
  }

  i:nth-child(3) {
    left: 20%;
    top: 20%;
    width: 40%;
    height: 40%;
    animation-delay: 0.2s;
  }

  @keyframes b {
    50% {
      transform: rotate(1turn) scale(0.8);
    }
  }

  .object {
    display: block;
    border-radius: 50% 50% 50% 50%;
    position: absolute;
    border-top: 0.04rem solid #fff;
    border-bottom: 0.04rem solid transparent;
    border-left: 0.04rem solid #fff;
    border-right: 0.04rem solid transparent;
    animation: b 2s infinite;
  }
}
</style>
