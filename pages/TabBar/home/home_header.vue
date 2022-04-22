<template>
	<view>
		<view class="header">
			<!-- 定位城市 -->
			<view class="addr">
				<view class="icon iconfont" @click="location()">&#xe601;</view id='container'> {{city}}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<input type="text" placeholder="搜索您想要的车" placeholder-style="color:#c0c0c0"  confirm-type="search" @confirm="inputConfirm"
					/>
				<view class="icon iconfont" @click="search">&#xeafe;</view>
			</view>


			<!-- 提示信息 -->
			<view class="icon-btn">
				<view class="icon iconfont">&#xe711;</view>
			</view>
		</view>
		<!-- 占位 -->
		<view class="place"></view>
	</view>
</template>

<script>
		import interfaces from '../../../utils/interfaces.js'
	export default {
		data() {
			return {
				// mapUrl: 'https://apis.map.qq.com',
				//            mapKey: 'KRIBZ-KJVCD-74D4D-PON6M-UFGU6-A2FON',
				city: "",
			}
		},
		onLoad() {
			this.location();
		},
		methods: {

			location() {
				let that = this;
				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						that.getCity(Number(res.latitude), Number(res.longitude));
					}
				});
			},
			getCity(latitude, longitude) {
				// 根据经纬度获取城市
				let that = this;
				that.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/", {
						key: "KRIBZ-KJVCD-74D4D-PON6M-UFGU6-A2FON", // 腾讯地图申请的key uniapp 推荐使用腾讯地图
						callbackName: "getJsonData",
						output: 'jsonp',
						location: latitude + "," + longitude
					})
					.then(json => {
						// 拿到城市数据
						var result=json.result.ad_info.city
						that.city=result.substr(0,2);
						// 请求成功的返回数据
						console.log(json.result.ad_info.city);
					})
					.catch(err => {
						// 请求失败的返回数据
						console.log(err)
					})
			},
			// 搜索功能
			// 回车键确定
						async inputConfirm(event) {
							const res=event.target.value;
							uni.navigateTo({
								url:`../../searchDetail/searchDetail?searchName=${res}`,
							})
							// 确定之后跳转到哪里
							console.log(event.detail.value);
						    
						},

						//点击搜索图标 跳转页面
						search() {
							// 获取data中的变量,跳转页面
						}
			


		}
	}
</script>

<style lang="scss">
	.header {
		width: 92%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		// 条件编译 设置离顶部的高度
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */

		.addr {
			width: 120upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;
			align-items: center;
			font-size: 28upx;

			.icon {
				height: 60upx;
				margin-right: 5upx;
				display: flex;
				align-items: center;
				font-size: 42upx;
				color: #ffc50a;
			}
		}

		.input-box {
			width: 100%;
			height: 60upx;
			background-color: #f5f5f5;
			border-radius: 30upx;
			position: relative;
			display: flex;
			align-items: center;

			.icon {
				display: flex;
				align-items: center;
				position: absolute;
				top: 0;
				right: 0;
				width: 60upx;
				height: 60upx;
				font-size: 34upx;
				color: #c0c0c0;
			}

			input {
				padding-left: 28upx;
				height: 28upx;
				font-size: 28upx;
			}
		}

		.icon-btn {
			width: 60upx;
			height: 60upx;
			flex-shrink: 0;
			display: flex;

			.icon {
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 42upx;
			}
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
</style>
