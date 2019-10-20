import request from '@/utils/request'

/**
 * 获取所有的房屋
 */

export function getHousingitem(data) {
    return request({
        url: '/getHousingitem',
        method: 'get',
        params:data
    })
}
export function getByListt(query) {
    return request({
        url: '/bill/getBillByItem',
        method: 'get',
        params: query
    })
}


export function getByList(query) {
    return request({
        url: '/bill/getMeterByData',
        method: 'get',
        params: query
    })
}



export function getBillChildByItem(query) {
    return request({
        url: '/bill/getBillChildByItem',
        method: 'get',
        params: query
    })
}
export function getDataByDelete(id) {
    return request({
        url: '/Charge/getLDataByDelete',
        method: 'get',
        params: { id }
    })
}


export function getUserBillbyItem(query) {
    return request({
        url: 'bill/getUserBillbyItem',
        method: 'get',
        params: query
    })
}



export function getUsertemporaryItem(query) {
    return request({
        url: '/Charge/getLIChargeByList',
        method: 'get',
        params: query
    })
}


