<template>
  <div>
    <!-- 顶部滑动条 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id==0 ? 'mui-active':'']"
             v-for="item in cates" :key="item.id"
             @tap="getPhotoListByCateId(item.id)"
          >
            {{item.title}}
          </a>
        </div>
      </div>
    </div>

  <ul class="photo-list">
    <router-link tag="li" v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id">
      <img v-lazy.container="item.img_url">
      <div class="info">
        <h1 class="info-title">{{item.title}}</h1>
        <div class="info-body">{{item.zhaiyao}}</div>
      </div>
    </router-link>
  </ul>
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
//1，导入 mui JS文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      cates: [],//所有分类的列表数组
      list: [],//图片列表数组
    };
  },
  created(){
    this.getAllCategory();
    //默认进入页面就主动请求 所有图片列表数据
    this.getPhotoListByCateId(0);
  },
  mounted() {
    //当组件中的DOM结构被渲染好并放到页面中的时候
    //如果要操作元素了，最好在 mounted 里面，因为 这时候 DOM 元素 是最新的
    //2，初始化滑动控件
    mui.init();
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory(){
      //获取所有的图片分类
      this.$http.get('api/getimgcategory').then(result => {
        if(result.body.status === 0){
          //手动拼接出一个最完美的 分类列表
          result.body.message.unshift({title:"全部",id: 0});
          this.cates = result.body.message;
        }else{
          Toast('获取失败');
        }
      })
    },
    getPhotoListByCateId(cateId){
      //根据 分类 Id，获取图片列表
      this.$http.get('api/getimages/' + cateId).then(result => {
        if(result.body.status === 0){
          this.list = result.body.message;
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  //是chrome为了提高页面滑动流畅度而新折腾出来的一个东西
  touch-action: pan-y;
}
.photo-list{
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li{
    background-color: rgb(88, 111, 112);
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 6px rgb(97, 124, 165);
    position: relative;
    img{
      width: 100px;
      vertical-align: middle;
    }
    img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
  }
  .info{
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0,0,0,0.4);
    max-height: 84px;
    .info-title{
      font-size: 14px;
    }
    .info-body{
      font-size: 13px;
    }
  }
}

</style>