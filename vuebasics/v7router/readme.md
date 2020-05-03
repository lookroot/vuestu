# vuerouter路由
## 什么是路由

大家还记得我最开始提到的spa单页面吗，通过不同的路径显示不同的组件，这个就是通过**router**实现的

那么首先我们还需要引入一个 **router**文件

```html
<script src="https://cdn.bootcss.com/vue-router/3.1.3/vue-router.js"></script>
```

这里的话我们还是以上面的bilibili消息中心为示例，使用到刚刚的代码

还是先定义组件模板

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

然后定义组件

```javascript
const writeback = {
    template: '#writeback'
}
const aite = {
    template: '#aite'
}
const zan = {
    template: '#zan'
}
```

## 基础使用

在组件那一节我们是通过动态组件来实现界面切换的，这里我们就使用路由来实现页面切换

这里我们实例化vue的时候，属性里面的 **router**传入一个 **VueRouter** 的实例，这个数组**routes**就是详细的路径和对应的组件信息，比如我们浏览器访问 **www.lookroot.cn/writeback**的时候，页面就展示上面定义好的 **writeback**组件

```javascript
let vm = new Vue({
    el: '#app',
    data() {
    },
    router: new VueRouter({
        routes: [
            {
                path: '/writeback',
                component: writeback
            },
            {
                path: '/aite',
                component: aite
            },
            {
                path: '/zan',
                component: zan
            },
        ],
    })
})
```

那么原本的导航也要进行修改 这个 **router-link**就会在页面中渲染成**a**标签，作为导航

```html
<div class="bili-leftnav">
    <ul>
        <li>
            <router-link to="/writeback">回复我的</router-link>
        </li>
        <li>
            <router-link to="/aite">@我的</router-link>
        </li>
        <li>
            <router-link to="/zan">收到赞的</router-link>
        </li>
    </ul>
</div>
```

那么我们原本的选中效果是没有了的因为没有绑定点击事件，但是路由会给默认激活的导航加上一个**class**名为`router-link-active` ，我们简单编写一下

```css
 /* 当前显示路由的颜色 */
 .bili-content .bili-leftnav li .router-link-active {
     color: #2fbbea;
 }
```

然后和动态组件一样要有个展示的容器吧，这里我们也给它加上过渡动画，这个**router-view**就是路由界面的展示容器和动态组件的**component**是一样的

```html
<div class="bili-rightcontent">
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeInUp"
        mode="out-in" :duration="200">
        <router-view></router-view>
    </transition>
</div>
```

好的这就完成了改造了看看效果吧完全是可以的，注意看路径的变化

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/162849-82521.gif)

## 路由重定向

如果我们打开这个界面的时候，路径后面没有跟着具体的路径，界面就不会显示任何的组件，这肯定是不友好的

必须设置一个默认界面，我们咋路由配置文件里面增加一个路由信息

```javascript
{
    path: '/',
    redirect: '/writeback',
},
```

这里的意思就是，默认为初始界面的时候，就重定向到 **writeback**这个路径，这样**writeback**就成了默认界面了

## 命名视图和命名路由

### 命名视图

如果我们页面中同时有两个**<router-view></router-view>**的时候，点开页面要展示两个组件，那么你怎么知道哪个组件应该展示到哪个 **view**里面呢？这就是命名视图

我们在添加一个 **view**，并且**name**为 **common**

```html
<div class="bili-rightcontent">
    <transition enter-active-class="animated fadeInDown" leave-active-class="animated fadeInUp"
        mode="out-in" :duration="200">
        <router-view></router-view>
    </transition>
    <router-view  name="common"></router-view>
</div>
```

定义一个组件模板

```html
<template id="vuefooter">
    <div>
        <h2>footer</h2>
    </div>
</template>
```

定义这个组件

```javascript
const vuefooter = {
    template: '#vuefooter'
}
```

然后修改一下 **writeback**的路由配置,**component**就换成**components**了，并且默认的容器展示**writeback**组件，命名为**common**的容器展示 刚刚定义的这个**vuefooter**组件

```javascript
{
    path: '/writeback',//点击的路径
    // 命名视图
    components: {
        default: writeback,
        common: vuefooter
    },
},
```

看看效果，是可以的，这就是命名视图

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/163927-877769.png)

### 命名路由

我们给路由也起名字，这样方便使用，这里还是以 **writeback**为例

```javascript
{
    path: '/writeback',//点击的路径
    // 命名视图
    components: {
        default: writeback,
        common: vuefooter
    },
    // 命名路由
    name: 'writeback',
},
```

修改它的导航链接，这样就完成了

