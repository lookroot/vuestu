# vuecomponent组件

## 什么是组件

还记得我们前面讲的spa单页面吗，那么这个只有一个单页面文件是如何实现切换显示和不同路径展示不同内容的呢？

这就是组件，我们还是用哔哩哔哩这个界面举例，这个每个红圈勾住的地方就可以看做是一个个组件，当然每个组件里面也是可以再嵌套组件的，可以看做是套娃行为

我们上面所写的全部实例化vue的代码它本身就是一个组件，我们一般称为父组件

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/131524-95953.png)

## 全局组件和私有组件

上面说到组件里面可以嵌套组件，这里有个全局和私有的概念要解释一下，首先组件需要先定义然后再使用

比方说，这里有个**father**组件，我们在这个组件里面定义一个全局的 **header**组件和一个私有的**footer**组件，以及定义组件 **son**

如果们在当前**father**组件里面使用**header**和**footer**组件都是可行的，如果我们在当前 **father**组件里面使用了 **son** 组件,然后再在这个 **son**组件里面使用 这个 **header**组件是可行的，但是使用**footer**组件就不行了，这就是全局与私有的区别

来示例一下

### 定义组件

#### 定义全局组件

定义的位置呢在实例化 **vue **之前,每个组件其实和我们一直在编写的父组件结构是一模一样的，只不过我们将内容写在**template**标签里面，还是有其他 **methods** **data**等标签

```javascript
// 全局组件
Vue.component('vue-header', {
    template: '<h2>我是全局hearder</h2>',
    data:{
        ...
    }
});
let vm = ...
```

#### 定义私有组件

私有组件就定义在 **当前组件**的属性中，意思就是组件里面还可以定义私有组件，套娃行为

```javascript
let vm = new Vue({
    el: '#app',
    data() {
        return {
        }
    },
    methods: {
    },
    // 私有组件
    components: {
        'vue-footer': {
            template: '<h2 >我是footer私有组件</h2>',
        },
    },
})
```

#### 直接将模板写在页面中

上面的写法有这样一个问题啊，比如页面比较复杂，那么我们在**JavaScript*中写 **template**IDE提示不够友好，写法也不够清晰，还记得前面的 **#app** 这个挂载吗，那么我们同样也可以使用这种方式

首先在页面中定义模板

```html
<body>
    <div id="app">
        ...
    </div>
    <!-- 定义son组件 和上面没有关系 -->
    <template id="son">
        <div>
            <h2>我是son组件</h2>
        </div>
    </template>
</body>
```

然后我们需要到vue实例中去注册这个组件，我们可以注册为私有的也可以注册为全局的，这里我们注册为私有的

```javascript
 components: {
     'vue-footer': {
         template: '<h2 >我是footer私有组件</h2>',
     },
     'son': {
         //选中页面中定义的 son 模板
         template: '#son',
     }
 },
```

### 使用组件

主要是注册了的组件，我们可以直接在页面中使用，标签名可以是原名，也可以转成驼峰式命名

```html
<div id="app">
    <vue-header></vue-header>
    <son></son>
    <vue-footer></vue-footer>
</div>
```

浏览器看下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/155307-126480.png)

那么这里我们就验证一下上面说的全局和私有，我们来到页面中定义的 **son**组件，在这个组件里面使用刚刚定义的header和footer组件

```html
 <!-- 定义son组件 和上面没有关系 -->
 <template id="son">
     <div>
         <h2>我是son组件</h2>
         <vue-header></vue-header>
         <vue-footer></vue-footer>
     </div>
 </template>
```

打开浏览器看看效果，看这里这个 **header** 就出现了两次，这个**footer**就提示未注册

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/155607-220238.png)

## 动态组件

上面说的切换显示，这也没展示出来啊，难道切换显示是通过不同组件的 **v-if**来实现吗?这里我们就介绍动态组件，还是以bilibili的界面为例

