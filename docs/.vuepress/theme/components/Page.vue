<template>
  <main class="page" :class="{'need-zoom': isBlog}">
    <slot name="top" />
    <div class="my-main">
      <div :class="mainClass">
        <!-- 文章标题区域 -->
        <div ref="title" class="my-title-box" v-if="isBlog">
          <h2>{{ this.$page.title }}</h2>
          <div class="my-title-info">
            <!-- 标题下面的信息栏 -->
            <span :id="$page.path" class="leancloud-visitors" :data-flag-title="$page.title">
              <span>作者：{{ this.$page.author || '朱昆鹏' }}</span> &ensp;
              <span>{{ formatDate(this.$page.frontmatter.date) }} &ensp;</span>
              <i class="el-icon-view" style="margin-right: 3px;" />
              <span class="leancloud-visitors-count"></span>
            </span>
          </div>
        </div>
        <Content class="theme-default-content" />
        <footer class="page-edit" v-if="showFooter">
          <!-- <div class="edit-link" v-if="editLink">
            <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
            <OutboundLink />
          </div> -->

          <div class="last-updated" v-if="lastUpdated">
            <span class="prefix">{{ lastUpdatedText }}:</span>
            <span class="time">{{ lastUpdated }}</span>
          </div>
        </footer>

        <div class="page-nav" v-if="prev || next">
          <p class="inner">
            <span v-if="prev" class="prev">
              ←
              <router-link v-if="prev" class="prev" :to="prev.path">{{ prev.title || prev.path }}</router-link>
            </span>

            <span v-if="next" class="next">
              <router-link v-if="next" :to="next.path">{{ next.title || next.path }}</router-link>→
            </span>
          </p>
        </div>
        <valine v-if="!hideComment"></valine>
      </div>
      <div v-if="hideContent" class="my-main-right">
        <div style="font-size:14px">
          <!-- <a href="https://me.csdn.net/jaykm" target="_blank">CSDN</a> &nbsp;   -->
          <a href="https://github.com/zhukunpenglinyutong" target="_blank">GitHub</a> &nbsp; 
          <a href="https://juejin.cn/user/2788017219055175" target="_blank">掘金</a> &nbsp; 
          <!-- <a href="270750933@qq.com">邮件</a> -->
        </div>
        <div class="my-menu">
          <h4 style="margin-top: 0;">目录</h4>
          <a
            v-for="menu in renderMenus"
            :href="$page.path + '#' + menu.slug"
            :class="{
              'my-menu__lv2': menu.level===2,
              'my-menu__lv3': menu.level===3,
            }"
          >{{ menu.title }}</a>
        </div>
      </div>
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
import { resolvePage, outboundRE, endingSlashRE } from "../util";
import Valine from "@theme/components/Valine.vue";

export default {
  props: ["sidebarItems"],
  components: { Valine },
  computed: {
    mainClass() {
      return {
        "my-main-left": true,
        "notBlog": !this.isBlog,
        "theme-paper":
          this.$page.frontmatter.tag &&
          this.$page.frontmatter.tag.includes("碎碎念")
      };
    },

    hideContent() {
      // 判断是否隐藏目录
      if (this.$page.frontmatter.categories) {
          return this.$page.frontmatter.categories !== 'noRight'
      }
      return true
    },

    hideComment() {
      return this.$page.frontmatter.hideComment
    },

    renderMenus() {
      return this.$page.headers;
    },

    isBlog() {
      // 判断是否是博客文章
      if (this.$page.frontmatter.tag) {
        return this.$page.frontmatter.tag.includes("blog");
      }
      return false;
    },

    showFooter() {
      return !this.$page.frontmatter.hideFooter;
    },

    lastUpdated() {
      // 通过 hideLastUpdated 标签来判断是否隐藏该标签
      if (this.$page.frontmatter.hideLastUpdated) {
        return false;
      }
      return this.$page.lastUpdated;
    },

    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "修改于";
    },

    prev() {
      const prev = this.$page.frontmatter.prev;
      if (prev === false) {
        return;
      } else if (prev) {
        prev.path = this.checkPath(prev.path)
        return prev;
      }
    },

    next() {
      // 修改部分逻辑
      const next = this.$page.frontmatter.next;
      if (next === false) {
        return;
      } else if (next) {
        next.path = this.checkPath(next.path)
        return next;
      }
    },
  },

  methods: {
    checkPath(path) {
      return path.endsWith('/') ? path : path + '/'
    },
    createEditLink(repo, docsRepo, docsDir, docsBranch, path) {
      const bitbucket = /bitbucket.org/;
      if (bitbucket.test(repo)) {
        const base = outboundRE.test(docsRepo) ? docsRepo : repo;
        return (
          base.replace(endingSlashRE, "") +
          `/src` +
          `/${docsBranch}/` +
          (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
          path +
          `?mode=edit&spa=0&at=${docsBranch}&fileviewer=file-view-default`
        );
      }

      const base = outboundRE.test(docsRepo)
        ? docsRepo
        : `https://github.com/${docsRepo}`;
      return (
        base.replace(endingSlashRE, "") +
        `/edit` +
        `/${docsBranch}/` +
        (docsDir ? docsDir.replace(endingSlashRE, "") + "/" : "") +
        path
      );
    },
    formatDate(date) {
      date = new Date(date);

      return `${date.getFullYear()} 年 ${date.getMonth() + 1} 月 ${date.getDate()} 日`;
    }
  }
};

