import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import echarts from 'echarts'

import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
