import request from '@/utils/request'

export function getDataByList() {
    return request({
        url: '/feedback/getDataByList',
        method: 'get',
    })
}