![v2](https://img.lookroot.cn/blog/202003/30/155938-991224.gif)

我们把在讲 **vue绑定class**这一节的代码复制过来做简单修改，我们这里主要是实现这个切换的效果，不具体展示后面的数据

首先定义三个组件模板

```html
<template id="writeback">
    <div>
        <div>回复我的</div>
        <div>这是回复我的界面</div>
    </div>
</template>
<template id="aite">
    <div>
        <div>@我的</div>
        <div>这是@我的界面</div>
    </div>
</template>
<template id="zan">
    <div>
        <div>收到的赞</div>
        <div>这是收到赞的界面</div>
    </div>
</template>
```

然后注册为私有组件

```javascript
components: {
    'writeback': {
        template: '#writeback'
    },
    'aite': {
        template: '#aite'
    },
    'zan': {
        template: '#zan'
    },
```

然后我们在data中定义一个字符串，确定当前要显示的组件名称

```javascript
showName: 'writeback',
```

然后我们修改一下上次列表的渲染和点击事件（点击切换当前显示的组件名），然后用flex简单布局一下这个页面，最后使用**component**标签来动态展示组件，**:is="showName"**就是使用**data**中定义的属性来确定组件要显示哪一个

```html
<div id="app">
    <div class="bili-content">
        <div class="bili-leftnav">
            <ul>
                <li :class="{active:showName=='writeback'}" @click="showName='writeback'">回复我的</li>
                <li :class="{active:showName=='aite'}" @click="showName='aite'">@我的</li>
                <li :class="{active:showName=='zan'}" @click="showName='zan'">收到赞的</li>
            </ul>
        </div>
        <div class="bili-rightcontent">
            <!-- 动态组件 -->
            <component :is="showName">
                </omponent>
        </div>
    </div>
</div>
```

简单写下样式

```css
<style>
    * {
        margin: 0;
        padding: 0;
    }
    body {
        background-color: #67a3e1;
    }
    .bili-content {
        display: flex;
    }
    .bili-content .bili-leftnav {
        width: 200px;
        background-color: #dee9f7;
    }
    .bili-content .bili-leftnav li {
        padding: 10px 20px;
        height: 50px;
        line-height: 50px;
    }
    .bili-content .bili-leftnav li:hover {
        cursor: pointer;
    }
    .bili-content .bili-leftnav .active {
        color: #5faee3;
    }
    .bili-content .bili-rightcontent {
        flex: 1;
        margin-left: 20px;
    }
    .bili-content .bili-rightcontent div:nth-child(1) div {
        margin-top: 10px;
        background: #ffffff;
        padding: 10px 10px;
    }
</style>
```

可以看下效果，这就实现了动态切换了是不是很简单啊

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/160823-330962.gif)

## 组件切换过渡效果

上面的切换是不是太枯燥了啊，我们这里可以给组件切换加上过渡效果的

我们这里还是使用 animate.css

```html
 <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

加上 **transition**包裹

```html
<div class="bili-rightcontent">
    <!-- 动态组件 -->
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeInUp"
        mode="out-in" :duration="200">
        <component :is="showName">
            </omponent>
    </transition>
</div>
```

这里有个补充内容，**:duration**可以决定过渡的时间， **mode**决定过渡的模式，因为这个组件切换其实是一个消失，一个出现的过程，所以不定义过渡模式的话，就会同时执行出现和消失的过渡效果，就花屏了 ！

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/143158-402526.png)

看下效果是不是就很不错了啊

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/161357-39031.gif)

## vuecomponent组件间通信

其实大家很容易就想到啊，组件之间肯定不会是单独运行就行了的，肯定要做一些**沟通**啊这一节就是组件间的通信

这一节我们使用前面的 **vue事件**这一节的表单来完成示例

## vue父组件传递值给子组件

我们把页面中的这个渲染**userlist**给它封装成一个组件

```html
<template id="userlistcom">
    <ul>
        <li v-for="(user,index) in userlist" :key="index">
            <img :src="user.avatar" alt="">
            {{user.name+'-'+user.age}}
            {{user.sex===1?'男':'女'}}
        </li>
    </ul>
