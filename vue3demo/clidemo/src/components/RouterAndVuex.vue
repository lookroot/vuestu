<template>
  <div>
    <button @click="increment">increment</button>
    <button @click="gotoAbout">about</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    //   使用vuex
    const store = useStore();
    const count = store.state.count;
    console.log("vuex >>", count);
    const increment = () => {
      // mutations
      store.commit("increment");
    };
    // 使用vue-router
    const router = useRouter();
    const gotoAbout = () => {
      router.push("About");
    };
    return {
      increment,
      gotoAbout
    };
  }
};
</script>