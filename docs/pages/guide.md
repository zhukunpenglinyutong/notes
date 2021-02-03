---
title: "导航"
permalink: "guide"
hideLastUpdated: True
categories: noRight
---

<template>
  <div class="my-guide-container">
    <el-tabs v-model="activeName" type="card">
      <!-- 不同的面板 -->
      <el-tab-pane v-for="(tab, ind1) in tabs" :key="ind1" :label="tab.label" :name="tab.name">
        <div v-for="(myClass, ind2) in tab.classes" :key="ind2">
          <!-- 标题 -->
          <div class="my-class-title" @click="addLink(ind1, ind2)">
            {{ myClass.title }}
          </div>
          <!-- 链接小卡片 -->
          <div class="my-classes-box">
            <a :href="link.link" v-for="(link, ind3) in myClass.links" :key="ind3" target="_blank">
              <div class="my-link-box">
                <div class="my-link-box__name">{{ link.name }}</div>
                <div class="my-link-box__description">{{ link.description }}</div>
              </div>
            </a>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      activeName: 'one',
      tabs: [{
          "label": "计算机",
          "name": "one",
          "classes": [{
            "title": "建本站",
            "links": [{
              "name": "Vuepress",
              "description": "静态网站生成器",
              "link": "https://www.google.com"
            }, {
              "name": "GitHub",
              "description": "全球最大XX网站",
              "link": "https://www.github.com"
            }, {
              "name": "Valine",
              "description": "无后端评论系统",
              "link": "https://valine.js.org/"
            }, {
              "name": "serverleess",
              "description": "serverleess 云服务",
              "link": "https://leancloud.cn/dashboard/applist.html#/apps"
            }]
          }, {
            "title": "资讯网站",
            "links": [{
              "name": "Google",
              "description": "最常用的网站",
              "link": "https://www.google.com"
            }, {
              "name": "InfoQ",
              "description": "技术论坛",
              "link": "https://www.infoq.cn/"
            },  {
              "name": "Creative",
              "description": "灵感与创意",
              "link": "https://creativemass.cn/#/"
            }, {
              "link": "https://juejin.im/",
              "name": "掘金",
              "description": "开发者社区"
            }, {
              "link": "https://search.chongbuluo.com/",
              "name": "快搜",
              "description": "搜索快人一步"
            }]
          }, {
            "title": "在线工具",
            "links": [{
              "name": "ProcessOn",
              "description": "在线作图",
              "link": "https://www.processon.com/"
            }, {
              "name": "GitMind",
              "description": "在线脑图",
              "link": "https://app.gitmind.cn/"
            }, {
              "name": "CN-Office",
              "description": "在线格式转换",
              "link": "https://cn.office-converter.com"
            }, {
              "name": "语雀",
              "description": "文档协作平台",
              "link": "https://www.yuque.com/"
            }, {
              "name": "Carbon",
              "description": "代码截图工具",
              "link": "https://carbon.now.sh/"
            }, {
              "name": "NICRTOOL+",
              "description": "常用工具合集",
              "link": "http://www.nicetool.net/"
            }, {
              "link": "https://repl.it/",
              "name": "Repl.it",
              "description": "在线IDE"
            }, {
              "link": "https://www.notion.so/",
              "name": "Notion",
              "description": "理想的笔记软件"
            }, {
              "link": "https://www.overleaf.com/",
              "name": "Overleaf",
              "description": "Online LaTeX Editor"
            }, {
              "link": "https://www.urlgot.top/",
              "name": "Urlgot",
              "description": "在线视频下载"
            }, {
              "link": "https://tool.lu/",
              "name": "在线工具",
              "description": "就是叫在线工具"
            }]
          }, {
            "title": "电子读物",
            "links": [{
              "name": "自我修养",
              "description": "基础读物",
              "link": "https://legacy.gitbook.com/book/leohxj/a-programmer-prepares/details"
            }, {
              "name": "Markdown",
              "description": "Markdown 教程",
              "link": "https://shd101wyy.github.io/markdown-preview-enhanced/#/zh-cn/"
            }, {
              "name": "Docker",
              "description": "从入门到实践",
              "link": "https://legacy.gitbook.com/book/yeasy/docker_practice/details"
            }, {
              "link": "https://github.com/alivebao/clean-code-js",
              "name": "JS 风格指南",
              "description": "基于代码整洁之道"
            }, {
              "link": "http://turnoff.us/",
              "name": "{ turnoff }",
              "description": "有趣的漫画"
            }]
          }]
        }, {
          "label": "前端",
          "name": "three",
          "classes": [{
            "title": "速查平台",
            "links": [{
              "name": "W3CSchool",
              "description": "词典网站",
              "link": "https://www.w3cschool.cn/dict/"
            }, {
              "name": "印记中文",
              "description": "前端文档资源",
              "link": "https://docschina.org/"
            }, {
              "link": "https://www.kaolamedia.com/",
              "name": "新媒体导航",
              "description": "新媒体工具"
            }]
          }, {
            "title": "资源平台",
            "links": [{
              "name": "IconFont",
              "description": "阿里图标库",
              "link": "https://iconfont.cn/"
            }, {
              "name": "EasyIcon",
              "description": "比较全的图标库",
              "link": "https://www.easyicon.net"
            }, {
              "name": "ColorHunt",
              "description": "配色参考网站",
              "link": "https://colorhunt.co"
            }, {
              "name": "Khroma",
              "description": "利用AI训练颜色*",
              "link": "http://khroma.co/"
            }, {
              "name": "Grabient",
              "description": "渐变色调色",
              "link": "https://www.grabient.com/"
            }, {
              "name": "Grabient",
              "description": "渐变色调色",
              "link": "https://www.grabient.com/"
            }, {
              "name": "unDraw",
              "description": "插画搜索、多",
              "link": "https://undraw.co/"
            }, {
              "name": "IRA",
              "description": "插画推荐",
              "link": "https://iradesign.io/"
            }, {
              "name": "Whoosh",
              "description": "有趣的插画",
              "link": "https://www.ls.graphics/whoosh"
            }, {
              "name": "Cssfx",
              "description": "即拿即用的CSS",
              "link": "https://cssfx.dev/"
            }, {
              "link": "https://dribbble.com/",
              "name": "Dribbble",
              "description": "短平快作品"
            }, {
              "link": "https://daneden.github.io/animate.css/",
              "name": "Animate.css",
              "description": "前端动效库"
            }, {
              "link": "https://www.minimamente.com/project/magic/",
              "name": "Magic CSS3",
              "description": "CSS3 特殊动效"
            }]
          }, {
            "title": "前端工具",
            "links": [{
              "name": "Tools",
              "description": "前端工具推荐",
              "link": "https://illustration.tools/"
            }, {
              "link": "https://animista.net/",
              "name": "Animista*",
              "description": "生成CSS动画"
            }, {
              "link": "https://mdnice.com/",
              "name": "MarkdownNice",
              "description": "微信排版优化"
            }, {
              "link": "https://www.canva.cn/",
              "name": "Canva",
              "description": "封面制作"
            }]
          }]
        }, {
          "label": "深度学习",
          "name": "four",
          "classes": [{
            "title": "课程文档",
            "links": [{
              "name": "吴恩达",
              "description": "全面、基础",
              "link": "https://study.163.com/course/courseMain.htm?courseId=1004570029"
            }, {
              "link": "https://www.bilibili.com/video/av71325898",
              "name": "MIT",
              "description": "迈向人工智能"
            }, {
              "link": "https://tf.wiki/zh_hans/",
              "name": "TensorFlow",
              "description": "简单粗暴TF2"
            }, {
              "link": "https://zh.d2l.ai/chapter_how-to-use/how-to-use.html",
              "name": "深度学习",
              "description": "动手学深度学习"
            }]
          }, {
            "title": "课程资料",
            "links": [{
              "name": "课程笔记",
              "description": "吴恩达课程的笔记",
              "link": "https://github.com/fengdu78/Coursera-ML-AndrewNg-Notes"
            }, {
              "link": "https://www.cnblogs.com/kplayer/p/9439708.html",
              "name": "MIT人工智能",
              "description": "课程笔记"
            }, {
              "link": "https://www.cnblogs.com/findumars/p/5009003.html",
              "name": "牛人博客",
              "description": "优秀博客以及代码汇总"
            }]
          }, {
            "title": "在线工具",
            "links": [{
              "link": "https://colab.research.google.com/",
              "name": "Colab",
              "description": "在线 TensorFlow"
            }, {
              "link": "https://sci-hub.se/",
              "name": "Sci-Hub",
              "description": "论文下载网站"
            }]
          }, {
            "title": "在线文档",
            "links": [{
              "link": "https://requests.readthedocs.io/zh_CN/latest/",
              "name": "Requests库",
              "description": "Python HTTP 库爬虫"
            }, {
              "link": "https://beautifulsoup.readthedocs.io/zh_CN/v4.4.0/",
              "name": "BeautifulSoup",
              "description": "Python 爬虫解析库"
            }, {
              "link": "https://docs.python.org/zh-cn/3/",
              "name": "Python",
              "description": "官方中文文档"
            }, {
              "link": "https://scipy.org/",
              "name": "Scipy",
              "description": "科学计算库"
            }, {
              "link": "https://www.numpy.org.cn/",
              "name": "Numpy",
              "description": "Numpy 中文网"
            }, {
              "link": "https://www.matplotlib.org.cn/",
              "name": "Matplotlib",
              "description": "Matplotlib 中文网"
            }, {
              "link": "https://www.pypandas.cn/",
              "name": "Pandas",
              "description": "Pandas 中文网"
            }]
          }]
        }, {
          "label": "图像处理",
          "name": "five",
          "classes": [{
            "title": "常用期刊",
            "links": [{
              "name": "CCF",
              "description": "图形学与多媒体",
              "link": "https://www.ccf.org.cn/xspj/jsjtxxydmt/"
            }, {
              "link": "https://ieeexplore.ieee.org/xpl/topAccessedArticles.jsp?punumber=34",
              "name": "IEEE",
              "description": "图像相关的论文"
            }, {
              "link": "http://www.guide2research.com/journals/computer-vision",
              "name": "Guide2Research",
              "description": "计算机视觉导航"
            }]
          }]
      }],
      count: 0
    };
  },

  methods: {
    addLink(ind1, ind2) {
      if (this.count++ < 10) {
        return
      }
      this.count = 0
      var tmplink = {
        ind1: ind1,
        ind2: ind2,
        link: {},
        token: ''
      };
      this.$prompt('输入链接地址', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        tmplink.link.link = value;
        this.$prompt('请输入站点名称', '名称', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          tmplink.link.name = value;
          this.$prompt('请输入站点描述', '描述', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
          }).then(({ value }) => {
            tmplink.link.description = value;
            this.$prompt('先告诉我 Token 是啥😇', '提示', {
              confirmButtonText: 'Yaeh',
              cancelButtonText: 'Nope',
              inputPattern: /^[A-Za-z0-9]{5,13}$/,
              inputErrorMessage: 'Token 格式不正确😕'
            }).then(({ value }) => {
              tmplink.token = value;
              this.upload(tmplink);
              console.log(tmplink);
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '🥱不告诉算了。。。'
              });       
            });
          })
        })
      });
    },
  },
  mounted() {
  }
};
</script>

