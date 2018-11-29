<template>
    <div class="lab-mange">
         <a href="javascript:" class="blue-btn" @click="createLab">创建新标签</a>
         <div class="warning">你在本平台的操作将自动同步至公众平台，但是在公众平台或其他微信第三方的操作不会自动同步，需进入粉丝列表手动点击同步才能保证数据与公众平台一致。</div>
         <el-table class="tab-list" :data="tagData"   style="width:100%;">
            <el-table-column   prop="name"  label="标签名称" ></el-table-column>
            <el-table-column   prop="id"  label="标签ID"   ></el-table-column>
            <el-table-column   prop="fansCount"  label="粉丝人数" sortable ></el-table-column>
            <el-table-column   prop="wxTagId"  label="微信标签id"></el-table-column>
            <el-table-column  label="操作"  width="180">
                <template slot-scope="scope">
                    <el-button @click="editTag(scope.row)" type="text" size="small">编辑</el-button>
                    <el-button @click="delTag(scope.row.id)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-sizes="[5, 10, 20, 30, 40]"
                :page-size.sync="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
        <el-dialog   title="提示"   :visible.sync="dialogVisible"  width="40%"  :before-close="handleClose">
            <div class="content">标签名称：<input type="text" v-model="labName" class="ipttxt"/></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTag" :plain="true">确 定</el-button>
            </span>
        </el-dialog>
   </div>
</template>
<script>
    import cLab from '../../components/createLab.vue'
    import userapi from '../../api/userapi'
    export default {
        data() {  // inject:['reload'], //注入依赖 刷新当前页面
          return {
                userapi : userapi,
                dialogVisible: false,
                labName: '',
                tagId: '',
                type: 0,
                tagData: [],
                totalCount: 0,
                search: {
                    currentPage  : 1,
                    pageSize : 5
                },
                params:''
          }
        },
        components: {cLab},
        created(){
           console.log(JSON.parse(window.localStorage.getItem("appInfo")).appId)
           this.loadList()
        },
        methods:{
            loadList(){
                this.userapi.getList(this.search).then(rs => {
                    if(rs.returnCode == "F") {
                        this.$message({
                          type: 'error',
                          message: `${rs.returnMsg}`
                        })
                        if(rs.errorCode=="000005"){
                          this.$router.push({path:'/'})
                        }
                    }else{
                        this.totalCount = rs.data.totalNum
                        this.tagData = rs.data.items
                    }
                })
            },
            handleSizeChange(val) {
                this.search.pageSize = val
                this.loadList(this.search)
            },
            handleCurrentChange(val) {
                this.search.currentPage = val
                this.loadList(this.search)
            },
            createLab(){
                this.type = 0
                this.dialogVisible = true
                this.labName = ''
            },
            delTag(id){
                this.$confirm('是否继续删除该标签?', '操作', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.userapi.deleteTag({"id" : id}).then(rs => {
                        if(rs.returnCode == "F") {
                            this.$message({
                              type: 'error',
                              message: `${rs.returnMsg}`
                            })
                            if(rs.errorCode=="000005"){
                             this.$router.push({path:'/'})
                            }
                        }else{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                            this.loadList()
                        }
                    })
                })
            },
            addTag(){
                 if(this.type == 0){
                     this.userapi.addTag({"name":this.labName}).then(rs => {
                        if(rs.returnCode == "F") {
                            this.$message({
                              type: 'error',
                              message: `${rs.returnMsg}`
                            })
                            if(rs.errorCode=="000005"){
                              this.$router.push({path:'/'})
                            }
                        }else{
                            this.$message({
                                type: 'success',
                                message: `${rs.returnMsg}`
                            })
                            this.dialogVisible = false
                            this.loadList()
                        }
                    })
                 }else{
                   let params ={
                       "name": this.labName,
                       "id": this.tagId 
                   }
                   this.userapi.updateLab(params).then(rs => {
                        if(rs.returnCode == "F") {
                            this.$message({
                                type: 'error',
                                message: `${rs.returnMsg}`
                            })
                            if(rs.errorCode=="000005"){
                              this.$router.push({path:'/'})
                            }
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
            editTag(item){
                this.type = 1
                this.dialogVisible = true
                this.labName = item.name
                this.tagId = item.id
            },
            handleClose(done){
                done()     
            }
        }
    }
</script>