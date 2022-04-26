import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import App from './App'
import http from './utils/http.js'
import status from './components/status.vue'
import {VueJsonp} from 'vue-jsonp';  


Vue.config.productionTip = false
Vue.prototype.request = http
//全局注册组件
Vue.use(VueJsonp);
Vue.component('page-status',status)
Vue.use(uView)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
