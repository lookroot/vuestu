# vue数据
## vue定义数据

还记得前面说的**mvvm**的 **model**层吗?也就是数据层

在vue中我们如何定义我们需要使用到的数据呢

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                // 定义字符串
                name: 'lili',
                // 定义数字
                age: 1,
                // 定义对象
                user: { name: 'lookroot', age: 20 },
                // 定义数组
                userlist: [
                    { name: 'lookroot', age: 20 },
                    { name: 'lili', age: 21 }
                ]
            }
        },
    })
</script>
```

在这个**data**中进行定义，那有人会疑惑为啥这个**data**是个函数啊，为啥不是直接就是个对象，这个点的话要后面才能体会到，我先简单说一下，因为vue组件化开发，每个组件都会有一个data属性，如果直接定义为一个对象的话，后面的全都是这一个data了，这个数据变化就会影响到其他的组件

那么我们这里定义好了数据，怎么知道它到底定义好了没有啊

这里提供两个方式

- vue dev-tools插件

  打开页面中的插件

  ![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/181209-889506.png)

- 在生命周期里面调用来试一试

我们还是使用上面的 **created**这个周期，这里通过 **this**指向我们就可以得到vue实例中的**data**数据，大家还记得这个**this**指向吧，这里的 **this**指向就是 **vue**实例

```javascript
created() {
    console.log(this.name);
    console.log(this.age);
    console.log(this.user);
    console.log(this.userlist);
},
```

重新运行项目查看控制台，这里就已经把数据打印出来了

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/181332-506330.png)

## vue渲染展示数据

上面我们已经定义好了相关的数据，那你说定义了咋用啊

这一节我们就来讲vue的数据渲染，我们还是使用上一节定义好的数据

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                // 定义字符串
                name: 'lili',
                // 定义数字
                age: 1,
                // 定义对象
                user: { name: 'lookroot', age: 20 },
                // 定义数组
                userlist: [
                    { name: 'lookroot', age: 20 },
                    { name: 'lili', age: 21 }
                ],
            }
        },
    })
</script>
```

然后我们来到**html**页面中编辑，还记得之前说的吗 所有的页面都要放到**#app**容器里面 

我们在页面中展示在**data**中定义的数据使用**文本插值**的方式用**{{}}**包裹

## 首先展示基本数据类型

直接用**{{}}**包裹住刚刚在**data**中定义的数据就可以了

```vue
<div id="app">
    <!-- 文本插值的方式 -->
    <h2>{{name}}</h2>
    <h2>{{age}}</h2>
    <h2>{{user}}</h2>
</div>
```

打开浏览器看看效果，字符串和数字都能展示

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/204814-191056.png)

## 展示对象

但是这个**user**对象这样展示肯定是不行的怎么办呢？在**{{}}**里面能直接使用对象的属性，因为里面是支持JavaScript的语法的，比如我们再添加两个

```html
<h2>{{user.name+'-'+user.age}}</h2>
<h2>{{1+1}}</h2>
<h2>{{'lookroot'.split('').reverse().join('')}}</h2>
```

浏览器查看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/205300-12672.png)

## v-for遍历

刚刚这个**userlist**它是个数组应该怎么展示了，大家有人肯定会这样想，其实这样是能展示的，但是几十几千条数据呢?

```html
<ul>
    <li>{{userlist[0].name+'-'+userlist[0].age}}</li>
    <li>{{userlist[1].name+'-'+userlist[1].age}}</li>
</ul>
```

但是这里要用到非常重要的一个点**v-for**循环

再次在页面中添加内容,这里的意思就是把这个**userlist**循环为li列表，我们在**li**节点上使用 **v-for**,括号里面的值第一个是循环出来的对象，第二个值是索引，然后在后面的**{{}}**里面我们就能像上面展示对象的方式来使用循环出来的对象的数据了

这里还有一个 **:key**这个是为了保证当前循环列的唯一性，操作了数据后，页面会重排，后面会详细讲到

```javascript
<ul>
    <li v-for="(user,index) in userlist" :key="index">{{user.name+'-'+user.age}}</li>
</ul>
```

这个使用其实是非常灵活的，还可以迭代数字

```html
<div v-for="id in 10">{{id}}</div>
```

还可以遍历对象，比如上面的 **user**对象,第一个是值 第二个是键 第三个是索引

