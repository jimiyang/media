<template>
    <div class="msg-list">
        <el-table class="tab-list" :data="tableData"    style="width:100%;">
            <el-table-column   prop="content"  label="发送内容" ></el-table-column>
            <el-table-column   prop="type"  label="发送方式"   >
                <template slot="header" slot-scope="slot">
                   发送方式<img src="../../assets/filter-ico.png" />
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
                   发送时间<img src="../../assets/filter-ico.png" />
                </template>
            </el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData:[
                    {content:"啊",type:"111",number:"23",state:0,time:"2018-01-20 10:20:20"},
                    {content:"啊1111",type:"111",number:"23",state:1,time:"2018-01-20 10:20:20"}
                ]
            }
        }
    }
</script>