<template>
	<view>
		<uni-nav-bar left-icon="back" left-text="返回" right-text="菜单" title="导航栏组件"></uni-nav-bar>
		<view class="cu-list menu-avatar">
			<view class="cu-item" :class="modalName=='move-box-'+ index?'move-cur':''" v-for="(todo,index) in todoList" :key="index"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
			 @click="gotoContent(todo._id)">
				<view class="content">
					<view class="text-gray text-sm">
						{{todo._name}}
					</view>
				</view>
				<view class="action" @click.stop="">
					<switch :checked="todo._status" @change="switchTodo" :data-_id="todo._id" />
				</view>
				<view class="move">
					<view class="bg-red" @click.stop="del(todo._id)">删除</view>
				</view>
			</view>
		</view>
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
		<!-- <wxcomdemo inner-text="Some text"></wxcomdemo> -->
	</view>
</template>

<script>
	import message from "@/mixin/message.js"
	export default {
		mixins: [message],
		data() {
			return {
				modalName: null,
				listTouchStart: 0,
				listTouchDirection: null,
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
			}
		},
		onPullDownRefresh() {
			this.todoList = this.staticTodoList;
			uni.removeStorageSync("todolist");
			uni.stopPullDownRefresh();
		},
		//页面加载的周期函数
		onLoad() {
			//数据初始化 模拟
			const todolist = uni.getStorageSync("todolist");
			if (todolist != null && todolist != "") {
				this.todoList = todolist
			} else {
				this.todoList = this.staticTodoList;
			}
			uni.$on("delTodo", (data) => {
				this.del(data._id);
			})
		},
		methods: {
			gotoContent(_id) {
				uni.navigateTo({
					url: "../todocontent/todocontent?_id=" + _id
				})
			},
			add(e) {
				const _name = e.detail.value._name;
				if (_name === null || _name === "") {
					this.toast("不能为空", 2000, false);
					return;
				}
				const _id = this.todoList.length > 0 ?
					this.todoList[this.todoList.length - 1]._id + 1 : 1;
				this.todoList.push({
					_id: _id,
					_name: _name,
					_status: false
				});
				this.toast("添加成功,_id:" + _id, 1000, true);
				uni.setStorageSync("todolist", this.todoList);
			},
			clear() {},
			switchTodo(e) {
				const _id = e.target.dataset._id;
				const status = e.detail.value;
				console.log();
				this.todoList = this.todoList.map(todo => {
					if (todo._id == _id) {
						todo._status = status
					}
					return todo;
				})
				uni.showToast({
					title: status ? "已完成" : "已取消",
					icon: status ? "success" : "none"
				});
				uni.setStorageSync("todolist", this.todoList);
			},
			del(_id) {
				this.todoList = this.todoList.filter(todo => {
					return todo._id != _id;
				})
				uni.showToast({
					title: "删除成功",
					icon: "success",
					duration: 1000
				})
				uni.setStorageSync("todolist", this.todoList);
				// this.toast("删除成功", 1000, true);
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			}
		}
	}
</script>

<style>

</style>
