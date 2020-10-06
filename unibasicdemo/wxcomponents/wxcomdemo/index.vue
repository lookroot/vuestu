<template>
<uni-shadow-root class="wxcomdemo-index"><view class="inner">
  {{innerText}}
</view>
<slot></slot></uni-shadow-root>
</template>

<script>

global['__wxRoute'] = 'wxcomdemo/index'
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    innerText: {
      type: String,
      value: 'default value',
    }
  },
  data: {
    // 这里是一些组件内部数据
    someData: {}
  },
  methods: {
    // 这里是一个自定义方法
    customMethod: function(){}
  }
})
export default global['__wxComponents']['wxcomdemo/index']
</script>
<style platform="mp-weixin">
/* 这里的样式只应用于这个自定义组件 */
.inner {
  color: red;
}
</style>