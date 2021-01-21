<template>
  <div>
    <mt-swipe :auto="4000">
      <!-- 在组件中，使用v-for，一定要使用:key -->
      <!-- 将来，谁使用轮播图组件，谁为我们传递 lunbotulist -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.index">
        <img :src="item.img" alt="" :class="{'full': isfull}" />
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么 商品评论中的 轮播图那么丑 -->
  <!-- 1，首页中的图片，他的宽和高，都是 使用了 100% 的宽度 -->
  <!-- 2，在商品详情页面中，轮播图的 图片，如果也使用 宽高为100% 也买你不好看 -->
  <!-- 3，在商品页面中的轮播图，期望 高度是100%，但是 宽度为 自适应 -->
  <!-- 4，经过分析，得到了问题的原因 和详情中的轮播图，分歧点是 宽度 -->
  <!-- 5，既然这两个 轮播图，其他方面都是没有问题的，只是 宽度有分歧，那么，我们可以定义一个属性，让使用轮播图的
   调用者 手动使用 -->


</template>

<script>
export default {
  props:["lunbotuList","isfull"]
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  .mint-swipe-item {
    // & 交集选择器
    //不写为后代选择器
    text-align: center;
    img {
      // width: 100%;
      height: 100%;
    }
  }
}
.full{
  width: 100%;
}
</style>