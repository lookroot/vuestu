# vue3预览

我的个人博客 [立即前往](https://www.lookroot.cn/views/article/vue3demo.html)

vue3向下兼容vue2，vue2目前也是必学的

前段时间尤大在哔哩哔哩直播了vue3的预览，来简单实践一下吧

- api文档 Composition API RFC [立即前往](https://vue-composition-api-rfc.netlify.app/)

- vue3地址[立即前往](https://github.com/vuejs/vue-next#status-beta)

vue3的改变

- 更小更快
- 支持自定义渲染器
- 响应式修改为基于Proxy的侦测
- 深度结合typescript
- 基于treeshaking优化
- ...

## 创建项目:smile:

### 引入文件

克隆一个官方仓库

```sh
git clone https://github.com/vuejs/vue-next.git
```

打开这个项目，下载一下依赖,然后编译

```sh
npm i
```

```sh
npm run dev
```

编译文件在`vue-next\packages\vue\dist`,可以把它复制出来放到我们创建的项目文件夹

在`vue-next\packages\vue\examples`目录下有官方的示例

### 脚手架创建项目

首先确保你的@vue/cli为最新版本 `vue -V`

![image-20200516184602081](https://img.lookroot.cn/blog/202005/16/184602-920432.png)

然后使用 `vue create vue3demo`创建一个vue项目，创建的时候勾选 **vuex**  **router**

然后进入项目文件夹，命令行安装插件`vue add vue-next`将项目升级到**vue3**,打开**package.json**可以发现都升级到了最新版本

![image-20200517185314922](https://img.lookroot.cn/blog/202005/17/185317-21464.png)

## 初始化你的第一个vue3程序:star:

### 实例化

为了体验整个api的变化，我们先使用直接引入的方式体验效果,新建一个**index.html** 引入**vue.global.js**

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <script src="./js/vue.global.js"></script>
</head>

<body>
</body>

</html>
```

然后我们新建一个盒子用来挂载**vue**实例，新建一个模板当做根节点

```html
<body>
    <div id='app'>
    </div>
    <template id="root">
        <div>
        </div>
    </template>
</body>
```

实例化一个**vue3**，**vue3**是按需引入，使用一个**api**之前需要先引入，通过`createApp`来实例化

```javascript
<script>
    const {
        createApp
    } = Vue;
    const root = {
        template: '#root',
    }
    createApp(root).mount('#app');
</script>
```

### setup

>  `setup` 函数是一个新的组件选项。作为在组件内使用 Composition API 的入口点。

vue3将更多的方法和数据在 `setup`函数中定义，这就是大家都觉得像react hook 的原因，其实实现的原理是不同的，只是写法有点像;这样做的目的就是为了更好的实现逻辑复用，具体会在后面举例

与 2.x 版本生命周期相对应的组合式 API

- `beforeCreate` -> 使用 `setup()`
- `created` -> 使用 `setup()`
- `beforeMount` -> `onBeforeMount`
- `mounted` -> `onMounted`
- `beforeUpdate` -> `onBeforeUpdate`
- `updated` -> `onUpdated`
- `beforeDestroy` -> `onBeforeUnmount`
- `destroyed` -> `onUnmounted`
- `errorCaptured` -> `onErrorCaptured`

`setup`最后返回所有的对象和方法，注意这里的`msg`不是响应式对象

```javascript
const root = {
    template: '#root',
    // beforeCreate  created data和methods 
    setup() {
        console.log('vue init');
        const msg = "vue init";
        return {
            msg
        };
    },
}
```

```html
<template id="root">
    <div>
        {{msg}}
    </div>
</template>
```

![image-20200518113936084](https://img.lookroot.cn/blog/202005/19/114115-757756.png)

### ref和reactive

`ref`和`reactive`都是用来创建响应式对象的，接下来的案例都使用脚手架创建项目来进行测试

打开`views/Home.vue`文件，删除掉无用的东西，首先引入`ref`, `reactive`

```javascript
import { ref, reactive } from "vue";
export default {
  name: "Home",
  setup() {
    // 定义一个ref响应式对象
    const count = ref(0);
    // 如果要定义多个可以使用reactive
    const state = reactive({
      size: 36,
      color: "red"
    });
    // 定义一个方法
    const increment = () => {
      count.value++;
    };

    return {
      count,
      increment,
      state
    };
  }
};
```

在页面中的使用和vue2是一样的

```vue
<template>
  <div>
    <div>{{count}}</div>
    <button @click="increment">increment</button>
    <div :style="{fontSize:state.size+'px',color:state.color}">reactive</div>
  </div>
</template>
```

![1](https://img.lookroot.cn/blog/202005/18/132033-618768.gif)

### toRefs

上面`reactive`的导出和使用，必须`state.key`,如果想像vue2中的data一样定义直接使用，可以使用 `toRefs`

引入 `import { ref, reactive, toRefs } from "vue";`,使用 `toRefs`返回展开对象，如果你不使用`toRefs`而直接返回对象，原对象的响应式将丢失。

```javascript
return {
  count,
  increment,
  ...toRefs(state)
};
```

页面中使用

```vue
<div :style="{fontSize:size+'px',color:color}">reactive</div>
```

![image-20200518133238814](https://img.lookroot.cn/blog/202005/18/133240-72399.png)

### 计算属性和监听器

我们来到`about.vue`中进行代码编写，首先引入需要使用的

```javascript
import { reactive, watch, computed, toRefs, watchEffect } from "vue";
```

`watchEffect` 传入一个函数并立即执行，如果函数里面使用了上面定义好的响应式对象，当对象发生变化时，会再次触发这个函数

定义计算属性和监听器

```javascript
export default {
  setup() {
    const state = reactive({
      num1: 1,
      //定义一个计算属性
      num2: computed(() => state.num1 * 2)
    });
    
    // 如果响应性的属性有变更，就会触发这个函数,但他是惰性的
    watchEffect(() => {
      console.log(`effect 触发了！${state.num1}`);
    });

    // 定义一个监听器
    const stop = watch(state, (val, oldVal) => {
      console.log("watch ", oldVal.num1);
    });

    //数值增加方法
    const increment = () => state.num1++;

    // 停止监听
    const stopwatch = () => stop();

    return {
      ...toRefs(state),
      stopwatch,
      increment
    };
  }
};
```

查看效果

![3](https://img.lookroot.cn/blog/202005/19/105756-107685.gif)

### dom操作

在`components`文件夹下新建一个`DomRef.vue`文件，定义一个空的`ref`响应数据`refdemo`并返回，页面中使用`ref`标签来绑定这个数据，然后就可以通过操作这个响应数据来操作dom

```vue
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
```

在`home`组件中使用这个组件查看效果

```javascript
<DomRef></DomRef>
...
import DomRef from "../components/DomRef";
...
components: {
  HelloWorld,
  DomRef,
},
```

看看效果

![4](https://img.lookroot.cn/blog/202005/19/155723-229188.gif)

### 组件通信

和vue2的通信大同小异，新建`ComDemo.vue`,`setup`函数接受一个 `props` 和 `context` 上下文

#### 父组件>>子组件

- 父组件触发子组件事件
- 父组件得到子组件属性
- props传值

```vue
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
    console.log("props.name:" + props.name);
    // 供父组件测试
    const str = "我是子组件的str属性";
    const talk = () => {
      console.log("我被父组件触发了");
    };
    return {
      str,
      talk
    };
  }
};
</script>
```

来的`Home.vue`中使用这个组件,并给这个子组件绑定一个响应式的`ref`属性

```javascript
<ComDemo :name="'我是父组件传值'" @talk="talk" ref="comdemo"></ComDemo>
import ComDemo from "../components/ComDemo";
...
components: {
  HelloWorld,
  DomRef,
},
 ...
setup() {
  // 定义一个ref响应式对象
  const comdemo = ref(null);
  onMounted(() => {
    //得到子组件的值
    console.log(comdemo.value.str);
    // 触发子组件事件
    comdemo.value.talk();
  });
  return {
  	...
    comdemo
  };
}
```

看看效果

![image-20200519162552547](https://img.lookroot.cn/blog/202005/19/162553-586482.png)

#### 子组件>>父组件

绑定一个方法给子组件

```vue
<ComDemo :name="'我是父组件传值'" @talk="talk" ref="comdemo"></ComDemo>
...
setup() {
const talk = e => {
  console.log(e);
};
...
return {
 ...
  talk,
  comdemo
};
...
```

`ComDemo.vue`

```javascript
setup(props, context) {
  ...
  // setup中触发父组件事件
  context.emit("talk", "我是子组件 我触发你了");
  ...
  return {
    str,
    talk
  };
}
```

效果

![image-20200519163223419](https://img.lookroot.cn/blog/202005/19/163224-870154.png)

#### inject和provide

这个和vue2使用一样

父组件定义

```javascript
import { provide } from "vue";
...
provide("injectmsg", "provide talk");
```

后代组件使用

```javascript
import { inject } from "vue";
...
const injectmsg = inject("injectmsg");
console.log("injectmsg :>> ", injectmsg);
```

## 组合式api示例:heart:

前面说到 `Composition API`的好处，这来举一个例

放一个尤大神的demo，这是一段鼠标操作的功能代码，我们自己还需要编写一个功能来实现结合

```javascript
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
```

我们再写一个键盘方法，记录每次用户按下键盘

```javascript
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
```

我们来到 `HelloWorld.vue`组件中使用这两个方法

```vue
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

```

我们在页面中显示鼠标方位，当我们按下任何按键的时候，这个显示颠倒

看下效果

![5](https://img.lookroot.cn/blog/202005/19/164315-405925.gif)

## `vuex`和`vuerouter`:boom:

`vuex`和`vuerouter`在实例化方式上有了一点区别，分别使用 `createStore`和`createRouter`进行实例化

### 使用`vuex`

打开`vue3demo\src\store\index.js`文件

```javascript
import Vuex from 'vuex'

export default Vuex.createStore({
  state: {
    count: 0
  },
  mutations: {
    increment(state) {
      state.count++;
      console.log('当前count:',state.count);
    }
  },
  actions: {},
  modules: {}
});
```

新建一个 `RouterAndVuex.vue`组件

```vue
<template>
  <div>
    <button @click="increment">increment</button>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const count = store.state.count;
    console.log("vuex >>", count);
    const increment = () => {
      // mutations
      store.commit("increment");
    };
    return {
      increment,
    };
  }
};
</script>
```

看看效果

![6](https://img.lookroot.cn/blog/202005/19/170932-745581.gif)

### 使用`vuerouter`

```vue
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
```

## 看看效果

![7](https://img.lookroot.cn/blog/202005/19/171155-130944.gif)