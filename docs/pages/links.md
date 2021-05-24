---
title: 友链
permalink: links
hideLastUpdated: True
categories: noRight
---

<template>
  <div>
    <h3>友链</h3>
    <div class="cardListContainer">
      <div class="my-links">
          <!-- <el-card class="link-card" shadow="hover" v-for="link in links">
            <img class="link-card__avatar" :src="link.avatar" alt="头像未加载"/>
            <h3 class="link-card__title">{{ link.title }}</h3>
            <p>{{ link.description }}</p>
            <a :href="link.site" target="_blank">
              <el-button class="link-card__button" round>去看看 🚀
            </el-button></a>
          </el-card>
          <el-card class="link-card" shadow="hover">
            欢迎互加友链😎
          </el-card> -->
          <a
            v-for="(item, index) in links"
            :key="index" 
            :href="item.link"
            target="_blank"
            class="links card-item row-3"
            :style="setStyle(item)">
            <img :src="item.avatar || 'https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/zw.png'" class="no-zoom">
            <div>
              <p class="name">{{ item.name }}</p>
              <p class="desc">{{ item.desc }}</p>
            </div>
          </a>
      </div>
    </div>
  </div>
</template>

<br />

```yaml
请按照格式申请友链，并确保你的网站已经添加本站为友链

友链申请方式：发送邮件到 270750933@qq.com。格式如下：

name: id
link: 链接
desc: 介绍 (可选)
bgColor: 背景色 如'#f2e7e5' (可选)
textColor: 文字颜色 如'#481e1c' (可选)
avatar: 头像 (可选)
```

<script>
import Valine from '@theme/components/Valine.vue'

export default {
  components: { Valine },
  methods: {
    setStyle(data) {
      return {
        backgroundColor: data.bgColor || '#f4f4f4',
        '--random-color': '#CBEAFA',
        color: data.textColor || '#000',
      }
    }
  },
  data() {
    return {
      links: [
        {
          "name": "朱昆鹏",
          "desc": "凡是过往，皆是经历",
          "avatar": "http://notes.itzkp.com/avatar.jpg",
          "link": "http://notes.itzkp.com"
        },
        {
          name: '虚位以待',
          desc: '等你前来',
          link: "http://notes.itzkp.com",
          bgColor: "#f1f0ed",
          textColor: "#2b73af",
        },
        {
          name: '虚位以待',
          desc: '等你前来',
          link: "http://notes.itzkp.com"
        },
        {
          name: '虚位以待',
          desc: '等你前来',
          link: "http://notes.itzkp.com",
          bgColor: '#f25272',
          textColor: '#fbc7d2'
        },
        {
          name: '虚位以待',
          desc: '等你前来',
          link: "http://notes.itzkp.com",
          bgColor: "#718971",
          textColor: "#fff"
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
// 普通卡片列表
.cardListContainer
  margin .7rem 0
  &>:not(.my-links)
    display none
  .my-links
    margin -0.35rem
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .card-item
      width calc(100%/3 - .7rem)
      margin .35rem
      background var(--bodyBg)
      border-radius 3px
      color var(--textColor)
      display flex 
      box-shadow 1px 1px 2px 0 rgba(0,0,0,.06)
      &:hover
        text-decoration none
        img 
          transform rotate(8deg) scale(1.1, 1.1)
          box-shadow 3px 2px 7px rgba(0, 0, 0, 0.15)
        div p
          text-shadow 3px 2px 5px rgba(0, 0, 0, 0.15)
      img
        width 60px
        height 60px
        border-radius 50%
        border 2px solid #fff
        margin 1rem
        margin-right 0
        box-shadow 3px 2px 5px rgba(0, 0, 0, 0.08)
        transition all .4s
      div
        flex 1
        display inline-block
        float right 
        padding 1rem 0
        p
          margin 0
          padding 0 1rem
          transition text-shadow .4s
          text-align center
        .name
          margin .2rem 0 .3rem 0
        .desc
          font-size .8rem
          line-height 1.1rem
          opacity .8
          margin-bottom .2rem
    .card-item.row-1
      width calc(100% - .7rem)
      img
        margin-left 2rem
    .card-item.row-2
      width calc(100%/2 - .7rem)
      img
        margin-left 1.5rem
    .card-item.row-3
      width calc(100%/3 - .7rem)
    .card-item.row-4
      width calc(100%/4 - .7rem)

.my-links
    display flex
    flex-wrap wrap

    .link-card
      width 13rem
      margin 1rem 1rem 1rem 0
      display flex
      justify-content center

      h3
        text-align center

      p
        text-align center

      &__avatar
        display block
        width 6rem
        height 6rem
        margin 0 auto
        border-radius:50%;
        border 4px solid #f4f4f4

      &__button
        margin 0 auto
        display: block

      &:hover
        transform:rotate(-1deg);
        text-decoration none
        
@media (max-width: $MQMobile)
  .my-links
    flex-direction column
    .link-card
      width: auto;
      margin: 1rem 0;
</style>