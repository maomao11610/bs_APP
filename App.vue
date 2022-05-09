<script>
	// import {getToken} from './utils/auth.js';
	export default {
		onLaunch: function() {
			console.log('App Launch');
			// //判断是否登录
			// 	let token = getToken()
			// 	if(!token){
			// 		//不存在则跳转至登录页
			// 		uni.reLaunch({
			// 			url: "pages/TabBar/user/login"
			// 		})
			// 	}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '/static/iconfont/iconfont.css';	
	@import url('./static/style/chatInterface.css');
	page{
		position: relative;
		background-color: #fff;
	}
</style>
