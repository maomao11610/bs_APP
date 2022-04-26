const domain = "https://uniapp-interface.herokuapp.com/";
const interfaces = {
	getSearch: 'http://localhost:5000/' + "api/aproduct/search",
	// 首页信息自我接口
	getIndex:'http://localhost:5000/' + "api/aindex",
	// 首页品牌跳转
	getBrandProduct:'http://localhost:5000/' + "api/aproduct/brandSearch",
	// 首页价格跳转
	getPriceProduct:'http://localhost:5000/' + "api/aproduct/priceSearch",
	// 拿到商品获取对应的详情
	getDetail:'http://localhost:5000/'+"api/aproduct/detail",
	// 提交卖车申请
	applySaleCar:'http://localhost:5000/'+"api/asale/apply",
	// 提交线下审核内容
	setContent:'http://localhost:5000/'+"api/asale/setContet",
}
module.exports = interfaces;