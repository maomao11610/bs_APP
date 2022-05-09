<template>
	<view>
		<HomeHeader></HomeHeader>
		<slFilter :menuList="menuList" titleColor="#55ffff" themeColor='#ffff7f' @result='loadSelectData' ></slFilter>
	
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
	import interfaces from '../../../utils/interfaces.js';
	import HomeHeader from '../home/home_header.vue'
	import slFilter from '../../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	export default {
		components:{
			HomeHeader,
			slFilter,
		},
		data() {
			return {
				menuList: [
				    {
				        'title': '品牌',
				        'isMutiple': false,
				        'key': 'brand',
				        'detailList': [
				            {
				                'title': '大众',
				                'value': '大众'
				            },
				            {
				                'title': '丰田',
				                'value': '丰田'
				            },
				            {
				                'title': '吉利',
				                'value': '吉利'
				            },
							{
							    'title': '比亚迪',
							    'value': '比亚迪'
							},
							{
							    'title': '宝马',
							    'value': '宝马'
							},
							{
							    'title': '奔驰',
							    'value': '奔驰'
							},
							{
							    'title': '别克',
							    'value': '别克'
							},
							{
							    'title': '特斯拉',
							    'value': '特斯拉'
							}
				        ]
				    },
				    {
				        'title': '价格',
				        'key': 'price',
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '0~5万',
				                'value': '0~5万'
				            },
				            {
				                'title': '5~10万',
				                'value': '5~10万'
				            },
				            {
				                'title': '10~15万',
				                'value': '10~15万'
				            },
							{
							    'title': '15~20万',
							    'value': '15~20万'
							},
							{
							    'title': '20~30万',
							    'value': '20~30万'
							},
							{
							    'title': '30~50万',
							    'value': '30~50万'
							},
							{
							    'title': '50~100万',
							    'value': '50~100万'
							},
							{
							    'title': '100~1000万',
							    'value': '100~1000万'
							}
				        ]
				    },
				    {
				        'title': '里程',
				        'key': 'milleage',
				        'isSort': true,
				        'isMutiple': false,
				        'detailList': [
				            {
				                'title': '小于50公里',
				                'value': 50
				            },
				            {
				                'title': '50~100公里',
				                'value':100
				            },
				            {
				                'title': '100~500公里',
				                'value': 500
				            },
							{
							    'title': '500~1000公里',
							    'value': 1000
							},
							{
							    'title': '大于1000公里',
							    'value': 100000
							}
				        ]
				    }
				],
				brand:'',
				min:0,
				max:0,
				milleage:0,
				goodsList: [], // 商品列表大数组
				loadingText: "正在加载....",
			}
		},
		methods: {
			handleGoods(goods){
	
				// 页面跳转 商品详情
				uni.navigateTo({
					 url:`../../productDetail/productDetail?name=${goods.name}&price=${goods.price}`
				})
			},
			loadData() {
				this.request({
					url: interfaces.getAllProduct,
					success: ((res) => {
						if(res.data.length > 0){
							this.goodsList=res.data
						}else{
							this.loadingText = "我也是有底线的~";
						}
					})
				})
			},
			async loadSelectData(option) {
				let obj1=Object.assign({},option);
				this.brand=obj1.brand;
				this.milleage=obj1.milleage;
				// 价格区间处理
				if(obj1.price==='0~5万'){
					this.min=0;
					this.max=50000;
				}else if(obj1.price==='5~10万'){
					this.min=50000;
					this.max=100000;
				}else if(obj1.price==='10~15万'){
					this.min=100000;
					this.max=150000;
				}else if(obj1.price==='15~20万'){
					this.min=150000;
					this.max=200000;
				}else if(obj1.price==='20~30万'){
					this.min=200000;
					this.max=300000;
				}else if(obj1.price==='30~50万'){
					this.min=300000;
					this.max=500000;
				}else if(obj1.price==='50~100万'){
					this.min=500000;
					this.max=1000000;
				}else if(obj1.price==='100~1000万'){
					this.min=1000000;
					this.max=10000000;
				}
				await this.request({
					url:interfaces.getSelectProduct,
					data:{brand:this.brand,min:this.min,max:this.max,milleage:this.milleage},
					success:((res)=>{
						if(res.data.length>0){
							this.goodsList=res.data
						}else{
							console.log('接口异常')
						}
					})
				})
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
			
		},
		onLoad(option) {
			this.loadData();
		},
	}
</script>

<style lang="scss">
	.tag{
		height:200upx;
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

