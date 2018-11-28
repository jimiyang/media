import {ajax as axios} from './api'
// 公众号管理列表、取消授权、切换
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
function switchApp (params) {
  return axios.get('/wechat/wechatAuthorizer/switchApp',{params:params})
    .then((response) => {
      return response.data
    })
}
export default { 
  getList,
  quitAuth,
  switchApp
}