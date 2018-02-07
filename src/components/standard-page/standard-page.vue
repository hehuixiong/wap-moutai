<template>
  <div class="standard-page">
    <b-header :title="title"></b-header>
    <section class="standard-detail-wrap">
      <div class="content-wrap">
        <div class="banner">
          <img src="./detail-jiangxiang-1.jpg" >
        </div>
        <div class="series-info">
          <h3 class="title">酱香系列</h3>
          <p class="describe">传承国酒典范的酱香白酒，精选优质茅台原材料，完美酿造酱香之魂，引领酱香名门新风尚。</p>
        </div>
        <div class="type-info">
          <div class="type-item">
            <h3 class="title">茅台珍品王子酒</h3>
            <p class="describe">贵州茅台嫡系品牌，传承国酒典范，珍存传统工艺，精选优质茅台原材料，丰满醇厚，空杯留香，传承酒中珍品。</p>
            <div class="price">
              <div class="price-label">参考定制价格：</div>
              <div class="price-value">
                <div class="value-item">
                  <span class="num">￥369.00</span>
                  <span class="unit">/瓶</span>
                </div>
              </div>
            </div>
            <div class="price-tips">（报价仅供参考，价格根据市场动态调整，以签订合同价格为准）</div>
          </div>
        </div>
        <div class="type-selector">
          <div class="section-body">
            <div class="selector-item">
              <img src="./detail-2-type-1.png" >
            </div>
            <div class="selector-item">
              <img src="./detail-2-type-1.png" >
            </div>
            <div class="selector-item">
              <img src="./detail-2-type-1.png" >
            </div>
            <div class="selector-item">
              <img src="./detail-2-type-1.png" >
            </div>
          </div>
        </div>
        <div class="btn-wrap">
          <button class="btn" @click="goCustomizable">立即定制</button>
        </div>
        <div class="other-series">
          <h3 class="divider-title">
            <span>其他系列</span>
          </h3>
          <router-link to="" class="other-item">
            <img src="./detail-other-1.jpg" >
          </router-link>
          <router-link to="" class="other-item">
            <img src="./detail-other-1.jpg" >
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import BHeader from "base/b-header/b-header";
export default {
  data() {
    return {
      title: localStorage.getItem('title')
    };
  },
  components: {
    BHeader
  },
  methods: {
    goCustomizable() {
      this.$router.push({ path: "/customizable" });
    }
  }
};
</script>
<style lang="stylus" scoped>
.standard-detail-wrap {
  .banner {
    height: 77.33333333vw;
    width: 100%;
    position: relative;

    img {
      height: 77.33333333vw;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }

  .series-info {
    padding: 0 0.42rem;

    .title {
      color: #000;
      font-size: 0.3rem;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .describe {
      color: #000;
      font-size: 0.24rem;
      line-height: 0.34rem;
    }
  }

  .type-info {
    padding: 0 0.42rem;

    .title {
      color: #a87e41;
      font-size: 0.3rem;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .describe {
      color: #000;
      font-size: 0.24rem;
      line-height: 0.34rem;
    }

    .price-tips {
      color: #aaa;
      font-size: 0.2rem;
      line-height: 0.34rem;
    }

    .price {
      .price-label {
        color: #000;
        font-size: 0.2rem;
        float: left;
        line-height: 0.56rem;
        vertical-align: bottom;
      }

      .price-value {
        .num {
          color: #d8000b;
          font-size: 0.36rem;
          font-weight: 400;
          line-height: 0.56rem;
          vertical-align: bottom;
        }

        .unit {
          line-height: 0.56rem;
          vertical-align: bottom;
        }
      }
    }
  }

  .type-selector {
    border-top: 0.02rem solid #d5d5d5;
    margin-top: 0.4rem;
    padding: 0 0.42rem;

    .selector-item {
      border: 0.02rem solid #d5d5d5;
      float: left;
      width: 38%;
      margin: 0.24rem 6%;

      img {
        width: 100%;
      }
    }
  }

  .btn-wrap {
    margin-top: 0.24rem;
    padding: 0 0.42rem;

    .btn {
      font-size: 0.44rem;
      height: 0.88rem;
      width: 100%;
      padding: 0;
      line-height: 0.88rem;
      background-color: #d8000b;
      color: #fff;
      border-radius: 0;
      border: none;
    }
  }

  .other-series {
    background-color: #e9e9e9;
    margin-top: 0.24rem;
    padding: 0.24rem 0.42rem;

    .divider-title {
      font-size: 0.28rem;
      margin-top: 20px;
      margin-bottom: 10px;
    }

    .other-item {
      display: block;
      margin: 0.24rem auto;

      img {
        width: 100%;
      }
    }
  }
}
</style>
