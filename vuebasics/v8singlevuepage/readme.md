# vue单文件组件开发
那么前面我们都是直接引入**vue**js文件的方式进行开发，然后在同一个html文件中进行开发

这显然是不符合组件化开发的思路的，前面我们说过实际当中的开发都是编写以.vue结尾的页面文件，然后用webpack进行打包

这一节我们将到vue的单文件组件开发，使用的是webpack提供的简易模板，没有webpack基础的朋友不要怕，下一节会简答讲一讲webpack的基础

## 安装

首先依次安装这些包，前提是你的电脑已经安装了node

```powershell
npm install webpack -g
npm install @vue/cli -g
npm install  @vue/cli-init  -g 
vue init webpack-simple
```

开始安装后会有一系列的提示，都按enter下一步就行

![image-20200423002522060](https://img.lookroot.cn/blog/202004/23/002523-355710.png)

## 配置文件讲解

简单的看一下配置文件，看不懂的没有关系后面会讲到

![image-20200423002755909](https://img.lookroot.cn/blog/202004/23/002758-312895.png)

打开 `src/main.js`，简单讲解一下，这里它导入了**vue**的文件，然后实例化了一个vue，然后还导入了一个 `App.vue`文件，并且把这个文件渲染给页面，所以项目运行起来默认页面就是 `App.vue`

```javascript
// 导入vue文件
import Vue from 'vue'
// 导入 App.vue
import App from './App.vue'
// 实例化vue
new Vue({
  el: '#app',
  // 使用render函数将 App.vue 渲染给页面 
  render: h => h(App)
})

```

然后打开 App.vue 查看一下，删掉不用的东西，然后仔细看下页面结构，一个**template**，一个**script**，一个**style**；这个结构和我们前面定义组件的方式是不是差不多的呢？这就是vue的单文件组件开发，只不过他这个写法会被**webpack**打包处理，所以可以这样写

![image-20200423003615021](https://img.lookroot.cn/blog/202004/23/003615-536653.png)

## 运行

我们在命令行中输入,然后打开浏览器查看效果

```
npm install
npm run dev
```

![image-20200423003636305](https://img.lookroot.cn/blog/202004/23/003753-696563.png)

## 创建一个组件

我们在**src**目录下面创建一个**views**目录，专门用来存放**vue**页面文件，并创建一个**Index.vue**文件

文件内容

```html
<template>
    <h1>
        this is index
    </h1>
</template>
```

然后我们来到**App.vue**，我们在**script**标签中导入刚刚创建的组件，并且注册组件,这一切和我们上面讲的都是一样的

```javascript
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
```

然后在页面中引用

```
<template>
  <div >
    <Index></Index>
    {{msg}}
  </div>
</template>
```

查看结果

![image-20200423004311583](https://img.lookroot.cn/blog/202004/23/004318-6513.png)

这一切是不是就方便清晰起来了呢？

这一节就到这里了，重点是如何实现的这个打包，将会在下一节讲到