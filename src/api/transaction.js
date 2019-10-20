import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/transaction/list',
    method: 'get',
    params: query
  })
}


export function getDataByList(community_id) {
  return request({
      url: '/feedback/getDataByList',
      method: 'get',
      params: {community_id}
  })
}

