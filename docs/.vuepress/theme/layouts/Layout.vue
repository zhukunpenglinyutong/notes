<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <el-backtop></el-backtop>

    <div id="my-bg" :class="{ 'my-bg-home': $page.frontmatter.home }"></div>

    <Navbar :class="{
          'my-nav-home': $page.frontmatter.home && !scrollFlag, 
          'my-nav': !$page.frontmatter.home || scrollFlag
        }"
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />

    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    ></div>

    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <slot
        name="sidebar-top"
        slot="top"
      />
      <slot
        name="sidebar-bottom"
        slot="bottom"
      />
    </Sidebar>

    <Home v-if="$page.frontmatter.home"/>

    <div v-else>
      <Page
        :sidebar-items="sidebarItems"
      >
        <slot
          name="page-top"
          slot="top"
        />
        <slot
          name="page-bottom"
          slot="bottom"
        />
      </Page>
    </div>
    
    <div class="footer">
      © 2019-2021 ❤️ 朱昆鹏<br>
      <!-- <a href="http://www.beian.miit.gov.cn" target="_blank">皖 ICP 备 19016269 号</a><br> -->
      <!-- <a href="https://me.csdn.net/jaykm" target="_blank">CSDN</a> &nbsp;   -->
      <a href="https://github.com/zhukunpenglinyutong" target="_blank">GitHub</a> &nbsp; 
      <a href="https://juejin.cn/user/2788017219055175" target="_blank">掘金</a><br>
      <!-- <a href="270750933@qq.com">发送邮件</a> -->
    </div>
  </div>
</template>

<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'

export default {
  components: { Home, Page, Sidebar, Navbar },

  data () {
    return {
      isSidebarOpen: false,
      scrollFlag: false
    }
  },

  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },

    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },

    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },

    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar,
          'my-layout-container': this.$page.frontmatter.home
        },
        userPageClass
      ]
    },

    navClasses () {
      return [
        {
          'my-nav-home': this.$page.frontmatter.home && !this.scrollFlag, 
          'my-nav': !this.$page.frontmatter.home || this.scrollFlag
        }
      ]
    }
  },

  mounted () {
    // 监听滚动事件
    window.addEventListener('scroll', this.myScroll)

    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
  },

  
  destroyed () {
    window.removeEventListener('scroll', this.myScroll)
  },

  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
    },

    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },

    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    },

    myScroll () {
      const that = this
      // 获取背景的高度
      var bg = document.getElementById('my-bg');
      var bgHeight = bg.offsetHeight;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop

      if (that.scrollTop > bgHeight / 5) {
        that.scrollFlag = true
      } else {
        that.scrollFlag = false
      }
    }
  }
}
</script>

<style lang="stylus">
/* 隐藏滚动条 */ 
::-webkit-scrollbar {
  width: 0.4rem !important;
  height: 0.4rem !important;
  cursor: pointer;
}

::-webkit-scrollbar-thumb {
  background-color: var(--secondary-text);
  border-radius: 3px;
  transition: .3s ease;
}

::-webkit-scrollbar-thumb:hover {
  background-color: var(--border-color)
  // background-color: darken(var(--border-color), 30%);
}

/**修改选中的颜色以及背景 */
::selection {
  color: #fff;
  background: #282c34;
}

.my-layout-container {
  user-select:none;
}

.my-bg-home {
  position: absolute;
  width: 100%;
  height: 32rem;
  background-color: $darkNavColor;
  background-image: url('./img/bg.jpg')
  animation: gradientBG 60s linear infinite;
  background-size: 150%;
  z-index: -1;
  &::before {
    content ''
    width 100%
    height 100%
    position absolute
    background #00000055
  }
}

.my-nav-home {
  background-color: $darkNavColor;
  color: white;
  border: 0;
}

.my-nav-home .site-name {
  color: white
}

.my-nav {
  background-color: var(--card-color);
  /*box-shadow: 0 1px 2px 0 rgba(34,36,38,.15);*/
	border-bottom: 1px solid var(--border-color)
  transition: all 0.5s ease;
}

.nav-dropdown {
  color:  var(--regular-text);
}

.footer {
  padding: 2.5rem;
  line-height: 2;
  border-top: 1px solid var(--border-color);
  text-align: center;
  background: $darkNavColor;
  color: white;
  /* color: lighten(#2c3e50, 25%)foot; */
}

.footer a {
  color: white;
  font-weight: 300;
  font-size: 14px;
  border-bottom: 1px solid var(--main-color);
  padding: 2px 0;
}

@media (max-width: $MQNarrow){
  .my-bg-home {
    background-size: auto 100%;
    animation: none;
  }
}

@keyframes gradientBG {
	0% {
		background-position: 50% 0%;
	}
	50% {
		background-position: 50% 100%;
	}
	100% {
		background-position: 50% 0%;
	}
}
</style>
