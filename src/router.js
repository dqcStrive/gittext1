import VueRouter from 'vue-router';
//导入对应的路由组件
import home from './components/tabbar/HomeContainer.vue';
import member from './components/tabbar/MemberContainer.vue';
import search from './components/tabbar/SearchContainer.vue';
import shopcar from './components/tabbar/ShopcarContainer.vue';
import newsList from './components/news/NewsList.vue';
import newsInfo from './components/news/NewsInfo.vue';
import photolist from './components/photos/PhotoList.vue';
import photoinfo from './components/photos/Photoinfo.vue';
import goodslist from './components/Goods/GoodsList.vue';
import goodsinfo from './components/Goods/GoodsInfo.vue';
import goodsdesc from './components/Goods/GoodsDesc.vue';
import goodscomment from './components/Goods/GoodsComment.vue';

//创建路由对象
let router = new VueRouter({
  routes: [ //配置路由规则
    {path: '/', redirect: '/home'},
    {
      path: '/home',
      component: home,
    },
    {
      path: '/member',
      component: member
    },
    {
      path: '/search',
      component: search
    },
    {
      path: '/shopcar',
      component: shopcar
    },
    {path: '/home/newslist', component: newsList},
    {path: '/home/newsinfo/:id', component: newsInfo},
    {path: '/home/photolist', component: photolist},
    {path: '/home/photoinfo/:id', component: photoinfo},
    {path: '/home/goodslist', component: goodslist},
    {path: '/home/goodsinfo/:id', component: goodsinfo,name: 'goodsinfo'},
    {path: '/home/goodsdesc/:id', component: goodsdesc,name: 'goodsdesc'},
    {path: '/home/goodscomment/:id', component: goodscomment,name: 'goodscomment'},
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做router-link-acive
})

//把路由对象暴露出去
module.exports = router;