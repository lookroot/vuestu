<template>
  <div>
    <div>{{num2}}</div>
    <button @click="increment">increment</button>
    <button @click="stopwatch">stopwatch</button>
  </div>
</template>
<script>
import { reactive, watch, computed, toRefs, watchEffect } from "vue";

export default {
  setup() {
    const state = reactive({
      num1: 1,
      num2: computed(() => state.num1 * 2)
    });

    // 如果响应性的属性有变更，就会触发这个函数,但他是惰性的
    const watcheffectstop = watchEffect(() => {
      console.log(`effect 触发了！${state.num1}`);
    });

    // 定义一个监听器
    const stop = watch(state, (val, oldVal) => {
      console.log("watch ", oldVal.num1);
    });

    //数值增加方法
    const increment = () => state.num1++;

    // 停止监听
    const stopwatch = () => {
      stop();
      watcheffectstop();
    };

    return {
      ...toRefs(state),
      stopwatch,
      increment
    };
  }
};
</script>
