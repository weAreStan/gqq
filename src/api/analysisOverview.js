import request from './axios/index'
// 黑名单
export function blackList(params) {
	return request({
		url: `/analysis/summary/blackList`,
		method: 'GET',
		params
	})
}
// 嫌疑人预测列表
export function suspectForecastList(params) {
	return request({
		url: `/analysis/summary/suspectList`,
		method: 'GET',
		params
	})
}
// 历史碰撞
export function historyCollisionList(params) {
	return request({
		url: `/analysis/summary/historyCompare`,
		method: 'GET',
		params
	})
}
