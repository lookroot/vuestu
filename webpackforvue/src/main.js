//引入vue
import Vue from 'vue'
import App from './App.vue'
//关闭生产环境的消息提示
Vue.config.productionTip = false
//实例化vue
// new Vue({
//   created() {
//     console.log('我是第一个vue');
//   },
//   components: {
//     com1: {
//       template: '<h1 >我是私有组件1s</h1>',
//     }
//   },
//   el: '#app'
// })



new Vue({
  // render: h => h(App),
  // 渲染函数 把App.vue 渲染进入 作为初始页面文件
  render: function (h) {
    return h(App);
  },
  el: '#app'
})

// new Vue({
//   created() {
//     console.log('我是第一个vue');
//   },
//   render: h => h(App),
// }).$mount('#app')