<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr />
    <textarea
      placeholder="请输入要评论的内容(最多120字)" 
      maxlength="120" 
      v-model="msg"
    ></textarea>

    <mt-button type="primary" size="large" @click="postComment"
      >发表评论</mt-button
    >
    <div class="cmt-list">
      <div
        class="cmt-item"
        v-for="(item, index) in comments"
        :key="item.add_time"
      >
        <div class="cmt-title">
          第{{ index + 1 }}楼&nbsp;&nbsp;用户：{{
            item.user_name
          }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
        </div>
        <div class="cmt-body">
          {{
            item.content === "undefind"
              ? "此用户很懒，啥都没留下"
              : item.content
          }}
        </div>
      </div>
    </div>

    <mt-button type="danger" size="large" plain @click="getMore"
      >加载更多</mt-button
    >
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageIndex: 1, //默认展示一页数据
      comments: [], //所有评论数据
      msg: '', //评论输入的内容
    };
  },
  created() {
    this.getComments();
  },
  methods: {
    getComments() {
      //获取评论
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then((result) => {
          if (result.body.status === 0) {
            // this.comments = result.body.message;
            //每当获取新评论数据是，不要把老数据覆盖
            this.comments = this.comments.concat(result.body.message);
          } else {
            Toast("评论加载失败");
          }
        });
    },
    getMore() {
      //加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      //校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空!!!");
      }

      //发表评论
      //参数一：请求的 URL 地址
      //参数二：提交给服务器的数据对象 {content: this.msg}
      //参数三：定义提交时候，表单中数据的格式 {emulateJSON: true}
      this.$http
        .post("api/postcomment/" + this.id, {
          content: this.msg.trim(),
        })
        .then(function(result) {
          if (result.body.status === 0) {
            //1. 拼接出一个评论对象
            let cmt = {
              user_name: "匿名对象",
              add_time: Date.now(),
              content: this.msg.trim(),
            };
            this.comments.unshift(cmt);
            this.msg = '';
          } 
        });
    },
  },
  props: ["id"],
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>