```html
<router-link :to="{name:'writeback'}">回复我的</router-link>
```

## 嵌套路由和路由传参

这个嵌套大家就知道了，肯定是路由中有路由，就像组件中有组件一样，又是套娃行为

来看下这个界面，1部分是导航，2部分是路由展示的组件同时相对于3部分又是一个导航，3部分是路由展示的组件，这就是一个很明显的路由嵌套，我们就来实现一下

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/164530-414962.png)

首先我们要添加这个我的消息这个导航链接

```html
 <div class="bili-leftnav">
     <ul>
         <li>
             <router-link :to="{name:'writeback'}">回复我的</router-link>
         </li>
         <li>
             <router-link to="/aite">@我的</router-link>
         </li>
         <li>
             <router-link to="/zan">收到赞的</router-link>
         </li>
         <li>
             <router-link to="/mymsg">我的消息</router-link>
         </li>
     </ul>
 </div>
```

然后定义第二部分和第三部分的组件

这个第二部分的组件模板，它里面首先是一个导航，这个导航我循环渲染出来的，模拟了十个用户聊天导航，并且是使用了 **:to**也就是绑定动态的路径，路径后面跟上了 **index**也就是把当前是第几个用户传递给第三部分这就是路由传参**params**方式

### 路由传参**params**方式

```html
<template id="mymsg">
    <div>
        <div>消息</div>
        <div>
            <ul>
                <ol v-for="index in 10" >
                    <router-link :to="'/mymsg/msgcontent/'+index">用户{{index}}</router-link>
                </ol>
            </ul>
            <router-view></router-view>
        </div>
    </div>
</template>
```

定义第三部分组件模板

```html
<template id="msgcontent">
    <div>
        这是和用户{{id}}具体的消息界面
    </div>
</template>
```

定义这两个组件，为什么要使用 **props**来接受传值那？下面解释

```javascript
//第二部分组件
const mymsg = {
    template: '#mymsg',
}
//第三部分组件
const msgcontent = {
    template: '#msgcontent',
    props: ['index'],
}
```

### 嵌套路由

然后定义这个嵌套路由，这个 **mymsg**就是第二部分的路由配置，然后给它配置一个**children**这里面就是嵌套的路由配置了，首先**path**后面的 **:id**就是匹配我们上面定义的**router-link**传参的**index**，这个**props: true**就是将我们传递的**index**值，自动注册为第三部分组件的 **props**

```javascript
// 嵌套路由
{
    path: '/mymsg',
    component: mymsg,
    children: [{
        path: 'msgcontent/:index',
        component: msgcontent,
        props: true
    }]
}
```

看下效果，这就完成了

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/180730-846611.gif)

### 路由传参query方式

我们回到前面的第一部分的导航，修改一下这个我得消息的导航，使用?连接传递值

```html
<router-link to="/mymsg?username=lookroot">我的消息</router-link>
```

如果我们不适用上面的props来接受传值该怎么做呢？

修改一下组件定义，**created**周期时使用`this.$route.query`来接受**query**方式的传值，赋值给**username**

```javascript
const mymsg = {
    template: '#mymsg',
    data() {
        return {
            username: ''
        }
    },
    created() {
        // query传值
        this.username = this.$route.query.username
    },
}
```

然后在组件模板中渲染这个数据

```html
<template id="msgcontent">
    <div>
        这是和用户{{id}}具体的消息界面
    </div>
</template>
```

看下效果是可以的

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/181438-741221.png)


[TOC]




## 路由模式

路由有两种模式**history**和**hash**模式，默认也就是我们前面使用的模式是**hash**模式

这种模式就是在后面跟着一长串，不是很好看，如果追求美观就可以使用**history**模式

来实例一下

定义两个组件模板

```html
<template id="page1">
    <div>
        page1
    </div>
</template>
<template id="page2">
    <div>
        page2
    </div>
</template>
```

定义这两个组件

```javascript
const page1 = {
    template: '#page1',
}
const page2 = {
    template: '#page2',
}
```

实例化一个router，指定**mode**为**history**模式

```javascript
 const router = new VueRouter({
     mode: 'history',
     routes: [
         {
             path: '/',
             redirect: '/page1',
         },
         {
             path: '/page1',
             component: page1,
             name: 'page1',
         },
         {
             path: '/page2',
             component: page2,
             name: 'page2',
         },
     ],
 });
```

在页面中定义导航，这里我们介绍另外一种路由跳转的方式**编程式的导航** 

