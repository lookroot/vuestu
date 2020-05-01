<template>
	<view>
		<view class="cu-chat">
			<view class="cu-item self">
				<view class="main">
					<view class="content bg-green shadow">
						<text>你好！</text>
					</view>
				</view>
				<view class="cu-avatar radius" style="background-image:url(https://img.lookroot.cn/blog/202004/26/113955-347575.png);"></view>
			</view>
			<view class="cu-item">
				<view class="cu-avatar radius" style="background-image:url(https://img.lookroot.cn/blog/202004/24/224052-306028.png);"></view>
				<view class="main">
					<view class="content shadow " ><text class="text-blue">欢迎你使用lookroot牌答题机器人！</text></view>
				</view>
			</view>
		</view>
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
					<view class="content shadow " @click="showContent(question.qid)"><text class="text-blue">点击查看</text></view>
				</view>
			</view>
		</view>
		<view class="cu-load load-modal" v-if="isLoading"><image src="/static/loading.jpg"></image></view>
		<view class="cu-bar foot input">
			<input type="text" class="uni-input  solid-bottom" v-model="question" />
			<button class="cu-btn bg-green shadow" @click="getAnwser">发送</button>
		</view>

		<view class="cu-modal bottom-modal " :class="isContentShow ? 'show' : ''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white">
					<view class="action text-green" @click="isContentShow = false">确定</view>
					<view class="action text-blue" @click="isContentShow = false">取消</view>
				</view>
				<view class="padding-xl"><answercontent :answers="answers"></answercontent></view>
			</view>
		</view>
	</view>
</template>

<script>
import answercontent from './answercontent.vue';
export default {
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
	onLoad() {
		this.questions = uni.getStorageSync('questions') != '' ? uni.getStorageSync('questions') : [];
	},
	methods: {
		showContent(qid) {
			this.answers = uni.getStorageSync('answer' + qid);
			this.isContentShow = true;
		},
		getAnwser() {
			if (this.question.length < 6) {
				uni.showToast({
					title: '不能少于6个字符',
					icon: 'none'
				});
				return;
			}
			this.isLoading = true;
			uni.request({
				method: 'GET',
				data: {
					question: this.question
				},
				url: 'https://api.lookroot.cn/api/question',
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
				complete: () => {
					this.isLoading = false;
				}
			});
		}
	},
	components: {
		answercontent
	}
};
</script>

<style>
page {
	padding-bottom: 100rpx;
}
image {
	transform: scale(2.5);
	border-radius: 50%;
	overflow: hidden;
}
</style>
