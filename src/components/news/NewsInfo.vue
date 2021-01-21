<template>
  <div class="newsinfo-container">
    <!-- 大标题 -->
    <h1 class="title">{{ newsinfo.title }}</h1>

    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
      <span>点击：{{ newsinfo.click }}次</span>
    </p>
    <hr />

    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区域 -->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
//导入评论子组件
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //将 url 地址中传递过来的 ID 值，挂载到 data 上 ，方便后续调用
      newsinfo: {}, //新闻对象
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    getNewsInfo() {
      //获取新闻详情
      this.$http.get("api/getnew/" + this.id).then((result) => {
        if (result.body.status === 0) {
          this.newsinfo = result.body.message[0];
        } else {
          Toast("获取新闻资讯失败");
        }
      });
    },
  },
  components: {
    //注册子组件的接节点
    "comment-box": comment,
  },
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  .title {
    font-size: 16px;
    text-align: center;
    padding: 12px;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: skyblue;
    display: flex;
    justify-content: space-between;
  }
  .content {
    width: 100%;
  }
}
</style>