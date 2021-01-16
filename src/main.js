//入口文件
import Vue from 'vue';
//1.1导入路由的包
import VueRouterr from 'vue-router';
//1.2安装路由模块
Vue.use(VueRouterr);

//2.1导入 vue-resource
import VueResource from 'vue-resource';
//2.2安装 vue-resource
Vue.use(VueResource);

//导入 MUI 样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

//按需导入 Mint-ui 中的组件
import { Header,Swipe,SwipeItem } from "mint-ui";
Vue.component(Header.name,Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

//1.3导入自己的router.js路由模块
import router from './router.js';

//导入 App 跟、根组件
import app from './App.vue';

const vm = new Vue({
  el: '#app',
  data:{},
  render: c => c(app),
  router,//挂载路由对象到vm实例上
})