<template>
  <div>
    <section class="page-edit">
      <div id="vcomments"></div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Valine',
  mounted: function () {
    // require window
    const Valine = require('valine');
    if (typeof window !== 'undefined') {
      this.window = window
      window.AV = require('leancloud-storage')
    }
    this.valine = new Valine()
    this.initValine()
  },
  watch: {
    $route (to, from) {
      if (from.path != to.path) {
        this.initValine()
      }
    }
  },
  methods: {
    initValine () {
      // 容错
      if (document.getElementsByClassName('leancloud-visitors')[0] === undefined) return;

      let path = location.origin + location.pathname
      document.getElementsByClassName('leancloud-visitors')[0].id = path
      this.valine.init({
        el: '#vcomments',
        appId: 'JqkJsHkjKIsudETqMQbLboif-gzGzoHsz',// your appId
        appKey: 'f3lLRBskYYnBE06f9MWpVOhI', // your appKey
        path: path,
        visitor: true,
        avatar: 'zkp',
        placeholder: '感谢您的建议或者鼓励~'
      });
    }
  }
}
</script>

<style lang="stylus" scoped>
.leancloud-visitors
  display none
</style>