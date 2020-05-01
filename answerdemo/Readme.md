
构建一个简单的网课答题小程序，先看一下效果，也可以[在线预览](http://answer.lookroot.cn/#/)[我的博客](https://www.lookroot.cn/)

![v34](https://img.lookroot.cn/blog/202004/29/212234-565928.gif)

## 创建项目

### 环境介绍（老手可跳过）

**uniapp**是一个使用 Vue.js 开发跨平台应用的前端框架，**ColorUI**是uniapp社区生态里面开源的一款高质量UI库，提供了大量的预定义css样式，只需要引入对应的类型，就能快速完成一个美观的应用构建

使用**hbulider**创建一个uniapp项目，勾选 ColorUI

![image-20200429195616506](https://img.lookroot.cn/blog/202004/29/195617-398771.png)

### 项目准备（老手可跳过）

首先打开**page.json**,删除**pages**里面除开 **index**以外的所有页面配置

![image-20200429200804885](https://img.lookroot.cn/blog/202004/29/200805-812494.png)

打开**pages**文件夹，删除除开 **index**外的所有文件夹

![image-20200429200949735](https://img.lookroot.cn/blog/202004/29/200950-102916.png)

分别打开 **App.vue main.js index.vue**删除不相干的东西

![image-20200429201105549](https://img.lookroot.cn/blog/202004/29/201111-546191.png)

![image-20200429201112688](https://img.lookroot.cn/blog/202004/29/201113-671037.png)

![image-20200429201121194](https://img.lookroot.cn/blog/202004/29/201123-163271.png)

完成初始化后，可以将项目运行到浏览器中

![image-20200429202018168](https://img.lookroot.cn/blog/202004/29/202018-152188.png)

## 接口

接口我已经事先给大家准备好了！感谢bilibili用户**听说改名不能中奖**提供的思路，学生机挂载，请用来测试

| 接口                                 | 请求方式 | 参数                  |
| ------------------------------------ | -------- | --------------------- |
| https://api.lookroot.cn/api/question | GET      | question不少于6个字符 |

![image-20200429201748198](https://img.lookroot.cn/blog/202004/29/201748-125193.png)

## 开发

### 定义属性

首先我们在data中定义这样几个属性

```javascript
data() {
	return {
		//存放问题列表
		questions: [],
		//当前当前问题
		question: '',
		//存放答案列表
		answers: [],
		//是否正在加载中
		isLoading: false,
		//是否显示答案界面
		isContentShow: false
	};
},
```

### 静态页面构建

首先我们先构建静态页面，这里因为colorUI并没有开发文档，我们可以直接下载其实例来看代码，可以根据上面一样重新创建一个uniapp项目，并且勾选 ColorUI模块，并且什么也不用删除，因为这本身就是示例

同样的我们把这个项目也运行起来，然后打开这个聊天界面

![image-20200429202725096](https://img.lookroot.cn/blog/202004/29/202726-987970.png)

我们可以把这个模块的代码拷贝过来，代码在项目的**pages/component/chat.vue**，我们把代码拷贝过来精简掉不需要的东西，只留下一组聊天的对话，和发送这一块就行，图片换成你喜欢的图片地址就行（感谢管理员提供的萌妹头像）

然后保存编译，查看效果

![image-20200429203423331](https://img.lookroot.cn/blog/202004/29/203424-284671.png)

![image-20200429203447847](https://img.lookroot.cn/blog/202004/29/203448-734622.png)

### 数据获取

首先我们给 **input** 输入框绑定上属性，给按钮绑定点击事件

```vue
<view class="cu-bar foot input">
	<input type="text" class="uni-input  solid-bottom" v-model="question" />
	<button class="cu-btn bg-green shadow" @click="getAnwser">发送</button>
</view>
```

编写一下这个 **getAnwser**方法

```javascript
methods: {
	getAnwser() {
		if (this.question.length < 6) {
			uni.showToast({
				title: '不能少于6个字符',
				icon: 'none'
			});
			return;
		}
        //发送网络请求
		uni.request({
			method: 'GET',
			data: {
				question: this.question
			},
			url: 'https://api.lookroot.cn/api/question',
			success: res => {
				if (res.statusCode == 200 && res.data.code == 200) {
					console.log(res.data.data);
				}
			},
			complete: () => {
			}
		});
	}
}
```

那么我们在输入框输入一点，然后发送看看效果，可以看到控制台打印出了答案

![image-20200429204113819](https://img.lookroot.cn/blog/202004/29/204114-459276.png)

### 数据渲染

每一得到的答案不是直接显示出来的，但是问题是一直都显示在页面上，那么我们先做这个问题的处理

为了体验的友好，我们需要把每次提问的数据都缓存到本地，这样下次打开还有历史记录，所以我们在请求成功后

将时间戳赋值给 **qid** 和 当前提问的问题组成一个对象，**push** 追加到问题列表 **questions**，追加完成后，将最新的数组缓存到本地

```javascript
success: res => {
	if (res.statusCode == 200 && res.data.code == 200) {
		// 得到时间戳作为键值
		const timestamp = new Date().getTime();
		// 将当前问题存储到数组
		this.questions.push({ qid: timestamp, data: this.question });
		// 将问题列表存储到本地
		uni.setStorageSync('questions', this.questions);
	}
},
```

然后我们在页面中循环渲染出这个 **questions**列表，也就是使用 **v-for**循环出上面那种静态的聊天界面

```vue
<view class="cu-chat" v-for="question in questions" :key="question.qid">
	<view class="cu-item self">
		<view class="main">
			<view class="content bg-green shadow">
				<text>{{ question.data }}</text>
			</view>
		</view>
		<view class="cu-avatar radius" style="background-image:url(https://img.lookroot.cn/blog/202004/26/113955-347575.png);"></view>
	</view>
	<view class="cu-item">
		<view class="cu-avatar radius" style="background-image:url(https://img.lookroot.cn/blog/202004/24/224052-306028.png);"></view>
		<view class="main">
			<view class="content shadow " ><text class="text-blue">点击查看</text></view>
		</view>
	</view>
</view>
```



为了打开界面 实现历史记录，我们在**onload**周期读取缓存并赋值给 **questions**

```javascript
onLoad() {
	// 加载历史问题
	let questions = uni.getStorageSync('questions');
	this.questions = questions != '' ? questions : [];
},
```

处理完问题以后，我们来处理答案，每次提问都需要缓存答案，这样在点击上面的 **点击查看**就能找到对应的本地答案了

那么在上面的请求下面继续添加，每个答案的缓存都将**answer**+时间戳作为缓存的键，那么在循环渲染的时候，只要根据循环出的时间戳就能在本地找到答案了，为了体验友好，每次提问完成后都将输入框置空

```javascript
success: res => {
	if (res.statusCode == 200 && res.data.code == 200) {
		// 得到时间戳作为键值
		const timestamp = new Date().getTime();
		// 将当前问题存储到数组
		this.questions.push({ qid: timestamp, data: this.question });
		// 将问题列表存储到本地
		uni.setStorageSync('questions', this.questions);
		// 将当前问题答案赋值给答案列表
		this.answers = res.data.data;
		// 在本地存储当前这个答案
		uni.setStorageSync('answer' + timestamp, this.answers);
		// 将输入框置空
		this.question = '';
	}
},
```

再次测试一下并打开浏览器的缓存界面，可以发现缓存成功

![image-20200429205511844](https://img.lookroot.cn/blog/202004/29/205513-471891.png)

### 答案组件

现在就来编写点击弹出答案这个过程吧

首先需要一个弹窗，那么同样的，我们在**ColorUI**的弹窗模块里面复制过来，并且通过**isContentShow**来控制是否显示

```vue
<view class="cu-modal bottom-modal " :class="isContentShow ? 'show' : ''">
	<view class="cu-dialog">
		<view class="cu-bar bg-white">
			<view class="action text-green" @click="isContentShow = false">确定</view>
			<view class="action text-blue" @click="isContentShow = false">取消</view>
		</view>
	</view>
</view>
```

然后修改上面那个 **点击查看**的按钮，绑定上点击事件，并把 **question.qid**也就是时间戳传递过去

```html
<view class="content shadow " @click="showContent(question.qid)"><text class="text-blue">点击查看</text></view>
```

写一下这个点击方法，将当前点击的问题的答案取出来，并将弹窗显示

```javascript
showContent(qid) {
	this.answers = uni.getStorageSync('answer' + qid);
	this.isContentShow = true;
},
```

然后我们编写一个答案组件，我们在**index**文件夹 新建 **answercontent.vue**文件

在这个组件里面我们接受父组件传递过来的一个答案列表，并将其循环渲染出来

```vue
<template>
	<view>
		<view class="text-left margin-top-sm" v-for="(answer, index) in answers" :key="index">
			<view>{{ answer.q }}</view>
			<view class="text-red">答案：{{ answer.a }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		answers: {
			type: Array
		}
	}
};
</script>
```

然后我们在 **index.vue**引入注册使用这个组件

```javascript
import answercontent from './answercontent.vue';
```

```javascript
components: {
	answercontent
}
```

在弹窗这里使用这个组件，并将当前的 **answers**传给他

```html
<view class="cu-modal bottom-modal " :class="isContentShow ? 'show' : ''">
	<view class="cu-dialog">
		<view class="cu-bar bg-white">
			<view class="action text-green" @click="isContentShow = false">确定</view>
			<view class="action text-blue" @click="isContentShow = false">取消</view>
		</view>
		<view class="padding-xl"><answercontent :answers="answers"></answercontent></view>
	</view>
</view>
```

现在来看下效果

![v32](F:\lookroot\vue\img\v32.gif)

那么基础效果就完成了

### 拓展

首先答案肯定不能一直缓存到页面中，会导致页面卡顿，那么我们就限制一下缓存数量

那么在缓存之前，我们先判断一下当前的问题数组的长度，如果过长我们就删除掉头部的问题，然后删除该问题的答案缓存，然后再缓存问题和答案

```javascript
success: res => {
	if (res.statusCode == 200 && res.data.code == 200) {
		// 得到时间戳作为键值
		const timestamp = new Date().getTime();
		// 判断当前页面中显示的问题是否大于十个了
		if (this.questions.length > 9) {
			let item = this.questions.shift();
			uni.removeStorageSync('answer' + item.qid);
		}
		// 将当前问题存储到数组
		this.questions.push({ qid: timestamp, data: this.question });
		// 将问题列表存储到本地
		uni.setStorageSync('questions', this.questions);
		// 将当前问题答案赋值给答案列表
		this.answers = res.data.data;
		// 在本地存储当前这个答案
		uni.setStorageSync('answer' + timestamp, this.answers);
		// 将输入框置空
		this.question = '';
	}
},
```

友好的加载提示

我们给加载提问的过程一点提示吧！

首先是从 ColorUI中拷贝一个加载框过来，通过 **isLoading** 控制是否显示

```html
<view class="cu-load load-modal" v-if="isLoading">
			<image src="https://img.lookroot.cn/blog/202004/29/211157-540693.jpeg"></image>
		</view>
```

我们请求发送的之前，也就是判断字符长度之后添加

```javascript
this.isLoading = true;
```

然后在**complete**里关闭弹窗提示

```javascript
complete: () => {
	this.isLoading = false;
}
```

![v33](https://img.lookroot.cn/blog/202004/29/211553-309974.gif)

完成！

