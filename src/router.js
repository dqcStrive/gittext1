import VueRouter from 'vue-router';
//导入对应的路由组件
import home from './components/tabbar/HomeContainer.vue';
import member from './components/tabbar/MemberContainer.vue';
import search from './components/tabbar/SearchContainer.vue';
import shopcar from './components/tabbar/ShopcarContainer.vue';
import newsList from './components/news/NewsList.vue';
import newsInfo from './components/news/NewsInfo.vue';

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
  ],
  linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类，默认的类叫做router-link-acive
})

//把路由对象暴露出去
module.exports = router;