<template>
  <div class="title">
    我是组件
    <!-- 使用one组件 -->
    <one></one>
  </div>
</template>
<script>
// 引入 one 组件
import one from "./components/one.vue";
export default {
  created() {
    console.log("我是组件");
  },
  //注册组件
  components: {
    one
  }
};
</script>
<style >

</style>>
