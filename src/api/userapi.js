import { ajax as axios } from './api'
getList() {
  return axios.get("/wechat/tag/list")
    .then((response) => {
        return response.data
    })
}
addTag(params) {
  return axios.post('/wechat/tag/add',{params : params})
    .then((response) => {
        return response.data
    })
}
updateLab(params) {
  return axios.post('/wechat/tag/update',{params : params})
    .then((response) => {
        return response.data
    })
}
deleteTag(params) {
  return axios.get('/wechat/tag/delete',{params : params })
    .then((response) => {
        return response.data
    })
}

getFanslist(params) {
  return axios.get('/wechat/fans/list', {params : params})
    .then((response) => {
        return response.data
    })
}
batchAddtag(params) {
  return axios.post('/wechat/fans/batchAddTags',{params : params})
    .then((response) => {
        return response.data
    })
}
batchDeltag(params) {
  return axios.post('/wechat/fans/batchDelTags',{params : params})
    .then((response) => {
        return response.data
    })
}
refreshUserlist() {
  return axios.get('/wechat/fans/refreshWechatUserList')
    .then((response) => {
        return response.data
    })
}
export default{
    getList,
    addTag,
    updateLab,
    deleteTag,
    getFanslist,
    batchAddtag,
    batchDeltag,
    refreshUserlist
}