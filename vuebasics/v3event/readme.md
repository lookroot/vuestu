# vue事件
## 点击事件

还记得jquery是怎么绑定点击事件的吗

```javascript
$("button").click(function(){
  console.log('我被点击了')
});
```

那么vue是如何绑定点击事件呢？就要使用 **v-on**来监听dom的事件

首先实例化一个vue,定义一个数字 `count`

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        data() {
            return {
                count: 1
            }
        },
        created() {

        },
    })
</script>
```

然后我们在页面中设置一个按钮并绑定上点击事件，**""**里面也是可以直接写表达式的，这里我们点击事件就是增加 **data**在中 **count**的值，并且把count也渲染到页面中来



```html
<div id="app">
    <button v-on:click="count++">click</button>
    <div>输出：{{count}}</div>
</div>
```

打开浏览器来看看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/195430-808822.gif)



## 定义方法

那我们总不能一直将点击事件写在 **""**里面吧，况且有些非常复杂的逻辑呢？

这里我们就可以在 **methods**中定义方法，这个**methods**也是实例化vue需要传递的属性，我们这里定义一个**sayHello**的方法

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        methods: {
            sayhello() {
                console.log('hello world');
            }
        },
        data() {
            return {
                count: 1
            }
        },
        created() {

        },
    })
</script>
```

然后在页面的 **v-on**中使用这个方法 ，注意 **v-on**可以简写为 **@**

```html
<button @click="sayhello">click</button>
```

来到浏览器查看效果，是可以的

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/195748-4424.png)

## 按键事件

那么vue的按键事件该如何监听呢？

这里举例一个场景：我们很多人有这个习惯，输入框输入完成后 点击键盘的回车键 提交表单是吧

首先我们在 **methods**中定义一个 **submit**方法

```javascript
methods: {
    sayhello() {
        console.log('hello world');
    },
    submit() {
        console.log('我提交了');
    }
},
```

然后我们在页面中绑定监听按钮事件**keyup**就是按钮事件

```html
<input type="text" @keyup.enter="submit">
```

查看效果

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/200502-569243.png)

具体有哪些呢 这里有个官网的截图

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/173514-561610.png)

讲了这么多了我们来个综合练习，我们把 **v-bind**那一节的代码拷贝过来,做一些简单的修改，一个正常开发的逻辑

首先我们将 **data**中的 **userlist**初始化为空数组，因为实际开发这个数组要从后端去取数据

```javascript
data() {
    return {
        count: 1,
        userlist: [],
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
```

然后是从后台加载数据，因为我们没有后台，所以加载假数据，也就是提前写死这个数据，这里只是实现这个过程

我们在 **methods**定义方法 **loadData**用来初始化数据

```javascript
methods: {
    //模拟加载数据
    loadData() {
        //从后台加载中 实际开发这个 res 应该从后端获取....
        console.log('加载数据中');
        const res = [
            { name: 'lookroot', age: 20, sex: 1, avatar: 'https://dss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=218375221,1552855610&fm=111
            { name: 'lili', age: 21, sex: 2, avatar: 'https://dss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1305353222,2352820043&fm=26&gp=
        ];
        console.log('加载完成');
        // 赋值给 data中 userlist
        this.userlist = res;
    },
},
```

那么这么初始化数据定义好了 什么时候调用呢?这就要用到我们前面讲的 生命周期了

这里要使用到 **created** 这个周期，因为此时 data已经初始化成功了，如果你在这个生命周期前面调用的话，就会报错找不到 这个 **userlist**，那么我们就在这里调用刚刚的 **loadData**这个方法，完成初始化数据

```javascript
// 在这个生命周期去后台读取数据
created() {
    //调用初始化数据的方法
    this.loadData();
},
```

那么现在我们在打开页面的时候就会自动初始化数据了

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/202256-698783.png)

然后我们来操作这个表单，给存储按钮绑定一个点击事件，但是这个时候我们点击按钮会发现为啥页面刷新了？

```html
<form action="">
    <input type="text" v-model="user.name">
    <input type="text" v-model="user.age">
    <input type="text" v-model="user.avatar">
    <select v-model="user.sex">
        <option :value="sex.count" v-for="(sex,index) in sexlist">{{sex.name}}</option>
    </select>
    <button @click="submit">存储</button>
</form>
```

这个原因是 **button** 是**html**表单中的默认提交，只要点了就会提交到指定页面，但是我们使用vue不想让它提交页面，也不需要提交页面，那么怎么做呢？

修改一下这个绑定的点击事件，这个**prevent**可以阻止页面的默认事件，这样页面就不会跳转了！

```html
<button @click.prevent="submit">存储</button>
```

然后我们修改一下这个 **submit**事件，就是把当前表单的**user**对象插入到**userlist**中

```javascript
 submit() {
     //假装提交后台了
     this.userlist.push(this.user);
 }
```

然后我们来浏览器看看效果，这里细心的朋友会发现，我第一存储表单是没添加头像地址，第二次添加了头像，为啥第一次添加的用户也有同一个头像呢？



![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/204544-350985.gif)



这就是因为我们直接插入的 **this.user**，没有拷贝数据，所以每次插入 **userlist**其实是同一个对象

所以这里我们需要进行一下拷贝 也可以使用 `JSON.parse(JSON.stringify(obj))`

```JavaScript
submit() {
    let user = Object.assign({}, this.user);
    this.userlist.push(user);
}
```

好的再次查看效果发现没有这个



![vue教程-lookroot](https://img.lookroot.cn/blog/202003/26/204930-546099.gif)



做到这里大家发现了没有 通过这上面的数据绑定 事件触发 数据更新 这不就是我前面讲的 **mvvm** 吗？大家认真体会啊！