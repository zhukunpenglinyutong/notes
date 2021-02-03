import Vue from 'vue'
import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './public/style/theme/dist/light.css'
import './public/style/theme/dist/dark.css'
import animated from 'animate.css'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer)

export default ({
  Vue,
}) => {
  Vue.use(Element, animated)
}