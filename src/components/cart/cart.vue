<template>
  <div class="page-cart">
    <div class="inner-container">
      <h2 class="title">
        <span>购物车</span>
      </h2>
      <h3 class="inner-title">
        您的购物车（
        <span class="num">{{cartData.length}}</span>
        ）
      </h3>
      <div class="cart-select-title">
        <label class="select-icon" :class="{'selected':isselectall}">
          <i class="icon_select"></i>
          <input v-model="isselectall" type="checkbox" @change="allunAll" style="display:none" /> 
          <b>全选</b>
        </label>
        <span>定制状态</span>
      </div>
      <div class="cart-item" v-for="(item,index) in cartData" :key="index" v-if="cartData.length>0">
        <div class="cart-item-title">
          <span class="name">茅台飞天系列</span>
          <span class="time">{{item.add_time}}</span>
          <span class="type">酒盒定制</span>
        </div>
        <div class="cart-item-container">
          <div class="cart-item-content">
            <label class="cart-item-select" :class="{'selected':checked[index]}">
              <i class="icon_select"></i>
              <input v-model="checked[index]" type="checkbox" class="select-icon" @change="onallunAll" style="display:none" />
            </label>
            <div class="cart-item-img">
              <img src="http://cs.zsb9.cn./uploads/20180120/5a636022660ad.png" />
            </div>
            <div class="cart-item-detail">
              <div class="cart-item-total">
                <div class="cart-item-price">￥{{item.count_price}}</div>
                <div class="cart-item-num">
                  <button class="sub" @click="changeMoney(-1,index,item)">-</button>
                  <input type="number" v-model="item.num" @blur="changeMoney(0,index,item)">
                  <button class="add" @click="changeMoney(1,index,item)">+</button>
                </div>
              </div>
              <p>商品规格：{{item.name}}</p>
            </div>
          </div>
          <div class="btn-delete">
            <button @click="del(item.id)">删除</button>
          </div>
        </div>
      </div>
      <div class="cart-total" :class="{'move-head':headStatus}">
        <label class="select-icon" :class="{'selected':isselectall}">
          <input v-model="isselectall" type="checkbox" style="display:none" @change="allunAll" /> 
          <i class="icon_select"></i>
          <span>全选</span>
        </label>
        <div class="amount">
          <span>合计：</span><b>￥{{selletmentAmount}}.00</b>
        </div>
        <button class="btn" @click="checkout">去结算<span> ({{selectCount}}件)</span></button>
      </div>
    </div>
    <!-- 提示框 -->
    <modal :modalContent="modalContent" :inStatus="inStatus"
      :modalzIndex="modalzIndex" 
      @selectConfirmCancel="isConfirmCancel"
      :modalTitle="modalTitle"
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
import { vm } from "common/js/vm";
import { ERR_OK } from "api/config";
export default {
  data() {
    return {
      headStatus: false,
      cartData: [],
      loadingShow: true,
      isselectall: false,
      quantity: 10,
      inStatus: 1,
      modalzIndex: -1,
      modalTitle: "",
      modalContent: "",
      checked: [],
      selectCount: 0
    };
  },
  components: {
    Modal,
    MoutaiLoading
  },
  mounted() {
    setTimeout(() => {
      this.loadingShow = false;
    }, 500);
    this._getcartData();
    vm.$on("select", toggle => {
      if (toggle == "on") {
        this.headStatus = true;
      } else {
        this.headStatus = false;
      }
    });
  },
  computed: {
    /* 计算总件数 */
    selletmentAmount() {
      let trueArr = this.checked.filter(item => {
        return item;
      });
      this.selectCount = trueArr.length;
      let totalAmout = 0;
      this.checked.forEach((item, index) => {
        if (item) {
          let goodsInfo = this.cartData[index];
          if (this.cartData.length > 0) {
            totalAmout += goodsInfo.count_price * goodsInfo.num;
          }
        }
      });
      return totalAmout;
    }
  },
  methods: {
    changeMoney(way, index, item) {
      this.checked[index] = true;
      this.onallunAll();
      this.checked.push(false);
      this.checked.pop();
      if (way == 1) {
        item.num++;
      } else if (way == -1) {
        item.num--;
        if (item.num < 1) {
          item.num = 1;
        }
      } else {
        if (item.num < 1) {
          this.modalIsShow("温馨提示", "单件商品数量不能少于1件");
          item.num = 1;
          return;
        }
      }
    },
    _getcartData() {
      let url = `/Cart/cart_list?token=${sessionStorage.getItem("token")}`;
      this.$http.get(url).then(res => {
        if (res.data.errcode === ERR_OK) {
          this.cartData = res.data.data;
          this.checked = [];
          this.cartData.forEach(item => {
            this.checked.push(false);
          });
        } else {
          this.cartData = [];
        }
        console.log(res.data);
      });
    },
    /* 结算 */
    checkout() {
      if (this.checked.indexOf(true) > -1) {
        console.log("正常提交");
        this.loadingShow = true;
        setTimeout(() => {
          this.loadingShow = false;
          this.$router.push({
            path: "/settlement"
          });
        }, 1000);
      } else {
        this.modalIsShow("温馨提示", "请选择需要结算的商品");
      }
    },
    /* 子项全选反选 */
    onallunAll() {
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i] === false) {
          this.isselectall = false;
          return;
        } else this.isselectall = true;
      }
    },
    /* 全选反选功能 */
    allunAll() {
      for (let i = 0; i < this.checked.length; i++) {
        this.checked[i] = this.isselectall;
      }
      this.checked.push(false);
      this.checked.pop();
    },
    /* 提示框显示 */
    modalIsShow(modalTitle, modalContent) {
      this.inStatus = 0;
      this.modalzIndex = 1050;
      this.modalTitle = modalTitle;
      this.modalContent = modalContent;
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
        if (this.delFalg) {
          this.delFalg = false;
          //需要删除的商品
          let url = `/Cart/cart_del?id=${this
            .goodsID}&token=${sessionStorage.getItem("token")}`;
          this.$http.post(url).then(res => {
            if (res.data.errcode === ERR_OK) {
              this.isselectall = false;
              this._getcartData();
            }
          });
        }
      } else {
        this.delFalg = false;
      }
    },
    /* 删除 */
    del(goodsID) {
      this.delFalg = true;
      this.goodsID = goodsID;
      this.modalIsShow("提示", "确认将该商品从购物车删除吗？");
    }
  }
};
</script>
<style lang="stylus" scoped>
.page-cart {
  padding: 0 0.25rem 1.28rem;

  .title {
    font-size: 0.35rem;
    border-bottom: 2px solid #e1e1e1;
    color: #1b1b1b;
    margin-top: 20px;
    margin-bottom: 10px;

    span {
      border-bottom: 3px solid #1b1b1b;
      display: inline-block;
      padding: 0 0.15rem;
      margin-bottom: -2px;
      padding-bottom: 4px;
    }

    span:before {
      content: '';
      background: url('./cart_icon.png') 50% no-repeat;
      background-size: 100%;
      width: 0.35rem;
      height: 0.35rem;
      display: inline-block;
      vertical-align: top;
      margin-right: 0.1rem;
    }
  }

  .inner-title {
    color: #fff;
    background-color: #1b1b1b;
    font-size: 0.3rem;
    padding: 0.2rem;
    border-left: 3px solid #d8000b;

    span {
      color: #d8000b;
      font-size: 0.35rem;
      vertical-align: bottom;
    }
  }

  .cart-select-title {
    background-color: #fff;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    margin-top: 0.3rem;
    font-size: 0.28rem;
    position: relative;

    .select-icon {
      height: 0.8rem;
      width: 1.4rem;
      display: block;
      line-height: 0.8rem;

      .icon_select:after {
        position: absolute;
        width: 0.4rem;
        height: 0.4rem;
        content: '';
        display: block;
        background: url('../../common/images/off.png');
        background-size: 0.4rem;
        left: 10px;
        top: 50%;
        transform: translate(0, -50%);
      }

      b {
        padding-left: 0.72rem;
      }
    }

    .select-icon.selected {
      .icon_select:after {
        background: url('../../common/images/on.png');
        background-size: 0.4rem;
      }
    }

    span {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translate(0, -50%);
    }
  }

  .cart-item {
    margin-top: 0.3rem;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.2);
    background-color: #fff;

    .cart-item-title {
      background: #e8e8e8;
      padding: 0.2rem;
      font-size: 0.25rem;

      span {
        color: #525252;
        font-size: 0.25rem;
        display: inline-block;
        vertical-align: middle;
      }

      span:first-child {
        color: #000;
        font-weight: 700;
        font-size: 0.32rem;
        margin-right: 0.1rem;
      }

      span:last-child {
        color: #d8000b;
        float: right;
      }
    }

    .cart-item-content {
      display: flex;
      font-size: 0.28rem;

      .cart-item-select {
        position: relative;
        width: 12.5%;
        flex: 1;

        .icon_select:after {
          position: absolute;
          top: 50%;
          left: 50%;
          content: '';
          transform: translate3d(-50%, -50%, 0);
          width: 0.4rem;
          height: 0.4rem;
          background: url('../../common/images/off.png');
          background-size: 0.4rem;
        }
      }

      .cart-item-select.selected {
        .icon_select:after {
          background: url('../../common/images/on.png');
          background-size: 0.4rem;
        }
      }

      .cart-item-img {
        width: 31.5%;
        flex: 1.5;
        border-bottom: 0;
        border-top: 0;
        padding: 0.1rem;

        img {
          width: 100%;
        }
      }

      .cart-item-detail {
        flex: 3;

        p {
          margin: 0.1rem;
          font-size: 0.25rem;
          line-height: 0.35rem;
        }
      }

      .cart-item-total {
        width: 100%;
        padding: 0.1rem;
        display: flex;
      }

      .cart-item-num {
        border: 1px solid #efefef;
        background-color: #efefef;
        flex: 2;
        display: flex;
        width: 70%;

        button {
          border: 0;
          background-color: transparent;
          width: 30%;
          padding: 0.1rem 0;
          text-align: center;
          font-family: inherit;
          font-size: inherit;
          line-height: inherit;
        }

        input {
          width: 35%;
          text-align: center;
          border: 0;
          border-radius: 0;
          padding: 0;
          flex: 2;
        }
      }

      .cart-item-price {
        color: #d8000b;
        margin-right: 0.1rem;
        line-height: 0.48rem;
      }

      div {
        vertical-align: middle;
        display: inline-block;
      }
    }

    .btn-delete {
      text-align: right;
      line-height: 0.5rem;
      color: #000;

      button {
        border: 1px solid #d8d8d8;
        background: #f2f2f2;
        padding: 0.12rem 0.5rem;
        margin: 0.15rem;
      }

      button:hover {
        background: #d8000b;
        color: #fff;
        border: 1px #d8000b solid;
      }
    }
  }

  .move-head.cart-total {
    right: -70vw !important;
  }

  .cart-total {
    position: fixed;
    margin: 0 auto;
    bottom: 0;
    right: 0;
    display: flex;
    background: hsla(0, 0%, 100%, 0.95);
    height: 0.88rem;
    width: 100%;
    align-items: center;
    z-index: 99;
    border-top: 0.01rem solid #ddd;
    transition: all 0.2s ease-in-out;

    .select-icon {
      flex: 2;
      padding-left: 0.2rem;

      .icon_select:after {
        position: absolute;
        top: 50%;
        left: 10px;
        content: '';
        transform: translate3d(0, -50%, 0);
        width: 0.4rem;
        height: 0.4rem;
        background: url('../../common/images/off.png');
        background-size: 0.4rem;
      }

      span {
        padding-left: 25px;
      }
    }

    .select-icon.selected {
      .icon_select:after {
        background: url('../../common/images/on.png');
        background-size: 0.4rem;
      }
    }

    .amount {
      flex: 5;

      span, b {
        font-weight: 600;
        font-size: 0.32rem;
      }

      b {
        color: #d8000b;
      }
    }

    .btn {
      flex: 3;
      border: none;
      height: 0.88rem;
      background-color: #d8000b;
      text-align: center;
      font-weight: 700;
      color: #fff;
      font-size: 0.32rem;

      span {
        font-weight: 400;
        font-size: 0.24rem;
        font-family: none;
      }
    }
  }
}
</style>

