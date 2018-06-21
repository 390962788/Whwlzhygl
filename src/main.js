import "babel-polyfill"
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import ImgUpload from '@/components/img-upload'

Vue.component('img-upload', ImgUpload)
let baseURL
if (location.host.indexOf('localhost') > -1) {
  baseURL = 'http://localhost:8080/'
} else {
  baseURL = 'http://47.104.129.0:8080/'
}
axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Authorization'] = 'whwlzhygl ' + sessionStorage.getItem('token')
// Vue.http.interceptors.push((request, next) => {
//   if (sessionStorage.getItem('token')) {
//       request.headers.set('Authorization', 'whwlzhygl ' + sessionStorage.getItem('token'))
//   }    
// })
Vue.prototype.$baseURL = baseURL
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
