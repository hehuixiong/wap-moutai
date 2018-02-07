<template>
  <div class="my-msg">
    <b-header :title="title"></b-header>
       <!-- 提示框 -->
    <!-- 提示框 -->
    <modal :modalContent="modalContent" :inStatus="inStatus"
      :modalzIndex="modalzIndex" 
      @selectConfirmCancel="isConfirmCancel"
      :modalTitle="modalTitle"
    >
    </modal>
    <button @click="checkout">点我</button>
  </div>
</template>
<script>
import BHeader from "base/b-header/b-header";
import Modal from "base/modal/modal";
export default {
  data() {
    return {
      title: "我的留言",
      modalContent: "",
      modalTitle:"",
      inStatus: 1,
      modalzIndex: -1,
    };
  },
  components: {
    BHeader,
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
    isConfirmCancel(status) {
      if(status === 0){
        console.log('我先执行')
      }
      this.modalIsHide();
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
