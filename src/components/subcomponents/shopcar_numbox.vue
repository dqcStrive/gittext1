<template>

    <div class="mui-numbox" data-numbox-min="1" style="height:25px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number"  :value="initcount"
       @change="countChanged" ref="numbox" readonly />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析，子组件什么时候把 数据传递给父组件 -->

</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  methods:{
    countChanged(){
      //数量改变了
      //每当数量值改变，就立即把数量同步到 购物车的 store中，覆盖之前的数之
      this.$store.commit('updateGoodsInfo',{
        id: this.goodsid,
        count: this.$refs.numbox.value
      })

    },
  },
  mounted() {
    mui.init();
    // mui('.mui-numbox').numbox();

    // mui('.mui-btn','mui-btn-numbox-plus').on('tap',function(e){
    //   e.stopPropagation();
    // })
    mui('.mui-numbox').numbox().setOption('step',1);
  },
  props:['initcount','goodsid']
};
</script>

<style lang="scss" scoped>
</style>