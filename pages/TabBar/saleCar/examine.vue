<template>
	<view >
		<text>申请编号：</text>
		<input type="text" placeholder="申请码,身份证号后六位" placeholder-style="color:#c0c0c0" 
			@confirm="inputConfirm1" />
		<text>车名：</text>
		<input type="text" placeholder="输入车名,具体到型号" placeholder-style="color:#c0c0c0" 
			@confirm="inputConfirm2" />
		<text>状态：</text>
		<input type="text" placeholder="输入当前状态,默认输入0" placeholder-style="color:#c0c0c0" 
			@confirm="inputConfirm3" />
		<text>地区：</text>
		<input type="text" placeholder="输入车辆所在地区" placeholder-style="color:#c0c0c0" 
			@confirm="inputConfirm4" />
	</view>
</template>

<script>
	export default {

		data() {
			return {
				examine:{
					saleId:'',
					carName:'',
					status:0,
					location:''
				}
			}
		},
		methods: {
			// 回车键确定
			 inputConfirm1(event) {
				const res = event.target.value;
				this.examine.saleId=res;
				console.log(event.detail.value);

			},
			inputConfirm2(event) {
				const res = event.target.value;
					this.examine.carName=res;
				console.log(event.detail.value);
			
			},
			inputConfirm3(event) {
				const res = event.target.value;
					this.examine.status=res;
				console.log(event.detail.value);
			
			},
			inputConfirm4(event) {
				const res = event.target.value;
					this.examine.location=res;
				console.log(event.detail.value);
			this.$emit('change',this.examine);
			},

		}
	}
</script>

<style>
</style>
