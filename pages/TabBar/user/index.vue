<template>
	<view>
		<view class="u-m-t-20">
			<view class="center">
				<view class="u-m-t-12 u-m-l-60">
					<image src="../../../static/img/category/6.jpg"
						style="width: 180rpx; height: 180rpx; border-radius: 60px;"></image>
				</view>
				<view class="center-item">
					<view>用户名：{{username}}</view>
					<view class="button" v-show="isShow">
						<button type="default" @click="login">登录</button>
						<button type="default" @click="register">注册</button>
					</view>
					
				</view>
			</view>
		</view>
		<!-- 卖家、买家布局 -->
		<view class="sale">
			<text style="color: #990055;">卖家中心</text>
			<u-steps :current="current">
				<u-steps-item title="提交申请" desc="first"></u-steps-item>
				<u-steps-item title="线下审核" desc="second"></u-steps-item>
				<u-steps-item title="生成交易" desc="last"></u-steps-item>
			</u-steps>
		</view>
		<view class="buy">
			<text style="color: #990055;">买家中心</text>
			<view class="category-list">
				<view  class="category" v-for="(item,index) in buyerList" :key="index" @tap="handlebrand(item)">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="text">
						{{item.name}}
					</view>
				</view>
			</view>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell icon="kefu-ermai" title="意见反馈"></u-cell>
			</u-cell-group>
		</view>
		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell icon="account" title="个人信息"></u-cell>
			</u-cell-group>
		</view>
		<view class="u-m-t-20"  @click="logout">
			<u-cell-group>
				<!-- <u-cell-item icon="account" title="登录" @click="login"></u-cell-item> -->
				<u-cell icon="close" title="退出"></u-cell>
			</u-cell-group>
		</view>

	</view>

</template>
<script>
	
	import interfaces from '../../../utils/interfaces.js';
	import {
		setToken,getToken,removeToken
	} from '../../../utils/auth.js';
	export default {
			data() {
				return {
					isShow:true,
					username:'',
					current:0,
					buyerList:[
						{
							img:'/static/img/buyer/1.png',
							name:'收藏夹'
						},
						{
							img:'/static/img/buyer/location.png',
							name:'地址'
						},
						{
							img:'/static/img/buyer/4.png',
							name:'售后'
						}
					]
				}
			},
			onShow(e) {
				this.username=uni.getStorageSync('username');
				this.isShow=uni.getStorageSync('isShow');
			},
			methods:{
		login(){
			uni.navigateTo({
				url:'./login'
			})
		},
		logout(){
			// 退出登录
			// removeToken();
			// currentUser//直接清楚掉本地存储对应的key
			uni.removeStorage({ //从本地删除指定key
			    key: 'currentUser',//key
			    success: function (res) {//删除成功的回调
			        console.log('success');
			    }
			});
			
			
		},
		register(){
			uni.navigateTo({
				url:'./register'
			})
		}
		},
		}
</script>
<style lang="scss" scoped>
	page {
		background-color: #ffffff;
	}

	.center {
		background-color: #aaffff;
		margin-bottom: 20rpx;
		display: flex;

		.center-item {
			margin-top: 60rpx;
			margin-left: 40rpx;
		}

		.button {
			margin-left: 20rpx;
			margin-top: 60rpx;
			display: flex;
		}

	}
	.category-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		.category {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;
	
			.img {
				width: 100%;
				display: flex;
				justify-content: center;
	
				image {
					width: 11vw;
					height: 11vw;
				}
			}
	
			.text {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #ffaaff;
			}
		}
	}
	.u-m-t-20{
		margin-top: 5upx;
	}
</style>