```html
<!-- 遍历对象 -->
<div v-for="(value,key,index) in user">
    {{index}}- {{key}}-{{value}}
</div>
```



打开浏览器看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/111331-768779.png)

## 原生的html

刚刚我们在**data**定义的数据都是规范的数据类型，那么万一我要定义一个这样的字符串

```javascript
data() {
    return {
        // 定义一个原生html
        userhtml: '<h2>lili</h2>'
    }
},
```

页面中该如何渲染呢？如果直接使用 **{{}}**效果是这样的，这肯定不是我们想要的效果，我们要的是把它渲染为一个 **h2**标签

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/210847-659010.png)

这里就应该使用 **v-html**

```html
<div v-html="userhtml"></div>
```

再次查看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/211011-835387.png)

## v-bind

上面讲了页面怎么渲染数据，那么**vue**如何给一些空间绑定数据呢？

比如 **图片链接**、**单选框**、**样式**等等 这里就要使用到 **v-bind**

首先初始化一个 **vue**项目，定义一个图片链接字符串

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                avatar: 'https://www.baidu.com/img/bd_logo1.png',
            }
        },
        created() {

        },
    })
</script>
```

先回想一下我们在页面中是如何使用图片地址的

```html
<img src="https://www.baidu.com/img/bd_logo1.png" alt="">
```

但是我们这里 这个图片地址是定义在 **data**中的那么如何使用呢？使用 **v-bind**命令并且指明是绑定 **src** 属性

```html
<img v-bind:src="avatar" alt="">
```

打开浏览器看下效果为了方便展示我们给全页面的img都指定一个样式

```css
<style>
    img {
        height: 100px;
        width: 100px;
    }
</style>
```

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/141734-955673.png)

是完全可以的 而且这个 **v-bind**是可以简写的，直接写 **:**就可以了

```html
<img :src="avatar" alt="">
```

那么这里你就疑问了？这个绑定到底有啥用啊？我不如直接把链接写到页面中啊

我们还是在**data**里面定义这个**userlist**这个数据，然后每个用户我们都添加一个 **avatar**属性

```
data() {
    return {
        avatar: 'https://www.baidu.com/img/bd_logo1.png',
        userlist: [
            { name: 'lookroot', age: 20, sex: 1, avatar: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111&gp=0.jpg' },
            { name: 'lili', age: 21, sex: 2, avatar: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=0.jpg' }
        ]
    }
},
```

那么现在我要在页面中展示这个**userlist**数据 并展示头像该怎么做？这个时候就要用到 **v-bind**了

```html
<ul>
    <li v-for="(user,index) in userlist" :key="index">
        <img :src="user.avatar" alt="">
        {{user.name+'-'+user.age}}
    </li>
</ul>
```

诶你上面说的绑定单选框是怎么回事啊？那么我们这里就在循环中给添加一个节点，性别为1的用户，单选框为选中状态

使用`:checked`

```html
 <ul>
     <li v-for="(user,index) in userlist" :key="index">
         <img :src="user.avatar" alt="">
         {{user.name+'-'+user.age}}
         <input type="checkbox" name="" id="" :checked="user.sex===1">
     </li>
 </ul>
```

来我们到浏览器看下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/142736-533934.png)

当然 v-bind还可以绑定其他，我们在后面会提到

## v-model

**v-model**就是数据的双向绑定，  是**:value**和**v-on**的结合，这个**v-on**下一节会讲到，反正通俗点说既可以绑定数据，又可以监控数据的变化同步到 **data**中，常用在表单中

首先我们在这个 **data**中定义一个字符串 

```javascript
title: 'lookroot',
```

然后在页面中使用 **v-model**将**title**绑定一个**input**输入框，并且同时在页面上渲染这个 **title**字符串

```html
输入<input type="text" v-model="title">输出:<span>{{title}}</span>
```

打开浏览器查看效果我们可以发现，当修改input框的值的时候，**dev-tools**插件里面显示 **data**中的**title**在发生变化，同时页面中的输出渲染也跟着变化了，这就是**v-model**的双向绑定

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/160853-451277.gif)

说好的绑定表单呢？来一个吧

首先表单不可能是一个一个字符串的定义吧，我们直接定义一个 **user**对象来当做表单，你说你这个对象里面有些字段怎么还有值啊，这个就是表单的初始化，你看很多地方叫你填写表单都有个默认值吧！

```javascript
user: {
    name: 'lookroot',
    age: 12,
    sex: 2,
    avatar: ''
},
```

然后来到页面中，这里有个问题啊，加入我们使用 **select**来选择性别，还得一个一个写男女吗？学以致用啊！上面不是学了循环和绑定数据了吗！

定义一个性别数组,这个count就是对应上面 **user**中的 **sex** 因为最终绑定的是这个数字，而不是字符串啊

```javascript
sexlist: [
    { count: 1, name: '男' },
    { count: 2, name: '女' },
]
```

我们来到页面中 绑定这个表单对象，这里要注意性别使用了循环和绑定哦！

```html
 <form action="">
     <input type="text" v-model="user.name">
     <input type="text" v-model="user.age">
     //循环出 性别的选项
     <select v-model="user.sex">
         <option :value="sex.count" v-for="(sex,index) in sexlist">{{sex.name}}</option>
     </select>
     <button >存储</button>
 </form>
```

打开浏览器查看效果，这就完成绑定了！

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/162310-114452.png)

哎呀你说搞这些有个啥用啊？以前表单直接一个 **name**属性 就直接提交后台了，但是现在前后端分离，前端就需要收集这些数据，然后将这些数据传递给后台，如果绑定了这些表单数据的话，我是不是触发点击事件的时候，直接就把**data**中的数据传递给后台就行了啊！ 

## v-if和v-show 

还记得**jquery**里面的 `show()`和`hide()`用来控制显示与隐藏的方法吗？

vue同样有用来控制显示的方法就是 `v-if`和`v-show` 

### 示例

我们初始化一个vue项目,定义一个属性i**sShow**值为false

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                //是否显示
                isShow: false,
            }
        },
        created() {

        },
    })
</script>
```

我们来到页面中，两个div分别绑定了 `v-if` 和 `v-show` 绑定的属性都是 `isShow`，也就是都是绑定的 **false**当前两个盒子默认不显示

```html
<div id="app">
    <div v-if="isShow">v-if isShow</div>
    <div v-show="isShow">v-show isShow</div>
</div>
```

然后打开浏览器查看效果，发现一片空白，

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/212638-560328.png)

我们打开**dev-tools**，修改**isshow**的值为**true**，发现盒子展示出来了

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/213304-969395.png)

