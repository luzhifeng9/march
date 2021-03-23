
//开发   
 // let url_fig = 'http://192.168.3.110:8080/school-evaluation/'
let url_fig = 'http://192.168.1.5:9999'
let headers = {}   
let quest = (url, method, data, success, fail, isTextPlain) => {
	var computTimeOut = 10000
		// var requestCache = uni.getStorageSync('requestCache')
		var nowRequest = new Date().getTime()
		var cacheUrl = url
		for(let key in data){
			cacheUrl += data[key]
		}
		// if (requestCache === '') {
			// requestCache = {}
		// }
		// if (requestCache[cacheUrl] &&  nowRequest  - requestCache[cacheUrl] < 1500) {
		// 	console.log('1秒内两次相同的网络请求：' + cacheUrl)
		// 	return
		// }
		// requestCache = {}
		// requestCache[cacheUrl] = nowRequest
		// uni.removeStorageSync('requestCache')
		// uni.setStorageSync('requestCache', requestCache)
		// var user = uni.getStorageSync('localuser')
		// if (user !== '') {
		// 	headers.token = user.token
		// 	if (user.type) headers.type = user.type
		// }
		// var wxUser = uni.getStorageSync('wxUser')
		// if (wxUser !== '') {
		// 	if (getApp().globalData.parentId !== '') {
		// 		headers.parentId = getApp().globalData.parentId
		// 	} else if (wxUser.parentId) {
		// 		headers.parentId = wxUser.parentId
		// 	}
		// }
		var requestUrl = url_fig + url
		requestUrl = encodeURI(requestUrl)
		if (method==='POST') {
			headers['Content-Type'] = 'application/json;charset=UTF-8'
		} else {
			headers['Content-Type'] = 'text/plain'
		}
		if (isTextPlain) {
			requestUrl = url
		}
		if (!data) data = {}
		// 打印请求
		var consoleUrl = requestUrl
		var first = true
		for (var key in data) {
			if (first) {
				first = false
				consoleUrl += '?' + key + data[key]
			} else {
				consoleUrl += '&' + key + data[key]
			}
		}
		// console.log(consoleUrl)
		return uni.request ({
			url: requestUrl,
			data,
			timeout: computTimeOut,
			method,
			header: headers,
			success: (res) => {
				if (res.statusCode === 200) {
					if (success) success(res.data)
					// res.data.status === 0 登录失效
					if (res.data.status === 0) {
						// uni.clearStorage()
						getApp().clearStorage()
						uni.showToast({
							icon: 'none',
							title: res.data.message,
							duration: 1500
						})
						uni.reLaunch({
							url: '/pages/login/hoemPage',
							animationType: 'none'
						})
					} else if (res.data.status !== 1) {
						uni.showToast({
							icon: 'none',
							title: res.data.message,
							duration: 1500
						})
					}
				} else if (res.statusCode == 405) { 
					 uni.showToast({
						icon: 'none',
						title: '请求方法错误',
						duration: 1500
					})
				} else if (res.statusCode == 401) {
					uni.showToast({
						icon: 'none',
						title: '未登录或登录状态已超时',
						duration: 1500
					})
					setTimeout(() => {
						uni.reLaunch({
								url: '/pages/index/index.vue',
						})
					}, 1500)
				} else {
					uni.showToast({
						icon: 'none',
						title: '请求错误:' + res.statusCode,
						duration: 1500
					})
				}
		
			},
			fail: (res) => {
				uni.showToast({
					title: '网络请求失败',
					icon: 'none'
				})
				if (fail) fail(res)
			}
		})
}

export default quest