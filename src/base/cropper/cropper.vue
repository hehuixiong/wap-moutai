<template>
  <div id="cropper">  
    <!-- 遮罩层 -->  
    <div class="container" v-show="panel">  
      <div class="img-wrap">  
        <img id="image" :src="url" alt="Picture">  
      </div>  
      <button type="button" id="crop" @click.stop="crop">
        <i class="icon icon-duigou"></i>  
      </button>  
      <button type="button" id="cancel" @click.stop="cancel">
        <i class="icon icon-icon_wrong"></i>  
      </button>  
    </div>  
  </div>  
</template>
<script>
import Cropper from "cropperjs";
import { vm } from "common/js/vm";
export default {
  components: {},
  data() {
    return {
      picValue: "",
      cropper: "",
      croppable: false,
      panel: false,
      url: ""
    };
  },
  mounted() {
    //初始化这个裁剪框
    let self = this;
    let image = document.getElementById("image");
    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      background: false,
      zoomable: false,
      ready: function() {
        self.croppable = true;
      }
    });
    this.$on("chageImg", e => {
      this.change(e);
      // setTimeout(() => {
      //   let pointSe = document.querySelector(".point-se");
      //   pointSe.ontouchstart = function() {
      //     this.setAttribute("class", "cropper-point point-se on");
      //   };
      //   pointSe.ontouchend = function() {
      //     this.setAttribute("class", "cropper-point point-se");
      //   };
      // }, 20);
    });
  },
  methods: {
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    },
    change(e) {
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.panel = true;
      this.picValue = files[0];
      this.url = this.getObjectURL(this.picValue);
      //每次替换图片要重新得到新的url
      if (this.cropper) {
        this.cropper.replace(this.url);
      }
      this.panel = true;
    },
    cancel() {
      this.panel = false;
    },
    crop() {
      this.panel = false;
      let croppedCanvas;
      let roundedCanvas;

      if (!this.croppable) {
        return;
      }
      // Crop
      croppedCanvas = this.cropper.getCroppedCanvas();
      // console.log(this.cropper);
      // Round
      roundedCanvas = this.getRoundedCanvas(croppedCanvas);

      // this.headerImage = roundedCanvas.toDataURL(); //这个是base64
      // console.log(this.headerImage)
      vm.$emit("postImg", roundedCanvas.toDataURL());
      this.$emit("postImg", roundedCanvas.toDataURL());
      // this.postImg();
    },
    getRoundedCanvas(sourceCanvas) {
      let canvas = document.createElement("canvas");
      let context = canvas.getContext("2d");
      //要截取的图片大小
      // let width = sourceCanvas.width; //获取图片的大小
      // let height = sourceCanvas.height;
      let width = 198; //固定截取的大小
      let height = 198;
      /* 修改后的代码 */
      canvas.width = width;
      canvas.height = height;

      context.imageSmoothingEnabled = true;
      context.drawImage(sourceCanvas, 0, 0, width, height);
      context.globalCompositeOperation = "destination-in";
      context.beginPath();
      /* 下面代码可截取圆 */
      // context.arc(
      //   width / 2,
      //   height / 2,
      //   Math.min(width, height) / 2,
      //   0,
      //   2 * Math.PI,
      //   true
      // );
      context.fill();

      return canvas;
    },
    postImg() {
      //这边写图片的上传
    }
  }
};
</script>  
<style>
* {
  margin: 0;
  padding: 0;
}
#cropper #crop {
  position: absolute;
  left: 32%;
  bottom: 60px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #55c13e;
  color: #fff;
  font-weight: 900;
  z-index: 88;
}
#cropper #cancel {
  position: absolute;
  right: 32%;
  bottom: 60px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: #ff6f6f;
  color: #fff;
  font-weight: 900;
  z-index: 88;
}
#cropper .show {
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: relative;
  border-radius: 50%;
  border: 1px solid #d5d5d5;
}
#cropper .picture {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
#cropper .container {
  z-index: 1000;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
}

#cropper #image {
  max-width: 100%;
}
/* 下面代码截取圆 */
.cropper-view-box,
.cropper-face {
  /* border-radius: 50%; */
}

.cropper-container {
  font-size: 0;
  line-height: 0;

  /* position: relative; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  -webkit-user-select: none;

  -moz-user-select: none;

  -ms-user-select: none;

  user-select: none;

  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}

.cropper-container img {
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  min-width: 80px;
  min-height: 80px;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  /* outline: 1px solid #39f; */
  outline: 1px solid #edf0f0;
  /* outline-color: rgba(51, 153, 255, 0.75); */
  outline-color: #edf0f0;
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  /* background-color: #39f; */
  background-color: #edf0f0;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #edf0f0;
  /* background-color: #39f; */
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  z-index: 999;
  right: -6px;
  bottom: -6px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
  background: url("./sxzy.jpg") no-repeat;
  transform: rotate(90deg);
}
/* .cropper-point.point-se.on {
  right: -10px;
  bottom: -10px;
  width: 25px;
  height: 25px;
  background: url("./sxzy@2X.png") no-repeat;
} */

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  /* background-color: #39f; */
  background-color: #edf0f0;
}

.cropper-invisible {
  opacity: 0;
}

/* .cropper-bg { */
/* background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC"); */
/* } */

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>  