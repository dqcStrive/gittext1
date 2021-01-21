<template>
  <div class="goodsinfo-container">
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>

    <!-- 商品轮播图去 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swiper :lunbotuList="lunbotulist" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品名称:{{ goodsinfo.title }}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价: <del>￥{{ goodsinfo.market_price }}</del
            >&nbsp;销售价:
            <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
          </p>
          <p>购买数量: <numbox @getcount="getSelecttedCount" 
          :max="goodsinfo.stock_quantity"></numbox></p>

          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar"
              >加入购物车</mt-button>
              <!-- 分析，如何实现加入购物车时候，拿到 选择的数量 -->
              <!-- 1，按钮属于 goodsinfo页面 ，数字属于 numbox组件 -->
              <!-- 2，由于涉及到了父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取到子组件数据 -->
              <!-- 3，涉及到了，子组件向父组件传值 -->
              <!-- 4，时间调用本质：父向子传递方法，子调用这个方法，同时 把数据当作参数  
              传递给这个方法-->
          </p>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号:{{ goodsinfo.goods_no }}</p>
          <p>库存情况:{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间:{{ goodsinfo.add_time | dateFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" size="large" plain @click="goDesc(id)"
          >图文介绍</mt-button
        >
        <mt-button type="danger" size="large" plain @click="goComment(id)"
          >商品评论</mt-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../subcomponents/swiper.vue";
import numbox from "../subcomponents/GoodsInfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将路由参数对象中的 id 挂载到 data
      lunbotulist: [],
      goodsinfo: {}, //货物信息
      ballFlag: false, //控制小球显示隐藏
      selectedCount: 1, //保存用户选中的商品数量
    };
  },
  created() {
    this.getLunbotu();
    this.getgoodsinfo();

  },
  methods: {
    getLunbotu() {
      this.$http.get("api/getthumimages/" + this.id).then((result) => {
        if (result.body.status === 0) {
          //先循环轮播图数组每一项
          result.body.message.forEach((item) => {
            item.img = item.src;
          });
          this.lunbotulist = result.body.message[0];
        }
      });
    },
    getgoodsinfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then((result) => {
        if (result.body.status === 0) {
          this.goodsinfo = result.body.message[0];
        }
      });
    },
    goDesc(id) {
      //点击使用编程式导航 跳转到介绍页面
      this.$router.push({ name: "goodsdesc", params: { id } });
    },
    goComment(id) {
      //点击使用编程式导航 跳转评论页面
      this.$router.push({ name: "goodscomment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      //小球动画优化思路
      //1，先分析导致 动画 不准确的 本质原因；我们把 小球 最终 唯一的到的 位置，已经局限在了某一分辨率下
      //2，只要分辨率和 测试的时候不一样，或者 滚动条有一定的滚动距离后，问题就出现了
      //3，因此，我们分析的到结论，不能把位移的 坐标写死
      //4，根据不同的情况，动态计算这个坐标值
      //5，先得到 徽标的 模拟坐标，在得到 小球坐标 相减
      //5，得到某个对象的坐标 domObject.getBoundingClientRect()

      //获取小球位置
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      //获取 徽标位置
      const badgePosition = document.getElementById('badge').getBoundingClientRect();

      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;


      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelecttedCount(count){
      // 当子组件传递的数量到父组件的时候
      this.selectedCount = count;
    }
  },
  components: {
    swiper,
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    // display: block;
    flex-direction: column;
    justify-content: space-between;
    button {
      margin: 10px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 408px;
    left: 142px;
  }
}
</style>