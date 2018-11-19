<template>
    <div class="lab-mange">
         <a href="" class="blue-btn">创建新标签</a>
         <div class="warning">你在本平台的操作将自动同步至公众平台，但是在公众平台或其他微信第三方的操作不会自动同步，需进入粉丝列表手动点击同步才能保证数据与公众平台一致。</div>
         <el-table class="tab-list" :data="tableData"   style="width:100%;">
            <el-table-column   prop="labname"  label="标签名称" ></el-table-column>
            <el-table-column   prop="id"  label="标签ID"   ></el-table-column>
            <el-table-column   prop="count"  label="粉丝人数" sortable ></el-table-column>
            <el-table-column   prop="trriger"  label="触发行为"></el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                tableData:[{labname:"星标组",id:"2",count:333,trriger:"未设定"}]
            }
        },
        methods:{
            handleClick(id){
                
            }
        }
    }
</script>