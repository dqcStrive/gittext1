<template>
  <div class="goods-list">
    <!-- <router-link class="goods-item"
     v-for="item in goodsList" :key="item.id"
    :to="'/home/goodsinfo/' + item.id"
    tag="div"
     >
      <img :src="item.img_url" alt="" />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </router-link> -->

    <!-- 在网页中，有两种跳转方式 -->
    <!-- 方式1：使用 a 标签 的形式叫做 标签跳转 -->
    <!-- 方式2：使用window.location.href 的形式 叫做编程式导航-->
    <div
      class="goods-item"
      v-for="item in goodsList"
      :key="item.id"
      @click="goDetail(item.id)"
    >
      <img :src="item.img_url" alt="" />
      <h1 class="title">{{ item.title }}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{ item.sell_price }}</span>
          <span class="old">￥{{ item.market_price }}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{ item.stock_quantity }}件</span>
        </p>
      </div>
    </div>
    <mt-button type="danger" size="large" @click="getMove">加载更多</mt-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageindex: 1, //分页的页数
      goodsList: [], //存放商品数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      //获取商品列表
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then((result) => {
          if (result.body.status === 0) {
            this.goodsList = this.goodsList.concat(result.body.message);
          }
        });
    },
    getMove() {
      this.pageindex++;
      this.getGoodsList();
    },
    goDetail(id) {
      //使用JS的形式进行路由导航

      //注意：一定要区分 this.$route 和this.$router 这两个对象
      //其中：this.$route 是路由参数对象，所有路由中的参数，params、query都属于他
      //其中：this.$router 是一个路由导航对象，用它 可以方便的 使用 JS 代码，实现路由的 前进 后退 跳转到新的 URL 地址

      //最简单的
      // this.$router.push('/home/goodsinfo/' + id)
      //传递对象
      // this.$router.push({path: '/home/goodsinfo/' + id})
      //传递命名的路由
      this.$router.push({ name: "goodsinfo", params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap; //换行
  padding: 7px;
  justify-content: space-between; //
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc; //边框阴影
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column; //改变主轴方向 纵轴
    justify-content: space-between;
    min-height: 290px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through; //删除线
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
