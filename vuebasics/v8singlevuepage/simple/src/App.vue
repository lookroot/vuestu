<template>
  <div >
    <Index></Index>
    {{msg}}
  </div>
</template>

<script>
import Index from './views/Index'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    Index,
  }
}
</script>

<style>

</style>
