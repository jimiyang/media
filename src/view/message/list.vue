<template>
    <div class="msg-list">
        <el-table class="tab-list" :data="messageData"  style="width:100%;">
            <el-table-column   prop="sendContent"  label="发送内容" ></el-table-column>
            <el-table-column   prop="msgtype"  label="发送方式"   >
                <template slot="header" slot-scope="slot">
                   发送方式<img src="/static/images/filter-ico.png" />
                </template>
                <template slot-scope="scope">{{$common.msgTypelist(scope.row.msgtype,0)}}</template>
            </el-table-column>
            <el-table-column   prop="totalCount"  label="目标人数"  ></el-table-column>
            <el-table-column   prop="sendStatus"  label="发送状态" >
                <template slot-scope="scope">
                    <span class="dot-ico " v-if="scope.row.sendStatus==0">未发送</span>
                    <span class="dot-ico loading" v-if="scope.row.sendStatus==1">发送中</span>
                    <span class="dot-ico success" v-if="scope.row.sendStatus==2">发送完毕</span>
                </template>
            </el-table-column>
            <el-table-column   prop="sendDate"  label="发送时间" >
                 <template slot="header" slot-scope="slot">
                   发送时间<img src="/static/images/filter-ico.png" />
                 </template>
                 <template slot-scope="scope">{{$common.getDate(scope.row.sendDate,true)}}</template>
            </el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <a href="javascript:" class="blue-color" @click="detailEvent(scope.row.id)">详情</a>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-sizes="[5, 10, 20, 30, 40,100,200,300,400]"
                :page-size.sync="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog   title="群发内容详情"  :visible.sync="dialogVisible"  width="50%"  :before-close="handleClose">
            <div class="msg-content">
                <el-steps :active="detail.sendStatus" finish-status="success">
                    <el-step title="创建任务"></el-step>
                    <el-step title="微信发送中"></el-step>
                    <el-step title="群发完毕"></el-step>
                </el-steps> 
                <ul class="list">
                    <li class="wrap">
                        <div>群发对象：{{detail.target}}</div>
                        <div>组别：{{detail.target}}</div>
                    </li>
                    <li>成功人数：{{detail.sentCount}}人</li>
                    <li>失败人数：{{detail.errorCount}}人</li>
                    <li>发送时间：{{$common.getDate(detail.sendDate,true)}}</li>
                    <li>
                        <label>当前图文消息：</label>
                        <el-select  v-model="selectVal"  placeholder="请选择">
                             <el-option
                                v-for="item in detail.wechatMediaResponse"
                                :key="item.id"
                                :label="item.title"
                                :value="item.id">
                                </el-option>
                        </el-select>
                        <a href="javascript:" class="blue-btn" @click = "delMsg">删除图文</a>
                    </li>
                </ul>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    import messageapi from  '../../api/msgapi'
    //import fanlistVue from '../user/fanlist.vue'
    export default{
        data(){
            return{
                messageapi : messageapi,
                dialogVisible : false,
                messageData : [],
                totalCount:0,
                search:{
                    currentPage:1,
                    pageSize:5
                },
                marteralId:'', //图文id
                detail:{
                   //wechatArticleList : []
                },
                selectVal:''
            }
        },
        created(){
           this.loadList()
        },
        methods:{
            loadList(){
               this.messageapi.getMsgSendRecordList(this.search).then(rs => {
                    if(rs.returnCode == "F"){
                       this.$message({
                          type: 'error',
                          message: `${rs.returnMsg}`
                        })
                    }else{
                        this.messageData =  rs.data.items
                        this.totalCount = rs.data.totalNum
                    }
               })
            },
            detailEvent(id){
                this.dialogVisible = true
                this.messageapi.getMsgSendRecordByid({id:id}).then(rs => {
                    if(rs.returnCode == "F"){
                        this.$message({
                            type: 'error',
                            message: `${rs.returnMsg}`
                            })
                     }else{
                        this.detail = rs.data
                        this.detail.wechatMediaResponse = rs.data.wechatMediaResponse.wechatArticleList
                        console.log(this.detail)
                    }
                })
            },
            delMsg(){
                if(this.selectVal!=""){
                    console.log(this.detail.msgId)
                    this.messageapi.deleteNewsRecord({msgId : this.detail.msgId}).then(rs => {
                        if(rs.returnCode == "F"){
                            this.$message({
                                type: 'error',
                                message: `${rs.returnMsg}`
                            })
                        }else{
                            this.$message({
                                type: 'success',
                                message: `${rs.returnMsg}`
                            })
                            this.dialogVisible = false
                            this.loadList()
                        }
                    })
                }
            },
            handleClose(){
                this.dialogVisible = false
            },
            handleSizeChange(val){
                this.search.pageSize = val
                this.loadList()
            },
            handleCurrentChange(val){
                this.search.currentPage = val
                this.loadList()
            }
        }
    }
</script>