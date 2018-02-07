<template>
  <div class="personality-screen">
    <fullpage>
      <div class="page-1 page">
        <div class="inner-box">
          <div class="bg">
            <img src="./standard-title-bg.jpg" />
          </div>
          <div class="ver-middle">
            <div class="title-icon">
              <img src="./personality-title-icon.png" >
            </div>
            <p>全方位个性化定制服务，<br/>从酒质到外包装都为您量身定做</p>
            <p class="line-text-line">
              <span></span>
              <span>定制专属于您的国酒茅台，更尊贵、更独特</span>
              <span></span>
            </p>
          </div>
          <router-link to="" class="pointer-how">
            <span>如何定制？</span>
          </router-link>
        </div>
      </div>
      <div class="page-2 page">
        <div class="inner-box">
          <div class="content-title">灵活自由的定制内容</div>
          <div class="content-list">
            <h1 class="list-title"><span>a</span>从选择一款您喜欢的酒质开始</h1>
            <ul class="list-series">
              <li>
                <p>贵州茅台酒</p>
                <p><span>飞天</span><span>五星</span><span>精品</span></p>
              </li>
              <li>
                <p>贵州茅台年份酒</p>
                <p><span>15年</span><span>30年</span><span>50年</span><span>80年</span></p>
              </li>
              <li>
                <p>大曲酱香系列酒</p><p><span>仁酒</span><span>汉酱</span><span>珍品王子</span></p><p><span>酱门经典</span><span>王子酒</span><span>迎宾酒</span></p>
                </li>
            </ul>
            <h2 class="list-title">
              <span>b</span>
              定制范围
            </h2>
            <div class="list-standard-rang">
              <span><img src="./personality-range-1.png" ></span>
              <span><img src="./personality-range-2.png" ></span>
              <span><img src="./personality-range-3.png" ></span>
              <span><img src="./personality-range-4.png" ></span>
              <span><img src="./personality-range-5.png" ></span>
            </div>
          </div>
        </div>
      </div>
      <div class="page-3 page">
        <div class="inner-box">
          <div class="content-list padding-t">
            <h1 class="list-title">
              <span>c</span>
              起定量
            </h1>
            <ul class="personality-quality">
              <li>
                <p>个性化定制＋<br>贵州茅台酒</p>
                <p>1吨起定</p>
              </li>
              <li>
                <p>个性化定制＋<br>贵州茅台年份酒</p>
                <p>600瓶起定</p>
              </li>
              <li>
                <p>个性化定制＋<br>大曲酱香系列酒</p>
                <p>10吨起定</p>
              </li>
            </ul>
            <h1 class="list-title"><span>d</span>定制周期</h1>
            <br>
            <p class="p">个性化定制的产品周期</p>
            <b class="font_48">大约为90-110个工作日</b>
            <p class="font_24">（特殊情况除外）</p>
          </div>
        </div>
      </div>
      <div class="page-4 page">
        <div class="inner-box">
          <div class="content-title">专业规范化的定制流程</div>
          <div class="process-container">
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>1</span>产品设计确认
              </p>
              <hr>
              <p>根据您的需求和喜好,专业设计师会在5-7个工作日内提供专业的设计支持。您只需提供产品定制内容所涉及的素材授权书,商标注册证复印件相关材料即可</p>
            </div>
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>2</span>签约并付预付款
              </p>
              <hr>
              <p>合同签订，需要您按照双方确认的预付款金额先行支付。</p>
            </div>
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>3</span>产品生产
              </p>
              <hr>
              <p>完成预付款的支付，您的茅台酒进入生产阶段。从包装打样到确认，再到生产、包装出库，整个生产过程至少80-100个工作日。</p>
            </div>
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>4</span>尾款支付
              </p>
              <hr>
              <p>产品生产完成，您支付尾款后即可安排物流配送。</p>
            </div>
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>5</span>物流配送
              </p>
              <hr>
              <p>空运和陆运两种物流方式供您选择，保证快速安全便捷。</p>
            </div>
            <div class="process-list">
              <div class="process-icon">
                <img src="./standard-process-1.png" >
              </div>
              <p class="list-title">
                <span>6</span>确认收货
              </p>
              <hr>
              <p>收到产品确认无任何问题后签收，客服人员会根据您的需求开具发票并快递，您的个性化产品定制之旅正式完成，接下来就请尽情享受您的专属茅台酒！</p>
            </div>
          </div>
        </div>
      </div>
    </fullpage>
  </div>
