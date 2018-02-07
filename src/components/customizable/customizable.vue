<template>
  <div class="customizable">
    <!-- 第一步 -->
    <div class="customizable-wrap1" :class="{'on':currentPage==0}">
      <div class="customizable-title">
        <img src="./page01.jpg" >
      </div>
      <div class="customizable-wrap">
        <div class="wrap-head">
          <h2 class="title">选择酒瓶&模板</h2>
          <p class="content">传承国酒典范的酱香摆酒，精选优质茅台原材料，完美酿制酱香之魂，引领酱香名门新风尚。酱香系列四种可选，现在就开始您的定制之旅吧！</p>
        </div>
        <div class="wrap-img">
          <img src="./custo_bg01.jpg" class="cust_bg">
          <img src="../login/login-logo@2X.png" class="img2">
        </div>
        <div class="wrap-option">
          <div class="option-title">
            <div class="tab" :class="{'active-bg':currentTabIndex0==0}" @click="_currentTabIndex(0)">
              <span>选择产品</span>
            </div>
            <div class="tab" :class="{'active-bg':currentTabIndex0==1}" @click="_currentTabIndex(1)">
              <span>选择规格</span>
            </div>
            <div class="tab" :class="{'active-bg':currentTabIndex0==2}" @click="_currentTabIndex(2)">
              <span>选择模板</span>
            </div>
          </div>
          <div class="option-select">
            <!-- 产品 -->
            <ul class="list product" v-if="currentTabIndex0==0">
              <li class="list-item" :class="{'active-red':currentPage0.cuttentItemIndex0==index}" 
                @click="_itemCurrentIndex(0,index)"
                v-for="(item,index) in 8"
                :key="index"
              >
                <span class="item-text">珍品王子</span>
              </li>
            </ul>
            <!-- 规格 -->
            <ul class="list standard" v-if="currentTabIndex0==1">
              <li class="list-item" :class="{'active-red':currentPage0.cuttentItemIndex1==index}" 
                @click="_itemCurrentIndex(0,index)"
                v-for="(item,index) in 8"
                :key="index"
              >
                <span class="item-text">500ml</span>
              </li>
            </ul>
            <!-- 模板 -->
            <ul class="list template" v-if="currentTabIndex0==2">
              <li class="list-item" :class="{'active-red':currentPage0.cuttentItemIndex2==index}" 
                @click="_itemCurrentIndex(0,index)"
                v-for="(item,index) in 9"
                :key="index"
              >
                <span class="item-text">生日模板</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-step" :class="{'move-head':headStatus}">
          <button class="btn" disabled>返回上一步</button>
          <button class="btn" @click="_nextStep">下一步(酒标定制)</button>
        </div>
      </div>
    </div>  
    <!-- 第二步 -->
    <div class="customizable-wrap2" :class="{'on':currentPage==1}">
      <div class="customizable-title">
        <img src="./page02.jpg" >
      </div>
      <div class="customizable-wrap">
        <div class="wrap-head">
          <h2 class="title">酒标定制</h2>
          <p class="content">在选择的模板上，可以任意选择想要保留或删除的元素，再按照规定上传照片和输入文字，酒标就轻松完成了！温馨提示：可定制的区域有限，文字尽量精简！</p>
        </div>
        <div class="wrap-img">
          <img src="./custo_bg02.png" class="cust_bg">
          <img :src="userImg" class="page2_img" v-if="userImg">
        </div>
        <div class="wrap-option">
          <div class="option-title">
            <div class="tab" :class="{'active-bg':currentTabIndex1==0}" @click="_currentTabIndex(0)">
              <span>背标图片</span>
            </div>
            <div class="tab" :class="{'active-bg':currentTabIndex1==1}" @click="_currentTabIndex(1)">
              <span>背标文字</span>
            </div>
          </div>
          <div class="option-select">
            <!-- 背标图片 -->
             <form name="UploadForm" class="select-upload" v-if="currentTabIndex1==0">
              <section class="select-wrap">
                <div class="select-form">
                  <label for="select-img" class="select-img" @click="btnChangeImg">
                    <img :src="userImg" v-if="userImg">
                    <span class="icon icon-camera"></span>
                  </label>
                  <input type="file" class="input-upload" @change="change" accept="image/*" ref="inputUpload">
                  <div class="select-text">
                    <p>* 点击可上传图片</p>
                    <p>* 可拉动编辑框放大、缩小、移动图片。</p>
                  </div>
                </div>
              </section>
              <div class="require">
                <div class="require-title">图片要求</div>
                <p class="p1">
                  <span>文件大小</span>
                  <span>图片尺寸</span>
                  <span>图片格式</span>
                </p>
                <p class="p2">
                  <span>>100K;<1M</span>
                  <span>>1000px;<1000px</span>
                  <span>>JPG/TIF/PNG</span>
                </p>
              </div>
            </form>
            <!-- 背标文字 -->
            <div v-if="currentTabIndex1==1">
              <ul class="list standard">
                <li class="list-item" :class="{'active-red':currentPage1.cuttentItemIndex==index}" 
                  @click="_itemCurrentIndex(1,index)"
                  v-for="(item,index) in 3"
                  :key="index"
                >
                  <span class="item-text">文本{{item}}</span>
                </li>
              </ul>
              <div class="font-set">
                <b class="set-text">字号：</b>
                <input type="number" class="set-num" max="10" value="100">
                <span class="set-at">对齐方式</span>
                <textarea name="text"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-step" :class="{'move-head':headStatus}">
          <button class="btn" @click="_lastStep">返回上一步</button>
          <button class="btn" @click="_nextStep">下一步(酒标定制)</button>
        </div>
      </div>
    </div>  
    <!-- 第三步 -->
    <div class="customizable-wrap3" :class="{'on':currentPage==2}">
      <div class="customizable-title">
        <img src="./page03.jpg" >
      </div>
      <div class="customizable-wrap">
        <div class="wrap-head">
          <h2 class="title">酒盒定制</h2>
          <p class="content">按规定输入需要的文字，酒盒就轻松完成了！<br>温馨提示：由于可定制的区域有限，文字要尽量精简喔！</p>
        </div>
        <div class="wrap-img">
          <img src="./custo_bg01.jpg" class="cust_bg">
          <img src="../login/login-logo@2X.png" class="img2">
        </div>
        <div class="wrap-option">
          <div class="option-title">
            <div class="tab" :class="{'active-bg':currentTabIndex2==0}" @click="_currentTabIndex(0)">
              <span>酒盒图片</span>
            </div>
            <div class="tab" :class="{'active-bg':currentTabIndex2==1}" @click="_currentTabIndex(1)">
              <span>酒盒文字</span>
            </div>
          </div>
          <div class="option-select">
            <!-- 背标图片 -->
            <form name="UploadForm" class="select-upload" v-if="currentTabIndex2==0">
              <section class="select-wrap">
                <div class="select-form">
                  <label for="select-img" class="select-img" @click="btnChangeImg">
                    <img :src="userImg2" v-if="userImg2">
                    <span class="icon icon-camera"></span>
                  </label>
                  <input type="file" class="input-upload" @change="change" accept="image/*" ref="inputUpload">
                  <div class="select-text">
                    <p>* 点击可上传图片</p>
                    <p>* 可拉动编辑框放大、缩小、移动图片。</p>
                  </div>
                </div>
              </section>
              <div class="require">
                <div class="require-title">图片要求</div>
                <p class="p1">
                  <span>文件大小</span>
                  <span>图片尺寸</span>
                  <span>图片格式</span>
                </p>
                <p class="p2">
                  <span>>100K;<1M</span>
                  <span>>1000px;<1000px</span>
                  <span>>JPG/TIF/PNG</span>
                </p>
              </div>
            </form>
            <!-- 背标文字 -->
            <div v-if="currentTabIndex2==1">
              <ul class="list standard">
                <li class="list-item" :class="{'active-red':currentPage2.cuttentItemIndex==index}" 
                  @click="_itemCurrentIndex(2,index)"
                  v-for="(item,index) in 3"
                  :key="index"
                >
                  <span class="item-text">文本{{item}}</span>
                </li>
              </ul>
              <div class="font-set">
                <b class="set-text">字号：</b>
                <input type="number" class="set-num" max="10" value="100">
                <span class="set-at">对齐方式</span>
                <textarea name="text"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="wrap-step" :class="{'move-head':headStatus}">
          <button class="btn" @click="_lastStep">返回上一步</button>
          <button class="btn" @click="_nextStep">下一步(酒标定制)</button>
        </div>
      </div>
    </div>  
    <!-- 第四步 -->
    <div class="customizable-wrap4" :class="{'on':currentPage==3}">
      <div class="customizable-title">
        <img src="./page04.jpg" >
      </div>
      <div class="customizable-wrap">
        <div class="wrap-head">
          <h2 class="title">完成定制</h2>
          <p class="content">恭喜您！您的专属茅台飞天酒已经定制成功！温馨提醒，飞天系统的起订量是1件，每件6瓶。请您再次确认定制数量！</p>
        </div>
        <div class="wrap-img">
          <img src="./custo_bg01.jpg" class="cust_bg">
        </div>
        <div class="wrap-option">
          <div class="option-count">
            <ul class="list">
              <li class="list-item">
                <span>定制数量：</span>
                <p>
                  <button type="button" @click="subtract">-</button>
                  <button type="button">{{num}}</button>
                  <button type="button" @click="increase">+</button>
                </p>
              </li>
              <li class="list-item">
                <span>商品单价：</span>
                <span class="price">￥{{ price }}.00(6瓶/件)</span>
              </li>
              <li class="list-item">
                <span>商品总价：</span>
                <span class="total">￥{{ total*num }}.00</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="wrap-step" :class="{'move-head':headStatus}">
          <button class="btn" @click="_lastStep">返回上一步</button>
          <button class="btn" @click="_goShopping">确认并加入购物车</button>
        </div>
      </div>
    </div>  
    <cropper ref="cropper" @postImg="postImg"></cropper>
    <!-- loading -->
    <div class="center-loading" v-if="loadingShow">
      <moutai-loading></moutai-loading>
    </div>
  </div>
