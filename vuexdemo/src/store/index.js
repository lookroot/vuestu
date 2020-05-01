import Vue from 'vue'
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)
// 实例化一个vuex
export default new Vuex.Store({
  //state存储全局的变量
  state: {
    primaryColor: "red",
    user: {
      id: 1,
      type: 1,
      sex: 1,
    }
  },
  // mutations 修改存储的变量
  mutations: {
    setColor(state, value) {
      state.primaryColor = value;
    }
  },
  //返回处理过的数据，相当于是 vuex 中的计算属性
  getters: {
    userInfo(state) {
      switch (state.user.type) {
        case 1:
          return "用户组"
        case 2:
          return "管理员组"
      }
    }
  },
  // actions提交的是 mutation,可以实现异步操作，相当于我们出发一个操作，然后操作完成会修改存储的数据
  actions: {
    async  changeColor(context, value) {
      //模拟一个存储属性的方法
      function saveUserInfo() {
        return new Promise((resolve) => {
          setTimeout(resolve, 1000)
        })
      }
      // const uid = context.state.user.id;
      // this.api.saveUserInfo(...)
      await saveUserInfo();
      context.commit('setColor', value);
    }
  },
  // 分模块管理
  modules: {
    modulea: {
      state: {
        primaryColor: "white",
      },
      mutations: {

      }
    }
  }
})
