# 知识如果不记录，就会流失90%

[![License](https://img.shields.io/github/license/zhukunpenglinyutong/notes.svg)](LICENSE)
[![repo-size](https://img.shields.io/github/repo-size/zhukunpenglinyutong/notes.svg)](repo-size)
[![CodeTriage](https://www.codetriage.com/zhukunpenglinyutong/notes/badges/users.svg)](CodeTriage)
[![提交活动](https://img.shields.io/github/commit-activity/m/zhukunpenglinyutong/notes.svg)](提交活动)
[![最后一次提交](https://img.shields.io/github/last-commit/zhukunpenglinyutong/notes.svg)](最后一次提交)

<img src="https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1559637808&di=b2b7de8007a8e1c5e3ea07f3b2ae0192&src=http://5b0988e595225.cdn.sohucs.com/images/20171230/a540bdf43bdc49828f40a8a0e50ae762.jpeg" />

---

# 更佳体验

要想获得更佳体验，请访问 [notes.itzkp.com](https://notes.itzkp.com)

---

# 项目说明

### 1.quickcheck（速查）

放着系统性的知识笔记系统，熟悉内容之后，可以快速查阅内容，方便的很

### 2.note（笔记）

主要放着项目规划，每日记录，还有一些知识笔记

### 3.项目更新日志

[查看更新日志](https://github.com/zhukunpenglinyutong/notes/blob/master/record.md)

---

# notes.itzkp.com 构建

### 1.网站构建过程（基础版）

**环境依赖：node**

- [node官方下载](https://nodejs.org/en/download/)
- [notes.itzkp.com node安装教程（更快速的安装 Centos系统下）](https://notes.itzkp.com/1.quickcheck/3.%E8%BF%90%E7%BB%B4/1.Centos%E4%B8%8B%E5%AE%89%E8%A3%85%E5%90%84%E7%A7%8D%E8%BD%AF%E4%BB%B6.html#_1-%E5%AE%89%E8%A3%85nodejs)

```sh
npm install
npm run dev（预览，VuePress会启动一个预览的网址）
npm run build（打包，打包后资源在 docs/.vuepress/dist下）
```

**构建原理说明**：根据app.js 书写匹配规则和进行目录调整，达到VuePress能够识别的程度

---

### 2.网站CI/CD实现（基础版）

**环境依赖：Jenkins**

更新中......

---

# 致谢

致谢所有 star 和 关注我的 朋友们，多谢你们的鼓励和支持 🦀🦀🦀 ，维护一个项目是一个长跑 🏃，这比的是谁能够坚持下去，多谢各位的行动给我的鼓励，我会继续加油的，以掘金阴明为第一个偶像，向偶像看齐!!!
