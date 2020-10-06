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
