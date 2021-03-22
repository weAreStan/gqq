import request from './axios/index'
export function blackList(params) {
    return request({
        url: `/analysis/summary/blackList`,
        method: 'GET',
        params
    })
}
