<template>
	<view  class="view_text">
		<text class="title">线下审核回执单</text>
		<view class="img_info">上传图片仅支持一张照片，仅自行合成后上传</view>
		<view class="saleId">
			<text>申请编号：</text>
			<input type="text" placeholder="申请码,身份证号后六位" placeholder-style="color:#c0c0c0" @confirm="inputConfirm1" style="border: 1upx solid #55ffff;" />
		</view>
		<view class="sallerName">
			<text>卖家姓名：</text>
			<input type="text" placeholder="姓名" placeholder-style="color:#c0c0c0" @confirm="inputConfirm2" style="border: 1upx solid #55ffff;"/>
		</view>
		<view class="sallerId">
			<text>卖家身份证号码：</text>
			<input type="text" placeholder="身份证号" placeholder-style="color:#c0c0c0" @confirm="inputConfirm3" style="border: 1upx solid #55ffff;" />
		</view>
		<view class="cardPic">
			<text>卖家身份证照片：</text>
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="10">
			</u-upload>
		</view>
		<view class="carPic">
			<text>车封面：</text>
			<u-upload :fileList="fileList2" @afterRead="afterRead" @delete="deletePic" name="2" multiple :maxCount="3">
			</u-upload>
		</view>
		<view class="millege">
			<text>里程：</text>
			<input type="text" placeholder="里程:KM" placeholder-style="color:#c0c0c0" @confirm="inputConfirm4" style="border: 1upx solid #55ffff;" />
		</view>
		<view class="listingTime">
			<text>挂牌日期：</text>
			<input type="text" placeholder="格式:2022-04-03" placeholder-style="color:#c0c0c0" @confirm="inputConfirm5" style="border: 1upx solid #55ffff;" />
		</view>
		<view class="listingTime">
			<text>是否有检修：</text>
			<input type="text" placeholder="0:无 1:有" placeholder-style="color:#c0c0c0" @confirm="inputConfirm6"  style="border: 1upx solid #55ffff;"/>
		</view>
		<view class="reviewPic">
			<text>复核材料：</text>
			<u-upload :fileList="fileList3" @afterRead="afterRead" @delete="deletePic" name="3" multiple :maxCount="10">
			</u-upload>
		</view>
		<view class="reviewerNumber">
			<text>复核员工号：</text>
			<input type="text" placeholder="工号" placeholder-style="color:#c0c0c0" @confirm="inputConfirm7" style="border: 1upx solid #55ffff;" />
		</view>
	</view>
</template>

<script>
	import dateToTimestamp from '../../../utils/date.js'
	export default {
		data() {
			return {
				fileList1: [],
				fileList2: [],
				fileList3: [],
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
				}
			}
		},
		onLoad() {},
		methods: {
			// 回车键确定
			inputConfirm1(event) {
				const res = event.target.value;
				this.detail.saleId = res;
				console.log(event.detail.value);

			},
			inputConfirm2(event) {
				const res = event.target.value;
				this.detail.sallerName = res;
				console.log(event.detail.value);

			},
			inputConfirm3(event) {
				const res = event.target.value;
				this.detail.sallerId = res;
				console.log(event.detail.value);

			},
			inputConfirm4(event) {
				const res = event.target.value;
				this.detail.mileage = res;
				console.log(event.detail.value);
			},
			inputConfirm5(event) {
				// 日期需要处理
				const res = event.target.value;
				const t = dateToTimestamp(res);
				this.detail.listingTime = t;
				console.log(t);
			},
			inputConfirm6(event) {
				const res = event.target.value;
				this.detail.repair = res;
				console.log(event.detail.value);
			},
			inputConfirm7(event) {
				const res = event.target.value;
				this.detail.reviewerNumber = res;
				console.log(event.detail.value);
				this.$emit('change',this.detail);
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				lists.map((item) => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this[`fileList${event.name}`][fileListLen]
					// 向数组新增一个
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}))
					fileListLen++
				}
				let obj1 = Object.assign([], this.fileList1[0]);
				let obj2 = Object.assign([], this.fileList2[0]);
				let obj3 = Object.assign([], this.fileList3[0]);
				this.detail.cardPic=obj1.thumb;
				this.detail.carPic=obj2.thumb;
				this.detail.reviewPic=obj3.thumb;
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: '/static/img/sale', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
		},
	}
</script>

<style>
	.title {
		margin-left: 135upx;
		color: #2979FF;
	}
	.img_info{
		font-size: 8upx;
		color: #cccccc;
		margin-left: 40upx;
	}
	.view_text{
		font-size: 12upx;
		color: #ff5500;
		
	}
	
</style>
