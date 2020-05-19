<template>
  <div>{{name}}</div>
</template>
<script>
import { inject } from "vue";
export default {
  props: {
    name: String
  },
  setup(props, context) {
    // setup中使用 prop
    // console.log("props.name:" + props.name);
    // setup中触发父组件事件
    context.emit("talk", "我是子组件 我触发你了");

    // 供父组件测试
    const str = "我是子组件的str属性";
    const talk = () => {
      console.log("我被父组件触发了");
    };
    // inject
    const injectmsg = inject("injectmsg");
    console.log("injectmsg :>> ", injectmsg);
    return {
      str,
      talk
    };
  }
};
</script>