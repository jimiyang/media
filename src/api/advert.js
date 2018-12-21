import { ajax as axios } from './api'
function add (params) {
  return axios.post('/advert/add', params).then((response) => {
    return response.data
  })
}
function allList (params) {
  return axios.get('/advert/allList', {params: params}).then((response) => {
    return response.data
  })
}
function deleteAdvert (params) {
  return axios.get('/advert/delete', {params: params}).then((response) => {
    return response.data
  })
}
function get (params) {
  return axios.get('/advert/get', {params: params}).then((response) => {
    return response.data
  })
}
function list (params) {
  return axios.post('/advert/list', params).then((response) => {
    return response.data
  })
}
function update (params) {
  return axios.post('advert/update', params).then((response) => {
    return response.data
  })
}
function channelSetAdvert (params) {
  return axios.post('/advertChannel/channelSetAdvert', params).then((response) => {
    return response.data
  })
}
function getAdvertListByChannelId (params) {
  return axios.post('/advertChannel/getAdvertListByChannelId', params).then((response) => {
    return response.data
  })
}
function channelList () {
  return axios.get('/channel/allList').then((response) => {
    return response.data
  })
}
function imageAdd (params) {
  return axios.post('/upload/image', params).then(response => {
    return response.data
  }).catch(error => {
    return error
  })
}
function bannerAdd (params) {
  return axios.post('/advert/bannerAdd', params).then(response => {
    return response.data
  })
}
function bannerUpdate (params) {
  return axios.post('/advert/bannerUpdate', params).then(response => {
    return response.data
  })
}
function templateMsgAdd (params) {
  return axios.post('/advert/templateMsgAdd', params).then(response => {
    return response.data
  })
}
function templateMsgUpdate (params) {
  return axios.post('/advert/templateMsgUpdate', params).then(response => {
    return response.data
  })
}
function tempAlllist () {
  return axios.get('/wechat/template/allList').then(response => {
    return response.data
  })
}
// 广告位管理
function advertspaceAdd (params) {
  return axios.post('/channel/add', params).then(response => {
    return response.data
  })
}
function advertspaceEdit (params) {
  return axios.post('/channel/update', params).then(response => {
    return response.data
  })
}
function advertspaceList () {
  return axios.get('/channel/allList').then(response => {
    return response.data
  })
}
function advertspaceGetlist () {
  return axios.get('/channel/list').then(response => {
    return response.data
  })
}
function advertspaceGetDetail (params) {
  return axios.get('/channel/get', params).then(response => {
    return response.data
  })
}
function advertspaceputInDetail (params) {
  return axios.get('channel/puInDetail', params).then(response => {
    return response.data
  })
}
// 广告新增、所有广告列表、删除广告、广告详情、广告列表、广告更新、广告投放、根据渠道Id获取已经选择广告列表、渠道列表（不分页）、图片上传、新增banner、更新广告、模版新增
// 模版修改、模版消息模版接口
// 广告位新增、、广告位更新、列表（不分页）、列表（分页）、广告位详情、投放广告详情
export default{
  add,
  allList,
  deleteAdvert,
  get,
  list,
  update,
  channelSetAdvert,
  getAdvertListByChannelId,
  channelList,
  imageAdd,
  bannerAdd,
  bannerUpdate,
  templateMsgAdd,
  templateMsgUpdate,
  tempAlllist,
  advertspaceAdd,
  advertspaceEdit,
  advertspaceList,
  advertspaceGetlist,
  advertspaceGetDetail,
  advertspaceputInDetail
}

