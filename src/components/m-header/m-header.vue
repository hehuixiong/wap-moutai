<template>
  <div class="head" ref="head">
    <header class="head-tab">
      <div class="head-tab-left tips-dot" @click="selectLeftTab('on')" ref="headTabLeft">
        <span class="icon" :class="iconStatus==0?'icon-sort':'icon-guanbi'"></span>
      </div>
      <div class="head-tab-center" @click="home">
        <img src="./logo2.png" />
        <i></i>
        <img src="./logo1.png" />
      </div>
      <router-link tag="div" to="/login" v-if="!isvipshow" class="isLogin">
        <img class="head-tab-right" src="./tx.png" />
      </router-link>
      <router-link tag="div" to="/personalCenter" v-if="isvipshow" class="isLogin">
        <img class="head-tab-right" :src="userImg" />
      </router-link>
      <div class="tab-left">
        <ul class="tab-left-cont">
          <li @click="selectLeftTab('off')">
            <router-link to="/home">网站首页</router-link>
          </li>
          <li @click="selectLeftTab('off')">
            <router-link to="/personality">个性定制</router-link>
          </li>
          <li @click="selectLeftTab('off')">
            <router-link to="/standard">+ 标准定制</router-link>
          </li>
          <ul class="second-tab">
            <li @click="selectLeftTab('off')"><router-link to="/standard/1"><i>L</i>飞天系列</router-link></li>
            <li @click="selectLeftTab('off')"><router-link to="/standard/2"><i>L</i>酱香系列</router-link></li>
            <li @click="selectLeftTab('off')"><router-link to="/standard/3"><i>L</i>坛子酒系列</router-link></li>
          </ul>
          <li @click="selectLeftTab('off')">
            <router-link to="/personalCenter">个人中心</router-link>
          </li>
          <li @click="selectLeftTab('off')">
            <router-link to="/cart">购物车<span class="words-tips">（<b>2</b>）</span></router-link>
          </li>
        </ul>
      </div>
      <div class="left-tab-bg" 
        ref="leftTabBg" v-if="leftTabBg" 
        @click="selectLeftTab('off')"
      >
      </div>
    </header>
  </div>
</template>

<script>
import { vm } from "common/js/vm";
export default {
  data() {
    return {
      isvipshow: false,
      leftTabBg: false,
      iconStatus: 0,
      userImg: sessionStorage.getItem("userImg")
    };
  },
  mounted() {
    vm.$on("postImg", base64 => {
      this.userImg = base64;
    });
    vm.$on("changeshow", () => {
      this.checklogin();
    });
    this.checklogin();
  },
  methods: {
    home() {
      this.$router.push({
        path: "/home"
      });
    },
    /* 登录状态 */
    checklogin() {
      let islogin = sessionStorage.getItem("islogin");
      if (islogin == "true") {
        this.isvipshow = true;
      } else {
        this.isvipshow = false;
      }
    },
    selectLeftTab(toggle) {
      this.$emit("select", toggle);
      vm.$emit("select", toggle);
      if (toggle === "on") {
        this.leftTabBg = true;
        this.$refs.head.setAttribute("class", "head move-head");
        this.$refs.headTabLeft.setAttribute("class", "head-tab-left");
        this.iconStatus = 1;
      } else {
        this.leftTabBg = false;
        this.$refs.head.setAttribute("class", "head");
        this.$refs.headTabLeft.setAttribute("class", "head-tab-left tips-dot");
        this.iconStatus = 0;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.move-head {
  width: 100vw !important;
}

.move-head .head-tab {
  right: -70vw !important;
}

.head {
  padding-top: 0.88rem;
}

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

  /* 左侧 */
  .head-tab-left {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    padding: 0 4vw;
    line-height: 0.88rem;
    height: 0.88rem;
    font-size: 0.48rem;

    .icon {
      font-size: 0.52rem;
      position: relative;
    }
  }

  .tips-dot {
    .icon::after {
      content: '';
      width: 0.12rem;
      height: 0.12rem;
      display: block;
      background: #d8000b;
      border-radius: 50%;
      position: absolute;
      right: -0.06rem;
      top: 0;
    }
  }

  /* 中间 */
  .head-tab-center {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    height: 0.88rem;
    width: 25%;

    img {
      position: absolute;
      top: 0.14rem;
      width: 0.58rem;
    }

    img:nth-child(1) {
      right: 0.2rem;
    }

    i {
      position: absolute;
      top: 0.14rem;
      width: 2px;
      height: 0.54rem;
      background-color: #4d3022;
    }

    img:nth-child(3) {
      left: 0.2rem;
    }
  }

  /* 右侧 */
  .isLogin {
    width: 0.88rem;
    position: absolute;
    line-height: 0.88rem;
    height: 0.88rem;
    right: 0;

    .head-tab-right {
      position: absolute;
      width: 0.42rem;
      right: 4vw;
      top: 0;
      bottom: 0;
      margin: auto 0;
      border-radius: 50%;
    }
  }

  /* 左边隐藏部分 */
  .tab-left {
    position: absolute;
    left: -70vw;
    top: 0;
    width: 70vw;
    height: 100vh;
    overflow: hidden;
    transition: all 0.2s ease-in-out;

    .tab-left-cont {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 0.88rem;
      width: 70vw;
      height: 100vh;
      color: #a3a3a3;
      background-color: #000;

      .second-tab li {
        text-indent: 32vw;
        text-align: left;

        i {
          position: relative;
          top: -0.08rem;
          left: -0.1rem;
          line-height: 0.34rem;
          display: inline-block;
          font-style: normal;
          text-indent: 0;
        }
      }

      li {
        line-height: 0.98rem;
        font-size: 0.32rem;
        text-align: center;
        border-bottom: 1px solid #3f3f3f;

        a {
          color: #a3a3a3;
          display: block;

          b {
            color: #d8000b;
          }
        }

        .router-link-exact-active {
          background-color: #1d1d1d;
        }
      }
    }
  }

  .left-tab-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 30vw;
    height: 100vh;
    background-color: transparent;
  }
}
</style>
