import axios from 'axios'
let base = ''
if (window.location.hostname === 'localhost') {
  base = '/api'
}
const ajax = axios.create({
  baseURL: base,
  withCredentials: true
})
ajax.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
ajax.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})
export {ajax}
