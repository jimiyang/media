import  { ajax as axios } from './ajax'
// console.log(hg)
function getList (parmas) {
    axios.get ('/applet/myOrderList',parmas).then((response)=>{
        console.log(response)
        return response
    })
}
export default { getList } 