function resolvePrev(page, items) {
  return find(page, items, -1);
}

function resolveNext(page, items) {
  return find(page, items, 1);
}

function find(page, items, offset) {
  const res = [];
  flatten(items, res);
  for (let i = 0; i < res.length; i++) {
    const cur = res[i];
    if (cur.type === "page" && cur.path === decodeURIComponent(page.path)) {
      return res[i + offset];
    }
  }
}

function flatten(items, res) {
  for (let i = 0, l = items.length; i < l; i++) {
    if (items[i].type === "group") {
      flatten(items[i].children || [], res);
    } else {
      res.push(items[i]);
    }
  }
}
</script>

<style lang="stylus">
@require '../styles/wrapper.styl';

.my-main {
  max-width: 70rem;
  min-height: 90vh;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
}

.my-title-box {
  @extend $wrapper;
  border-bottom: 1px solid var(--border-color);
  .my-title-info {
    color var(--secondary-text)
  }
    
}

.notBlog {
  margin: 0 auto;
}

.my-main-left, .my-main-right>* {
  background-color: var(--card-color);
  box-shadow: 0 1px 2px 0 var(--box-shadow);
}  

.my-main-left {
  position: relative;
  max-width: 53rem;
  padding-bottom: 2rem;
  width: 100%;
}

.my-main-right {
  margin-left: 1rem;
  width: 300px;

  div + div {
    margin-top: 0.6rem;
  }

  >* {
    padding: 1rem;
  }

  .my-menu {
    position: sticky;
    top: 70px;
    height: 85vh;
    overflow-y: scroll;
    overflow-x: hidden;

    &__lv2, &__lv3 {
      display: block;
      vertical-align: middle;
      line-height: 17px;
      color: var(--secondary-text);
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__lv3 {
      margin-top: 8px;
      padding-left: 1rem;
      font-weight: 400;
      font-size: 13px;

      &::before {
        content: '- ';
      }
    }

    &__lv2 {
      margin-top: 16px;
      font-weight: 600;
      font-size: 14px;
    }
  }
}

@media (max-width: 1100px) {
  .my-main-left {
    margin: 0 auto;
  }

  .my-main-right {
    display: none;
  }
}

.page {
  padding: 4.5rem 0 2rem 0;
  display: block;
  background: var(--bg-color);
  min-height: 100vh;
}

.theme-paper {
  @extend $wrapper;
  lo-ft-size = 17px
  font-family: serif;
  font-size: 17px;
  margin: 0 auto;
  .my-title-box {
    text-align: center;
  } 

  .content__default {
    ol, p, ul {
      line-height: 2;
      text-indent: 2 * (lo-ft-size + 1);
    }
  }
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      // color: lighten(var(--regular-text), 25%);
      color var(--regular-text)
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      // color: lighten(var(--regular-text), 25%);
      color var(--regular-text)
    }

    .time {
      font-weight: 400;
      // color: lighten(var(--regular-text), 25%);
      color var(--regular-text)
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  .theme-paper {
    lo-ft-size = 16px
  }
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}

::-webkit-scrollbar {
    width: 4px;
    height: 4px;
}
::-webkit-scrollbar-track {
    border-radius: 3px;
    background: rgba(0,0,0,0.06);
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.08);
}
::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background: rgba(0,0,0,0.12);
    -webkit-box-shadow: inset 0 0 10px rgba(0,0,0,0.2);
}
</style>
