import request from '@/utils/request'

/**
 * 获取所有的房屋
 */

export function getCharge(housing_id) {
    return request({
        url: '/getCharge',
        method: 'get',
        params:{housing_id}
    })
}
