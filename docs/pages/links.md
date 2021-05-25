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
      <div class="card-list">
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
          name: '记忆空间',
          avatar: 'https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/xd.png',
          desc: '不积跬步无以至千里',
          link: "https://l-sui.github.io/",
          bgColor: "#f1f0ed",
          textColor: "#2b73af",
        },
        {
          name: "Lingze's blog",
          desc: '少侠, 别来无恙?',
          link: "https://lingze.xyz/",
          avatar: 'https://lingze.xyz//img/avatar2.jpg'
        }
        // {
        //   name: '虚位以待',
        //   desc: '等你前来',
        //   link: "http://notes.itzkp.com",
        //   bgColor: '#f25272',
        //   textColor: '#fbc7d2'
        // },
        // {
        //   name: '虚位以待',
        //   desc: '等你前来',
        //   link: "http://notes.itzkp.com",
        //   bgColor: "#718971",
        //   textColor: "#fff"
        // }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>

// 普通卡片列表
.cardListContainer
  margin .7rem 0
  &>:not(.card-list)
    display none
  .card-list
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

// 图文卡片列表
.cardImgListContainer
  margin 1rem 0
  &>:not(.card-list)
    display none
  .card-list
    margin -0.5rem
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    .card-item
      width calc(100%/3 - 1rem)
      margin .5rem
      background var(--mainBg)
      border 1px solid rgba(0,0,0,0.08)
      box-sizing: border-box
      border-radius 3px
      overflow hidden
      color var(--textColor)
      box-shadow 2px 2px 10px rgba(0,0,0,.04)
      display flex 
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      align-content: stretch;
      transition: box-shadow .3s
      &:hover
        box-shadow 1px 1px 20px rgba(0,0,0,.07)
      .box-img
        overflow hidden
        position relative
        background #000
        img
          display block
          width 100%
          height auto
          transition: all .3s
        &:hover
          img
            transform: scale(1.1, 1.1)
            opacity .75
      a
        color var(--textColor)
        transition: color .3s
        &:hover
          color $accentColor
          text-decoration none
      .box-info
        padding: .8rem 1rem
        p
          margin 0
        .desc
          margin-top: .3rem
          opacity .8
          font-size: .9rem
          line-height: 1.1rem
      .box-footer
        overflow hidden
        padding: .8rem 1rem
        border-top:  1px solid rgba(0,0,0,0.05)
        img
          width 1.8rem
          height 1.8rem
          border-radius 50%
          float left
        span 
          line-height 1.8rem
          float left
          margin-left: .6rem
          font-size: .8rem
    .card-item.row-1
      width calc(100% - 1rem)
    .card-item.row-2
      width calc(100%/2 - 1rem)
    .card-item.row-3
      width calc(100%/3 - 1rem)
    .card-item.row-4
      width calc(100%/4 - 1rem)

@media (max-width: 500px)
  .cardListContainer
    .card-list
      .card-item.row-1, .card-item.row-2, .card-item.row-3, .card-item.row-4
        width calc(100% - .7rem)
        img
          margin-left 1.5rem
  .cardImgListContainer
    .card-list
      .card-item.row-1, .card-item.row-2, .card-item.row-3, .card-item.row-4
        width calc(100% - 1rem)

.theme-mode-dark
  .cardImgListContainer
    .card-list
      .card-item
        border-color: var(--borderColor)
        .box-footer
           border-color: var(--borderColor)
           
// 卡片列表的响应
@media (max-width: 900px) 
  .cardListContainer
    .card-list
      .card-item.row-4
        width calc(100%/3 - .7rem)
  .cardImgListContainer
    .card-list
      .card-item.row-4
        width calc(100%/3 - 1rem)

@media (max-width: 720px) 
  .cardListContainer
    .card-list
      .card-item.row-3, .card-item.row-4
        width calc(100%/2 - .7rem)
        img
          margin-left 1.5rem
  .cardImgListContainer
    .card-list
      .card-item.row-3, .card-item.row-4
        width calc(100%/2 - 1rem)
        
@media (max-width: 500px) 
  .cardListContainer
    .card-list
      .card-item.row-1, .card-item.row-2, .card-item.row-3, .card-item.row-4
        width calc(100% - .7rem)
        img
          margin-left 1.5rem
  .cardImgListContainer
    .card-list
      .card-item.row-1, .card-item.row-2, .card-item.row-3, .card-item.row-4
        width calc(100% - 1rem)
</style>