import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/common.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入axios
import axios from 'axios'

// 公共地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

// 将axios存到原型上
Vue.prototype.$axios = axios

// 拦截器(携带token)
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// token的过期问题处理
axios.interceptors.response.use(function (response) {
  // Do something with response data
  // if (response.data.meta.status === 100011) {
  //   this.$router.push('/login')
  // }
  // if (response.data.meta.status === 100011 && response.data.token) {
  //   localStorage.getItem('token',response.data.token)
  // }

  return response
}, function (error) {
  // Do something with response error
  return Promise.reject(error)
})

Vue.use(ElementUI)

// 不显示控制台的提示
Vue.config.productionTip = false

// vue实例化
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
