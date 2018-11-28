import { ajax as axios } from './api'
/* 标签管理 star */
function getList (params) {
  return axios.get('/wechat/tag/list', {params : params})
    .then((response) => {
      return response.data
    })
}
function addTag (params) {
  return axios.post('/wechat/tag/add', params)
    .then((response) => {
      return response.data
    })
}
function updateLab (params) {
  return axios.post('/wechat/tag/update', params)
    .then((response) => {
      return response.data
    })
}
function deleteTag (params) {
  return axios.get('/wechat/tag/delete', {params : params})
    .then((response) => {
      return response.data
    })
}
/* 标签管理 end */
/* 粉丝管理 star */
function getFanslist (params) {
  return axios.post('/wechat/fans/list', params)
    .then((response) => {
      return response.data
    })
}
function getTagfanslistByid (params) {
  return axios.post('/wechat/fans/getByAppidAndTagid', params)
    .then((response) => {
      return response.data
    })
}
function batchAddtag (params) {
  return axios.post('/wechat/fans/batchAddTags', params)
    .then((response) => {
      return response.data
    })
}
function batchDeltag (params) {
  return axios.post('/wechat/fans/batchDelTags', params)
    .then((response) => {
      return response.data
    })
}
function refreshUserlist (params) {
  return axios.get('/wechat/fans/refreshWechatUserList', { params: params })
    .then((response) => {
      return response.data
    })
}
/* 粉丝管理 end */
export default{
  getList,
  addTag,
  updateLab,
  deleteTag,
  getFanslist,
  getTagfanslistByid,
  batchAddtag,
  batchDeltag,
  refreshUserlist
}