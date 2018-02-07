// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vuex from 'vuex'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
Vue.use(vuex)
Vue.config.productionTip = false
import 'common/stylus/index.styl'
import 'vue-fullpage/vue-fullpage.css'
import VueFullpage from 'vue-fullpage'
Vue.use(VueFullpage)
//导入axios的使用
import axios from 'axios';
//绑定到Vue原型中，将来每次组件都可以使用，this.$http去调用即可
Vue.prototype.$http = axios;
//设定axios的基本url请求前缀
axios.defaults.baseURL = 'http://cs.zsb9.cn/index';
/* eslint-disable no-new */
let state = {}
let actions = {
  /* 控制底部顯示隱藏 */
  chageHead({
    commit
  }, parmsHead) {
    commit('chageHead', parmsHead)
  },
}
let mutations = {
  /* 控制底部顯示隱藏 */
  chageHead(state, chageHead) {
    state.head = chageHead
  },
}
let getters = {

}
let store = new vuex.Store({
  state,
  actions,
  mutations,
  getters
})


router.beforeEach((to, from, next) => {
  /* 控制顶部显示隐藏 */
  if (to.meta.head == false) {
    store.dispatch('chageHead', 'hide')
  } else {
    store.dispatch('chageHead', 'show')
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    //这里判断用户是否登录，我例子中是验证本地存储是否有token
    let token = sessionStorage.getItem('token');
    if (!token || token == 'undefined') {
      sessionStorage.setItem('currentRoutePath', to.path);
      window.scrollTo(0, 0);
      next({
        path: '/login',
      })
    } else {
      window.scrollTo(0, 0);
      next()
    }
  } else {
    window.scrollTo(0, 0);
    next() // 确保一定要调用 next()
  }
})


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
