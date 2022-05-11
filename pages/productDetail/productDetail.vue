<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<view class="header">
			<view class="content">
				<view @tap="back" class="icon iconfont">&#xe64b;</view>
			</view>
			<view class="content">
				<view @tap="showCart" class="icon iconfont">&#xe704;</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<swiper @change="swiperChange" circular="true" autoplay="true">
				<swiper-item v-for="swiper in goodsData.swiperList" :key="swiper.id">
					<image :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">
				{{currentSwiper + 1}}/{{goodsData.swiperList.length}}
			</view>
		</view>
		<!-- 标题和价格 -->
		<view class="info-box goods-info">
			<view class="price">￥{{price}}</view>
			<view class="title">{{name}}</view>
		</view>
		<!-- 选择规格 -->
		<view class="info-box">
			<view class="row" @tap="spaceInfo.showSpace = true">
				<view class="text">选择规格:</view>
				<view class="content">
					<view class="sp">
						<view :class="{'on':item == goodsInfo.spec}" v-for="(item,index) in goodsData.spec"
							:key="index">
							{{item}}
						</view>
					</view>
				</view>
				<!-- 箭头 -->
				<view class="arrow">
					<view class="icon iconfont">&#xe611;</view>
				</view>
			</view>
		</view>
		<!-- 模态框 -->
		<popupSpec @setSelectSpec="setSelectSpec" @hideSpec="hideSpec" :goodsInfo="goodsInfo" :goodsData="goodsData"
			:spaceInfo="spaceInfo" />
		<!-- 综合等级 -->
		<view class="archives">
			<view class="list" v-for="item in goodsData.archives">
				<view class="content">
					<text class="title">{{item.title}}</text> <text class="grade">{{item.grade}}成新</text>
				</view>
			</view>
		</view>
		<!-- 说明 -->
		<view class="title_text">
			说明
		</view>
		<view class="explain">
			<view class="list" v-for="item in goodsData.explain">
				<view class="content">
					<text class="icon iconfont">&#xe8b3;</text>{{item}}
				</view>
			</view>
		</view>
		<view class="title_text">
			参数
		</view>
		<view class="parameter">
			<view class="list" v-for="item in goodsData.parameter">
				<view class="content">
					{{item.title}}:<text class="value">{{item.value}}</text>
				</view>
			</view>
		</view>
		<view class="title_text">
			车况
		</view>
		<view class="car_condition">
			<view class="list" v-for="item in goodsData.carCondition">
				<view class="content">
					<view class="title">
						{{item.title}}
					</view>
					<view class="result">
						{{item.value}}<text class="icon iconfont">&#xe656;</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="description">
			<view class="title">———— 车辆实拍 ————</view>
			<view class="content">
				<rich-text :nodes="goodsData.realShooting"></rich-text>
			</view>
		</view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="icons">
				<view class="box">
					<view class="icon iconfont">&#xe602;</view>
					<view class="text">分享</view>
				</view>
				<view class="box" @tap="enterChat">
					<view class="icon iconfont">&#xe63a;</view>
					<view class="text">聊天</view>
				</view>
			</view>
			<view class="btn">
				<view @tap="joinCart" class="joinCart">加入收藏夹</view>
				<view @tap="handleBuy" class="buy">立即购买</view>
			</view>
		</view>
	</view>
</template>


