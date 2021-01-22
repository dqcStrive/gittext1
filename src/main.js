//入口文件
import Vue from 'vue';
//1.1导入路由的包
import VueRouterr from 'vue-router';
//1.2安装路由模块
Vue.use(VueRouterr);

//注册 Vuex
import Vuex from 'vuex';
Vue.use(Vuex);

//每次刚进入网站，肯定会调用 main.js 在刚调用的额时候，把购物车数从本地存储读出来
let car = JSON.parse(localStorage.getItem('car') || '[]')

let store = new Vuex.Store({
  state: { //this.$store.state.xxx
    car: car, //将购物车里的数据 用数组存储起来，在 car 数组中，存储一些商品的对象
  },
  mutations: { //this.$store.commit('方法名','按需传递为一参数')
    addTocar(state,goodsinfo) {
      //点击加入购物车，把商品信息，保存到 store 中的car 上
      let flag = false;
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count += parseInt(goodsinfo.count);
          flag = true
          return true
        }
      })
      if(!flag){
        state.car.push(goodsinfo);
      }

      //当更新 car 后 把car存储到 本地的localStorage中
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsInfo(state,goodsinfo){
      //修改购物车中商品的数量值
      state.car.some(item => {
        if(item.id == goodsinfo.id){
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      //当修改完商品的数量，把最新的购物车数据，保存到
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    removeFromCar(state,id){
      state.car.some((item,i) => {
        if(item.id == id){
          state.car.splice(i,1)
          return true
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car));
    },
    updateGoodsSelected(state,info){
      state.car.some(item =>{
        if(item.id == info.id){
          item.selectde = info.selected;
        }
      })
      localStorage.setItem('car',JSON.stringify(state.car));
    }
  },
  getters: { //this.$store.getters.xxx
    getAllCount(state){
      let c = 0;
      state.car.forEach(item => {
        c += item.count
      })
      return c
    },
    getGoodsCount(state){
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count
      })
      return o
    },
    getGoodsSelected(state){
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.selectde
      })
      return o
    },
    getGoodsCountAndAmount(state){
      let o ={
        count: 0, //勾选的数量
        amount: 0, //勾选的总价
      }

      state.car.forEach(item => {
        if(item.selectde){
          o.count +=item.count
          o.amount += item.price * item.count
        }
      })
      return o
    }
  }
})

//导入时间插件
import moment from 'moment';
//定义全局过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
})

//2.1导入 vue-resource
import VueResource from 'vue-resource';
//2.2安装 vue-resource
Vue.use(VueResource);
//全局配置 请求跟路径
Vue.http.options.root = 'http://api.cms.liulongbin.top';
//全局配置 post 时候表单数据格式
Vue.http.options.emulateJSON = true;

//导入 MUI 样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
// import mui from './lib/mui/js/mui.min.js'
// Vue.prototype.mui = mui;

//按需导入 Mint-ui 中的组件
// import { Header,Swipe,SwipeItem,Button,Lazyload } from "mint-ui";
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

//全部加载 Mint-UI
import MintUI from 'mint-ui';
Vue.use(MintUI);
import 'mint-ui/lib/style.css';

//安装图片预览插件 vue-preview
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//1.3导入自己的router.js路由模块
import router from './router.js';

//导入 App 跟、根组件
import app from './App.vue';

const vm = new Vue({
  el: '#app',
  data: {},
  render: c => c(app),
  router, //挂载路由对象到vm实例上
  store, //挂载 store
})