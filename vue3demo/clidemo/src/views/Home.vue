<template>
  <div>
    <div>{{count}}</div>
    <button @click="increment">increment</button>
    <!-- <div :style="{fontSize:state.size+'px',color:state.color}">reactive</div> -->
    <div :style="{fontSize:size+'px',color:color}">reactive</div>
    <HelloWorld></HelloWorld>
    <DomRef></DomRef>
    <ComDemo :name="'我是父组件传值'" @talk="talk" ref="comdemo"></ComDemo>
    <RouterAndVuex></RouterAndVuex>
  </div>
</template>

<script>
import { ref, reactive, toRefs, onMounted, provide } from "vue";
import HelloWorld from "../components/HelloWorld";
import DomRef from "../components/DomRef";
import ComDemo from "../components/ComDemo";
import RouterAndVuex from "../components/RouterAndVuex";
export default {
  name: "Home",
  components: {
    HelloWorld,
    DomRef,
    ComDemo,
    RouterAndVuex
  },
  setup() {
    // 定义一个ref响应式对象
    const count = ref(0);
    const comdemo = ref(null);
    onMounted(() => {
      //得到子组件的值
      // console.log(comdemo.value.str);
      // 触发子组件事件
      // comdemo.value.talk();
    });
    //使用 provide
    provide("injectmsg", "provide talk");
    // 如果要定义多个可以使用reactive
    const state = reactive({
      size: 36,
      color: "red"
    });
    // 定义一个方法
    const increment = () => {
      count.value++;
    };
    const talk = e => {
      console.log(e);
    };
    return {
      count,
      increment,
      // state
      ...toRefs(state),
      talk,
      comdemo
    };
  }
};
</script>
