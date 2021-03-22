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
const blackList = function () {
    let newsList = []
    for (let i = 0; i < 10; i++) {
        let newNewsObject = {
            suspectName: Random.cname(4, 4), // Random.ctitle( min, max ) 随机产生一个中文标题，长度默认在3-7之间
            idCard: Random.id(), // Random.cparagraph(min, max) 随机生成一个中文段落，段落里的句子个数默认3-7个
            tags: Random.ctitle(2, 2) // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；
        }
        newsList.push(newNewsObject)
    }
    return {
        status: 200,
        message: 'success',
        data: newsList
    };
}

// 黑名单列表
Mock.mock(RegExp('/api/analysis/summary/blackList' + '.*'), 'get', blackList)
