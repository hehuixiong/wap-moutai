<template>
  <div id="modal">
    <div class="modal fade" :class="{in:inStatus==0}" :style="{'zIndex':modalzIndex}">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h3 class="modal-title">{{modalTitle}}</h3>
            <i></i>
          </div>
          <div class="modal-body">{{modalContent}}</div>
          <div class="modal-footer">
            <button class="btn btn-primary" @click="isConfirmCancel(0)">确定</button>
            <button class="btn btn-warning" @click="isConfirmCancel(1)">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" @click="isConfirmCancel(1)" :class="{in:inStatus==0}" :style="{'zIndex':modalzIndex-10}"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      // modalzIndex:-1
    }
  },
  props: {
    modalTitle: {
      type: String,
      default: "提示"
    },
    modalContent: {
      type: String,
      default: ""
    },
    inStatus: {
      type: Number,
      default: 1
    },
    modalzIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    /* 确定/取消 */
    isConfirmCancel(status) {
      this.$emit("selectConfirmCancel", status);
    }
  }
};
</script>
<style lang="stylus" scoped>
.modal {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  outline: 0;

  .modal-dialog {
    position: absolute;
    margin: auto;
    width: 90%;
    top: 46%;
    left: 5%;
    transition: transform 0.3s ease-out;

    .modal-content {
      position: relative;
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 6px;
      box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
      background-clip: padding-box;
      outline: 0;
    }

    .modal-content {
      border-radius: 0;
    }

    .modal-header {
      background-color: #1b1b1b;
      border-bottom: none;
      color: #fff;
      height: 0.8rem;
      padding: 0;
      position: relative;

      .modal-title {
        font-size: 0.3rem;
        line-height: 0.8rem;
        padding-left: 0.3rem;
        text-align: left !important;
      }
    }

    .modal-footer {
      font-size: 0.3rem;
      height: 0.94rem;
      padding: 0.15rem;
      text-align: right;
      border-top: 1px solid #e5e5e5;

      .btn {
        line-height: 0.64rem;
        height: 0.64rem;
        padding: 0 0.24rem;
        color: #fff;
        background-color: #d8000b;
        border: none;
        border-radius: 0;
      }

      .btn+.btn {
        margin-left: 5px;
        margin-bottom: 0;
      }

      .btn-primary {
        background-color: #1b1b1b !important;
      }
    }
  }
}

.modal.in {
  .modal-dialog {
    transform: translateY(-50%) !important;
  }
}

.fade {
  opacity: 0;
  transition: opacity 0.15s linear;
}

.fade.in {
  opacity: 1;
}

.modal-body {
  position: relative;
  padding: 15px;
  font-size: 0.28rem;
  text-align: left !important;
}

.modal-open .modal {
  overflow-x: hidden;
  overflow-y: auto;
}

.modal-backdrop {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #000;
}

.modal-backdrop.fade.in {
  opacity: 0.5;
}
</style>

