<template>
	<view class="">
		<view class="card">
			<u-avatar src="../../../static/img/logo.png" class="img"></u-avatar>
			<input type="text" placeholder="用户名" placeholder-style="color:#c0c0c0"
				@confirm="setUserName"  style="border-bottom: 1px solid #FFFFFF;"/>
			<view class="padding">

			</view>
			<input type="text" placeholder="密码" placeholder-style="color:#c0c0c0"
				@confirm="setPwd"  style="border-bottom: 1px solid #FFFFFF;" password/>
			<view class="padding">
			
			</view>
			<input type="text" placeholder="确认密码" placeholder-style="color:#c0c0c0"
				@confirm="setPwdAgin"  style="border-bottom: 1px solid #FFFFFF;" password/>
				<view class="padding">
				
				</view>
			<u-button text="注册" size="normal" type="success" @click="register"></u-button>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../../utils/interfaces.js'
export default {
		data() {
			return {
				username:'',
				password:'',
			}
		},
		methods:{
			setUserName(event) {
				this.username=event.target.value
				console.log(event.detail.value)
				// console.log(event.target.value)
			},
			setPwd(event){
				this.password=event.target.value;
				console.log(event.detail.value)
			},
			setPwdAgin(event){
				if(event.target.value!==this.password){
					uni.showToast({
						title:'请保持与上一次输入一致，请再次输入',
						icon:'none'
					})
				}
			},
			async register(){
			
				this.request({
					url: interfaces.register,
					method: 'POST',
					hideLoading: true,
					data: {
						username:this.username,
						password:this.password
					},
					success: ((res) => {
						uni.navigateTo({
							url:'./login'
						})
					})
				})
				// console.log('注册')
				
			}
		
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
