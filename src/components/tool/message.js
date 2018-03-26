import Vue from 'vue'
import optionall from './message.vue'
export default function (options) {
  var Message = Vue.extend(optionall) // 构造函数

  var component = new Message({
    data: options
  }).$mount()
  document.querySelector('body').appendChild(component.$el)
}
