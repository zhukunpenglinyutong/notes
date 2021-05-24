---
title: "网站更新"
permalink: "update"
categories: noRight
---

<template>
  <div class="edition-doc">
    <el-timeline>
      <el-timeline-item icon="el-icon-more" timestamp="2021/5/24" placement="top">
        <el-card>
          <h4>日常修复</h4>
          <p>bug: 修复icon window 展示的问题（直接取消了icon）</p>
          <p>bug: 解决暗黑模式插件点击第一次失效问题</p>
          <p>doc: 增加网站更新栏目，调整友链位置</p>
          <p>style: 优化友链展示效果</p>
          <p>delete: 暂时取消网站介绍，个人计划两个栏目（因为没啥内容，所以需要先想一下）</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

<style scoped>
.edition-doc {
  margin: 50px;
}
p {
    line-height: none;
}
</style>