<script>
	import popupSpec from '../../components/popupSpec.vue'
	import interfaces from '../../utils/interfaces.js'
	export default {
		components: {
			popupSpec
		},
		data() {
			return {
				spaceInfo: {
					showSpace: false
				},
				// 收藏
				// isKeep: false,
				currentSwiper: 0,
				// loadingText: '',
				goodsData: {
					uuid:'',
					username: '',
					name: '',
					swiperList: [],
					spec: [],
					archives: [],
					carCondition: [],
					explain: [],
					parameter: [],
					realShooting: '',
					price: 0,
				},
				name: '',
				price: 0,
				goodsInfo: {
					spec: ""
				},
			}
		},
		onLoad(option) {
			this.name = option.name;
			this.price = option.price;
			this.goodsData.price = option.price;
			const str = option.name;
			// 动态修改nav title
			uni.setNavigationBarTitle({
				title: str.slice(0, 4)
			})
			// 加载数据
			this.loadData();
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			showCart() {
				uni.navigateTo({
					url: '../TabBar/cart/cart'
				})
			},
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
			connect() {
				console.log('聊天')
				uni.navigateTo({
					url: '../contacts/contacts'
				})
			},
			enterChat () {//进入聊天页面
				let path = '../chat/privateChat/privateChat?to=' + this.goodsData.uuid;
				uni.navigateTo({
					url: path
				})
			},
			setSelectSpec(item) {
				// 选择规格
				this.goodsInfo.spec = item;
			},
			hideSpec() {
				this.spaceInfo.showSpace = false;
			},
			joinCart() {

				// 存储到本地存储里

				// 1.先去本地存储中取
				uni.getStorage({
					// 车辆列表，查询存不存在当前车
					key: "carList",
					success: (res => {
						// 拿数据
						let carList = res.data;
						// 查找商品是否存在
						let isExist = false;
						carList.forEach(car => {
							// 如果当前姓名存在那么就证明存在
							if (car.name === this.name) {
								isExist = true;
							}
						})
						// 不存在
						if (!isExist) {
							carList.push(this.goodsData);
							// 更新本地存储
							this.setGoodsList(carList);
						}


					}),
					fail: (err => { // 没有得到数据,那么就存
						// console.log("加入失败")
						let carList = [];
						carList.push(this.goodsData);
						// 往本地存储中存储数据
						this.setGoodsList(carList);
					})
				})
			},
			setGoodsList(carList) {
				// console.log("存储到本地存储中")
				// 存储到本地存储中
				uni.setStorage({
					key: "carList",
					data: carList,
					success: function() {
						uni.showToast({
							icon: 'success',
							title: '添加购物车成功'
						})
					}
				})
			},
			async handleBuy() {
				let tempList = [];
				tempList.push(this.goodsData);
				uni.setStorage({
					key: "confirmList",
					data: tempList,
					success: () => {
						uni.navigateTo({
							url: "../order/confirm"
						})
					}
				})
				// 进行订单生成展现在后台		
				// 发起接口请求
				await this.request({
					url: interfaces.setConfirm,
					method: 'POST',
					hideLoading: true,
					data: {
						transmissionCase: 1,
						orderId: Math.random().toString(36).substr(2),
						brand: this.name.splice(0, 2),
						price: this.price,
						sellerName: this.goodsData.username,
						color: '黑色',
						displacement: 5,
						pic: this.goodsData.swiperList[0].img,
						mileage: 500,
						orderTime: Date.now(),
						listingTime: Date.now(),
					},
					success: ((res) => {
						uni.showToast({
							icon: 'success',
							title: '订单已生成，有问题请联系后台管理员'
						})
					})

				})
			},
			loadData() {
				this.request({
					url: interfaces.getDetail,
					data: {
						name: this.name
					},
					success: ((res) => {
						this.goodsData.uuid=res.data.uuid;
						this.goodsData.username = res.data.username;
						this.goodsData.name = res.data.name;
						this.goodsData.spec = res.data.spec;
						this.goodsData.explain = res.data.explain
						this.goodsData.swiperList = res.data.swiperList;
						this.goodsData.parameter = res.data.parameter;
						this.goodsData.archives = res.data.archives;
						this.goodsData.carCondition = res.data.carCondition;
						this.goodsData.realShooting = res.data.realShooting;
					})
				})
			},
		}
		}
</script>

<style lang="scss">
	.header {
		background-color: #aaffff;
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.content {
			margin: 0 20upx;
			display: flex;

			.icon {
				font-size: 35upx;
				color: #fff;
				background-color: rgba(0, 0, 0, 0.2);
				border-radius: 100%;
			}
		}
	}

	/*  修改状态栏样式 */
	.status {
		/* #ifdef APP-PLUS */
		opacity: 0;
		/* #endif */
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;

		.text {
			font-size: 28upx;
			color: #550000 !important;
			margin-right: 20upx;
		}

		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;

			.serviceitem {
				margin-right: 10upx;
			}

			.sp {
				width: 100%;
				display: flex;

				view {
					background-color: #f6f6f6;
					padding: 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;

					&.on {
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}

		.arrow {
			position: absolute;
			right: 4%;

			.icon {
				color: #ccc;
			}
		}
	}

	.title_text {
		margin: 10upx 20upx;
		font-size: 36upx;
		color: #007AFF;
	}

	.explain {
		width: 92%;
		margin: 30upx 4%;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.list {
			width: 50%;
			display: flex;
			flex-wrap: wrap;

			.content {
				.icon {
					color: #ff0000
				}
			}


		}
	}

	.car_condition {
		.list {
			.content {
				font-size: 20upx;

				.title {
					padding-left: 20upx;
					font-size: 35upx;
					color: #ff557f;
				}

				.result {
					position: relative;
					font-size: 16upx;
					font-family: "楷体";

					.icon {
						position: absolute;
						top: 0;
						right: 0;
					}
				}
			}
		}
	}

	.parameter {
		width: 92%;
		margin: 30upx 4%;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.list {
			width: 50%;
			display: flex;
			flex-wrap: wrap;

			.content {
				color: #55ff7f;
				font-family: "幼圆";
				font-size: 30upx;

				.value {
					padding-left: 10upx;
				}
			}


		}
	}

	.archives {
		width: 92%;
		margin: 30upx 4%;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.list {
			width: 25%;
			display: flex;
			flex-wrap: wrap;

			.content {
				width: 150upx;
				height: 90upx;
				background-color: #ff557f;
				font-family: "宋体";
				font-size: 18upx;
				text-align: center;
				line-height: 90upx;

				.grade {
					padding-left: 5upx;
				}

				.title {
					color: #0086B3
				}
			}


		}
	}

	.goods-info {
		display: flex;

		.price {
			justify-content: flex-start;
			font-size: 40upx;
			font-weight: 600;
			color: #ff0000;
		}

		.title {
			margin: 10upx 0 0 70upx;
			// justify-content: flex-end;
			font-size: 30upx;
		}
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;

		.text {
			font-size: 28upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}

		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;

			.serviceitem {
				margin-right: 10upx;
			}

			.sp {
				width: 100%;
				display: flex;

				view {
					background-color: #f6f6f6;
					padding: 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;

					&.on {
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}

		.arrow {
			position: absolute;
			right: 4%;

			.icon {
				color: #ccc;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.icon {
					font-size: 40upx;
					color: red;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.buy {
				background-color: #f06c7a;
			}
		}
	}
</style>
