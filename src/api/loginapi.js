import { ajax as axios } from './api'
// 登录
function userLogin (params) {
  return axios('/login', { params: params }).then((response) => {
    return response
  })
}
// 注册
function userRegister (params) {
  return axios.post('/wechat/register', params).then((response) => {
    return response.data
  })
}
export default{ userLogin, userRegister }

