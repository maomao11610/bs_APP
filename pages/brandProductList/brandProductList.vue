
<!-- 品牌点击后来到这个界面 -->
<template>
	<view>
		<view class="header">
             <view class="top_text">
             	全部车辆
             </view>
		</view>
		<!-- 占位 tabbar 有定位 -->
		<view class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="product-list">
				<!-- @tap="handleGoods(goods)" -->
				<view class="product" @tap="handleGoods(goods)" v-for="goods in goodsList" :key="goods._id">
					<image mode="widthFix" :src="goods.cover"></image>
					<view class="name">{{goods.name}}</view>
					<view class="info">
						<view class="price">
							<text>￥</text>
							{{goods.price}}
						</view>
						<view class="slogan"> <text>行驶</text>{{goods.milleage}}<text>千里</text></view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{loadingText}}</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default {
		data() {
			return {
				brand:'',
				goodsList: [], // 商品列表大数组
				loadingText: "正在加载....",
			}
		},
		methods: {
			handleGoods(goods){
				console.log(goods.name);
				// 页面跳转 商品详情
				uni.navigateTo({
					// url:'./goods?goodsInfo='+JSON.stringify(goods)
					// url:'../goods/productDetail/productDetail?name='+goods.name
					// https://host:port/path?xxx=aaa&ooo=bbb
					url:`../goods/productDetail/productDetail?name=${goods.name}&price=${goods.price}`
				})
			},
			loadData() {
				this.request({
					url: interfaces.getBrandProduct,
					data:{brand:this.brand},
					success: ((res) => {
						if(res.data.length > 0){
							this.goodsList=res.data
						}else{
							this.loadingText = "我也是有底线的~";
						}
					})
				})
			}
		},
		// 下午完成详情整体接口到渲染
		onLoad(option) {
			this.brand=option.brand;
			// console.log(option);
			// 动态修改nav title
			uni.setNavigationBarTitle({
				title: option.brand
			})

			// 加载数据
			this.loadData();
		},
		onPullDownRefresh(){
			setTimeout(() => {
				this.loadingText = "加载中...";
				this.goodsList = [];
				this.loadData();
				uni.stopPullDownRefresh();
			},1000)
		},
		// 上啦加载
		onReachBottom(){
			this.loadData();
		}
	}
</script>

<style lang="scss">
	.header {
		width: 92%;
		padding: 0 4%;
		height: 79upx;
		display: flex;
		justify-content: space-around;
		align-items: flex-end;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		border-bottom: solid 1upx #eee;
        .top_text{
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	.place {
		background-color: #ffffff;
		height: 100upx;
	}

	.goods-list {
		.loading-text {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 60upx;
			color: #979797;
			font-size: 24upx;
		}

		.product-list {
			width: 92%;
			padding: 0 4% 3vw 4%;
			column-count: 2;
			column-gap: 1em;

			.product {
				break-inside: avoid;
				border-radius: 20upx;
				background-color: #fff;
				margin: 0 0 15upx 0;
				box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);

				image {
					width: 100%;
					border-radius: 20upx 20upx 0 0;
				}

				.name {
					width: 92%;
					padding: 6upx 4%;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					text-align: justify;
					overflow: hidden;
					font-size: 30upx;
				}

				.info {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					width: 92%;
					padding: 10upx 4% 10upx 4%;

					.price {
						color: #e65339;
						font-size: 30upx;
						font-weight: 600;
					}

					.slogan {
						color: #55ffff;
						font-size: 24upx;
					}
				}
			}

		}
	}
</style>
