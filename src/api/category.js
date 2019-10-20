import request from '@/utils/request'

export function getCategory() {
    return request({
        url: '/getCategory',
        method: 'get',
    })
}

export function temporaryCategory() {
    return request({
        url: '/temporary/getCategory',
        method: 'get',
    })
}

