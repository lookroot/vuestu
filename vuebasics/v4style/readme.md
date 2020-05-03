# vue绑定样式

前面在讲到 **v-bind**的时候我们说到 vue是可以绑定样式的，那么这里我们就简单实践一下

## 为什么要动态绑定样式

来看这个效果，默认渲染选中的是蓝色字体，这就是一个简单的场景，包括还有些列表展示中，不同数据不同样式，比如vip用户的标识就不同，这就需要动态绑定样式，懂了吧！

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/125540-195501.gif)

## vue动态绑定class

实现不同情况的页面的不同效果展示，其实就是给这个节点添加一个不同的**class**样式就行了，也就是动态绑定样式

首先还是实例化一个vue,定义一个布尔值 **isShow**等于 **false**，还有一个**showobj**对象，这两个属性我们就用来在页面中做不同情况的渲染展示

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                isShow: true,
                showIndex: 0,
                showObj: {
                    'color': true
                }
            }
        },
    })
</script>
```

然后定义两个页面内样式，方便一会儿测试使用

```css
<style>
    .color {
        color: red;
    }
    .font {
        font-size: 48px;
    }
</style>
```

然后我们在页面中绑定第一个class样式，还记得吗 **v-bind**可以省略为 **:**,我们这里使用 **:class**给它绑定一个对象，对象里面是 **color:true**意思就是给这个节点绑定上 **color**这个**class**，如果为**false**，就不会绑定

```html
<div :class="{color:true}">showObj1</div>
```

看下效果是ok的，字体是红色的了

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/140830-220287.png)

我们也可以使用在**data**中定义的属性，这里我们就使用**data**里面的 **isShow**这个布尔值，也就是绑定了一个 **true**

```html
<div :class="{color:isShow}">showObj1</div>
```

还可以绑定**data**中定义的对象 `showObj`

```html
<div :class="showObj">showObj2</div>
```

常用的方式还可以绑定三元表达式，**isShow**为真的时候，就绑定一个 **color**否则绑定一个 **font**

```html
 <div :class="isShow?'color':'font'">showObj1</div>
```

还可以绑定多个class属性，绑定数组就是了

```html
<div :class="['font','color']">showObj3</div>
```

这个数组也可以分别进行判断

```html
<div :class="['font',{color:isShow}]">showObj4</div>
```

这里我们为了方便展示还可以定义一个按钮，绑定一个点击事件切换 **isShow**的布尔值

```html
<button @click="isShow=!isShow">toggle</button>
```

我们来浏览器看看效果，可以吧！

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/141751-256501.gif)

可能大家还是有点不熟悉，那么我们就实现以下上面的哔哩哔哩那个效果

首先我们在**data**中定义一个，表明当前选中的是哪一行

```javascript
showIndex: 0,
```

然后我们到页面中定义一个列表，分别动态绑定一个 **class** 为**active**，绑定的条件就是这个 **showIndex**等于一个特定的数字，然后我们给每一行都绑定点击事件，每次点击的时候修改 **showIndex**等于这个特定的值，这样点击的时候当前行就能绑定上这个 **class**了

```html
<ul>
    <li :class="{active:showIndex==0}" @click="showIndex=0">回复我的</li>
    <li :class="{active:showIndex==1}" @click="showIndex=1">@我的</li>
    <li :class="{active:showIndex==2}" @click="showIndex=2">收到赞的</li>
</ul>
```

我们简单写下这个样式，**active**选中行给它一个蓝色

```
 <style>
     ul {
         background-color: #dae5f5;
     }
     ul li {
         height: 50px;
         line-height: 50px;
     }
     ul li:hover {
         cursor: pointer;
     }
     ul .active {
         color: #5faee3;
     }
 </style>
```

来浏览器看看效果，可行吧！

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/142329-289185.gif)

## vue动态绑定行内式

那么同样的可以绑定class，也可以绑定行内式吧！

首先我们还是在 **data**中定义两个属性，方便测试

```javascript
inColor: 'red',
styleObj: {
    color: 'red',
    fontSize: '48px'
}
```

第一种绑定方式，我们直接绑定一个对象，名称是 **color** 值为 **red**，也就是给这个节点绑定了`style="color: red;"`

我们在绑定 **syle**的属性名的时候要注意它是驼峰式命名的 比如 **fontSize**

```html
<div :style="{color:'red'}">red</div>
```

第二种方式绑定多个属性，第一个属性的值是我们在**data**中定义的**inColor**属性，第二个属性就是上面第一种方式的使用，直接绑定一个值

```html
 <div :style="{color:inColor,fontSize:36+'px'}">red</div>
```

第三个方式，绑定**data**中定义的对象**styleObj**，这里定义了两个**style**属性

```html
 <div :style="styleObj">red</div>
```

现在我们来浏览器看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/144835-234480.png)

然后你说这个有啥用？来我们来举个例子，我们搞个循环出来，现在我要每一行的字体都比上一行大，怎么实现？

```html
<div v-for="i in 10">{{i}}</div>
```

我们动态绑定 **style**，绑定一个**fontsize**字体大小，值就是每次循环的值乘以10

```html
 <div v-for="i in 10" :style="{fontSize:i*10+'px'}">{{i}}</div>
