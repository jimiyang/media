<template>
    <div class="lab-mange">
         <a href="javascript:" class="blue-btn" @click="dialogVisible = true">创建新标签</a>
         <div class="warning">你在本平台的操作将自动同步至公众平台，但是在公众平台或其他微信第三方的操作不会自动同步，需进入粉丝列表手动点击同步才能保证数据与公众平台一致。</div>
         <el-table class="tab-list" :data="tableData"   style="width:100%;">
            <el-table-column   prop="labname"  label="标签名称" ></el-table-column>
            <el-table-column   prop="id"  label="标签ID"   ></el-table-column>
            <el-table-column   prop="count"  label="粉丝人数" sortable ></el-table-column>
            <el-table-column   prop="trriger"  label="触发行为"></el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
       <el-dialog   title="提示"   :visible.sync="dialogVisible"  width="30%"  :before-close="handleClose">
            <div class="content">标签名称：<input type="text" v-model="labName" class="ipttxt"/></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit" :plain="true">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>
<script>
    import cLab from '../../components/createLab.vue'
    export default{
        data(){
            return{
                dialogVisible: false,
                labName:'',
                tableData:[{labname:"星标组",id:"2",count:333,trriger:"未设定"}]
            }
        },
        components:{cLab},
        methods:{
            handleClick(id){
                this.$confirm('是否继续删除该标签?', '操作', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                })
            },
            createLab(){

            },
            submit(){
                if(this.labName==""){
                    this.$message({
                        message: '标签名称不能为空！',
                        type: 'warning'
                    });
                }else{
                    console.log(this.labName)
                    this.dialogVisible = false
                }
            },
            handleClose(done){
                done()     
            }
        }
    }
</script>