<template>
  <div class="standard">
    <header class="header-nav">
      <a href="javascript:;" :class="{active:currentPageIndex==0}">
        <span>飞天系列</span>
      </a>
      <a href="javascript:;" :class="{active:currentPageIndex==1}">
        <span>酱香系列</span>
      </a>
      <a href="javascript:;" :class="{active:currentPageIndex==2}">
        <span>坛子酒系列</span>
      </a>
    </header>
    <div class="swiper-box">
      <slider @selectIndex="selectIndex">
        <div>
          <img src="./standard-product-1.png" >
        </div>
        <div>
          <img src="./standard-product-2.png" >
        </div>
        <div>
          <img src="./standard-product-3.png" >
        </div>
      </slider>
      <router-link v-bind="{to:'/standard/'+(currentPageIndex+1)}" class="btn">
        立即定制
      </router-link>
      <a href="#" class="pointer-how">如何定制</a>
    </div>
  </div>
</template>
<script>
import Slider from "base/slider/slider";
export default {
  data() {
    return {
      currentPageIndex: 0
    };
  },
  components: {
    Slider
  },
  mounted() {},
  methods: {
    selectIndex(index) {
      this.currentPageIndex = index - 1;
      if(index == 1){
        localStorage.setItem('title','飞天系列')
      }
      if(index == 2){
        localStorage.setItem('title','酱香系列')
      }
      if(index == 3){
        localStorage.setItem('title','坛子酒系列')
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
.standard {
  .header-nav {
    height: 0.8rem;
    border-bottom: 3px solid #e7e7e7;
    text-align: center;

    a {
      color: #040404;
      opacity: 1;
      text-decoration: none;
      display: inline-block;
      margin: 3px 1.5% 0;
      height: 100%;
      position: relative;

      span {
        display: block;
        text-align: center;
        height: 100%;
        line-height: 2.7;
        opacity: 0.7;
      }
    }

    a.active span {
      border-bottom: 3px solid #d8000b;
      opacity: 1;
    }
  }

  .swiper-box {
    padding-top: 0.7rem;
    padding-bottom: 0.4rem;
    text-align: center;

    img {
      margin: 0 auto;
      width: 83% !important;
    }

    a.btn {
      padding: 0;
      line-height: 0.88rem;
      background-color: #d8000b;
      color: #fff;
      border-radius: 0;
      border: none;
      width: 2.8rem;
      font-size: 0.44rem;
      display: inline-block;
    }

    .pointer-how {
      display: block;
      margin-top: 0.3rem;
      color: #999;
    }
  }
}
</style>
