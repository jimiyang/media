import { ajax as axios } from './api'
function add (params) {
  return axios.post('/advert/add', params)
    .then((response) => {
      return response.data
    })
}
function allList (params) {
  return axios.get('/advert/allList', {params: params})
    .then((response) => {
      return response.data
    })
}
function deleteAdvert (params) {
  return axios.get('/advert/delete', {params: params})
    .then((response) => {
      return response.data
    })
}
function get (params) {
  return axios.get('/advert/get', {params: params})
    .then((response) => {
      return response.data
    })
}
function list (params) {
  return axios.post('/advert/list', params)
    .then((response) => {
      return response.data
    })
}
function update (params) {
  return axios.post('advert/update', params)
    .then((response) => {
      return response.data
    })
}
function channelSetAdvert (params) {
  return axios.post('/advertChannel/channelSetAdvert', params)
    .then((response) => {
      return response.data
    })
}
function getAdvertListByChannelId (params) {
  return axios.post('/advertChannel/getAdvertListByChannelId', params)
    .then((response) => {
      return response.data
    })
}
function channelList () {
  return axios.get('/channel/allList').then((response) => {
    return response.data
  })
}
// 广告新增、所有广告列表、删除广告、广告详情、广告列表、广告更新、广告投放、根据渠道Id获取已经选择广告列表、渠道列表（不分页）
export default{add, allList, deleteAdvert, get, list, update, channelSetAdvert, getAdvertListByChannelId, channelList}

