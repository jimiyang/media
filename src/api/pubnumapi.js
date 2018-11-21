import {ajax as axios} from './api'
// 公众号管理
function getList (params) {
  return axios.get('/wechat/wechatAuthorizer/list', { params : params })
    .then((response) => {
      return response.data
    })
}
function quitAuth (params) {
  return axios.get('/wechat/wechatAuthorizer/quitAuth', { params : params })
    .then((response) => {
      return response.data
    })
}
export default { 
  getList,
  quitAuth
}