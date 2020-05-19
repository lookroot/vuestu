<template>
  <div>{{status?`${x}-${y}`:`${y}-${x}`}}</div>
</template>

<script>
import { reactive, onMounted, onUnmounted, toRefs, ref } from "vue";
// 返回鼠标位置
const useMouse = () => {
  const state = reactive({
    x: 0,
    y: 0
  });
  const update = e => {
    state.x = e.pageX;
    state.y = e.pageY;
  };
  onMounted(() => {
    window.addEventListener("mousemove", update);
  });
  onUnmounted(() => {
    window.removeEventListener("mousemove", update);
  });
  return toRefs(state);
};
// 监控键盘事件
const useKeyBoard = () => {
  const status = ref(false);
  const update = () => {
    status.value = !status.value;
  };
  onMounted(() => {
    window.addEventListener("keypress", update);
  });
  onUnmounted(() => {
    window.removeEventListener("onkeydown", update);
  });
  return {
    status
  };
};
export default {
  name: "HelloWorld",
  setup() {
    return {
      ...useMouse(),
      ...useKeyBoard()
    };
  }
};
</script>

<style scoped>
</style>
