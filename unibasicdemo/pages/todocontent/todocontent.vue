<template>
	<view>
		<view class="flex justify-start align-center">
			<view class="text-sl">
				{{todo._name}}
			</view>
			<view class="margin-left-sm">
				{{todo._time|strtotime}}
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
	</view>
</template>

<script>
	import message from "@/mixin/message.js"
	export default {
		mixins: [message],
		data() {
			return {
				todo: {
					_id: -1,
					_name: "null",
					_status: false,
					_time: null,
					_content: "null"
				}
			};
		},
		onLoad(e) {
			this.loadData(parseInt(e._id));
		},
		methods: {
			del() {
				uni.$emit("delTodo", {
					_id: this.todo._id
				});
				uni.navigateBack();
			},
			loadData(_id) {
				this.getTodoById(_id);
			},
			async getTodoById(_id) {
				const value = await uni.request({
					url: "http://127.0.0.1:5500/todolist.json"
				}).then((data) => {
					var [error, res] = data;
					if (error != null | res == null) {
						this.toast("网络异常", 1000, false)
						return Promise.resolve(this.todo);
					}
					if (res.data.length > 0) {
						//es6 find
						const todo = res.data.find(todo => {
							return todo._id === _id;
						})
						return Promise.resolve(todo);
					}
				});
				this.todo = value;
			}
		},
	}
</script>

<style lang="less">

</style>