</template>
<script>
import Fullpage from "base/fullpage/fullpage";
export default {
  components: {
    Fullpage
  },
  mounted() {},
  methods:{
    
  }
};
</script>
<style lang="stylus" scoped>
.personality-screen {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0.88rem;
  width: 100%;
  height: 100%;

  .page-1 {
    background: #3a3a3a;

    .inner-box {
      position: relative;
      color: #fff;
      text-align: center;
      font-size: 0.44rem;

      img {
        width: 100%;
      }

      .ver-middle {
        padding-bottom: 2%;
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        transform: translate3d(-50%, -50%, 0);
      }

      .title-icon {
        width: 1.45rem;
        margin: 0 auto;

        img {
          width: 83%;
        }
      }

      p {
        line-height: 2;
        margin-top: 30px;
      }

      .line-text-line {
        font-size: 0.26rem;
        line-height: 1.5;
        margin-top: 0;
        color: #a87e41;

        span:first-child, span:last-child {
          width: 9%;
          background: #a87e41;
          height: 1px;
        }

        span {
          display: inline-block;
          vertical-align: middle;
          margin: 0 5px;
        }
      }

      .pointer-how {
        position: absolute;
        bottom: 0.5rem;
        display: block;
        margin-top: 0.3rem;
        color: #999;
        width: 100%;
        text-align: center;

        span {
          display: block;
          font-size: 0.3rem;
        }
      }
    }
  }

  .inner-box {
    .content-title {
      color: #fff;
      font-size: 0.36rem;
      background: #a87e41;
      padding: 5px 0;
      line-height: 0.8rem;
      text-align: center;
      position: relative;
    }

    .content-title:after {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      position: absolute;
      left: 50%;
      bottom: -4px;
      transform: translateX(-50%);
      transform: rotate(45deg);
      background: #a87e41;
    }

    .content-list {
      text-align: center;

      .list-title {
        font-size: 0.3rem;
        border-bottom: 1px solid #e5e5e5;
        padding: 0.3rem 0;
        margin-top: 10px;
        margin-bottom: 10px;
        text-align: center;

        span {
          display: inline-block;
          width: 0.18rem;
          height: 0.18rem;
          line-height: 0.18rem;
          font-size: 0.18rem;
          background: #9e9e9e;
          color: #fff;
          border-radius: 50%;
          margin-right: 0.15rem;
        }
      }

      .list-series {
        li {
          color: #a87e41;
          margin: 0.2rem 1.2%;
          text-align: center;

          p:first-child {
            border: 0;
            color: #a87e41;
            margin: 0;
            padding: 0.25rem 0;
          }

          p:last-child {
            color: rgba(0, 0, 0, 0.7);
          }

          span {
            font-size: 0.3rem;
            color: rgba(0, 0, 0, 0.7);
            width: 32.5%;
            display: inline-block;
          }
        }

        li:nth-child(2) span {
          width: 21%;
        }

        li:nth-child(3) p:nth-child(2) {
          margin-bottom: 10px;
        }
      }

      .list-standard-rang {
        width: 100%;
        margin: 0.4rem auto;
        text-align: left;

        span {
          display: inline-block;
          width: 32%;
          vertical-align: bottom;
          margin-bottom: 0.3rem;
          text-align: center;

          img {
            width: 0.63rem;
            display: inline-block;
          }
        }
      }

      .personality-quality {
        text-align: left;

        li {
          width: 39%;
          color: #a87e41;
          margin: 0.25rem 1.2%;
          display: inline-block;
          text-align: center;

          p:first-child {
            border-bottom: 1px solid #e5e5e5;
            padding: 0;
            line-height: 2;
          }

          p:last-child {
            font-size: 0.48rem;
            color: rgba(0, 0, 0, 0.7);
            line-height: 40px;
          }
        }
      }

      .p {
        margin: 5px 0;
      }

      .font_48 {
        display: inline-block;
        font-weight: 400;
        border-top: 1px solid #e5e5e5;
        padding-top: 10px;
        font-size: 0.48rem;
        color: #a87e41;
      }

      .font_24 {
        font-size: 0.24rem;
        color: #a87e41;
        padding-top: 10px;
      }
    }

    .process-container {
      text-align: center;
      background: #000;
      height: 100vh;

      .process-list {
        display: inline-block;
        width: 47%;
        margin: 2% 1% 0;
        vertical-align: top;
        text-align: center;
        color: #fff;

        .list-title {
          font-size: 0.3rem;

          span {
            display: inline-block;
            width: 0.18rem;
            height: 0.18rem;
            line-height: 0.18rem;
            font-size: 0.18rem;
            color: #000;
            background: #fff;
            border-radius: 50%;
            margin-right: 0.15rem;
          }
        }

        p:last-child {
          opacity: 0.7;
          text-align: justify;
          font-size: 0.22rem;
          line-height: 18px;
        }
      }

      .process-icon {
        margin-bottom: 0.1rem;

        img {
          width: auto;
          height: 1.17rem;
          display: inline;
        }
      }
    }
  }
}
</style>
