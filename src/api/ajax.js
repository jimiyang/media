import axios from 'axios'
const url = '/'
let ajax = axios.create({
   baseURL:url
})
ajax.interceptors.request.use(function(config){
     return config;
   },function(error){
     return Promise.reject(error);
})
ajax.interceptors.response.use(function(response){
     //return response;
	 return Promise.resolve(response);
   },function(error){
     return Promise.reject(error);
})
export {ajax}