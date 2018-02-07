<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot></slot>
    </div>
    <div class="dots">
      <span class="dot" v-for="(item,index) in dots" :key="item" :class="{active:currentPageIndex===index}" @click="btnDotsGo(index)"></span>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import { addClass } from "common/js/dom";
export default {
  data() {
    return {
      dots: [],
      currentPageIndex: 0
    };
  },
  props: {
    loop: {
      type: Boolean,
      default: true
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  mounted() {
    setTimeout(() => {
      this._setSliderWidth();
      this._initDots();
      this._initSlider();
      if (this.autoPlay) {
        this._play();
      }
    }, 20);
    /* 当屏幕发生变化时调用 */
    window.addEventListener("resize", () => {
      if (!this.slider) {
        return;
      }
      this._setSliderWidth(true);
      this.slider.refresh();
    });
  },
  methods: {
    btnDotsGo(index) {
      this.currentPageIndex = index;
    },
    /* 初始化宽度 */
    _setSliderWidth(isResize) {
      this.children = this.$refs.sliderGroup.children;

      let width = 0;
      let sliderWidth = this.$refs.slider.clientWidth;
      for (let i = 0; i < this.children.length; i++) {
        let child = this.children[i];
        addClass(child, "slider-item");
        child.style.width = sliderWidth + "px";
        width += sliderWidth;
      }
      if (this.loop && !isResize) {
        width += 2 * sliderWidth;
      }
      this.$refs.sliderGroup.style.width = width + "px";
    },
    /* 初始化轮播 */
    _initSlider() {
      this.slider = new BScroll(this.$refs.slider, {
        scrollX: true,
        scrollY: false,
        momentum: false,
        snap: true,
        snapLoop: this.loop,
        snapTdreshold: 0.3,
        snapSpeed: 400
      });
      this.slider.on("scrollEnd", () => {
        let pageIndex = this.slider.getCurrentPage().pageX;
        if (this.loop) {
          pageIndex -= 1;
        }
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
          clearTimeout(this.timer);
          this._play();
        }
      });
    },
    /* 初始化小点 */
    _initDots() {
      this.dots = new Array(this.children.length);
    },
    /* 自动轮播 */
    _play() {
      let pageIndex = this.currentPageIndex + 1;
      this.$emit("selectIndex", pageIndex);
      if (this.loop) {
        pageIndex += 1;
      }
      this.timer = setTimeout(() => {
        this.slider.goToPage(pageIndex, 0, 400);
      }, this.interval);
    }
  },
  /* keep-alive组件激活时调用。
　　该钩子在服务器端渲染期间不被调用。 */
  activated() {
    if (this.autoPlay) {
      this._play();
    }
  },
  /* keep-alive组件停用时调用。
　　该钩子在服务端渲染期间不被调用。 */
  deactivated() {
    clearTimeout(this.timer);
  },
  /* 实例销毁之间调用。在这一步，实例仍然完全可用。
　　该钩子在服务端渲染期间不被调用。 */
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.slider {
  min-height: 1px;
  position: relative;
  overflow: hidden;

  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;

    .slider-item {
      float: left;
      box-sizing: border-box;
      overflow: hidden;
      text-align: center;

      a {
        display: block;
        width: 100%;
        overflow: hidden;
        text-decoration: none;
      }

      img {
        display: block;
        width: 100%;
      }
    }
  }

  .dots {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 10px;
    text-align: center;
    font-size: 0;

    .dot {
      display: inline-block;
      margin: 0 5px;
      width: 1.4rem;
      height: 0.06rem;
      border-radius: 0;
      background-color: #b4b4b4;

      &.active {
        background-color: #990108;
      }
    }
  }
}
</style>