```html
<div id="app">
    <!-- <router-link to="/page1">page1</router-link> -->
    <button @click="gotoPage('/page1')">page1</button>
    <button @click="gotoPage('/page2')">page2</button>
    <router-view></router-view>
</div>
```

那么这里都绑定上一个点击事件，然后传递一个地址字符串

##编程式的导航

在当前组件（父组件）中编写一下这个点击事件，使用`this.$router.push`进行路由跳转

```javascript
methods: {
    gotoPage(path) {
        // 编程式的导航 
        this.$router.push(path)
    }
},
```

运行一下查看效果，看下导航栏地址是不是就美观多了啊

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/205632-4604.png)

但是这个模式有问题的，比如我们直接在浏览器中打开这个链接是会报错的

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/205809-252207.gif)

解决这个问题的方法需要后端处理[官网文档]([https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90](https://router.vuejs.org/zh/guide/essentials/history-mode.html#后端配置例子))

## 全局路由守卫

顾明思议，守卫嘛，就是拦截放行的效果

这里我们举一个登录的示例，但只是简单的举例哦，真实开发并不是这样做的

首先我们在vue的原型指向上挂载一个属性，用来记录用户是否登录

```javascript
Vue.prototype.isLogin = false
```

然后编写，第三个组件 **login**，并添加一个**login**点击事件

```html
<template id="login">
    <div>
        <button @click="login">login</button>
    </div>
</template>
```

然后定义这个组件,并编写点击事件，点击就修改**isLogin**的值为 **true**，并使用**this.$router.back**返回上一个页面

```javascript
const login = {
    template: '#login',
    methods: {
        login() {
            Vue.prototype.isLogin = true;
            //返回的意思
            this.$router.back();
        }
    },
}
```

然后配置路由信息

```javascript
{
    path: '/login',
    component: login,
    name: 'login'
},
```

好的定义全局守卫,记住要在定义**router**之后 `to, from, next`也不用解释吧，语义化的，前置守卫顾名思义也就是执行之前会调用的，所以我们在这里进行判断用户是否登录，如果未登录，我们就挑战到 命名路由为**login**这个路由地址

```javascript
 // 全局的 前置守卫
 router.beforeEach((to, from, next) => {
         if (!Vue.prototype.isLogin) {
             next({
                 name: 'login'
             });
         } else {
             next();
         }
 })
```

效果就是我们点击切换路由的时候，如果没有登录，就跳转到登录页面，但是这里大家仔细想这样一个问题，我的**login**路由同样也会执行守卫，同样我也没有登录，然后他就会再次跳转，这样就成了死循环，怎么解决这个问题呢？

## 路由元信息

我们简单修改一下路由配置，我们在需要判断登录的路由中加上**meta: { isLogin: true }**，表明当前路由是需要登录的

```javascript
routes: [
    {
        path: '/',
        redirect: '/page1',
        meta: { isLogin: true }
    },
    {
        path: '/page1',
        component: page1,
        name: 'page1',
        meta: { isLogin: true }
    },
    {
        path: '/page2',
        component: page2,
        name: 'page2',
        meta: { isLogin: true }
    },
    {
        path: '/login',
        component: login,
        name: 'login'
    },
],
```

然后我们怎么在路由守卫中读取这个字段那？

我们修改一下这个守卫，**matched**是路由记录，那么我们就在要到达的路由中进行查找字段`to.matched.some(item => item.meta.isLogin)`如果有这个字段的才进行判断

```javascript
 router.beforeEach((to, from, next) => {
     // matched 路由记录
     if (to.matched.some(item => item.meta.isLogin)) {
         if (!Vue.prototype.isLogin) {
             next({
                 name: 'login'
             });
         } else {
             next();
         }
     } else {
         // 执行下一个钩子
         next();
     }
 })
```

然后我们在**else**里面执行 **next();**就是执行下一个钩子，也就是放行的意思

测试一下看看效果，我们先把**mode**改为**hash**方便测试，可以看到要先点击login才能进行访问

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/213515-283804.gif)

## 组件内的路由守卫

大家记得有些网页你点击后退或者其他，会弹出提示 是否确定离开吗？

我们来实践一下，修改一下 **page1**的组件定义，在**beforeRouteLeave**的钩子里面进行判断

```javascript
const page1 = {
    template: '#page1',
    beforeRouteLeave(to, from, next) {
        const result = window.confirm('确定离开页面吗？将不会保存')
        if (result) {
            next()
        } else {
            next(false)
        }
    }
}
```

![vue教程-lookroot](https://img.zxbcw.top/blog/202004/01/214740-93613.gif)

那么还有其他更多的路由参数，这里就不一一讲解了