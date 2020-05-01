<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld />
    <CreateAxios />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import CreateAxios from "@/components/CreateAxios.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
    CreateAxios
  }
};
</script>
