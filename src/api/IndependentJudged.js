// 自主研判
// 研判记录
import request from './axios/index'
export function getRecordData(params) {
  return request({
    url: '/analysis/record/list',
    method: 'GET',
    params
  })
}