```

看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/145329-819072.png)

过去都是jquery来做动画比较多吧，这一节就是介绍一下vue的过渡和动画，这需要你具备实现css的基本过渡和动画的能力

vue也可以借助第三方库实现比较复杂的动画，本次只是介绍常用的简单效果，更深的在下次的进阶课程中

## vue的过渡效果

这里要先介绍它的原理，也就是不同的阶段给这个节点绑定上不同的**class**，来看一个动图



![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/163739-991326.gif)

大家可以发现在切换显示与隐藏的过程中，这个节点的**class**出现了变化

这里来一个官方的图

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/163851-758261.png)

这里可能大家看不懂哈，我们来一个实例，实例化vue，并添加一个 **isShow**来控制显示与隐藏

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                isShow: true,
            }
        },
    })
</script>
```

然后在页面中定义这个按钮并绑定一个点击事件用来切换，**transition**标签就是vue用来包裹需要执行过渡的节点

```html
<body>
    <div id="app">
        <button v-on:click="isShow = !isShow">
            Toggle
        </button>
        <transition>
            <p v-if="isShow">我变化了</p>
        </transition>
    </div>
</body>
```

那么这个p标签节点，在切换显示的过程中就会添加上上图的几个 class 我们来写一下，那么不管是显示还是隐藏，我都是改变字体的大小和透明度，方便展示

```css
 <style>
     /* 出现时候的过渡效果 */
     /* 最开始的转态 */
     .v-enter {
         opacity: 0;
     }
     /* 整个执行过程 */
     .v-enter-active {
         transition: all 1s ease;
     }
     /* 最后的样子 */
     .v-enter-to {
         font-size: 64px;
     }
     /* 消失的时候的过渡效果 */
     .v-leave {}
     /* 整个过程中 */
     .v-leave-active {
         transition: all 1s ease;
     }
     /* 最后的样子 */
     .v-leave-to {
         opacity: 0;
         font-size: 64px;
     }
 </style>
```

好的看下效果，是可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/172303-566329.gif)

那么这些 **class**的名字是怎么来的呢？这里的名字都是vue设定好的，当然我们如果修改也是可以的，在下面的动画中会讲到

## vue动画

还是使用上面的点击切换和隐藏，我们在页面中新增一个节点，给它用 **transition**包裹并且 **name**属性的值为**big**，这就是给这效果起了名字了，上面提到过 **class** 的自定义名字就要这样使用

```html
<transition name="big">
    <p v-if="isShow">我变化了</p>
</transition>
```

然后我们定义css,注意看上面是 **v-...** 这里就变成 **big...**了 这就是自定义名字的方法，如果你不给这个 transition设置name，默认就是 **v-**,那么都是**transition**，vue怎么区别是过渡还是动画的呢？这就是你css怎么写，它会自动识别

```css
.big-enter-active {
    animation: ani1 1s ease;
}
.big-leave-active {
    animation: ani1 1s ease;
}
@keyframes ani1 {
    0% {
        font-size: 24px;
    }
    50% {
        font-size: 80px;
    }
    100% {
        font-size: 24px;
    }
}
```

看看效果，是ok的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/173510-559772.gif)

## 通过指定类名来实现使用第三方的动画库

上面虽然使用 **name**来实现了自定义类名，但是如果我们使用第三方的动画库，这个自定义只修改了前缀，肯定是不能满足需求的那么怎么做呢 这里以 **animate.css**为例

首先引入css文件

```html
<link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
```

还是使用上面的切换，但是直接在 **transition**标签中指定不同周期使用的class类名

```html
<transition name="xxx"
 enter-active-class="animated bounceInUp" 
 leave-active-class="animated bounceInDown">
    <p v-if="isShow">我变化了</p>
</transition>
```

看看效果是可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/175139-671536.gif)

这种使用第三方库的方式是不是就非常方便了啊

## 使用JavaScript钩子函数

如果要实现更为复杂的动画，或者咋动画执行完成后触发一些事件，就需要用到JavaScript钩子函数

仍然使用上面的切换，定义一个新的标签，然后在 **transition** 上直接给不同的周期绑定不同的事件，然后这个绑定一个 css为false，为了避免这个 **transition**使用上面我们定义的css动画效果

```html
<transition :css="false" 
@before-enter="beforeEnter" 
@enter="enter" 
@after-enter="afterEnter"
>
    <div v-if="isShow">我变化了</div>
</transition>
```

然后我们写一下这几个方法，记住**enter**和 **leave**中要使用 **done**才会去执行 **afterEnter**、 **afterLeave**

```javascript
methods: {
    // 钩子动画
    beforeEnter(el) {
        el.style.opacity = 0.5
    },
    enter(el, done) {
        el.offsetWidth
        el.style.fontSize = "48px"
        el.style.transition = "all 1s ease"
        // 回调  用于执行afterEnter 
        done()
    },
    afterEnter(el){
        el.style.opacity = 1
    },
},
```

看看效果，是可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/181318-917660.gif)



## vue列表过渡

通过 **v-for**渲染出来的数据的过渡效果是有点不一样的，我们来实践一下吧

首先定义一个list

```javascript
list: [1, 2, 3, 4]
```

然后我们渲染这个数据，并绑定一个点击事件 删除数据

```html
<div v-for="i in list" @click="del(i)" :key="i">{{i}}</div>
```

写一下这个删除方法

```javascript
 del(i) {
     this.list = this.list.filter((item) => {
         return item != i;
     })
 },
```

这个时候，我们用**transition-group**来包裹这个循环,并且指定一个离开时候的class，这是我们上面引入的第三方动画库类名

```html
<transition-group leave-active-class="animated bounceInDown" >
    <div v-for="i in list" @click="del(i)" :key="i">{{i}}</div>
</transition-group>
```

看看效果吧！可以的



![vue教程-lookroot](https://img.lookroot.cn/blog/202003/27/184325-117228.gif)



那么更为复杂有趣的动画效果，我会在进阶课程里面讲到