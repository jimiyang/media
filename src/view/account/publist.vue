<template>
    <div>
        <el-table class="tab-list" ref="multipleTable" :data="pnumberList" :id="index">
            <el-table-column   prop="nickName"  label="公众号名称" ></el-table-column>
            <el-table-column   prop="serviceTypeInfo"  label="帐号类型"   >
                <template slot-scope="scope">
                    <span>{{scope.row.serviceTypeInfo==0 ? "订阅号" : "服务号"}}</span>
                </template>
            </el-table-column>
            <el-table-column   prop="authorizationDate"  label="授权时间">
                <template slot-scope="scope" >
                    <span  :index = "scope.index"> 
                         {{scope.row.authorizationDate!=null? scope.row.authorizationDate: '--' }}
                         <a href="javascript:" class="blue-color"  @click="authorizationEvent(scope)">
                             {{scope.row.authorizationDate!=null? '解除授权': '重新授权' }}
                         </a>
                    </span>
                    <!--<span>
                         <a href="javascript:" class="blue-color"  @click="goAuthor(scope.row.appid)">{{text}}</a>
                    </span>-->
                </template>
            </el-table-column>
            <el-table-column   prop="fansCount"  label="粉丝数"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button @click="switchApp(scope.row.appid)" type="text" size="small">切换</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<<script>
    import  pubnumapi from '../../api/pubnumapi.js'
    import bus from '../../until/eventbus.js'
    export default{
        data(){
            return{
                publicapi : pubnumapi,
                pnumberList:[],
                time:'',
                index:0,
                text:'解除授权'
            }
        },
        created(){
            //console.log(window.localStorage.getItem('changeLogin'))
            this.publicapi.getList().then((rs)=>{
                if(rs.returnCode=="F"){
                    this.$message({
                        message: `${rs.returnMsg}`,
                        center: true,
                        type:'error'
                    });
                }else{
                    this.pnumberList = rs.data
                }
            })
        },
        methods:{
            //解除授权
            authorizationEvent(item){
               // this.publicapi.quitAuth({"appId":item}).then((rs) =>{
                    //console.log(rs)
                //})
                if(item.authorizationDate!=null){
                     this.text='重新授权'
                }
               
            },
           switchApp(id){
               this.publicapi.switchApp({"appId":id}).then((rs)=> {
                   if(rs.returnCode=="F"){
                        this.$message({
                            message: `${rs.returnMsg}`,
                            center: true,
                            type:'error'
                        });
                    }else{
                        window.localStorage.setItem("appInfo",JSON.stringify(rs.data))
                        console.log(JSON.parse(window.localStorage.getItem("appInfo")))
                        bus.$emit("ischange",JSON.parse(window.localStorage.getItem("appInfo")))
                    }
               })
           }
        }
    }
</script>