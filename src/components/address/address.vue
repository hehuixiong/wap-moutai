<template>
  <div class="address">
    <b-header :title="title"></b-header>
    <div class="address-container">
      <mt-field label="收货人：" v-model="ruleForm.name">*</mt-field>
      <mt-field label="身份证号：" v-model="ruleForm.idcard">*</mt-field>
      <span class="help-block">因此货物贵重，为了保证您的产品和财产安全，请输入身份证号码并以此作为收货凭证，谢谢</span>
      <a class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">所在地区：</span>
          </div>
          <div class="mint-cell-value">
            <select @change="_getCity(ruleForm.province_id)" v-model="ruleForm.province_id">
              <option></option>
              <option v-for="(item,index) in province" :key="index" :value="item.id">{{item.name}}</option>
            </select>
            <select @change="_getArea(ruleForm.city_id)" v-model="ruleForm.city_id">
              <option></option>
              <option v-for="(item,index) in city" :key="index" :value="item.id">{{item.name}}</option>              
            </select>
            <select v-model="ruleForm.area_id">
              <option></option>
              <option v-for="(item,index) in area" :key="index" :value="item.id">{{item.name}}</option>              
            </select>
            <div class="mint-field-other">*</div>
          </div>
        </div>
      </a>
      <mt-field label="详细地址：" v-model="ruleForm.full_address">*</mt-field>
      <mt-field label="手机号码：" v-model="ruleForm.phone">*</mt-field>
      <mt-field label="邮编：" v-model="ruleForm.postcode"></mt-field>
      <mt-button type="danger" @click="submitForm">
        <span v-if="!loadingShow">保存收货人信息</span>
        <moutai-loading v-if="loadingShow"></moutai-loading>
      </mt-button>
    </div>
  </div>
</template>
<script>
import BHeader from "base/b-header/b-header";
import MoutaiLoading from "base/moutai-loading/moutai-loading";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      loadingShow: false,
      title: "新增收货地址",
      province: [], //省
      city: [], //市
      area: [], //区
      ruleForm: {
        token: sessionStorage.getItem("token"),
        postcode: "", //邮箱
        phone: "", //电话
        full_address: "", //详细地址
        area_id: "", //区id
        city_id: "", //市id
        province_id: "", //省id
        idcard: "", //身份证
        name: "" //收货人
      }
    };
  },
  components: {
    BHeader,
    MoutaiLoading
  },
  mounted() {
    this._getProvince();
    let addressId = this.$route.params.addressId;
    if (addressId !== "newly") {
      let url = `/personal/getaddressdetail?id=${addressId}&token=${this
        .ruleForm.token}`;
      this.$http.get(url).then(res => {
        this.ruleForm.id = res.data.data.itemDetail[0].id; //点击编辑设置一个id，编辑的时候需要用
        this.province = res.data.data.province; //重新返回的省份数据
        this.city = res.data.data.city; //重新返回的市区数据
        this.area = res.data.data.area; //重新返回地区数据
        this.ruleForm.name = res.data.data.itemDetail[0].name;
        this.ruleForm.idcard = res.data.data.itemDetail[0].idcard;
        this.ruleForm.postcode = res.data.data.itemDetail[0].postcode;
        this.ruleForm.phone = res.data.data.itemDetail[0].phone;
        this.ruleForm.full_address = res.data.data.itemDetail[0].full_address;
        this.ruleForm.province_id = res.data.data.itemDetail[0].province_id;
        this.ruleForm.city_id = res.data.data.itemDetail[0].city_id;
        this.ruleForm.area_id = res.data.data.itemDetail[0].area_id;
      });
    }
  },
  methods: {
    submitForm() {
      let url = "/personal/addresssave";
      this.$http.post(url, this.ruleForm).then(res => {
        if (res.data.errcode == 0) {
          this.loadingShow = true;
          /* 新增成功 */
          setTimeout(() => {
            Toast({
              message: res.data.errmsg,
              iconClass: "icon icon-duigou"
            });
            this.loadingShow = false;
            window.history.go(-1);
          }, 2000);
        } else {
          Toast({
            message: res.data.errmsg
          });
        }
        console.log(res.data);
      });
    },
    // 自动获取省份
    _getProvince() {
      var url = "/province/getzonelist";
      this.$http.get(url).then(res => {
        this.province = res.data.data.dataList;
      });
    },
    // 点击获取市区
    _getCity(id) {
      var url = "/province/getzonelist?id=" + id + "&zoneType=2";
      this.$http.get(url).then(res => {
        this.city = res.data.data.dataList;
        this.area = [];
        if (res.data.data.dataList[0].name === null) {
          this.ruleForm.city_id = null; 
          this.ruleForm.area_id = null;
        }
      });
    },
    // 点击获取区县
    _getArea(id) {
      var url = "/province/getzonelist?id=" + id + "&zoneType=3";
      this.$http.get(url).then(res => {
        this.area = res.data.data.dataList;
      });
    }
  }
};
</script>
<style lang="stylus">
.address-container {
  padding: 0.4rem 0.2rem;

  .mint-cell-wrapper {
    display: block;
  }

  .mint-field {
    background: #f7f7f7;

    .mint-cell-title {
      line-height: 0.8rem;
      font-weight: 400;
    }

    .mint-cell-value {
      position: relative;

      input {
        width: 96%;
        border: 1px #a6a6a6 solid;
        height: 0.88rem;
        background: #fff;
        padding-left: 0.1rem;
      }

      input:focus {
        border: 1px solid #d8000b;
        box-shadow: 0 0 4px rgba(216, 0, 16, 0.2);
      }

      select {
        margin-right: 0.3rem;
        border-bottom-right-radius: 0;
        border-top-right-radius: 0;
        height: 0.88rem;
        line-height: 0.54rem;
        border-radius: 0;
        border: 1px solid #a6a6a6;
        font-size: 0.3rem;
        padding: 0.15rem 0.35rem 0.15rem 0.16rem;
        width: 38%;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        outline: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        color: #555;

        option {
          font-weight: normal;
          display: block;
          white-space: pre;
          min-height: 1.2em;
          padding: 0px 2px 1px;
          text-transform: none;
        }
      }

      select:focus {
        border: 1px solid #d8000b;
        box-shadow: 0 0 4px rgba(216, 0, 16, 0.2);
      }

      select:nth-child(3) {
        margin-right: 0;
      }

      .mint-field-clear {
        position: absolute;
        right: 12px;
      }

      .mint-field-other {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: -0.2rem;
        color: #d8000b;
      }
    }
  }

  .mint-button {
    margin: 20px auto;
    display: block;
    width: 98%;
    border-radius: 0;
    font-size: 0.44rem;
  }

  .help-block {
    color: #d8000b;
    line-height: 0.3rem;
    font-size: 0.24rem;
    display: block;
    padding: 0.2rem;
  }
}

.mint-toast-text {
  line-height: 22px;
}
</style>
