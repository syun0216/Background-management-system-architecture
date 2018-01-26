import Vue from 'vue'
import 'babel-polyfill'
// import 'es6-promise/auto'
// import '../src/assets/custom-theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
// import 'element-ui/lib/theme-default/index.css'
// import locale from 'element-ui/lib/locale/lang/en'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters' // 引入全局filter
import echarts from 'echarts'
import $ from 'jquery'
// components
import components from './components'
// utils
import { cLog } from './utils/common_utils'
// import color from '@/utils/color'
// 自定义主题色

import '@/icons' // icon
import '@/permission' // 权限

Vue.use(ElementUI)
Vue.use(iView)
Vue.prototype.$echarts = echarts // 全局引入echarts组件
Vue.prototype.$cLog = cLog // 定义全局console.log函数
// Vue.prototype.$colors = color  // 全局引入自定义的颜色

// 引入自定义filter
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key])
// })

// 引入自定义公共组件
Object.keys(components).forEach((key) => {
  const name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
