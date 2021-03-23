/*
 * @Author: 477
 * @Date: 2021-03-21 16:50:17
 * @LastEditTime: 2021-03-21 20:45:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \guidance\src\utils\mock.js
 */
// 引入mockjs
const Mock = require('mockjs')
const Random = Mock.Random

// 黑名单列表
const blackList = function() {
	let newsList = []
	for (let i = 0; i < 10; i++) {
		let newNewsObject = {
			suspectName: Random.cname(4, 4),
			idCard: Random.id(),
			tags: Random.ctitle(2, 2)
		}
		newsList.push(newNewsObject)
	}
	return {
		code: 200,
		message: null,
		data: newsList
	};
}

// 嫌疑人预测列表
const suspectForecastList = function() {
	let newsList = []
	for (let i = 0; i < 10; i++) {
		let newNewsObject = {
			percent: Random.natural(0, 100) + '%',
			suspectName: Random.cname(4, 4),
			idCard: Random.datetime(),
			tags: [Random.cname(4, 4), Random.cname(4, 4), Random.cname(4, 4), Random.cname(4, 4)]
		}
		newsList.push(newNewsObject)
	}
	return {
		code: 200,
		message: null,
		data: newsList
	};
}
// 历史碰撞
const historyCollisionList = function() {
	let newsList = []
	for (let i = 0; i < 10; i++) {
		let newNewsObject = {
			suspectName: Random.cname(4, 4),
			content: '恐怖活动',
			count: Random.natural(1, 99)
		}
		newsList.push(newNewsObject)
	}
	return {
		code: 200,
		message: null,
		data: newsList
	};
}


// 黑名单列表
Mock.mock(RegExp('/api/analysis/summary/blackList' + '.*'), 'get', blackList)
// 嫌疑人预测列表
Mock.mock(RegExp('/api/analysis/summary/suspectList' + '.*'), 'get', suspectForecastList)
// 历史碰撞
Mock.mock(RegExp('/api/analysis/summary/historyCompare' + '.*'), 'get', historyCollisionList)
