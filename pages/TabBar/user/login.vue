<template>
	<view class="">
		<view class="card">
			<u-avatar src="../../../static/img/logo.png" class="img"></u-avatar>
			<input type="text" placeholder="用户名" placeholder-style="color:#c0c0c0" @confirm="setUserName"
				style="border-bottom: 1px solid #FFFFFF;" />
			<view class="padding">

			</view>
			<input type="text" placeholder="密码" placeholder-style="color:#c0c0c0" @confirm="setPwd"
				style="border-bottom: 1px solid #FFFFFF;" password />
			<view class="padding">

			</view>
			<u-button text="登录" size="normal" type="success" @click="login"></u-button>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js';
	import {
		setToken,getToken,removeToken
	} from '../../../utils/auth.js';
	import restApi from '../../../lib/restapi.js'
	export default {
		data() {
			return {
				username: '',
				password: '',
				isShow:true,
			}
		},
		methods: {
			setUserName(event) {
				this.username = event.target.value
				console.log(event.detail.value)
				// console.log(event.target.value)
			},
			setPwd(event) {
				this.password = event.target.value;
				console.log(event.detail.value)
			},
			async login() {
              this.isShow=false;
				if (this.username.trim() !== '' && this.password.trim() !== '') {
					let user = restApi.findUser(this.username, this.password);
					if (user) {
						uni.setStorageSync('currentUser', user);
						uni.switchTab({
							url: './index'
						})
						uni.setStorageSync('username', this.username);
					    uni.setStorageSync('isShow', this.isShow);
						return;
					}
					await setToken('1111')

				}
				// this.showError = true;

			},

		},
	}
</script>

<style lang="scss">
	page {
		background-image: url(../../../static/img/user/login.webp);

	}

	.card {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		.img {
			margin-left: 100upx;
		}

		.padding {
			height: 100upx;
		}
	}
</style>
