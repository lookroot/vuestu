<template>
	<view>
		<view class="text-left margin-top-sm" v-for="(answer, index) in answers" :key="index">
			<view class="">{{ answer.q }}</view>
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
