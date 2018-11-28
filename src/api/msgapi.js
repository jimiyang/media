import {ajax as axios} from './api'
function getMsgSendRecordList (params) {
  return axios.post('/wechat/batchMessage/getMsgSendRecordList', params)
    .then((repsonse) => {
      return repsonse.data
    })
}
// 详情
function getMsgSendRecordByid (params) {
  return axios.post('/wechat/batchMessage/getMsgSendRecordById', params)
    .then((repsonse) => {
      return repsonse.data
    })
}
function preview (params) {
  return axios.post('/wechat/batchMessage/preview', params)
    .then((repsonse) => {
      return repsonse.data
    })
}
function deleteNewsRecord (params) {
  return axios.post('/wechat/batchMessage/deleteNewsRecord', params)
    .then((repsonse) => {
      console.log(params)
      return repsonse.data
    })
}
function batchMessage (params) {
  return axios.post('/wechat/batchMessage', params)
    .then((repsonse) => {
      return repsonse.data
    })
}
export default{
  getMsgSendRecordList, getMsgSendRecordByid, preview, deleteNewsRecord, batchMessage
}