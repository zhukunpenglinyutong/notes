# 知识如果不记录，就会流失90%

<p align="center">
    <a href="javascript:;"><img src="https://img.shields.io/github/license/zhukunpenglinyutong/notes.svg" alt="LICENSE"></a>
    <a href="javascript:;"><img src="https://img.shields.io/github/repo-size/zhukunpenglinyutong/notes.svg" alt="repo-size"></a>
    <a href="javascript:;"><img src="https://www.codetriage.com/zhukunpenglinyutong/notes/badges/users.svg" alt="CodeTriage"></a>
    <a href="javascript:;"><img src="https://img.shields.io/github/commit-activity/m/zhukunpenglinyutong/notes.svg" alt="提交活动"></a>
    <a href="javascript:;"><img src="https://img.shields.io/github/last-commit/zhukunpenglinyutong/notes.svg" alt="最后一次提交"></a>
    <img style="width:80%" src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1559637808&di=b2b7de8007a8e1c5e3ea07f3b2ae0192&src=http://5b0988e595225.cdn.sohucs.com/images/20171230/a540bdf43bdc49828f40a8a0e50ae762.jpeg" />
</p>

---

**注意：本项目vuepress的配置工作， 已经转为 [vuepress-es](https://www.npmjs.com/package/vuepress-es) npm包 自动生成，已经删除 app.js Node 处理函数**

---

## 🏅前言

这几天在重构此项目，优化体验，因为以前都是工作的时候，有收获的，能提交的话，很快的提交，内容没有润色，结构比较混乱，正好最近辞职没事，还没有面试机会，就想拿出时间进行优化一下吧

之前的结构是很乱，只能我自己看懂（我是这么认为的），但是有了这个网站，也节省了我70%以上的时间了，我觉得优化一下，也是很有必要的

整理工作是先从 前端体系进行，然后在结束或者过程中，逐渐优化 速查部分

此网站更佳的查阅体验，请访问 

- [自己服务器托管的-Notes（最近更新：2019.9.10）](https://notes.itzkp.com)
- [GitHub托管的-Notes（最近更新：2019.9.11 下午）](https://zhukunpenglinyutong.github.io/)

---

## 🎉项目说明

补充一个视频介绍

---

## 🎖使用说明

```sh
# 克隆
git clone https://github.com/zhukunpenglinyutong/notes.git

# 安装依赖
npm install

# 预览，VuePress会启动一个预览的网址
npm run serve

# 打包，打包后资源在 build/.vuepress/dist下
npm run build

```

[构建说明，为什么首页的几个文件夹，就能生成网站？而不用配置VuePress？ 因为我封装了一个NPM工具...vuepress-es](https://www.npmjs.com/package/vuepress-es)

---

## 🎗文件说明

- **1.quickcheck**：放着系统性的知识笔记系统，可以快速查阅内容，极大的提高开发效率（内容重构中）
- **2.note**：系统化的前端笔记（作者目前所能大致掌握的所有内容）（内容重构中）
- **3.other**：作者个人杂项（如果有兴趣相同的，可以一起交流哦）

---

### 🏆近期计划

> 2019.9.11日起 主要归并：H5 和 移动端 部分

- [ ] 前端体系（note）
    - [ ] 🔥6.移动端
        - [x] [0.移动端开发绪论](https://zhukunpenglinyutong.github.io/2.note/6.%E7%A7%BB%E5%8A%A8%E7%AB%AF/0.移动端开发绪论.html)
            - [x] ⏱第一部分：移动端发展历史
            - [x] 📡第二部分：移动端技术发展历史
            - [x] 📱第三部分：手机硬件组成
        - [ ] 1.HTML5混生开发
        - [x] [2.微信小程序](https://zhukunpenglinyutong.github.io/2.note/6.%E7%A7%BB%E5%8A%A8%E7%AB%AF/2.%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F.html)
        - [ ] 3.Flutter
        - [ ] 4.React-Native
    - [ ] 1.HTML
        - [x] [1.HTML基础](https://zhukunpenglinyutong.github.io/2.note/1.HTML/1.HTML%E5%9F%BA%E7%A1%80.html)
        - [ ] 2.HTML5
    - [ ] 2.CSS
        - [ ] [1.CSS基础](https://zhukunpenglinyutong.github.io/2.note/2.CSS/1.CSS%E5%9F%BA%E7%A1%80.html)
        - [ ] 2.CSS3
        - [x] [3.现代化CSS](https://zhukunpenglinyutong.github.io/2.note/2.CSS/3.%E7%8E%B0%E4%BB%A3%E5%8C%96CSS.html)
    - [ ] 5.1MVVM框架Vue
        - [x] [1.MVVM框架绪论](https://zhukunpenglinyutong.github.io/2.note/5.1MVVM%E6%A1%86%E6%9E%B6%EF%BC%88Vue%EF%BC%89/1.MVVM%E6%A1%86%E6%9E%B6%E7%BB%AA%E8%AE%BA.html)
        - [x] [2.Vue基础](https://zhukunpenglinyutong.github.io/2.note/5.1MVVM%E6%A1%86%E6%9E%B6%EF%BC%88Vue%EF%BC%89/2.Vue%E5%9F%BA%E7%A1%80.html)
        - [x] [3.Vue全家桶](https://zhukunpenglinyutong.github.io/2.note/5.1MVVM%E6%A1%86%E6%9E%B6%EF%BC%88Vue%EF%BC%89/3.Vue%E5%85%A8%E5%AE%B6%E6%A1%B6.html)
        - [ ] 4.Vue源码解析以及实现
        - [ ] 5.VueRouter源码解析以及实现
        - [ ] 6.Vuex源码解析以及实现
        - [ ] 7.Axios源码解析以及实现
    - [ ] 3.JavaScript
        - [x] 重构 [1.JavaScript根基](https://zhukunpenglinyutong.github.io/2.note/3.JavaScript/1.JavaScript%E6%A0%B9%E5%9F%BA.html)
        - [x] 重构 [2.JavaScript深入](https://zhukunpenglinyutong.github.io/2.note/3.JavaScript/2.JavaScript深入.html)
        - [ ] 重构 3.JavaScript应用
    - [x] 8.0网络/[1.前端网络基础](https://zhukunpenglinyutong.github.io/2.note/8.0%E7%BD%91%E7%BB%9C/1.%E5%89%8D%E7%AB%AF%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80.html)
    - [ ] 重构 8.1前端工程化/[1.Webpack](https://zhukunpenglinyutong.github.io/2.note/8.1%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%8C%96/1.Webpack.html)
        - [x] 🗂第一部分webpack初步探索
        - [x] 📕第二部分：loader
        - [x] 📗第三部分：plugins（插件）
        - [x] 📘第四部分：其他配置
        - [ ] 📙第五部分：webpack高级
        - [ ] ...
     - [x] 重构 8.2前端安全/[2.前端基本防护](https://zhukunpenglinyutong.github.io/2.note/8.2%20%E5%89%8D%E7%AB%AF%E5%AE%89%E5%85%A8/2.%E5%89%8D%E7%AB%AF%E5%9F%BA%E6%9C%AC%E9%98%B2%E6%8A%A4.html)
    - [ ] 重构 8.4前端代码质量/[2.前端测试框架Jest](https://zhukunpenglinyutong.github.io/2.note/8.4%E5%89%8D%E7%AB%AF%E4%BB%A3%E7%A0%81%E8%B4%A8%E9%87%8F/2.%E5%89%8D%E7%AB%AF%E6%B5%8B%E8%AF%95%E6%A1%86%E6%9E%B6Jest.html#%E2%9B%84%EF%B8%8F%E7%AC%AC%E4%B8%80%E9%83%A8%E5%88%86%EF%BC%9Ajest%E5%9F%BA%E7%A1%80)
        - [x] ⛄️第一部分：Jest基础
        - [x] 💦第二部分：Jest中的日常使用
        - [ ] ...

[更详细进度，请查看](https://github.com/zhukunpenglinyutong/notes/blob/master/Plan.md)

---


## 🎨 不足与请教

因为入行的时间太短（2018.6 开始工作），所以项目会有很多地方不完善。各位前行者，大佬们，如果看出这个项目有的地方可以完善，或者有的地方不好，我拜求各位的指点，我会以很快的速度验证，然后更改的。我会时刻以谦逊姿态请教学习，高调的热情创造宣传，我期待各位大佬们能指出我的不足，我定会虚心请教，牢记恩情。（很多思想不是我不用，是我不知道，所以拜求指教）

**个人微信，拜求指点，不胜感激**

<img src="https://itzkp-1253302184.cos.ap-beijing.myqcloud.com/notes/%E5%85%B6%E4%BB%96/3.png">

---

## 👓 内推与招聘

最近并没有明确的工作录取，所以还是无业状态，如果有朋友有内推机会，或者想进行招聘，可以联系我（WX:lyglyglyg666666）

我不说我的优势，我说一下我的劣势：21岁，实际工作经验1年2个月，专科应届

我只知道接下来的一年的第一个阶段，我将会更着重发展 效率 + xxx 的探索，这个 xxx 是 移动端，还是Node，还是其他，要取决于下一份工作的内容（精力不够，只能选择一个）

并且一年之内 将会逐步实践 我觉得有价值的一套简单的前端体系  [具体可见-前端架构](https://zhukunpenglinyutong.github.io/2.note/8.6%E5%89%8D%E7%AB%AF%E6%9E%B6%E6%9E%84/1.%E5%89%8D%E7%AB%AF%E6%9E%B6%E6%9E%84.html)

目前已实践：第一部分：Cli全栈化 下面的第一个模块 [vuepress-es](https://www.npmjs.com/package/vuepress-es)，是单纯的提高效率的工具链 没有 效率 + xxx，我也期待下一家公司的技术栈，想想就激动。


---

## 💌 致谢

致谢所有 star 和 关注我的 朋友们，多谢你们的鼓励和支持 🦀🦀🦀 ，维护一个项目是一个长跑 🏃，这比的是谁能够坚持下去，多谢各位的行动给我的鼓励，我会继续加油的，以掘金（创造了技术交流圈）为偶像，向偶像看齐!!! 并致力于打造技术工具链，节省时间，本项目是为了节省自己开发效率而制作的，也是为了另一个项目 itztool（开发者 + itztool = 超人） 进行的前置尝试，敬请期待。
