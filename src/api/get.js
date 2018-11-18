import  {ajax as hg}from './ajax'
//c//onsole.log(hg)
function getList(parmas){
    hg.get('/applet/myOrderList',parmas).then((response)=>{
        console.log(response)
        return response
    })
}
export default { getList } 
