import {ajax as axios} from './api'
// 登录
function  userLogin(params) {
  return axios('/login', { params : params })
    .then((response) => {
       return response
    })
}
export default{ userLogin }