<style lang="stylus" scoped>
.my-classes-box {
  display: flex;
  flex-wrap: wrap;
}

.my-classes-box a:hover {
  text-decoration: none;
}

.my-class-title {
  letter-spacing: 2px;
  width: 5rem;
  text-align: center;
  padding: .4rem 1rem;
  margin: 1rem 0;
  font-weight: 600;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.my-link-box {
  width: 8.7rem;
  height: 4rem;
  /* margin: 0.4rem; */
  margin: 0 0.4rem 0.6rem 0
  background-color: var(--bg-color);
  border: 1px solid Border;
  border-radius: 3px;
  text-align: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: flex;
  justify-content: center;
  flex-direction: column;
  transition:all 0.2s;

  &__name {
    margin-bottom: 5px;
  }

  &__description {
    font-size: smaller; 
    text-overflow: ellipsis;
  }
}

.my-link-box:hover {
  transform: scale(1.05);
}

@media (max-width: $MQMobile) {
  .my-class-title {
    margin: 1rem auto;
  }
  .my-classes-box {    
    padding: 0;
    flex-direction: column
    .my-link-box {
      width: auto;
      margin-top: 8px;
    }
  }
}
</style>

<style lang="stylus">
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-bottom: none
  color: var(--main-color);
  font-weight: 600;
}

.el-tabs--card>.el-tabs__header {
  border-bottom: 1px solid var(--bg-color);
  .el-tabs__item {
    border-left-color: var(--bg-color)
    color: var(--secondary-text);
    &:hover {
      color: var(--main-color);
    }
  }
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: 1px solid var(--bg-color);
  border-bottom: none;
}
</style>
