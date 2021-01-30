module.exports = {
  head: [
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['link', { rel: 'apple-touch-icon', href: '/favicon.ico' }],
  ],
  title: '朱昆鹏',
  description: '朱昆鹏 个人博客',
  permalink: "/:year/:month-:day-:slug",
  themeConfig: {
    sidebar: false,
    github: "https://github.com/zhukunpenglinyutong/",
    logo: '/avatar.jpg',
    lastUpdated: '修改于',
    search: true,
    searchMaxSuggestions: 6,
    nav: [
      { text: '📃 文章', link: '/blog/' },
      { text: '🚥 导航', link: '/guide/' },
      { text: '🔗 友链', link: '/links/' },
      // { text: '📰 专栏', link: '/zhuanlan/' },
      // { text: '🤪 动态', link: '/zone/' },
      {
        text: '🔨 其他',
        items: [
          { text: '📰 个人介绍', link: '/my/' }
        ]
      }
    ]
  },
  // plugins: ['@vuepress/pwa'],
  plugins: {
    '@vuepress/medium-zoom': {
      selector: '.need-zoom :not(a) > img',
      options: {
        margin: 16,
        background: 'rgba(0,0,0,0.7)'
      }
    },
    'vuepress-plugin-smooth-scroll':{},
    'vuepress-plugin-mathjax': {
      macros: {
        '\\Z': '\\mathbb{Z}',
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        // '@alias': 'src/'
      }
    }
  }
}