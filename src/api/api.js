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
export { ajax }

// export与export default均可用于导出常量、函数、文件、模块等
// 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 通过export方式导出，在导入时要加{ }，export default则不需要知道所要加载模块的变量名
