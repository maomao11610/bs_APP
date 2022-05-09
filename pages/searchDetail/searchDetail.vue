<template>
	<view>
		<view class="title_text">
			搜索字段为:{{name}}
		</view>
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
			<view class="loading-text">{{lodingText}}</view>
		</view>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default {
		data() {
			return {
				name: '',
				lodingText: '请耐心等待，您的车辆正在闪现~',
				goodsList: [],

			}
		},

		async onLoad(option) { //option为object类型，会序列化上个页面传递的参数
			this.name = option.searchName
			// console.log(option.searchName); //打印出上个页面传递的参数。
			// 动态标题
			uni.setNavigationBarTitle({
				title: option.searchName
			})
			await this.request({
				url: interfaces.getSearch,
				data: {
					name: option.searchName
				},
				success: ((res) => {
					if (res.data.length > 0) {
						this.goodsList = res.data
					} else {
						console.log('接口异常，请联系管理员')
					}

				})
			})
		},
		methods: {
			getIndex() {
				this.request({
					url: interfaces.getIndex,
					success: ((res) => {
						this.brandList = res.data.brandList;
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.title_text {
		height: 100upx;
		text-align: center;
		line-height: 100upx;
		color: #2979FF;
		font-family: "幼圆";
		font-size: 20upx;
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
