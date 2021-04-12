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
// 研判记录
const judgeRecord = function(req, res) {
	let data = Mock.mock({
		'data|10-10': [{
			'id|+1': 1,
			'time': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
			'type': '',
			'content|5-5': [{
				'tag': '@cword(4, 6)',
				'tagType': '',
				'list|3-5': ["@cname"]
			}],
		}]
	})
	data.data.forEach((items, index) => {
		items.content.forEach((contents, cIndex) => cIndex % 2 ? (contents.tagType = 'system') : (contents
			.tagType = 'manual'))
	})
	return data.data
}
// 研判记录弹出
const judgeRecordPopup = function(req, res) {
	let data = Mock.mock({
		'data|10-10': [{
			'id|+1': 1,
			'time': '@DATETIME("yyyy-MM-dd HH:mm:ss")',
			'type': '',
			'systemTags|5-5': []
		}]
	})
	data.data.forEach((items, index) => {
		items.content.forEach((contents, cIndex) => cIndex % 2 ? (contents.tagType = 'system') : (contents
			.tagType = 'manual'))
	})
	return data.data
}


// 黑名单列表
Mock.mock(RegExp('/api/analysis/summary/blackList' + '.*'), 'get', blackList)
// 嫌疑人预测列表
Mock.mock(RegExp('/api/analysis/summary/suspectList' + '.*'), 'get', suspectForecastList)
// 历史碰撞
Mock.mock(RegExp('/api/analysis/summary/historyCompare' + '.*'), 'get', historyCollisionList)
// 研判记录
Mock.mock(RegExp('/api/analysis/record/list' + '.*'), 'get', judgeRecord)
// 研判记录弹窗
Mock.mock(RegExp('/api/analysis/record/personalRecords' + '.*'), 'get', judgeRecordPopup)
