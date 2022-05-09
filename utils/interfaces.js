//const domain = "https://f09d-111-20-192-217.jp.ngrok.io/";
const domain='http://localhost:5000/'
const interfaces = {
	getSearch: domain + "api/aproduct/search",
	// 首页信息自我接口
	getIndex:domain + "api/aindex",
	// 首页品牌跳转
	getBrandProduct:domain + "api/aproduct/brandSearch",
	// 首页价格跳转
	getPriceProduct:domain + "api/aproduct/priceSearch",
	// 拿到商品获取对应的详情
	getDetail:domain+"api/aproduct/detail",
	// 提交卖车申请
	applySaleCar:domain+"api/asale/apply",
	// 提交线下审核内容
	setContent:domain+"api/asale/setContet",
	// 全部
	getAllProduct:domain+"api/aproduct/all",
	// 筛选级联
	getSelectProduct:domain+"api/aproduct/select",
	// APP登录接口
	// login:domain+"api/alogin",
	// APP注册接口
	register:domain+"api/aregister",
	// 获得卖车进度
	getCurrent:domain+"api/asale/current",
	// 即时通讯获取系统sale列表
	getUserData:domain+'api/alogin/getUserData'
}
module.exports = interfaces;