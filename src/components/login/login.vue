<template>
  <div class="login">
    <header class="login-header">
      <router-link to="/home" tag="div" class="logo-icon">
      </router-link>
    </header>
    <section class="login-container">
      <form class="loginform">
        <div class="form-group">
          <div class="login-code">
            <span>
              <i class="code-icon"></i>
              <span>验证码登录</span>
            </span>
          </div>
          <div class="input-group user-input">
            <label for="userIdInput" class="input-group-addon">
              <i class="user-icon"></i>
            </label>
            <input type="text" placeholder="邮箱/已验证手机号" class="form-control" v-model="ruleForm.account">
          </div>
          <div class="input-group">
            <label for="passwordInput" class="input-group-addon">
              <i class="pass-icon"></i>
            </label>
            <input type="password" placeholder="密码" class="form-control" v-model="ruleForm.passwd">
          </div>
          <div class="login-forget">
            <router-link to="">
              <i class="forget-icon"></i>
              <span>忘记密码？</span>
            </router-link>
          </div>
          <button class="btn btn-submit login-submit" type="button" @click="loginSubmit" ref="loginSubmit">
            <span v-if="loadingShow">登&nbsp;&nbsp;录</span>
            <moutai-loading v-if="!loadingShow"></moutai-loading>
          </button>
        </div>
      </form>
    </section>
    <div class="login-register">
      还没有账号？
      <router-link to="">
        立即注册
      </router-link>
    </div>
    <!-- 提示框 -->
    <modal :modalContent="modalContent" :inStatus="inStatus" 
      :modalzIndex="modalzIndex" 
      @selectConfirmCancel="isConfirmCancel"
    >
    </modal>
  </div>
</template>

<script>
import Modal from "base/modal/modal";
import MoutaiLoading from "base/moutai-loading/moutai-loading";
import { ERR_OK } from "api/config";
import { vm } from "common/js/vm";
export default {
  data() {
    return {
      modalContent: "",
      inStatus: 1,
      modalzIndex: -1,
      loadingShow: true,
      ruleForm: {
        account: "", //用户名
        passwd: "" //密码
      }
    };
  },
  components: {
    MoutaiLoading,
    Modal
  },
  methods: {
    /* 提示框显示 */
    modalIsShow(modalContent) {
      this.inStatus = 0;
      this.modalzIndex = 1050;
      this.modalContent = modalContent;
    },
    /* 提示框隐藏 */
    modelIsHide() {
      this.inStatus = 1;
      this.loadingShow = true;
      /* 动画的事件是300毫秒，所以要用300毫秒的延时来执行隐藏，不然没有动画效果 */
      setTimeout(() => {
        this.modalzIndex = -1;
      }, 300);
    },
    /* 提示框确认与取消按钮 */
    isConfirmCancel(status) {
      this.modelIsHide();
    },
    /* 登录 */
    loginSubmit() {
      this.loadingShow = false;
      let url = "/user/im_login";
      this.$http.post(url, this.ruleForm).then(res => {
        if (res.data.errcode === ERR_OK) {
          /* 保存用户信息 */
          sessionStorage.setItem("token", res.data.data.token);
          sessionStorage.setItem("userImg", res.data.data.image);
          sessionStorage.setItem("islogin", true);
          let currentRoutePath = sessionStorage.getItem("currentRoutePath");
          if (!currentRoutePath) {
            currentRoutePath = "/home";
          }
          vm.$emit("changeshow");
          setTimeout(() => {
            this.$router.push({ path: currentRoutePath });
            this.loadingShow = true;
          }, 300);
        } else {
          this.modalIsShow(res.data.errmsg);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.login {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-height: 12rem;
  overflow: auto;
  background: url('./login-bg@2X.jpg');
  background-size: 100% 100%;
  text-align: center;

  .login-header {
    display: inline-block;
    padding-top: 1rem;
    width: 100%;

    .logo-icon {
      background-color: transparent;
      background-image: url('./login-logo@2X.png');
      background-size: 2.81rem 1.24rem;
      background-repeat: no-repeat;
      background-position: 50%;
      display: inline-block;
      height: 1.24rem;
      width: 100%;
      vertical-align: middle;
      transition: all 0.4s;
    }
  }

  .login-container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 1rem;
    padding: 0.8rem 0.5rem;
    width: 86vw;
    background-color: hsla(0, 0%, 100%, 0.8);
    box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);

    .login-code {
      margin-bottom: 0.31rem;
      text-align: right;
      font-size: 0.24rem;
      line-height: 0.15rem;

      i {
        margin-right: 0.08rem;
      }

      .code-icon {
        background: transparent url('./login-phone@2X.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.26rem;
        display: inline-block;
        height: 0.3rem;
        width: 0.3rem;
        vertical-align: middle;
        transition: all 0.4s;
      }
    }

    .input-group {
      position: relative;
      display: table;
      border-collapse: separate;
    }

    .input-group {
      width: 5.6rem;
      line-height: 0.88rem;
      color: rgba(0, 0, 0, 0.4);
    }

    .input-group {
      width: 100%;

      .input-group-addon {
        position: absolute;
        left: 0;
        top: 0;
        margin: 0;
        padding: 0;
        z-index: 10;
        border: none;
        background-color: transparent;
      }

      .pass-icon, .user-icon {
        display: inline-block;
        height: 0.88rem;
        width: 0.74rem;
        vertical-align: middle;
        transition: all 0.4s;
      }

      .user-icon {
        background: transparent url('./icon-user@2X.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.37rem;
      }

      .pass-icon {
        background: transparent url('./icon-pass@2X.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.37rem;
      }

      .form-control {
        position: relative;
        z-index: 2;
        float: left;
        width: 100%;
        margin-bottom: 0;
      }

      input {
        padding: 0.2rem 0.12rem 0.2rem 0.74rem;
        border: 1px solid #a6a6a6;
        height: 0.88rem;
        background-color: #fff;
        border-radius: 0;
        outline: none;
      }

      input:focus {
        border: 1px solid #d8000b;
        box-shadow: 0 0 4px rgba(216, 0, 16, 0.2);
      }
    }

    .input-group.user-input {
      margin-bottom: 0.4rem;
    }

    .login-forget {
      margin-top: 0.1rem;
      text-align: right;
      font-size: 0.24rem;

      i {
        margin-right: 0.06rem;
      }

      .forget-icon {
        background: transparent url('./login-help@2X.png') 50% no-repeat;
        background-color: transparent;
        background-size: 0.27rem;
        display: inline-block;
        height: 0.3rem;
        width: 0.3rem;
        vertical-align: middle;
        transition: all 0.4s;
      }
    }

    /* 登录 */
    .login-submit {
      margin-top: 0.52rem;
      width: 100%;
      height: 0.88rem;
      font-size: 0.44rem;
      padding: 0;
      line-height: 0.88rem;
      background-color: #d8000b;
      color: #fff;
      border-radius: 0;
      border: none;
    }

    .btn[disabled] {
      opacity: 0.65;
      cursor: not-allowed;
      box-shadow: none;
    }

    .btn:hover {
      background-color: #ed000c;
      color: #fff;
    }
  }

  .login-register {
    position: absolute;
    bottom: 1rem;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.24rem;

    a {
      color: #d8000b;
    }
  }

  .login-register:before, .login-register:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: 1.08rem;
    height: 1px;
    background-color: #d5d5d5;
    margin-right: 0.21rem;
  }
}
</style>
