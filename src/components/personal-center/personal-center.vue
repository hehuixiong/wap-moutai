<template>
  <div class="personal-center">
    <section class="personal-center-wrap">
      <div class="content-wrap">
        <div class="user-info-wrap">
          <div class="user-head">
            <form name="headUploadForm" class="head-upload">
              <section class="userhead-wrap">
                <div class="userhead-form">
                  <label for="userhead" class="userhead" @click="btnChangeImg">
                    <img :src="userImg" >
                    <span class="icon icon-camera"></span>
                  </label>
                  <input type="file" class="input-upload" @change="change" accept="image/*" ref="inputUpload">
                </div>
              </section>
            </form>
          </div>
          <p class="user-name">ithhx908</p>
          <div class="user-info clearfix">
            <span class="info-text">普通会员（VIP1）</span>
            <span class="info-text">
              会员成长值 
              <i class="sp-text">+ 0.00</i>
            </span>
            <span class="info-text">
              积分  
              <i class="sp-text">+ 0.00</i>
            </span>
          </div>
          <div class="user-nav">
            <router-link to="" class="nav-item">
              <span class="item-icon icon-1"></span>
              <span class="item-name">待付款(<i class="num">11</i>)</span>
            </router-link>
            <router-link to="" class="nav-item">
              <span class="item-icon icon-2"></span>
              <span class="item-name">待收货(<i class="num">11</i>)</span>
            </router-link>
            <router-link to="" class="nav-item">
              <span class="item-icon icon-3"></span>
              <span class="item-name">待审核(<i class="num">11</i>)</span>
            </router-link>
            <router-link to="" class="nav-item">
              <span class="item-icon icon-4"></span>
              <span class="item-name">待评价(<i class="num">11</i>)</span>
            </router-link>
          </div>
        </div>
        <div class="func-list-wrap">
          <router-link to="/my-notice" class="list-item">
            <span class="item-icon icon-notice"></span>
            <span class="item-name">我的消息</span>
          </router-link>
          <router-link to="/my-order" class="list-item">
            <span class="item-icon icon-order"></span>
            <span class="item-name">我的订单</span>
          </router-link>
          <router-link to="/my-msg" class="list-item">
            <span class="item-icon icon-msg"></span>
            <span class="item-name">我的留言</span>
          </router-link>
          <router-link to="/my-setting" class="list-item">
            <span class="item-icon icon-setting"></span>
            <span class="item-name">信息设置</span>
          </router-link>
          <button class="btn" @click="logout">
            <i class="icon-quit"></i>
            <span>注 销</span>
          </button>
        </div>
      </div>
    </section>
    <cropper ref="cropper" @postImg="postImg"></cropper>
    <!-- 提示框 -->
    <modal :modalContent="modalContent" :inStatus="inStatus" 
      :modalzIndex="modalzIndex" 
      @selectConfirmCancel="isConfirmCancel"
    >
    </modal>
    <div class="center-loading" v-if="loadingShow">
      <moutai-loading></moutai-loading>
    </div>
  </div>
