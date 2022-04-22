<template>
	<view>
		搜索详情页面
		<view class="result">
			<!-- 商品数据取值没问题 -->
			<view class="category" v-for="(item,index) in detailList" :key="index">
				<view class="img">
					<text>{{item.price}}</text>
				</view>
			</view>
			<!-- 首页品牌取值 -->
			<view class="">
				测试首页brand查询商品的接口
			</view>
			<view class="category" v-for="(item,index) in brandList" :key="index">
				<view class="img">
					<text>{{item.name}}</text>
				</view>
			</view>
		
		</view>
		<button type="default" @click="getIndex()">点击调用接口</button>
	</view>
</template>

<script>
	import interfaces from '../../utils/interfaces.js'
	export default {
		onLoad: async function (option) { //option为object类型，会序列化上个页面传递的参数
				console.log(option.searchName); //打印出上个页面传递的参数。
				// 拿到数据进行渲染
				let params={productName:(option.searchName)}
				await this.request({
					url:interfaces.getSearch,
					data:params,
					success:((res)=>{
						console.log(res.data);
							this.detailList=res.data;
						
					})
				})
			// 下午工作：渲染  首页、searchDetail页渲染好
			// 明日直接完成详情等等
			},
		data() {
			return {
				name:'毛毛',
				detailList:[],
				brandList:[]
			}
		},
		methods: {
			getIndex(){
				this.request({
					url:interfaces.getIndex,
					success:((res)=>{
						this.brandList=res.data.brandList;
					})
				})
			},
		}
	}
</script>

<style>

</style>
