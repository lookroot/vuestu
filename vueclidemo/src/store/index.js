import Vue from 'vue'
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)
// 实例化一个vuex
export default new Vuex.Store({
  // state存储全局的变量
  state: {
  },
  // mutations 修改存储的变量
  mutations: {
  },
  //返回处理过的数据，相当于是 vuex 中的计算属性
  getters: {
  },
  // actions提交的是 mutation,可以实现异步操作，相当于我们出发一个操作，然后操作完成会修改存储的数据
  actions: {
  },
  // 分模块管理
  modules: {
  }
})
