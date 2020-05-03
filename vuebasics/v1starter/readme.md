# 第一个vue程序

## 首先是常见的使用方式

- 直接引入，就是我们常规的通过`script`标签引入完整版vue文件
- webpack自定义打包，这个打包的意思就好比是你家里买了很多家具，你直接全部乱放也能正常使用，但是肯定不科学，所以要放置到指定的位置，这个过程就相当于是打包，后面会详细讲到
- vue-cli脚手架，这个也是通过`webpack`进行打包，不过打包的规则都是它定义好了，我们直接用就可以了非常方便

## 首先浏览器安装dev-tools插件

[查看教程](/views/tools/vuedevtool)
##  初始化程序

基础部分我们会使用直接引入的方式使用vuejs，

如果你使用的是`hbuilder`工具的话可以直接创建vue程序，它会自动引入vue文件

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/164032-669642.png)

如果你使用的是其他工具的话，可以下载vue完整文件然后手动引入

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/164159-567914.png)

或者使用cdn的方式引入

```javascript
<script src="https://cdn.bootcss.com/vue/2.6.11/vue.js"></script>
```

这里我们新建一个`index.html`页面文件，引入`vuejs`文件

首先在`body`中添加一个盒子，作为挂载点（容器），意思就是把vue程序挂载在这个地方，比如前面我们提到的家具放到房子里面，这个房子就是挂载点

```html
<body>
    <div id="app"></div>
</body>
```

然后实例化一个`vue`，传入一个对象

```vue
<script>
    let vm = new Vue({
        //挂载到刚刚我们准备的容器上面 这里等同于el: document.getElementById('app'), 
        //其实就是一个dom选择
        el:'#app',
        //el: document.getElementById('app'),
        //生命周期 类似于 jquery 的$.ready()
        created() {
            console.log('hello world');
        },
    })
</script>
```

现在我们可以直接在浏览器中打开项目了，但是还记得刚刚我们安装的 `dev-tools`吗，如果直接运行时无法触发它的，

当前情况下（未使用webpack打包）我们有两种方式触发它

- 使用`hbuilder`运行到浏览器

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/170253-66450.png)

- 使用`vscode`就需要安装插件`live server`

  

  ![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/170219-975902.png)

然后点击 `open with live server`

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/170331-664240.png)

这样的话就能触发刚刚的插件了，我们来到浏览器，按**f12**首先看控制台，这里执行了刚刚的打印方法，并且这个 `vue-devtools` 也开启了；

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/170530-213446.png)

然后我们点击这个控制台的 **vue** 选项，这就打开了插件界面，具体怎么使用，后面再讲

![vue教程-lookroot](https://img.lookroot.cn/blog/202003/25/170725-529757.png)

到这里你就完成了第一个vue程序的开发

## vue结构

上一节我们实例化vue的时候传递了一个对象，那么这个对象具体是个什么样的结构那，可以传递一些什么样的值那

```javascript
<script>
    // 实例化一个vue
    let vm = new Vue({
        // 页面中的挂载点
        el: '#app',
        // 定义内部数据
        data: {
        },
        // 方法列表
        methods: {

        },
        // 监听事件
        watch: {

        },
        // 计算属性
        computed: {
            
        },
        // 组件
        components: {

        },
        // 私有过滤器
        filters: {

        },
        //自定义私有指令
        directives: {

        }
    })
</script>
```

那么围绕这些属性，将是我们本次基础部分的内容

## 什么是生命周期

我们上一节在`created`里面执行了一个打印方法，那么我说了这个就类似于`jquery`的`$.ready`一样

那么具体有哪些常用的生命周期呢

这个东西就好比人的一生，你出生的时候做什么，成年的时候做什么，反正就是不同的阶段做不动的事情

那么我们就可以利用不同的生命周期来完成不同的事情比如

- 初始化数据
- 开启和关闭进度条
- 关闭页面时保存数据
- ...

## vue有哪些生命周期

```javascript
<script>
    let vm = new Vue({
        el: '#app',
        // 完成创建之前 不能使用data和methods中的数据
        beforeCreate() {
            console.log('before');
        },
        // 数据已经初始化
        created() {
            console.log('created');
        },
        // 模板已将编辑在内存但是并未渲染，数据还未渲染到页面中
        beforeMount() {
            
        },
         //vue实例 已经挂载好页面了
        mounted() {
          
        },
         // 更新页面数据后 内存中data的数据已经改变 但是页面中的数据还没有完成渲染
        beforeUpdate() {
           
        },
        // 更新数据后 页面和data数据已经同步了
        updated() {
            
        },
         // 销毁当前实例
        destroyed() {
           
        },
    })
</script>
```

这里这么多的生命周期，其实不是所有都是常用的，具体的使用我们会在后面一一讲解，这里只做一个了解
