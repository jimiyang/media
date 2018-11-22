import {ajax as axios} from './api'
function  getList() {
  return axios.post('/wechat/material/synchronizationMediaList')
    .then((response) => {
      return response.data
    })
}
function getMediaListByType(params) { 
  return axios.post('/wechat/material/getMediaListByType' , { params : params })
    .then((response) => {
        return response.data
    })
}
export default{ getList, getMediaListByType }