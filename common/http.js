const BASE_URL = 'https://api.imooc-blog.lgdsunday.club/api/';
//封装通用$http1
export default function $http(options) {
	const{ url , data ,method} = options
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: data,
			method: method,
			success({
				data,
				statusCode,
				header
			}) {
				if (data.success) {
					resolve(data.data);
				} else {
					//请求失败
					uni.showToast({
						title: data.message,
						icon: 'none',
						mask: true,
						direction: 3000
					});
					reject(data.message);
				}
			},
			fail(error) {
				reject(error);
			}

		});
	})
}
