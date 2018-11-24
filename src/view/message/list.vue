<template>
    <div class="msg-list">
        <el-table class="tab-list" :data="messageData"  style="width:100%;">
            <el-table-column   prop="title"  label="发送内容" ></el-table-column>
            <el-table-column   prop="msgtype"  label="发送方式"   >
                <template slot="header" slot-scope="slot">
                   发送方式<img src="/static/images/filter-ico.png" />
                </template>
                <template slot-scope="scope">{{$common.msgTypelist(scope.row.msgtype)}}</template>
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
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
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
        <el-dialog   title="群发内容详情"  :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
            <div class="msg-content">
                <el-steps :active="active" finish-status="success">
                    <el-step title="创建任务"></el-step>
                    <el-step title="微信发送中"></el-step>
                    <el-step title="群发完毕"></el-step>
                </el-steps> 
                <ul class="list">
                    <li class="wrap">
                        <div>群发对象：</div>
                        <div>组别：{{detail.tagId}}</div>
                    </li>
                    <li>成功人数：{{detail.sentCount}}</li>
                    <li>失败人数：{{detail.errorCount}}</li>
                    <li>发送时间：{{detail.sendDate}}</li>
                    <li>群发数据：</li>
                    <li>
                        <label>当前图文消息：</label>
                        <el-select  placeholder="请选择">
                            <el-option>
                            </el-option>
                        </el-select>
                         <a href="javascript:" class="blue-btn">删除图文</a>
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
import fanlistVue from '../user/fanlist.vue';
    export default{
        data(){
            return{
                messageapi : messageapi,
                dialogVisible : false,
                active : 0,
                messageData : [],
                totalCount:0,
                value:"",
                search:{
                    currentPage:1,
                    pageSize:5
                },
                detail:{
                    tagId:"吉米小绵羊",
                    sentCount:"11",
                    errorCount:"22",
                    sendDate:"2222",
                }       
            }
        },
        created(){
           this.loadList()
        },
        methods:{
            loadList(){
               this.messageapi.getMsgSendRecord(this.search).then(rs => {
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
            handleClick(index){
                this.dialogVisible = true
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