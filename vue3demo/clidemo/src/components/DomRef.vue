<template>
  <div>
    <div ref="refdemo">domref</div>
    <input type="range" v-model="size" />
  </div>
</template>
<script>
import { ref, watch, onMounted } from "vue";
export default {
  setup() {
    // 定义空白ref作为Template ref操作 dom
    const refdemo = ref(null);
    const size = ref(24);
    // 监听拖动 
    watch(size, (val, oldVal) => {
      refdemo.value.style.fontSize = size.value + "px";
    });
    return {
      refdemo,
      size
    };
  }
};
</script>