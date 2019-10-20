import request from '@/utils/request'

/**
 * 一键缴费
 */

export function OnekeyPay(data) {
    return request({
        url: '/OnekeyPay',
        method: 'post',
        data,
    })
}


export function getOrderByWithdraw(id) {
    return request({
        url: '/getOrderByWithdraw',
        method: 'get',
        params:{id},
    })
}




export function postTemporary(data) {
    return request({
        url: '/postTemporary',
        method: 'post',
        params:data
    })
}



export function getByListt(query) {
    return request({
        url: '/order/getDataByList',
        method: 'get',
        params: query
    })
}
