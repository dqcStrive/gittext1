<template>
<!-- 问题：我们不知道什么时候 能够拿到 max 值，但是，总归有一刻，会得到一个真正的max值 -->
<!-- 我们可以使用 watch  属性来监听父组件传递过来的 max 值，不管 watch 会被触发几次
但是 最后一次 肯定是合法值-->
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number"  value="1" @change="countChanged" ref="numbox" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>

  <!-- 分析，子组件什么时候把 数据传递给父组件 -->
  <!--  -->

</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  methods:{
    countChanged(){
    //每当文本框数据被修改的时候，立即把数据传递给父组件
      this.$emit('getcount',parseInt(this.$refs.numbox.value));
      
    },
  },
  mounted() {
    mui.init();
    // mui('.mui-numbox').numbox();

    mui('.mui-btn','mui-btn-numbox-plus').on('tap',function(e){
      e.stopPropagation();
    })
    mui('.mui-numbox').numbox().setOption('step',1);
  },
  props:["max"],
  watch:{//属性监听
    'max':function(newVal,oldVal){
      //使用 JS API 设置 numbox 的最大值
      mui('.mui-numbox')
      .numbox()
      .setOption('max',newVal)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>