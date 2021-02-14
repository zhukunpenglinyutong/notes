---
title: "读书"
permalink: "book"
categories: noRight
---

<template>
  <div class="zhuanlan-ctn" style="width: 100%;">
    <img
      style="height: 10rem; margin: 1rem auto; display:block;"
      :src="$withBase('/ills/zhuanlan.svg')"
      type="image/svg+xml" draggable="false"/>
        <!-- 问题 -->
        <div style="display: flex; flex-wrap: wrap;">
            <div class="zl-item" v-for="(item, ind) in bookList" :key="ind">
              <!-- 所有封面大小或者比例为 900 * 330 约 2.35 ：1 -->
              <div @click=lookup(item.link) >
                  <img :src="item.cover" style="width: 100%; border-radius: 4px 4px 0 0;"/>
                  <h4 class="zl-item__title">{{ item.title }}</h4>
                  <p class="zl-item__info">🕓 {{ item.date }}</p>
              </div>
              <div class="zl-item__pages">
                  <div style="letter-spacing: 1px; line-height: 1.7;">{{ item.decription }}</div>
                  <el-divider></el-divider>
                  <div v-for="(page, ind) in item.pages" class="animated faster slideInDown">
                  <el-link :underline="false" :href="page.path" type="primary"
                      style="font-size: 1rem; font-weight: 500; line-height: 2rem; text-decorate: none;">
                      📄 {{ page.title }}
                  </el-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bookList: [{
        cover: require('./img/zgcsdxp.jpg'),
        link: "/book-zgcsdxp/",
        decription: "我一直生活在北方，现在到了快买房的时候了，目前面临着以后要待在哪个城市的问题，而这本书能帮助我认识到各个城市的未来前景，并且为我建立起一个关于城市发展的思考体系，因为只有大家都追捧的地方，房价才有保值的可能。",
        title: "中国城市大洗牌（10%）",
        date: '2021年2月14日'
      },
      {
        cover: require('./img/fryst.jpg'),
        link: "/book-fryst/",
        decription: "在读中",
        title: "繁荣与衰退",
        date: '2021年2月14日'
      }
      // {
      //   cover: "https://xerrors.oss-cn-shanghai.aliyuncs.com/blog/20200203/t7wXD6CoQdbk.png",
      //   link: "compile",
      //   decription: "这个专栏涉及到词法分析器以及语法分析器的构建，从 flex 开始讲起，直到后面的 bison 来构造语法分析器，一步一个脚印来将自己学习的知识应用到实践中去；",
      //   title: "编译原理：语法分析与词法分析"
      // }, {
      //   cover: "https://xerrors.oss-cn-shanghai.aliyuncs.com/blog/20200203/pa71gYHVDFVO.png",
      //   link: "python-base",
      //   decription: "这个专栏主要从Python的几个基础的地方来阐述，理解难度很低，并且可帮助有C语言基础的同学快速掌握Python的基础语法知识以及用法，平时写一些字符串处理脚本还是没有问题的；与此同时，该内容也可以帮助学习更深层次的Python的时候，打下一个基础。",
      //   title: "Python 快速扫盲"
      // }
      ]
    }
  },
  methods: {
    lookup(link) {
      console.log(link)
      window.location.pathname = link
    }
  }
}
</script>

<style lang="stylus" scoped>
.zl-head
  text-align center
  padding 3rem
.zl-item
  width 45%
  margin 2rem auto
  transition .3s
  box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);
  &:hover
    cursor pointer
    box-shadow 0px 1px 16px 2px rgba(0,0,0,.1)
    & ^[0]__info
      opacity 1
  border-radius 4px
  &__title
    display inline-block
    padding-left 1rem
  &__info
    transition opacity 0.3s ease
    opacity 0
    display inline-block
    padding-right 1rem
    float right
    font-size 15px
    color var(--secondary-text)
  &__pages
    padding-bottom 2rem
    padding-left 1.5rem
    padding-right 1.5rem
    animation slow-in .5s

@media (max-width: $MQMobile)
  .zl-item
    width 100%
    &__info
      display none
    .el-link
      font-size .8rem

@keyframes slow-in
  0%
    max-height 0
  100%
    max-height 600px
</style>