</template>
```

然后注册为私有组件，并在页面中使用

```javascript
components: {
    'userlistcom': {
        template: '#userlistcom',
    },
},
```

```html
<userListCom ></userListCom>
```

这样肯定是不行的啊，因为这个组件里面是没有定义 **userlist**看会报错啊，那么我们怎么做呢？如果在当前组件里面去定义 **userlist**并且加载数据的话，那么这个封装组件还有啥意义呢？我们本来就是为了复用，比如我在不同的地方都会使用到这个组件，但是不同地方请求的数据是不同的，那么这个方式肯定就不符合了

所以我们要使用父组件传递值给子组件的方法，**:getuserlist**的意思就是我们给子组件传递一个名叫 **getuserlist**的值，传递的值是当前父组件中的 **userlist**

```html
<userListCom :userlist="userlist"></userListCom>
```

传是传递了？子组件怎么去获取呢这就要用到 **prop**，简答修改一下这个组件的注册

prop的类型可以为

![vue教程-lookroot](https://img.zxbcw.top/blog/202003/30/184524-594538.png)

```javascript
'userlistcom': {
    template: '#userlistcom',
    //父组件传值
    props: {
        //接受值
        getuserlist: {
            //类型
            type: Array,
            //是否必须
            required: true
        },
    }
```

然后我们去子组件的列表渲染中简单修改，循环这个 **getuserlist**

```html
<li v-for="(user,index) in getuserlist" :key="index">
    <img :src="user.avatar" alt="">
    {{user.name+'-'+user.age}}
    {{user.sex===1?'男':'女'}}
</li>
```

看下效果，能行

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/170522-908384.png)

## 子组件传递值给父组件

这里我们将这个 **form**表单也封装为组件

```html
<template id="userformcom">
    <div>
        <form action="">
            <input type="text" v-model="user.name">
            <input type="text" v-model="user.age">
            <input type="text" v-model="user.avatar">
            <select v-model="user.sex">
                <option :value="sex.count" v-for="(sex,index) in sexlist">{{sex.name}}</option>
            </select>
            <button @click.prevent="submit">存储</button>
        </form>
    </div>
```

然后注册，这里的话我们就将**data**中的**user**和**sexlist**也移动到组件的定义里面去

```javascript
'userformcom': {
    template: '#userformcom',
    data() {
        return {
            user: {
                name: 'lookroot',
                age: 12,
                sex: 2,
                avatar: ''
            },
            sexlist: [
                { count: 1, name: '男' },
                { count: 2, name: '女' },
            ]
        }
    },
    methods: {
    }
}
```

然后在页面中使用这个组件

```html
<userFormCom></userFormCom>
```

这样肯定也是不行的，如果点击保存，怎么添加到父组件的**userlist**上面去呢？这就得用到子组件传递值给父组件了

我们给这个子组件绑定一个自定义事件**@submit**，如果子组件触发这个事件将会触发当前父组件中的**savesubmit**事件

```html
<userFormCom @submit="savesubmit" ></userFormCom>
```

先定义父组件中的**savesubmit**事件

```javascript
savesubmit(user) {
    user = Object.assign({}, user);
    this.userlist.push(user);
}
```

然后我们在**子组件**中修改表单的点击事件，让它触发这个父组件绑定的事件并且携带一个值

```javascript
methods: {
    submit() {
        //触发父组件事件 并把user表单传递过去
        this.$emit('submit', this.user);
    }
}
```

查看效果是完全可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/171252-632658.gif)

## 父组件触发子组件的事件

比如我们想在父组件的页面中点击按钮实现 清空 form组件的输入默认值

首先定义一个按钮，并绑定点击事件

```html
<button @click="clear">清空表单</button>
```

然后我们给这个组件绑定一个 ref 用来操作它的dom

```html
<userFormCom @submit="savesubmit" ref="userFormCom"></userFormCom>
```

然后添加这个点击事件

```javascript
clear() {
    //触发子组件的事件
    this.$refs.userFormCom.clearForm();
},
```

这样就可以触发子组件的事件了，但是子组件里面还没有定义这个 **clearForm**事件

那么我们在子组件定义一下

```javascript
 methods: {
     submit() {
         //触发父组件事件
         this.$emit('submit', this.user);
     },
     //清空表单
     clearForm() {
         this.user = {}
     }
 }
```

看看效果可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/30/171932-340591.gif)