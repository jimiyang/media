import { ajax as axios } from './api'
function getMsgSendRecordList (params) {
  return axios.post('/wechat/batchMessage/getMsgSendRecordList', params).then((repsonse) => {
    return repsonse.data
  })
}
// 详情
function getMsgRecordDetailById (params) {
  return axios.get('/wechat/batchMessage/getMsgRecordDetailById', {params: params}).then((repsonse) => {
    return repsonse.data
  })
}
function preview (params) {
  return axios.post('/wechat/batchMessage/preview', params).then((repsonse) => {
    return repsonse.data
  })
}
function deleteNewsRecord (params) {
  return axios.post('/wechat/batchMessage/deleteNewsRecord', params).then((repsonse) => {
    return repsonse.data
  })
}
function batchMessage (params) {
  return axios.post('/wechat/batchMessage', params).then((repsonse) => {
    return repsonse.data
  })
}
function cancle (params) {
  return axios.post('/wechat/batchMessage/cancle', params).then((response) => {
    return response.data
  })
}
export default{getMsgSendRecordList, getMsgRecordDetailById, preview, deleteNewsRecord, batchMessage, cancle}
