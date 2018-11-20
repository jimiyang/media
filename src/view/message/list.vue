<template>
    <div class="msg-list">
        <el-table class="tab-list" :data="tableData"    style="width:100%;">
            <el-table-column   prop="content"  label="发送内容" ></el-table-column>
            <el-table-column   prop="type"  label="发送方式"   >
                <template slot="header" slot-scope="slot">
                   发送方式<img src="/static/images/filter-ico.png" />
                </template>
            </el-table-column>
            <el-table-column   prop="number"  label="目标人数"  ></el-table-column>
            <el-table-column   prop="state"  label="发送状态" >
                <template slot-scope="scope">
                    <span class="dot-ico" :class="scope.row.state==1 ? 'on' : '' ">{{scope.row.state == 0 ? "取消发送" : "发送完毕" }}</span>
                </template>
            </el-table-column>
            <el-table-column   prop="time"  label="发送时间" >
                 <template slot="header" slot-scope="slot">
                   发送时间<img src="/static/images/filter-ico.png" />
                </template>
            </el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog   title="群发内容详情"  :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <div class="msg-content">
                   <el-steps :active="active" finish-status="success">
                        <el-step title="步骤 1"></el-step>
                        <el-step title="步骤 2"></el-step>
                        <el-step title="步骤 3"></el-step>
                   </el-steps> 
                   <ul class="list">
                     <li>群发对象：</li>
                     <li>组别：</li>
                     <li>成功人数：</li>
                     <li>失败人数：</li>
                     <li>发送时间：</li>
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
    export default{
        data(){
            return{
                dialogVisible:false,
                active:0,
                tableData:[
                    {id:1,content:"啊",type:"111",number:"23",state:0,time:"2018-01-20 10:20:20"},
                    {id:2,content:"啊1111",type:"112",number:"23",state:1,time:"2018-01-20 10:20:20"}
                ]
            }
        },
        methods:{
            handleClick(index){
                alert(index)
            },
            handleClose(){}
        }
    }
</script>