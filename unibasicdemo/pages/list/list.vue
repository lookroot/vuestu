<template>
	<view>
		<!-- #ifndef MP-WEIXIN -->
		<!-- <view class="content">
			mp-weixin
		</view> -->
		<!-- #endif -->
		<view class="content">
			mp-weixin
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
	/*  #ifdef  MP-WEIXIN  */
	.content {
		color: #DD524D;
	}

	/*  #endif  */
</style>