</template>
<script>
import MoutaiLoading from "base/moutai-loading/moutai-loading";
import Cropper from "base/cropper/cropper";
import { vm } from "common/js/vm";
export default {
  components: {
    MoutaiLoading,
    Cropper
  },
  data() {
    return {
      //控制当前页面切换
      currentPage: 0,
      currentTabIndex0: 0, //控制页面1tab
      currentTabIndex1: 0, //控制页面2tab
      currentTabIndex2: 0, //控制页面3tab
      //控制页面1item
      currentPage0: {
        cuttentItemIndex0: 0,
        cuttentItemIndex1: 0,
        cuttentItemIndex2: 0
      },
      //控制页面2item
      currentPage1: {
        cuttentItemIndex: 0
      },
      //控制页面3item
      currentPage2: {
        cuttentItemIndex: 0
      },
      loadingShow: true,
      headStatus: false,
      userImg: "",
      userImg2: "",
      num: 1,
      price: 2214,
      total: 2214
    };
  },
  mounted() {
    vm.$on("select", toggle => {
      if (toggle == "on") {
        this.headStatus = true;
      } else {
        this.headStatus = false;
      }
    });
    setTimeout(() => {
      this.loadingShow = false;
    }, 500);
  },
  methods: {
    /* 减少 */
    subtract() {
      this.num--;
      if (this.num < 1) {
        this.num = 1;
      }
    },
    /* 增加 */
    increase() {
      this.num++;
    },
    btnChangeImg() {
      this.$refs.inputUpload.click();
    },
    change(e) {
      this.$refs.cropper.$emit("chageImg", e);
    },
    postImg(base64) {
      this.userImg = base64;
    },
    /* 下一步 */
    _nextStep() {
      this.currentPage++;
    },
    /* 上一步 */
    _lastStep() {
      this.currentPage--;
    },
    /* 加入购物车 */
    _goShopping() {
      this.loadingShow = true;
      setTimeout(() => {
        this.$router.push({ path: "/cart" });
        this.loadingShow = false;
      }, 2000);
    },
    /* 点击tab栏切换 */
    _currentTabIndex(tabIndex) {
      /* 页面1 */
      if (this.currentPage == 0) {
        this.currentTabIndex0 = tabIndex;
      }
      /* 页面2 */
      if (this.currentPage == 1) {
        this.currentTabIndex1 = tabIndex;
      }
      /* 页面3 */
      if (this.currentPage == 2) {
        this.currentTabIndex2 = tabIndex;
      }
    },
    /* 点击item切换 */
    _itemCurrentIndex(currentPage, itemIndex) {
      /* 页面1 */
      if (currentPage == 0) {
        if (this.currentTabIndex0 == 0) {
          this.currentPage0.cuttentItemIndex0 = itemIndex;
          // 点击产品的时候把容量跟模板还原
          this.currentPage0.cuttentItemIndex1 = 0;
          this.currentPage0.cuttentItemIndex2 = 0;
        }
        if (this.currentTabIndex0 == 1) {
          this.currentPage0.cuttentItemIndex1 = itemIndex;
        }
        if (this.currentTabIndex0 == 2) {
          this.currentPage0.cuttentItemIndex2 = itemIndex;
        }
      }
      /* 页面2 */
      if (currentPage == 1) {
        if (this.currentTabIndex1 == 1) {
          this.currentPage1.cuttentItemIndex = itemIndex;
        }
      }
      /* 页面3 */
      if (currentPage == 2) {
        if (this.currentTabIndex2 == 1) {
          this.currentPage2.cuttentItemIndex = itemIndex;
        }
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>