那么你说这个 **v-if**和 **v-show**都能控制它显示和隐藏，那么有什么区别呢？

我们来到浏览器的**elements**页面，通过切换显示与隐藏，然后截图可以发现，**v-show**的切换显示与隐藏知识加了一个`display:none`,而**v-if**是删除掉了这个节点

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/213417-281097.png)

### 那么分别用在什么场景呢？

**v-if**有更高的切换消耗，**v-show**有更高的初始渲染消耗,

所以经常切换显示与隐藏的使用 **v-show**；初始化页面的时候就控制是否显示与隐藏的使用 **v-if**,减轻渲染压力

这里举一个例子，我们添加一个 **loginUser** 对象，**sex**性别为2

```javascript
data() {
    return {
        //是否显示
        isShow: false,
        //用户
        loginUser: { name: 'lookroot', sex: 2 }
    }
},
```

那么我们在页面中定义好，只显示性别为1的用户，这样做页面一开始就不会渲染了，减轻了渲染压力

```html
<!-- 性别为1的才显示 -->
<div v-if="loginUser.sex===1">{{loginUser.name+'-'+loginUser.sex}}</div>
```

### v-if和v-for不建议在一起使用

为什么？因为**v-if**和**v-for**在同一个节点上使用，**v-for**具有更高的优先级，也就是循环一个元素就要进行一次判断

比如我们定义一个新的数据 

```javascript
userlist: [
    { name: 'lookroot', sex: 2 },
    { name: 'lili', sex: 1 }
]
```

然后我们在页面中使用 **v-for**循环渲染出用户数据，并且使用 **v-if**来判断 **sex===1**的人才显示

```html
 <ul>
     <li v-for="(loginUser,index) in userlist" v-if="loginUser.sex===1">{{loginUser.name+'-'+loginUser.sex}}</li>
 </ul>
```

打开浏览器查看效果，是完全可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/135718-841231.png)

