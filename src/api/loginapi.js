import { ajax as axios } from './ajax'
function userLogin (params) {
   return  axios.post('/login', {params: params})
   .then((response) => {
        console.log(response)
        return response
    })
}
export default { userLogin }