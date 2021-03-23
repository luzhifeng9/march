import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import request from 'confing/http.js' // 封裝網絡請求

Vue.prototype.$request = request

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
