<template>
  <div class="shopcar-container">
    <!-- 商品列表区域 -->
    <div class="goos-list">
      <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch 
            v-model="$store.getters.getGoodsSelected[item.id]" 
            @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" alt="" />
            <div class="info">
              <h1>{{ item.title }}</h1>
              <p>
                <span class="price">￥{{ item.sell_price }}</span>
                <numbox
                  :initcount="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                ></numbox>
                <!-- 问题：如何从购物车中获取商品数量 -->
                <!-- 1，先创建一个空对象，然后循环购物车中所有商品的数据，把 当前id，作为对象的 属性名 count作为属性值-->
                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="lef">
            <p>总计不含运费</p>
            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span> 件，总价：￥<span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>
          </div>
          <mt-button type="danger" size="small">结算</mt-button>
        </div>
      </div>
    </div>
    <p>{{ $store.getters.getGoodsSelected }}</p>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [], //购物车中所有商品数据
    };
  },
  created() {
    this.getShopCarList();
  },
  methods: {
    getShopCarList() {
      //1，获取到 store 中所有商品的 id，然后拼接出一个 用逗号分隔的 字符串
      let idArr = [];
      this.$store.state.car.forEach((item) => {
        idArr.push(item.id);
      });
      if (idArr.length <= 0) {
        return;
      }

      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then((result) => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
            for(let i =0; i<this.goodslist.length;i++){
              this.goodslist[i]['selected'] = true;
            }
          }
        });
    },
    remove(id, index) {
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFromCar", id);
    },
    selectedChanged(id,val){
      //每当点击开关，吧最新的 开关状态，同步到store 中
      // console.log(id,val);
      this.$store.commit('updateGoodsSelected',{id,selected:val})
    },
  },
  components: {
    numbox,
  },
};
</script>

<style lang="scss" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goos-list {
    .mui-card-content-inner {
      display: flex;
      justify-content: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>