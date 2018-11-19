import axios from 'axios'
const url = 'http://192.168.19.45:8000'
let ajax = axios.create({
  baseURL: url
})
ajax.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
ajax.interceptors.response.use(function (response) {
  return Promise.resolve( respons ) 
}, function (error) {
  return Promise.reject(error)
})
export {ajax}
// export与export default均可用于导出常量、函数、文件、模块等
// 在一个文件或模块中，export、import可以有多个，export default仅有一个
// 通过export方式导出，在导入时要加{ }，export default则不需要知道所要加载模块的变量名