</template>
<script>
import Modal from "base/modal/modal";
import MoutaiLoading from "base/moutai-loading/moutai-loading";
import { ERR_OK } from "api/config";
import Cropper from "base/cropper/cropper";
export default {
  data() {
    return {
      modalContent: "",
      inStatus: 1,
      modalzIndex: -1,
      loadingShow: true,
      userImg: sessionStorage.getItem("userImg")
    };
  },
  components: {
    Modal,
    MoutaiLoading,
    Cropper
  },
  mounted() {
    setTimeout(() => {
      this.loadingShow = false;
    }, 500);
  },
  methods: {
    /* 子组件传来的base64点击确定的时候触发 */
    postImg(base64) {
      this.userImg = base64;
      let baseObj = {
        base64,
        token: sessionStorage.getItem("token")
      };
      let url = `/personal/portrait`;
      this.$http.post(url, baseObj).then(res => {
        if (res.data.errcode == ERR_OK) {
          sessionStorage.setItem("userImg", res.data.data);
          return;
        }
      });
    },
    /* 点击图片代替input=file */
    btnChangeImg() {
      this.$refs.inputUpload.click();
    },
    /* 把input的chage事件传给子组件 */
    change(e) {
      this.$refs.cropper.$emit("chageImg", e);
    },
    modelIsShow(modalContent) {
      this.modalContent = modalContent;
      this.inStatus = 0;
      this.modalzIndex = 1050;
    },
    modelIsHide() {
      this.inStatus = 1;
      /* 动画的事件是300毫秒，所以要用300毫秒的延时来执行隐藏，不然没有动画效果 */
      setTimeout(() => {
        this.modalzIndex = -1;
      }, 300);
    },
    /* 提示框确认与取消按钮 */
    isConfirmCancel(status) {
      this.modelIsHide();
      if (status === ERR_OK) {
        /* 注销接口 */
        let url = `/user/sign_out?token=${sessionStorage.getItem("token")}`;
        this.$http.get(url).then(res => {
          if (res.data.errcode === ERR_OK) {
            sessionStorage.removeItem("token");
            sessionStorage.setItem("islogin", false);
            sessionStorage.removeItem("userImg");
            setTimeout(() => {
              this.$router.push({ path: "/login" });
            }, 300);
          } else {
            alert(res.data.errmsg);
          }
        });
      }
    },
    /* 点击注销 */
    logout() {
      this.modelIsShow("是否要注销？");
    }
  }
};
</script>
<style lang="stylus" scoped>
.personal-center {
  .personal-center-wrap {
    .content-wrap {
      .user-info-wrap {
        background: url('./bg-personal-center.jpg') 0 0 no-repeat;
        background-size: 100% 100%;
        height: 4.6rem;
        width: 100%;
        position: relative;
      }
    }

    .user-name {
      color: #fff;
      font-size: 0.34rem;
      margin: 0.12rem auto;
      text-align: center;
    }

    .user-info {
      font-size: 0.24rem;
      text-align: center;
      width: 86%;
      margin: 0.12rem 7%;

      .info-text {
        color: #fff;
        display: block;
        float: left;
        width: 32%;
        margin-right: 2%;
      }

      .info-text:last-child {
        margin-right: 0;
      }

      .sp-text {
        color: #ffa922;
        font-weight: 700;
        font-style: normal;
      }
    }

    .user-nav {
      display: flex;
      background-color: hsla(0, 0%, 100%, 0.7);
      height: 0.98rem;
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;

      .nav-item {
        flex: 1;
        color: #1b1b1b;
        font-size: 0.24rem;
        font-weight: 400;
        height: 0.98rem;
        text-align: center;

        .item-name {
          display: block;
          line-height: 0.32rem;
          height: 0.32rem;
          width: 100%;
          text-align: center;

          i {
            font-style: normal;
          }

          .num {
            color: #dc1721;
            font-weight: 700;
          }
        }

        .item-icon {
          background-color: red;
          display: block;
          height: 0.42rem;
          width: 0.42rem;
          margin: 0.1rem auto 0.06rem;
        }

        .icon-1 {
          background: transparent url('./icon-1.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.42rem;
          display: inline-block;
          height: 0.42rem;
          width: 0.42rem;
          vertical-align: middle;
          transition: all 0.4s;
        }

        .icon-2 {
          background: transparent url('./icon-2.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.42rem;
          display: inline-block;
          height: 0.42rem;
          width: 0.42rem;
          vertical-align: middle;
          transition: all 0.4s;
        }

        .icon-3 {
          background: transparent url('./icon-3.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.42rem;
          display: inline-block;
          height: 0.42rem;
          width: 0.42rem;
          vertical-align: middle;
          transition: all 0.4s;
        }

        .icon-4 {
          background: transparent url('./icon-4.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.42rem;
          display: inline-block;
          height: 0.42rem;
          width: 0.42rem;
          vertical-align: middle;
          transition: all 0.4s;
        }
      }
    }

    .func-list-wrap {
      padding: 0 0.64rem;

      .list-item {
        border-bottom: 0.02rem solid #e0e0e0;
        display: block;
        line-height: 1.43rem;
        height: 1.43rem;
        font-size: 0.3rem;
        position: relative;

        .item-icon.icon-notice {
          background: transparent url('./list-icon-notice.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.32rem;
          height: 0.32rem;
          width: 0.32rem;
          transition: all 0.4s;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .item-icon.icon-order {
          background: transparent url('./list-icon-order.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.32rem;
          height: 0.32rem;
          width: 0.32rem;
          transition: all 0.4s;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .item-icon.icon-msg {
          background: transparent url('./list-icon-msg.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.32rem;
          height: 0.32rem;
          width: 0.32rem;
          transition: all 0.4s;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .item-icon.icon-setting {
          background: transparent url('./list-icon-setting.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.32rem;
          height: 0.32rem;
          width: 0.32rem;
          transition: all 0.4s;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .item-name {
          color: #333;
          margin-left: 0.4rem;
        }
      }

      .list-item:before {
        content: ' ';
        float: right;
        background: transparent url('./list-arrow.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.32rem;
        display: inline-block;
        height: 0.32rem;
        width: 0.32rem;
        vertical-align: middle;
        transition: all 0.4s;
        height: 1.43rem;
      }

      .btn {
        margin: 1rem auto 0.8rem;
        width: 100%;
        line-height: 0.88rem;
        background-color: #d8000b;
        height: 0.88rem;
        color: #fff;
        border-radius: 0;
        border: none;
        font-size: 0.28rem;

        .icon-quit {
          background: transparent url('./icon-quit@2X.png') 50% no-repeat;
          background-color: transparent;
          background-size: 0.38rem;
          display: inline-block;
          height: 0.4rem;
          width: 0.6rem;
          vertical-align: middle;
          transition: all 0.4s;
        }
      }
    }
  }
}

.head-upload {
  .userhead-wrap {
    margin: 0;
    padding: 0.32rem 0 0;
  }

  .userhead-form {
    margin: 0;
    padding: 0.12rem 0;
    text-align: center;

    .input-upload {
      display: none;
    }

    .userhead {
      display: inline-block;
      height: 1.6rem;
      width: 1.6rem;
      margin: 0;
      position: relative;

      img {
        background-color: #fff;
        border: 0.05rem solid #e0e0e0;
        border-radius: 50%;
        box-sizing: border-box;
        height: 1.6rem;
        width: 1.6rem;
        pointer-events: none;
      }

      .icon-camera {
        background: transparent url('./icon-camera.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.3rem;
        display: inline-block;
        height: 0.3rem;
        width: 0.3rem;
        vertical-align: middle;
        transition: all 0.4s;
        background-color: #fff;
        border-radius: 50%;
        padding: 0.21rem;
        position: absolute;
        right: 0;
        bottom: 0;
        pointer-events: none;
      }
    }
  }
}

label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 0.1rem;
  font-weight: 700;
}
</style>

