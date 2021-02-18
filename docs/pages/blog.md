---
title: "博客"
permalink: "blog"
hideLastUpdated: True
categories: noRight
---
<!--参考大佬的界面 https://xin-tan.com/guide/  暂时 404 了，作者更新网站地址为 https://xxoo521.com/ 不知道是不是放弃vuepress了  -->  
<!-- > 最近更新 👇 -->

<template>
    <div>
    <!--标签列表-->
      <div class="my-blog-head">
        <h3>标签 </h3>
        <div class="my-tag-box">
          <div
            class='my-tags' 
            :class="{ 'select-tag': tag == selectedTag, 'normal-tag': tag != selectedTag }"
            @click="myFlitter( tag )"
            v-for="tag in tags"
            style="margin: 5px;">{{ tag == 'blog' ? '全部' : tag }}</div>
        </div>
      </div>
      <el-divider></el-divider>
      <div class="my-card" :body-style="{ padding: '5px' }" v-for="(post, index) in topPublishPosts">
        <div>
          <span class="page-title"><el-link :underline="false" :href="post.path" type="primary"><strong>{{ post.title }}</strong></el-link></span>
          <div v-if="post.frontmatter.tag" style="display: inline-block; float: right;">
            <span class="this-tag"
              v-for="item in post.frontmatter.tag"
              @click="myFlitter( item )"
              ><span v-if="item !== 'blog'">{{ item }}</span></span>
          </div>
          <div class="bottom clearfix">
            <br>
            <span><small><i class="el-icon-time"></i>  {{ post.formatDay }}</small></span>
            <el-link
              class="read-more"
              :href="post.path" 
              type="primary" 
              :underline="false"
            >阅读全文</el-link>
          </div>
        </div>
      </div>
      <div @click="loadMore" class="page-guide-btn" v-show="showBtn">
        <div ref="btn">加载更多</div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      step: 12,
      posts: [],
      tags: [],
      page: 1,
      num: 0,
      showBtn: true,
      selectedTag: "blog"
    }
  },

  mounted() {
    this.posts = []
    var temp = this.$site.pages
    // 筛选标签中带有 blog 标志的文章

    for (var i = 0; i < temp.length; i++) {
      if (temp[i].frontmatter.tag) {
        var tempTag = temp[i].frontmatter.tag
        for (var j = 0; j < tempTag.length; j++){
          var isInTags = false
          for (var k = 0; k < this.tags.length; k++){
            if (tempTag[j] === this.tags[k]){
              isInTags = true
            }
          }
          if (!isInTags) {
            this.tags.push(tempTag[j])
          }
        }
        if (tempTag == 'blog' || 'blog' == tempTag[0]){
          this.posts.push(temp[i])
        }
      }
    }

    // 前端体系标签顺序化（之前标签顺序不对）
    let newTags = []
    let tagObj = {}
    this.tags.forEach(tagItem => {
        let tagArr = tagItem.split('.');
        tagArr[1]
          ? tagObj[+tagArr[0]] = tagItem
          : tagObj[-1] = tagItem
    })
    this.tags = Object.values(tagObj)
    let tem = this.tags.splice(this.tags.length - 1, 1)[0]
    this.tags.unshift(tem)

    this.num = this.posts.length
  },

  computed: {
    topPublishPosts() {
      this.showBtn =  this.page * this.step < this.num
      console.log('this.getTopKPosts(this.page * this.step)', this.getTopKPosts(this.page * this.step))

      let topPublisData = this.getTopKPosts(this.page * this.step)

      // 排列顺序（有bug，相同数字前缀的会相互覆盖）
      let newTags = []
      let tagObj = {}
      topPublisData.forEach(tagItem => {
          let tagArr = tagItem.filename.split('.');
          tagArr[1]
            ? tagObj[+tagArr[0]] = tagItem
            : tagObj[0] = tagItem
      })
      topPublisData = Object.values(tagObj)

      return topPublisData
    }
  },

  methods: {
    getTopKPosts(num) {
      const re = /.*\/(.*?)\.(html|md)/

      return this.posts
        .map(post => {
          const execs = re.exec(post.relativePath)
          return {
            ...post,
            updateTimestamp: (new Date(post.frontmatter.date)).getTime(),
            filename: execs ? execs['1'] : '',
            formatDay: this.formatDate(new Date(post.frontmatter.date))
          }
        })
        .sort((a, b) => b.updateTimestamp - a.updateTimestamp)
        .slice(0, num)
    },
    
    formatDate(date) {
      if (!(date instanceof Date)) {
        return 
      }

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    },

    loadMore() {
      this.page += 1
    },

    myFlitter(tag) {
      this.selectedTag = tag
      this.page = 1
      this.posts = []
      var temp = this.$site.pages

      for (var i = 0; i < temp.length; i++) {
        if (temp[i].frontmatter.tag) {
          var tempTag = temp[i].frontmatter.tag

          for (var j = 0; j < tempTag.length; j++) {
            if (tempTag[j] === tag) {
              this.posts.push(temp[i])
              break
            }
          }
        }
      }
      // console.log(this.posts)
      this.num = this.posts.length
    }
  }
}
</script>

<style lang="stylus" scoped>
.my-tag-box {
  /* height: 100px; */
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start
}

.my-tags {
  padding: 0.3rem .5rem;
  display: inline-block;
  cursor: pointer;
  transition: all 0.5s ease;
  border-radius: 3px;
  font-size: 14px;
  color: var(--secondary-text);
}

.my-tags:hover, .select-tag {
  color: var(--regular-text);
  font-weight: 600;
}

.my-card {
  animation: showup .6s forwards;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem 0;
  .page-title .el-link {
    transition all .2s
    color: var(--primary-text)
    /* color: darken(var(--primary-text), 10%) */
    &:hover {
      color: var(--main-color);
      border-left: 2px solid var(--main-color);
      padding-left: 9px;
      transition: all .3s;
    }
  }
}

.this-tag {
  font-size: small;
  color: var(--secondary-text);
  margin-left: 10px;
  /* background: linear-gradient(120deg,#fff 50%,#f1f6f5 0); */
}

.this-tag:hover {
  cursor: pointer;
  color: var(--main-color);
  border-bottom: 1px dotted var(--main-color);
}

.read-more {
  float: right;
  background: var(--bg-color);
  padding: 3px 10px;
  border-radius: 3px;
  color: var(--regular-text);
}

@keyframes showup {
  0% {
    transform: translateY(3rem);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>

<style lang="stylus">
.page-guide-btn {
  text-align: center;
  margin: 30px 0;
  animation: showup 1s forwards;
}

.page-guide-btn div {
  display: inline-block;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s ease;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 3px;
}

.page-guide-btn div:hover {
  background-color: var(--bg-color)
  /* background-color: darken(var(--bg-color), 50%); */
  cursor: pointer;
}

.el-divider {
  background-color: var(--border-color)
}
</style>
