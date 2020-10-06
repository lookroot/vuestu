# uniapp基础部分

有文档还看什么教程？

官网文档非常的详细，但是如果没有接触过的新人看文档其实是没法学的，因为他不知道要完成一个开发，需要学习那些知识点，而且如何正确的使用文档也不清楚

本次内容主要是为后面的实战课打基础，如果你会的话完全可以不看，也大可不必说什么风言风语，你会不代表别人都会，说这种话真的让人挺难受的

其实我昨天晚上凌晨已经录了一套视频是完全现场看文档录的，效果不好，还是得写个简单的文档来录（肝👍）

**本次的内容主要就是带你看文档**，没错就是看文档，让你学会看文档，并且有个整体的认知 

## 开发工具

首先uniapp可以使用命令行的方式开发，然后选择你喜欢的开发工具，但是大可不必，[HBuilder X](https://www.dcloud.io/hbuilderx.html)完全能满足需求，记得下载app开发版本的

官方称可以同时编译十个平台，但是如果你想让每个平台都是同样的体验的话，估计是要花很多的功夫的；即使你只需要开发微信小程序一个平台，uniapp也是一个很好的选择

![image-20201005012909579](https://img.lookroot.cn/blog/202010/05/012910-966766.png)

我希望你是使用chrome浏览器的，新edge浏览器也可以，如果你对浏览器调试感兴趣的话还可以看我总结的[浏览器调试技巧](https://www.lookroot.cn/course/chromedevtools/)

你还可以在电脑上安装一个 Android的虚拟机用来做安卓端的调试，安装小程序开发工具（一般安装微信的就可以了）

## 前置知识

你最好能有vuejs的基础知识，如果没有也别怕,可以跟着我的[vue基础教程](https://www.lookroot.cn/course/vuebasics/)学习，花不了多少时间

## 认识一下官方文档

![image-20201005224206838](https://img.lookroot.cn/blog/202010/05/224207-836601.png)

- 介绍 ；这个部分的内容更像一个说明书，可以看一下
- 框架；这个部分更多的是关于整个项目的配置方面的东西
- 组件；项目中的页面实现主要看这个部分
- API；项目中的逻辑功能主要看这个部分
- unicloud；小公司利器，后面会专门讲

### 意图

首先你一定要明确自己的意图，使用uniapp的目的，不能为了会什么技术去做什么东西，要为了实现什么功能去学习技术

- 如果你是想开发精美的移动app 你完全可以使用原生就行开发 flutter也是更好的选择

- 如果你只是想开发小程序，uniapp也是一个非常好的选择

- 如果你想快速上线一个 小程序+app的应用，你需要提前做好填坑的心理准备
  - uniapp继承了weex那一套，再app端你可以使用nvue渲染，纯原生渲染

## 我们认识一下项目

![image-20201005013906497](https://img.lookroot.cn/blog/202010/05/013907-774422.png)

打开`manifest.json`可以对我们的项目进行配置，不过目前你也不能配置个啥，可以设置一下h5网页的名称或者是app端的图标等等，后面需要配置的地方再说

### page

`pages.json`是项目的页面配置，可能是我们前面最多配置的地方，`pages`数组里面放置的就是一个个页面，第一项配置就是默认打开程序的页面，后面如果我们调试哪个页面，为了方便可以把他放到第一个位置

### tabBar

很多应用基本的标配

![image-20201005014342729](https://img.lookroot.cn/blog/202010/05/014343-910732.png)

配置它也很简单，我们先创建三个页面来试一试，在`pages`文件夹鼠标右键可以选择新建页面

![image-20201005014439554](https://img.lookroot.cn/blog/202010/05/014440-54348.png)

根据这个方式我们新建`content、list`这两个页面，每个页面的文件中我们就随便写个文本区别就行了，uniapp的页面结构和vuejs是几乎一样的

![image-20201005014611690](https://img.lookroot.cn/blog/202010/05/014614-72989.png)

然后我们在`static`目录下放置一个图标`icon.png`

在`page.json`中配置我们的tabBar，可以通过`color`和`selectedColor`来设置默认和选中的字体颜色，`list`里面就是放置的具体每个选项，每个选项里面需要配置`pagePath`页面链接,`iconPath`默认图`selectedIconPath`选中以后的图标，`text`文本

```json
"tabBar": {
	"color": "#7A7E83",
	"selectedColor": "#f55f25",
	"borderStyle": "black",
	"backgroundColor": "#ffffff",
	"list": [{
			"pagePath": "pages/index/index",
			"iconPath": "static/logo.png",
			"selectedIconPath": "static/icon.png",
			"text": "主页"
		},
		{
			"pagePath": "pages/list/list",
			"iconPath": "static/logo.png",
			"selectedIconPath": "static/icon.png",
			"text": "列表"
		}, {
			"pagePath": "pages/content/content",
			"iconPath": "static/logo.png",
			"selectedIconPath": "static/icon.png",
			"text": "内容"
		}
	]
}
```

![image-20201005015111623](https://img.lookroot.cn/blog/202010/05/015113-687820.png)

看下效果

![image-20201005015136609](https://img.lookroot.cn/blog/202010/05/015137-230890.png)



### 导航栏

[文档](https://uniapp.dcloud.io/collocation/pages?id=customnav)

当页面的默认导航栏不满足我们的需求的时候，我们可以自定义导航栏，只需要在这个页面的`page.json`栏目设置一下就可以了

```json
{
	"path": "pages/index/index",
	"style": {
		"navigationBarTitleText": "uni-app",
		"navigationStyle":"custom"
	}
},
```

此时我们的导航栏就不见了，可以使用官方的组件，也可以自己实现，详情看下方的**使用组件**

### 使用组件

uniapp的生态还是不错的，除了官方的 `uni-ui`插件市场还有很多现成的东西

我们下载一个[这个插件](https://ext.dcloud.net.cn/plugin?id=52)

![image-20201005223810843](https://img.lookroot.cn/blog/202010/05/223810-570807.png)

新版本的uniapp是不需要做任何配置可以直接使用第三方组件的

![image-20201005010056921](https://img.lookroot.cn/blog/202010/05/010057-733423.png)

直接在页面中使用这个插件，然后看看效果

```vue
<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>
```

![image-20201005223931902](https://img.lookroot.cn/blog/202010/05/223932-506230.png)

### 使用微信小程序的组件

[文档](https://uniapp.dcloud.io/frame?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e7%bb%84%e4%bb%b6%e6%94%af%e6%8c%81)

有时候你需要的组件，uniapp插件市场没有，但是微信小程序组件里面有怎么办呢，uniapp也是可以使用小程序组件的

在根目录新建一个`wxcomponents`文件夹，里面继续创建一个`wxcomdemo`文件夹

创建以下几个文件

`index.js`

```javascript
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
```

`index.json`

```json
{
  "component": true
}
```

`index.wxml`

```html
<view class="inner">
  {{innerText}}
</view>
<slot></slot>
```

`index.wxss`

```css
/* 这里的样式只应用于这个自定义组件 */
.inner {
  color: red;
}
```

以上这几个文件便组成了一个标准的小程序组件了，这个组件的意思就是传入一个字符串，然后展示它字体为红色，下面来使用这个组件吧！

在需要使用这个组件的页面的`page.json`项配置

```json
"path": "pages/index/index",
"style": {
	"navigationBarTitleText": "uni-app",
	"navigationStyle": "custom",
	"usingComponents": {
		"wxcomdemo": "/wxcomponents/wxcomdemo/index"
	}
}
```

然后在这个页面中使用

```vue
<wxcomdemo inner-text="Some text"></wxcomdemo>
```

此时我们看看效果

![image-20201005231057422](https://img.lookroot.cn/blog/202010/05/231057-522456.png)

## 构建一个todolist

### 使用color ui

因为懒得写样式，我们引入[colorui](https://ext.dcloud.net.cn/plugin?id=239)，导入项目以后复制根目录的 `/colorui` 文件夹到你的根目录

App.vue` 引入关键Css `

```vue
<style>
    @import "colorui/main.css";
    @import "colorui/icon.css";
</style>
```

平时开发的时候需要什么效果，我们直接将这个示例项目运行起来，然后去复制它页面中的代码就行

### 列表渲染

比如这个列表左滑就适合我们的页面

![image-20201006141045779](https://img.lookroot.cn/blog/202010/06/141046-631570.png)

直接复制过来做下修改，首先定义几个需要使用的属性

```javascript
staticTodoList: [{
		_id: 1,
		_name: "第一件事",
		_status: false
	},
	{
		_id: 2,
		_name: "第二件事",
		_status: true
	},
	{
		_id: 3,
		_name: "第三件事",
		_status: false
	}
],
todoList: [],
modalName: null,
listTouchStart: 0,
listTouchDirection: null,
```

在`onload`的时候我们要初始化数据，这个`staticTodoList`就是我们模拟的静态数据

```JavaScript
onLoad() {
	this.todoList = this.staticTodoList;
},
```

然后使用刚刚复制的页面代码渲染它

```vue
<view class="cu-item" 
:class="modalName=='move-box-'+ index?'move-cur':''" 
v-for="(todo,index) in todoList" 
:key="index"
 @touchstart="ListTouchStart" 
 @touchmove="ListTouchMove" 
 @touchend="ListTouchEnd" 
 :data-target="'move-box-' + index">
	<view class="content" >
		<view class="text-grey">{{todo._name}}</view>
	</view>
	<view class="action">
		<switch :checked="todo._status"  :data-_id="todo._id" />
	</view>
	<view class="move">
		<view class="bg-red" >删除</view>
	</view>
</view>
```

它的页面中还定义了几个事件，我们也拷贝过来

```javascript
ListTouchStart(e) {
	this.listTouchStart = e.touches[0].pageX
},
ListTouchMove(e) {
	this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
},
ListTouchEnd(e) {
	if (this.listTouchDirection == 'left') {
		this.modalName = e.currentTarget.dataset.target
	} else {
		this.modalName = null
	}
	this.listTouchDirection = null
},
```

看下效果

![image-20201006141627428](https://img.lookroot.cn/blog/202010/06/141628-187411.png)

#### 删除和切换（小技巧🚲）

```vue
<view class="action" >
	<switch :checked="todo._status" @change="switchTodo" :data-_id="todo._id" />
</view>
<view class="move">
	<view class="bg-red" @click="del(todo._id)">删除</view>
</view>
```

这两个事件也非常简单，主要是状态切换这里有个小问题，`@change`只能传递当前的是否选中的值，不能传递当前项的id值，这就没法处理数据，所以可以给这个节点绑定一个`:data-_id="todo._id" `，然后通过`e.target.dataset._id`就能取出这个id值了！

```javascript
switchTodo(e) {
	const status = e.target.value;
	const _id = e.target.dataset._id;
	this.todoList = this.todoList.map(todo => {
		if (todo._id == _id) {
			todo._status = status;
		}
		return todo;
	})
	uni.showToast({
		title: status ? "已完成" : "已取消",
		icon: status ? "success" : "none"
	})
},
del(_delId) {
	this.todoList = this.todoList.filter(todo => {
		return todo._id != _delId
	});
},
```

### mixin

vue中的mixin同样的也可以在这里面使用，不知道这个东西的朋友，可以理解为公用逻辑抽离，需要使用的地方直接引入就可以了

比如`Toast`这个消息通知经常用，我们可以封装一下，新建一个`mixin/message.js`

```javascript
module.exports = {
	methods: {
		toast(message, duration, success) {
			uni.showToast({
				title: message,
				icon: success ? "success" : "none",
				duration: duration
			})
		},
	},
};
```

使用它

```vue
import message from "@/mixin/message.js"
export default {
		... ... 
		mixins: [message],
		... ... 
}
```

然后可以直接通过`this.toast("不能为空", 2000, false);`来使用

### 表单

新增todo的功能，还是去coloruI的项目里面拷贝 form的模板代码

```vue
<form @submit="add" @reset="clear">
	<view class="cu-form-group margin-top">
		<view class="title">新增</view>
		<input placeholder="todo" name="_name"></input>
	</view>
	<view class="padding flex flex-direction">
		<button form-type="submit" class="cu-btn bg-blue lg">保存</button>
		<button form-type="reset" class="cu-btn bg-red margin-tb-sm lg">清空</button>
	</view>
</form>
```

这个添加和清空事件也非常简单

```javascript
add(e) {
	let _name = e.detail.value._name;
	if (_name === null || _name === "") {
		this.toast("不能为空", 2000, false);
		return;
	}
	const _id = this.todoList.length > 0 ? this.todoList[this.todoList.length - 1]._id + 1 : 1;
	this.todoList.push({
		_id: _id,
		_name: _name,
		_status: false
	});
	this.toast("添加成功,_id:" + _id,1000,true)
	e.detail.value = null;
},
clear() {
}
```

![image-20201006142026519](https://img.lookroot.cn/blog/202010/06/142028-603838.png)

### 数据缓存

删除以后我们刷新页面数据又回来了，可以试一下数据缓存（真实开发，这些都是后端返回）

我们在`switchTodo、del、add`这三个事件里面我们都添加一个缓存，将最新数据缓存到本地

```javascript
uni.setStorageSync("todolist", this.todoList);
```

然后在页面启动的时候加载这个缓存

```javascript
onLoad() {
	const todolist = uni.getStorageSync("todolist")
	if (todolist != "") {
		this.todoList = uni.getStorageSync("todolist");
	} else {
		this.todoList = this.staticTodoList;
	}
},
```

### 页面跳转

我们新增一个`todocontent`页面，方便我们点进去查看每一个todo的详情

然后修改一下页面的列表渲染，增加一个点击事件

```vue
<view class="cu-item" 
:class="modalName=='move-box-'+ index?'move-cur':''" 
v-for="(todo,index) in todoList" 
:key="index"
@click="gotoContent(todo._id)"
... ... 
```

写一下这个事件`gotoContent`,页面传参和网页的形式差不多[文档](https://uniapp.dcloud.io/api/router?id=navigateto)

```javascript
gotoContent(_id) {
	uni.navigateTo({
		url: '../todocontent/todocontent?_id=' + _id
	});
},
```

然后在 `todocontent`这个页面中接受这个参数

```javascript
onLoad(e) {
	console.log(e._id);
},
```

### 冒泡点击

上面的功能实现以后会有一个问题，此时我们再次点击删除或者切换的按钮，就会直接跳转到另外一个页面了，所以我们要阻止这个点击部位的跳转事件，很简单

```vue
<view class="action" @click.stop="">
	<switch :checked="todo._status" @change="switchTodo" :data-_id="todo._id" />
</view>
<view class="move">
	<view class="bg-red" @click.stop="del(todo._id)">删除</view>
</view>
```

### 网络请求

为了有意思一点，我们这个具体的`content`的数据将模拟后端返回

#### 创建服务（小技巧🚲）

最方便的开启一个服务可以使用vscode的 `live server`插件

![image-20201006144356886](https://img.lookroot.cn/blog/202010/06/144357-393952.png)

我们新建个`todolist.json`文件

```json
[
    {
        "_name": "第一件事",
        "_id":1,
        "_status":false,
        "_time":1601956497000,
        "_content":"花花世界迷人眼,没有实力别赛脸。"
    },
    {
        "_name": "第二件事",
        "_id":2,
        "_status":false,
        "_time":1601956497000,
        "_content":"天热脾气躁,我不微笑你别闹。"
    },
    {
        "_name": "第三件事",
        "_id":3,
        "_status":false,
        "_time":1601956497000,
        "_content":"江南江北一条街,打听打听谁是爹。"
    }
]
```

这里有个时间戳对吧，再介绍一个小技巧🚲，我们在浏览器中定义这样的脚本

![image-20201006145505964](https://img.lookroot.cn/blog/202010/06/145506-672070.png)

然后按`ctrl + p`使用快捷运行这个命令

![image-20201006145543464](https://img.lookroot.cn/blog/202010/06/145544-424191.png)

![image-20201006145644892](https://img.lookroot.cn/blog/202010/06/145645-439965.png)

想查看更多的浏览器技巧吗[浏览器调试](https://www.lookroot.cn/course/chromedevtools/)

随便创建一个`html`文件然后使用`live server`打开

![image-20201006144427988](https://img.lookroot.cn/blog/202010/06/144428-320961.png)

接着我们在地址栏找到我们的json文件，服务启动成功！

![image-20201006144454405](https://img.lookroot.cn/blog/202010/06/144455-945355.png)

#### 请求数据

我们开始在`todocontent`这个页面请求数据了

首先我们要`onLoad`里面进行请求

```javascript
onLoad(e) {
	this.loadData(parseInt(e._id));
},
```

写一下这个`loadData`

```javascript
loadData(_id) {
	this.getTodoById(_id);
},
```

还用定义一个默认的空的todo对象

```javascript
todo: {
	_id: -1,
	_name: "null",
	_status: false,
	_time: null,
	_content: "null"
},
```

写一下这个`getTodoById`使用`uni.request`请求数据，这里使用 `promise`的方式稍微写复杂且没有意义，单纯就是为了给大家模拟一个实际开发的常规请求

```javascript
async getTodoById(_id) {
	uni.showLoading();
	const value = await uni.request({
		url: 'http://127.0.0.1:5500/todolist.json'
	}).then(data => {
		uni.hideLoading();
		var [error, res] = data;
		if (error != null | res == null) {
			this.toast("网络异常", 1000, false)
			return Promise.resolve(this.todo);
		}
		if (res.data.length > 0) {
			const todo = res.data.find(todo => {
				return todo._id === _id;
			})
			return Promise.resolve(todo);
		}
	});
	this.todo = value;
}
```

#### 渲染数据

还是像上面一下去拷贝一个页面过来

```vue
<view class="flex justify-start align-center">
	<view class="text-sl">
		{{todo._name}}
	</view>
	<view class="margin-left-sm">
		{{todo._time}}
	</view>
	<view class="margin-left-sm">
		<switch :checked="todo._status" disabled="" />
	</view>
</view>
<view class="text-xl text-gray margin-top-sm">
	{{todo._content}}
</view>
<view class="padding flex flex-direction">
	<button @click="del" class="cu-btn bg-red margin-tb-sm lg">删除</button>
</view>
```

![image-20201006145325764](https://img.lookroot.cn/blog/202010/06/145326-800413.png)

#### 过滤器

上面的时间还是时间戳肯定是不行的，我们可以使用过滤器来转换一下

来到`main.js`中，这里的时间戳稍微写的繁杂一点，但是很实用，可以自定义返回

```javascript
//补位
function formatNumber(n) {
	n = n.toString()
	return n[1] ? n : '0' + n;
}
// 时间戳转换日期
function formatTime(number, format) {
	if (!number || number == null) {
		return null;
	}
	let time = new Date(number);
	let newArr = []
	let formatArr = ['Y', 'M', 'D', 'h', 'm']
	newArr.push(time.getFullYear())
	newArr.push(formatNumber(time.getMonth() + 1))
	newArr.push(formatNumber(time.getDate()))
	newArr.push(formatNumber(time.getHours()))
	newArr.push(formatNumber(time.getMinutes()))
	for (let i in newArr) {
		format = format.replace(formatArr[i], newArr[i])
	}
	return format;
}
Vue.filter('strtotime', function(msg, arg) {
	return formatTime(msg, 'Y-M-D');
})
```

使用它

```vue
<view class="margin-left-sm">
	{{todo._time|strtotime}}
</view>
```

![image-20201006145351729](https://img.lookroot.cn/blog/202010/06/145352-525136.png)

### 页面通信

这里有个删除事件，可以通过 [页面通信](https://uniapp.dcloud.io/collocation/frame/communication)来通知上一个页面删除这个数据

定义一下这个`del`

```javascript
del() {
	uni.$emit('del_todo', {
		_id: this.todo._id
	});
    //删除完成后返回上一页
	uni.navigateBack();
},
```

然后在上一个页面中监听事件

```javascript
onLoad() {
	const todolist = uni.getStorageSync("todolist")
	if (todolist != "") {
		this.todoList = uni.getStorageSync("todolist");
	} else {
		this.todoList = this.staticTodoList;
	}
	uni.$on('del_todo', (data) => {
		this.del(data._id);
	})
},
```

### 下拉刷新

如果我们想恢复最原本的数据，可以定义一个下拉刷新事件

首先需要开启`page.json`中的配置`enablePullDownRefresh`

```json
"style": {
	"navigationBarTitleText": "uni-app",
	"navigationStyle": "custom",
	"usingComponents": {
		"wxcomdemo":"/wxcomponents/wxcomdemo/index"
	},
	"enablePullDownRefresh":true
}
```

然后在页面中重新这个事件

```javascript
onPullDownRefresh() {
	uni.setStorageSync("todolist", "")
	this.todoList=this.staticTodoList
	uni.stopPullDownRefresh();
},
```

完成！

## 条件编译

条件编译就是某些内容只在某个或者某些平台编译展示

### 模板中的条件编译

比如我只想在微信小程序中展示这个内容可以使用 `ifdef`

```
<!-- #ifdef MP-WEIXIN -->
mp-weixin
<!-- #endif -->
```

如果是想除了微信小程序这个平台不显示，其他的都使用呢？使用`ifndef `就可以了

### 样式中的条件编译

```css
<style lang="less">
	/*  #ifdef  MP-WEIXIN  */
	.content {
		color: #DD524D;
	}

	/*  #endif  */
</style>
```

## 未完待续！！！！