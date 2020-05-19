import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
      console.log('当前count:',state.count);
    }
  },
  actions: {},
  modules: {}
});