<template>
    <div class="fun-items">
        <div class="search-box">
            <div class="items">openId: <el-input v-model="search.openId" placeholder="请输入openid" style="width:200px;"></el-input></div>
            <div class="items">粉丝名称：<el-input v-model="search.nickName" placeholder="请输入粉丝名称" style="width:200px;"></el-input></div>
            <div class="items">微信标签：
                <el-select v-model="search.userTag" multiple placeholder="微信标签">
                    <el-option
                    v-for="item in tagData"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div class="items">性别：
                <el-select v-model="search.sex" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <!--<div class="items">
                粉丝地域：
                <el-cascader
                    :options="options"
                    v-model="search.selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>-->
        </div>
        <div class="ant-btn">
            <a href="javacript:" class="blue-btn" @click="searchUser">搜索</a>
            <a href="javacript:" class="white-btn" @click="reset">重置</a>
        </div>
        <div class="count">搜索到{{funcount}}个粉丝</div>
        <div class="opeart-btn">
            <a href="javacript:" class="blue-btn" @click="updateUser">同步数据</a>
            <a href="javacript:" class="white-btn" @click="operation">批量操作</a>
        </div>
        <el-table class="tab-list" ref="multipleTable" :data="fansData"   style="width:100%;">
            <el-table-column   type="selection" width="55"></el-table-column>
            <el-table-column   prop="nickName"  label="用户昵称" ></el-table-column>
            <el-table-column   prop="city"  label="地域" >
              <template slot-scope="scope"> 
                {{scope.row.country}}  {{scope.row.province}}  {{scope.row.city }}  
              </template>
            </el-table-column>
            <el-table-column   prop="subscribeScene"  label="关注来源"></el-table-column>
            <el-table-column   prop="subscribeTimeLengthStr"  label="关注时长"></el-table-column>
            <el-table-column   prop="interactiveCount"  label="互动数"></el-table-column>
            <el-table-column   prop="lastInteractDate"  label="上次互动时间"></el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="search.currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size.sync="search.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalCount">
            </el-pagination>
        </div>
    </div>
</template>
<script>
  import userapi from '../../api/userapi'
  export default {
    data() {
      return {
        userapi:userapi,
        funcount:1000,
        fansData: [],
        search:{
          openId:"",
          nickName:"",
          tagIdList:[],
          sex:0,
          selectedOptions: [],
          currentPage:1,
          pageSize:10
        },
        totalCount:0,
        tagData:[],
        data: [{
          value: '选项1',
          label: '黄金糕',
          key: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶',
          key: '黄金糕'
        }, {
          value: '选项3',
          label: '蚵仔煎',
          key: '黄金糕'
        }, {
          value: '选项4',
          label: '龙须面',
          key: '黄金糕'
        }, {
          value: '选项5',
          label: '北京烤鸭',
          key: '黄金糕'
        }],
        options: [
          {value: 0,label: '未知'},
          {value: 1,label: '男'},
          {value: 2,label: '女'}
        ]
      }
    },
    created(){
       this.loadList()
       this.userapi.getList().then(rs => {
         this.tagData = rs.data.items
       })
    },
    methods: {
      loadList(){
         this.userapi.getFanslist(this.search).then(rs => {
             if(rs.returnCode == "F"){
                this.$message({
                  type: 'error',
                  message: `${rs.returnMsg}`
                })
             }else{
                this.totalCount =  rs.data.totalNum
                this.fansData = rs.data.items
             }
         })
      },
      searchUser(){
        console.log(this.search)
        this.loadList()
      },
      reset(){

      },
      updateUser(){

      },
      operation(){

      },
      handleSizeChange(val){
          this.search.pageSize = val
          this.loadList()
      },
      handleCurrentChange(val){
           this.search.currentPage = val
           this.loadList()
      },
      handleChange(value) {
        
      }
    }
  };
</script>