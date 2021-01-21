//入口文件
import Vue from 'vue';
//1.1导入路由的包
import VueRouterr from 'vue-router';
//1.2安装路由模块
Vue.use(VueRouterr);

//导入时间插件
import moment from 'moment';
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
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
  data:{},
  render: c => c(app),
  router,//挂载路由对象到vm实例上
})