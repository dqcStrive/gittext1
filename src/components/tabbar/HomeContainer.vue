<template>
  <div>
    <!-- 这是轮播图区域 -->
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for，一定要使用:key -->
      <mt-swipe-item v-for="item in lunbptuList" :key="item.url">
        <img :src="item.img" alt="" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格 到 六宫格 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-home"></span>
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-email"
            ><span class="mui-badge">5</span>
          </span>
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-4">
        <router-link to="#">
          <span class="mui-icon mui-icon-chatbubble"></span>
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbptuList: [], //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http
        .get("api/getlunbo")
        .then((result) => {
          // console.log(result.body);
          if (result.body.status === 0) {
            //成功了
            this.lunbptuList = result.body.message;
          } else {
            //失败了
            Toast("加载轮播图失败");
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    // & 交集选择器
    //不写为后代选择器
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;
  .mui-media-body {
    font-size: 13px;
  }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
  border: 0;
}
</style>