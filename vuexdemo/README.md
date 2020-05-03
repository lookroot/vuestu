# vuex状态管理
## 什么是vuex


>  **vuex**是vue.js专门用来进行状态管理的工具，采用集中式状态管理,并以相应的规则保证一种可预测的方式发生变化

通俗的来说，就相当于一个管家，我们把一些公用的数据交给他进行管理，并且每个组件都能从他那里获取数据，或者通知他修改数据，比如存储用户信息

## 组成

- State 数据仓库
- getter 获取数据
- mutation 修改数据
- action 提交mutation
- modules 模块

## 安装

首先使用脚手架创建一个vue项目

```sh
vue create vuexdemo
```

可以使用 **vue ui** 安装 **vuex**插件

![image-20200429131841795](https://img.lookroot.cn/blog/202005/03/232005-31359.png)

安装完成以后打开 **main.js** 可以发现使用方式和 **router** 是一样的

![image-20200429172940804](https://img.lookroot.cn/blog/202004/29/172941-296708.png)

打开**src/store/index.js**,讲解一下属性

```javascript
import Vue from 'vue'
import Vuex from 'vuex'
// 注册vuex
Vue.use(Vuex)
// 实例化一个vuex
export default new Vuex.Store({
  // state存储全局的变量
  state: {
  },
  // mutations 修改存储的变量
  mutations: {
  },
  //返回处理过的数据，相当于是 vuex 中的计算属性
  getters: {
  },
  // actions提交的是 mutation,可以实现异步操作，相当于我们出发一个操作，然后操作完成会修改存储的数据
  actions: {
  },
  // 分模块管理
  modules: {
  }
})
```

下面一一进行讲解

## state

首先我们在 state中定义一个字符串,代表当前网页主色

```javascript
state: {
  primaryColor: "red",
},
```

然后来到 **Helloworld**组件，在 **computed**计算属性中定义 `this.$store.state`就可以获取到vuex中存储的值

```javascript
computed: {
  primaryColor() {
    return this.$store.state.primaryColor;
  }
}
```

打开网页查看效果

![image-20200429173638424](https://img.lookroot.cn/blog/202004/29/173638-600917.png)

当然如果我们有多个 **state** 属性的话，这样写就非常麻烦，我们可以直接引入vux为我们导出的模块

```javascript
import { mapState } from "vuex";
```

然后把刚刚的计算属性改一下，这个写法是 **es6** 对象展开运算 相关知识，完后后，就实现了在计算属性中定义

```javascript
 computed: {
   ...mapState(["primaryColor"])
   // primaryColor() {
   //   return this.$store.state.primaryColor;
   // }
 }
```

## mutations

我们在**mutations**中定义一个修改颜色的方法

```javascript
mutations: {
  setColor(state, value) {
    state.primaryColor = value;
  }
},
```

然后来到 **Helloworld**组件，定义一个方法，用来出发 **mutations**里面定义的事件，并传递一个 **blue**的值

```javascript
methods: {
  setColor() {
    this.$store.commit("setColor", "blue");
  }
},
```

在页面中定义一个按钮并绑定刚刚的点击事件

```javascript
<button @click="setColor">设置主题色</button>
```

看看效果

![v30](https://img.lookroot.cn/blog/202004/29/174346-745211.gif)

## getters

首先我们在 **state** 中再定义一个 **user**对象

```javascript
state: {
  primaryColor: "red",
  user: {
    id: 1,
    type: 1,
    sex: 1,
  }
},
```

然后在**getters**中定义一个**userInfo**，根据不用用户的不同 **type**返回具体的字段

```javascript
getters: {
  userInfo(state) {
    switch (state.user.type) {
      case 1:
        return "用户组"
      case 2:
        return "管理员组"
    }
  }
},
```

然后在组件中定义一个计算属性，使用 `this.$store.getters`可以得到 vuex中定义的 **getters**

```javascript
userInfo(){
  return this.$store.getters.userInfo;
},
```

也可以和 **state** 一样这样写

```javascript
import { mapGetters, mapState } from "vuex";
```

```javascript
...mapGetters(["userInfo"])
```

在页面中显示出来

```html
<div>{{userInfo}}</div>
```

![image-20200429174836008](https://img.lookroot.cn/blog/202004/29/174841-818923.png)

## actions

这里我们模拟这样一个场景，假如用户修改了默认颜色后，这个属性要传递给后台给用户存储起来

因为我们没有具体的后台，所以就模拟一个延时的操作，并使用 **async**来同步方法

```javascript
actions: {
  async  changeColor(context, value) {
    //模拟一个存储属性的方法
    function saveUserInfo() {
      return new Promise((resolve) => {
        setTimeout(resolve, 1000)
      })
    }
    // 真实的开发啊 拿到用户id  const uid = context.state.user.id;
    // 并调用后台方法this.api.saveUserInfo(...)
    await saveUserInfo();
    context.commit('setColor', value);
  }
},
```

然后在组件中定义一个方法 `this.$store.dispatch`可以触发**actions**

```javascript
setUserColor() {
  this.$store.dispatch("changeColor", "yellow");
}
```

在页面中绑定这个事件

```html
<button @click="setUserColor">设置用户默认主题色</button>
```

看看效果

![v31](https://img.lookroot.cn/blog/202004/29/175433-558.gif)

## modules

分模块其实很好理解吧，就是后期 **vux** 的属性太多，那么我们就分为一个一个的模块使用

我们在 **modules**中定义一个**modulea**模块，在这个模块里面的**state**定义一个**primaryColor**

```javascript
 modules: {
   modulea: {
     state: {
       primaryColor: "white",
     },
     mutations: {
     }
   }
 }
```

在组件中调用一下

```html
<div>modulea模块的值-{{$store.state.modulea.primaryColor}}</div>
```

看看效果

![image-20200429180007225](https://img.lookroot.cn/blog/202005/03/231955-208277.png)

大功告成！