但是这里就有一个问题如果修改了 **userlist**的数据，页面会重新渲染，哪怕你只修改了一个用户的数据，页面都要重新渲染一次，每次都要循环再判断性别，很大的性能消耗

那么正确的方式应该是怎么做呢？

官方推荐是使用 **计算属性**这个我们后面会讲，但是这里我可以先讲思路，就是这个**v-for**循环的数据我们给它的就是处理过后的，不给它完整的数组

比如修改一下刚刚的 **data**中定义的**userlist**，这样**v-for**在循环的时候就已经是只有**sex===1**的用户数组了，也就用不上 **v-if**了

```JavaScript
userlist: [
    { name: 'lookroot', sex: 2 },
    { name: 'lili', sex: 1 }
].filter(function (user) {
    return user.sex === 1;
})
```


## watch监听器

顾名思义，就是监听，那么监听什么呢？就是监听**data**中的属性，就好比网警，你出界了可不行

我们来简单实践一下吧 定义一个 **fontsize** 属性

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                fontSize: 24,
            }
        },
    })
</script>
```

这个监听器怎么写呢，它是vue的一个属性，所以要传递到实例化vue的属性中,然后他可以定义多个监听器，监听器的名称就是你要监听**data**中哪个属性的名称，这里我们监听 **fontSize** 括号两个参数，第一个是当前最新数据，第二个是上一次的数据，每当这个 **fontsize**数据变化的时候 监听器就会执行 ，这里我们先打印一下

```javascript
 let vm = new Vue({
        el: '#app',
        data() {
            return {
                fontSize: 24,
            }
        },
        //监听器
        watch: {
            fontSize(newval, oldval) {
                console.log(newval,oldval);
            }
        },
    })
```

那么怎么去修改这个 **fontsize**的值呢，我们在页面中使用 **v-model**绑定给一个拖动条

```html
<input type="range" v-model="fontSize" min="0" max="100" step="5" />
```

浏览器查看一下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/165421-367518.gif)

那你说这个有啥用啊？这个比如这个字体太大了我们就阻止它修改

```javascript
 watch: {
     fontSize(newval, oldval) {
         // console.log(newval,oldval);
         if (newval > 50) {
             alert('字体太大了啊！');
             //同时把旧的值又赋值给fontsize 这样就阻止它拖动了
             this.fontSize = oldval;
             return;
         }
     }
 },
```

查看一下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/165614-122649.png)

## computed计算属性

这个也是顾明思议，就是计算嘛那么怎么个计算法呢？

在**data**中定义两个数字

```javascript
count1: null,
count2: null,
```

并在页面中使用 **v-model**绑定

```javascript
 <input type="text" v-model.number="count1">
 <input type="text" v-model.number="count2">
```

那么我现在想我输入这两个输入框的时候就计算出他们的和该怎么做？使用 **computed**计算属性，他和监听器一样也是vue的属性，所以需要在vue属性中定义,这里我们定义一个 **num**的计算属性，我们不需要在**data**中定义，因为它本身就是一个属性，可以直接使用

```javascript
let vm = new Vue({
        el: '#app',
        data() {
            return {
                count1: null,
                count2: null,
            }
        },
        // 计算属性
        computed: {
            //计算和
            num() {
                //计算和
                return this.count1 + this.count2;
            },
        },
    })
```

我们在页面中渲染出这个 **num**

```html
<div>输出:{{num}}</div>
```

打开浏览器看下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/171239-230485.gif)

还记得在讲 **v-if**的时候说过 v-if和 v-for不建议一起使用吗？官方推荐先处理数据，当时我提过使用计算属性来处理

我们来实践一下，我们把**userlist**复制过来

```javascript
 userlist: [
     { name: 'lookroot', sex: 2 },
     { name: 'lili', sex: 1 }
 ],
```

然后新增一个计算属性`showuserlist` 那么他的值就是处理过的 **userlist**

```
 // 计算属性
 computed: {
     //计算和
     num() {
         return this.count1 + this.count2;
     },
     //返回应该渲染的数组
     showuserlist() {
         return this.userlist.filter((user) => {
             return user.sex === 1;
         })
     }
 },
```

我们在页面中就可以直接渲染这个计算属性了

```html
<ul>
    <li v-for="(loginUser,index) in showuserlist">{{loginUser.name+'-'+loginUser.sex}}</li>
</ul>
```

看下效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/171605-941574.png)