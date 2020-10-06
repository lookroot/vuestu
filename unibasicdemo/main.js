import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'
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
const app = new Vue({
	...App
})
app.$mount()
