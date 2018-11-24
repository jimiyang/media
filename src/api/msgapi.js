import {ajax as axios} from './api'
function getMsgSendRecord (params) {
  return axios.post('/wechat/batchMessage/getMsgSendRecord', params)
    .then((repsonse) => {
      return repsonse.data
    })
}
function preview (params) {
  return axios.post('/wechat/batchMessage/preview',params)
    .then((repsonse) => {
      return repsonse.data
    })
}
function deleteNewsRecord (params) {
  return axios.post('/wechat/batchMessage/deleteNewsRecord',params)
    .then((repsonse) => {
      return repsonse.data
    })
}
function batchMessage (params) {
  return axios.post('/wechat/batchMessage',params)
    .then((repsonse) => {
      return repsonse.data
    })
}
export default{
  getMsgSendRecord, preview, deleteNewsRecord, batchMessage
} 