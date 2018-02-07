<template>
  <div class="my-msg">
    <!-- 提示框 -->
    <modal :modalContent="modalContent" :inStatus="inStatus"
      :modalzIndex="modalzIndex" 
      @selectConfirmCancel="isConfirmCancel"
      :modalTitle="modalTitle"
    >
    </modal>
  </div>
</template>
<script>
import Modal from "base/modal/modal";
export default {
  data() {
    return {
      modalContent: "",
      modalTitle:"",
      inStatus: 1,
      modalzIndex: -1,
    };
  },
  components: {
    Modal
  },
  methods: {
    /* 提示框显示 */
    modalIsShow(modalTitle,modalContent) {
      this.inStatus = 0;
      this.modalzIndex = 1050;
      this.modalTitle = modalTitle;
      this.modalContent = modalContent;
    },
    modalIsHide() {
      this.inStatus = 1;
      setTimeout(() => {
        this.modalzIndex = -1;
      }, 300);
    },
    /* 结算 */
    checkout() {
      this.modalIsShow("温馨提示","请选择需要结算的商品");
    },
    /* 确认按钮 */
    isConfirmCancel() {
      this.modalIsHide();
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
