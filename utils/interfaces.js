const domain = "https://uniapp-interface.herokuapp.com/";
const interfaces = {
	// 获取首页数据
	getMallData: domain + "api/profiles/mall_list",
	// 获取分类数据
	getCategory: domain + "api/profiles/category",
	// 获取商品列表数据
	getGoodsList: domain + 'api/profiles/goodslist',
	// 商品详情信息
	getGoods: domain + "api/profiles/goods",
	getSearch: 'http://localhost:5000/' + "api/aproduct/search",
	// 首页信息自我接口
	getIndex:'http://localhost:5000/' + "api/aindex",
	// 首页品牌跳转
	getBrandProduct:'http://localhost:5000/' + "api/aproduct/brandSearch",
	// 首页价格跳转
	getPriceProduct:'http://localhost:5000/' + "api/aproduct/priceSearch",
	// 拿到商品获取对应的详情
	getDetail:'http://localhost:5000/'+"api/aproduct/detail",
}
module.exports = interfaces;