//入口文件
import Vue from 'vue';

//导入 MUI 样式
import './lib/mui/css/mui.min.css';

//按需导入 Mint-ui 中的组件
import { Header } from "mint-ui";
Vue.component(Header.name,Header);


//导入 App 跟、根组件
import app from './App.vue';

const vm = new Vue({
  el: '#app',
  data:{},
  render: c => c(app)
})