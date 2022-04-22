
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/TabBar/home/home","pages/TabBar/category/category","pages/TabBar/cart/cart","pages/TabBar/user/user","pages/order/confirm","pages/searchDetail/searchDetail","pages/brandProductList/brandProductList","pages/goods/productDetail/productDetail"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#FFFFFF"},"tabBar":{"color":"#333333","selectedColor":"#f06c7a","borderStyle":"black","backgroundColor":"#F8F8F8","list":[{"pagePath":"pages/TabBar/home/home","iconPath":"static/tabbar_icon/home.png","selectedIconPath":"static/tabbar_icon/home_sel.png","text":"首页"},{"pagePath":"pages/TabBar/category/category","iconPath":"static/tabbar_icon/category.png","selectedIconPath":"static/tabbar_icon/category_sel.png","text":"分类"},{"pagePath":"pages/TabBar/cart/cart","iconPath":"static/tabbar_icon/cart.png","selectedIconPath":"static/tabbar_icon/cart_sel.png","text":"购物车"},{"pagePath":"pages/TabBar/user/user","iconPath":"static/tabbar_icon/mine.png","selectedIconPath":"static/tabbar_icon/mine_sel.png","text":"个人中心"}]},"nvueCompiler":"uni-app","nvueStyleCompiler":"weex","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":false,"autoclose":true},"appname":"uni-app-mall","compilerVersion":"3.3.13","entryPagePath":"pages/TabBar/home/home","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/TabBar/home/home","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"首页","titleNView":false,"bounce":"none"}},{"path":"/pages/TabBar/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","titleNView":false,"bounce":"none"}},{"path":"/pages/TabBar/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"购物车"}},{"path":"/pages/TabBar/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"","enablePullDownRefresh":true,"onReachBottomDistance":0}},{"path":"/pages/order/confirm","meta":{},"window":{"navigationBarTitleText":"确定订单"}},{"path":"/pages/searchDetail/searchDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/brandProductList/brandProductList","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}},{"path":"/pages/goods/productDetail/productDetail","meta":{},"window":{"navigationBarTitleText":"","enablePullDownRefresh":false}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
