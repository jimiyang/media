<template>
    <div>
        <el-table class="tab-list" ref="multipleTable" :data="pnumberList" >
            <el-table-column   type="selection" prop="appid" width="55"></el-table-column>
            <el-table-column   prop="nickName"  label="公众号名称" ></el-table-column>
            <el-table-column   prop="serviceTypeInfo"  label="帐号类型"   >
                <template slot-scope="scope">
                    <span>{{scope.row.serviceTypeInfo==0 ? "订阅号" : "服务号"}}</span>
                </template>
            </el-table-column>
            <el-table-column   prop="authorizationDate"  label="授权时间">
                <template slot-scope="scope">
                    {{scope.row.authorizationDate}}
                    <span  v-if="scope.row.authorizationDate!=null"> 
                         {{scope.row.authorizationDate}}<a href="javascript:" class="blue-color"  @click="authorizationEvent(scope.row.appid)">{{text}}</a>
                    </span>
                    <span v-else>
                        {{new Date()}}<a href="javascript:" class="blue-color">{{text}}</a>
                    </span>
                </template>
            </el-table-column>
            <el-table-column   prop="fansCount"  label="粉丝数"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.appid)" type="text" size="small">切换</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<<script>
    import  pubnumapi from '../../api/pubnumapi.js'
    export default{
        data(){
            return{
                publicapi : pubnumapi,
                pnumberList:[],
                text:'解除授权'
            }
        },
        created(){
            //console.log(window.localStorage.getItem('changeLogin'))
            console.log(getDate(new Date()))
            this.publicapi.getList().then((rs)=>{
                console.log(rs.data)
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
            //重新/解除授权
            authorizationEvent(item){
               // this.publicapi.quitAuth({"appId":item}).then((rs) =>{
                    //console.log(rs)
                //})

                this.text='重新授权'
            }
        }
    }
</script>