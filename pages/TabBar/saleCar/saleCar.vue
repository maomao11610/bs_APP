<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<view class="title_text">
			我要卖车
		</view>
		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 卖车按钮区域 -->
		<view class="sale_button">
			<button type="default" @click="showModal">我要卖车</button><button type="default"
				@click="changePage">我要买车</button>
		</view>
		<view class="empty">

		</view>
		<!-- 广告语 -->

		<view class="content">
			<view class="">
				直面个人买家，卖出好价
			</view>
			<view class="">
				信赖趣摩，拒绝黄牛
			</view>
		</view>

		<view class="modal">
			<u-modal :show="show" @confirm="confirm" ref="uModal" :asyncClose="true">
				<Examine @change="getVal"></Examine>
			</u-modal>
		</view>
		<u-divider text="分割线" :dot="true"></u-divider>
		<view class="steps">
			<view >卖车进度</view>
			<view class="infomation">
				 节点到达生成交易请前往个人中心查询订单并进行交易
			</view>
			<u-steps :current="current">
				<u-steps-item title="提交申请" desc="first"></u-steps-item>
				<u-steps-item title="线下审核" desc="second"></u-steps-item>
				<u-steps-item title="生成交易" desc="last"></u-steps-item>
			</u-steps>
		</view>
		<!-- 进度 -->
		<!-- 线下校对完成提交线下审核详情但生成交易前的按钮 -->
		<view class="set_button" @click="showDetailModal">
			提交线下校对详情单
		</view>
		<view class="modal">
			<u-modal :show="isdetail" @confirm="setDetail" ref="uModal" :asyncClose="true">
				<Detail @change="getDetailVal"></Detail>
			</u-modal>
		</view>
	</view>
</template>

<script>
	import Examine from './examine.vue';
	import interfaces from '../../../utils/interfaces.js'
	import Detail from './detail.vue'
	export default {
		components: {
			Examine,
			Detail,
		},
		data() {
			return {
				isdetail: false,
				show: false,
				error: false,
				currentSwiper: 0,
				current: 0,
				// 请求数据
				saleId: '',
				carName: '',
				status: 0,
				location: '',
				detail: {
					saleId: '',
					sallerName: '',
					sallerId: '',
					cardPic: '',
					carPic: '',
					mileage: '',
					listingTime: 0,
					repair: 0,
					reviewPic: '',
					reviewerNumber: '',
				},
				swiperList: [{
						id: 1,
						img: "/static/img/sale/5.png"
					},
					{
						id: 2,
						img: "/static/img/sale/6.png"
					},
					{
						id: 3,
						img: "/static/img/sale/1.webp"
					},
					{
						id: 4,
						img: "/static/img/sale/2.webp"
					},
					{
						id: 5,
						img: "/static/img/sale/3.webp"
					},
					{
						id: 6,
						img: "/static/img/sale/4.webp"
					}
				],
			}
		},
		methods: {
			swiperChange(e) {
				this.currentSwiper = e.detail.current;
			},
			changePage() {
				uni.switchTab({
					url: "../buyCar/buyCar"
				})
			},
			showModal() {
				this.show = true;
			},
			// 提交申请
			confirm() {
				// 发起接口请求
				this.request({
					url: interfaces.applySaleCar,
					method: 'POST',
					hideLoading: true,
					data: {
						saleId: this.saleId,
						carName: this.carName,
						status: this.status,
						location: this.location
					},
					success: ((res) => {
						// 提价成功来到后台进行审核员分配，然后节点来到线下审核
						this.current = 1;
						// 最好调用接口完成数据库更新到个人中心
					})
				})
				this.show = false;

			},
			// 获取申请单子组件数据
			getVal(e) {
				// console.log(e.saleId)
				this.saleId = e.saleId;
				this.carName = e.carName;
				this.status = e.status;
				this.location = e.location;
			},
			// 获取线下审核子组件数据
			getDetailVal(e) {
				this.detail.saleId = e.saleId;
				this.detail.sallerName = e.sallerName;
				this.detail.sallerId = e.sallerId;
				this.detail.cardPic = e.cardPic;
				this.detail.carPic = e.carPic;
				this.detail.mileage = e.mileage;
				this.detail.listingTime = e.listingTime;
				this.detail.repair = e.repair;
				this.detail.reviewPic = e.reviewPic;
				this.detail.reviewerNumber = e.reviewerNumber;
			},
			// 线下核对
			showDetailModal() {
				this.isdetail = true;
			},
			// 提交线下审核
			setDetail() {
				console.log(this.detail.saleId);
				// 发起接口请求
				this.request({
					url: interfaces.setContent,
					method: 'POST',
					hideLoading: true,
					data: {
						saleId: this.detail.saleId,
						sallerName:this.detail.sallerName,
						sallerId: this.detail.sallerId,
						cardPic: this.detail.cardPic,
						carPic: this.detail.carPic,
						mileage: this.detail.mileage,
						listingTime: this.detail.listingTime,
						repair: this.detail.repair,
						reviewPic: this.detail.reviewPic,
						reviewerNumber: this.detail.reviewerNumber,
					},
					success: ((res) => {
						// 生成订单
						this.current = 2;
					})
				})
				this.isdetail = false;
			}
			// 3.生成订单提示用户直接去个人中心查看,将订单展示在个人中心的卖家中心
		}
	}
</script>

<style>
	.modal {
		width: 90%;
	}
.infomation{
	color: #aaaa7f;
	font-size: 12upx;
	transform: translateX(50upx);
}
	.title_text {
		width: 100%;
		height: 100px;
		text-align: center;
		color: #0086B3;
		font-family: "幼圆";
		font-size: 36upx;
	}

	.sale_button {
		margin: 10upx 0;
		width: 100%;
		height: 100upx;
		display: flex;

		button {
			width: 50%;
			justify-content: space-between;
		}
	}

	.set_button {
		margin-top: 50upx;
		transform: translateX(220upx);
		background-color: #2979FF;
		border-radius: 10upx;
		color: #ffffff;
		width: 300upx;
		height: 80upx;
		text-align: center;
		line-height: 80upx;
	}

	.swiper {
		transform: translateY(-100upx);
		width: 100%;
		margin: 0 50upx;
		border-radius: 15upx;

		.swiper-box {
			width: 95%;
			height: 30.7vw;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	.empty {
		width: 100%;
		height: 50upx;
		background-color: #cccccc;
		border-radius: 5upx;
		opacity: 0.3;
	}

	.content {
		margin-top: 50upx;
		text-align: center;
		font-size: 50upx;
		color: #55ff7f;
		font-family: "华文琥珀";
	}

	.steps {
		margin-top: 20upx;
	}
</style>
