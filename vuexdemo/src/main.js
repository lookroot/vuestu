import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  // 实例化vue的时候传入store实例
  store,
  render: h => h(App)
}).$mount('#app')
