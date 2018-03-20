import Vue from 'vue'
import App from './App.vue'
// 全局组件
import popup from './components/tool/popup.vue'
Vue.component('popup', popup)
// 全局css
import 'animate.css'
import './assets/css/font/iconfont.css'
import './assets/css/base.css'
// 全局js
import 'babel-polyfill'
// 路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './router.config'// 引入路由配置
// 创建路由实例
const router = new VueRouter({
  routes: routes,
  mode: 'history'
})

// 状态管理
import store from './store/index'

// 过滤器
import filters from './filters/index.js'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

// axios
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withCredentials = true
Vue.prototype.$http = axios
// axios拦截器
axios.interceptors.request.use(function (config) {
  store.dispatch('showLoading')
  return config
}, function (error) {
  return error
})
axios.interceptors.response.use(function (config) {
  store.dispatch('hideLoading')
  return config
}, function (error) {
  return error
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store
})
