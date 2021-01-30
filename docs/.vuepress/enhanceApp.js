import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './public/style/theme/dist/light.css'
import './public/style/theme/dist/dark.css'
import animated from 'animate.css'

export default ({
  Vue,
}) => {
  Vue.use(Element, animated)
}