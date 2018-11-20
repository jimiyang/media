<template>
    <div>
        <el-table class="tab-list" ref="multipleTable" :data="tableData3"   style="width:100%;">
            <el-table-column   type="selection" width="55"></el-table-column>
            <el-table-column   prop="name"  label="公众号名称" ></el-table-column>
            <el-table-column   prop="area"  label="帐号类型"   ></el-table-column>
            <el-table-column   prop="source"  label="授权时间"></el-table-column>
            <el-table-column   prop="longtime"  label="粉丝数"></el-table-column>
            <el-table-column   prop="num"  label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">授权</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<<script>
    export default{
        data(){
            return{
                tableData3:[]
            }
        }
    }
</script>