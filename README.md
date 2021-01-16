# 这是梦开始的项目

## 用传统方式上传
1. git add .
2. git commit -m "提交信息"
3. git remote add origin https://gitee.com/dqc4588/new-object.git
4. git push -u origin master

## 制作首页App组件
1. 完成 Header 区域，使用的是 Mint-UI 中的Header组件
2. 制作底部的 Tabbar 区域，使用的是 MUI 的 TAbber.html
 + 在制作 购物车 小图标的时候，操作会相对多一些：
 + 先把拓展图标的 css 样式，拷贝到 项目中
 + 拷贝 拓展字体库 ttf 文件，到项目中
 + 为 购物车 小图标添加如下样式 "mui-icon mui-icon-extra mui-icon-extra-cart"
3. 要在中间区域放置一个 router-view 来展示路由匹配到的组件

## 改造 tabbar 为 router-link

## 设置路由高亮

## 点击 tabbar 中的路由链接，展示对相应的路由组件

## 制作首页轮播图布局

## 加载首页轮播图数据
1. 获取数据，如何获取，使用 vue-resource
2. 使用 vue-resource 的 this.$http.get 获取数据
3. 获取到的数据，要保存到 data 上
4. 使用 v-for 循环渲染每个 item 项

## 改造 九宫格 区域样式

