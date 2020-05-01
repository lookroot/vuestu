<template>
  <div :style="{color:primaryColor}">
    <h2>vuexdemo</h2>
    <button @click="setColor">设置主题色</button>
    <button @click="setUserColor">设置用户默认主题色</button>
    <div>{{userInfo}}</div>
    <div>modulea模块的值-{{$store.state.modulea.primaryColor}}</div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "HelloWorld",
  methods: {
    setColor() {
      this.$store.commit("setColor", "blue");
    },
    setUserColor() {
      this.$store.dispatch("changeColor", "yellow");
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
    ...mapState(["primaryColor"]),
    // userInfo(){
    //   return this.$store.getters.userInfo;
    // },
    // primaryColor() {
    //   return this.$store.state.primaryColor;
    // }
  }
};
</script>

<style scoped>
</style>
