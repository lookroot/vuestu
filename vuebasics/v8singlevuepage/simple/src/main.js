// 导入vue文件
import Vue from 'vue'
// 导入 App.vue
import App from './App.vue'
// 实例化vue
new Vue({
  el: '#app',
  // 使用render函数将 App.vue 渲染给页面 
  render: h => h(App)
})
