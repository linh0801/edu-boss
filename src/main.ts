import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './styles/index.scss'
import dayjs from 'dayjs'
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.filter('dateFormate', function (str: string, defaultFormt = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(str).format(defaultFormt)
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
