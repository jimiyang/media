<template>
    <div class="fun-items">
        <div class="search-box">
            <div class="items">openId: <el-input v-model="search.openId" placeholder="请输入openid" style="width:200px;"></el-input></div>
            <div class="items">粉丝名称：<el-input v-model="search.nickName" placeholder="请输入粉丝名称" style="width:200px;"></el-input></div>
            <div class="items">微信标签：
                <el-select v-model="search.tagIdList" multiple  placeholder="微信标签">
                    <el-option  v-for="item in tagData" :key= "item.id" :label= "item.name" :value= "item.id"></el-option>
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
            <a href="javascript:" class="blue-btn" @click="searchUser">搜索</a>
            <a href="javascript:" class="white-btn" @click="reset">重置</a>
        </div>
        <div class="count">搜索到{{totalCount}}个粉丝</div>
        <div class="opeart-btn">
            <a href="javascript:" class="blue-btn" @click="updateUser">同步数据</a>
            <a href="javascript:" class="white-btn" @click="operation">批量操作</a>
        </div>
        <el-table class="tab-list" ref="multipleTable" :data="fansData"   @selection-change="checkEvent"  style="width:100%;" v-loading="loading">
            <el-table-column   type="selection" width="55"></el-table-column>
            <el-table-column   prop="nickName"  label="用户昵称" ></el-table-column>
            <el-table-column   prop="city"  label="地域" >
              <template slot-scope="scope">
                {{scope.row.country}}{{scope.row.province}}{{scope.row.city}}
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
        <el-dialog title="批量操作"  :visible.sync="dialogVisible"  width="40%"   :before-close="handleClose">
          <ul class="opeartiontag-box">
              <li>
                 <label class="name">目标粉丝：</label>
                 <div>
                   <template>
                     <el-radio v-model="radio" label="0">已勾选的粉丝{{checkedCount}}位</el-radio>
                     <el-radio v-model="radio" label="1">搜索到的粉丝{{totalCount}}位</el-radio>
                   </template>
                 </div>
              </li>
              <li>
                 <label  class="name">操作内容：</label>
                 <div>添加标签</div>
              </li>
              <li>
                 <label  class="name">设置内容：</label>
                 <div>
                   <el-select v-model="selectTag" clearable placeholder="请选择">
                    <el-option
                      v-for="item in tagData"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                 </div>
              </li>
          </ul>
          <span slot="footer" class="dialog-footer">
             <el-button @click="dialogVisible = false">取 消</el-button>
             <el-button type="primary"  @click="addTag">确 定</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>
import userapi from '../../api/userapi'
export default {
  data () {
    return {
      userapi: userapi,
      dialogVisible: false,
      loading: false,
      fansData: [],
      search: {
        openId: '',
        nickName: '',
        tagIdList: [],
        sex: -1,
        selectedOptions: [],
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      tagData: [],
      radio: '0',
      selectTag: '',
      checkedCount: 0,
      nocheckCount: 0,
      appidList: [], // 批量打标签传入的appid
      options: [
        {value: -1, label: '全部'},
        {value: 0, label: '未知'},
        {value: 1, label: '男'},
        {value: 2, label: '女'}
      ]
    }
  },
  created () {
    this.loadList()
    this.userapi.getList().then(rs => {
      this.tagData = rs.data.items
      console.log(this.tagData)
    })
  },
  methods: {
    loadList () {
      this.userapi.getFanslist(this.search).then(rs => {
        console.log(rs)
        if (rs.returnCode === 'F') {
          this.$message({
            type: 'error',
            message: `${rs.returnMsg}`
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
        } else {
          this.loading = false
          this.totalCount = rs.data.totalNum
          this.fansData = rs.data.items
        }
      })
    },
    searchUser () {
      this.loading = true
      this.loadList()
    },
    reset () {
      this.search = {
        openId: '',
        nickName: '',
        tagIdList: [],
        sex: -1
      }
    },
    checkEvent (node) {
      this.checkedCount = node.length
      this.nocheckCount = (this.totalCount - node.length)
      for (let i = 0; i < node.length; i++) {
        this.appidList.push(node[i].openId)
      }
    },
    addTag () {
      let params = {
        tagId: this.selectTag,
        openIdList: this.appidList,
        tagrgetFansFlag: this.radio
      }
      Object.assign(params, this.search)
      console.log(this.selectTag)
      console.log(params)
      this.userapi.batchAddtag(params).then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            type: 'error',
            message: `${rs.returnMsg}`
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
        } else {
          this.$message({
            type: 'success',
            message: `批量操作成功`
          })
          this.dialogVisible = false
          this.loadList()
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    updateUser () { // 同步粉丝数据
      this.loading = true
      this.userapi.refreshUserlist().then(rs => {
        if (rs.returnCode === 'F') {
          this.$message({
            type: 'error',
            message: `${rs.returnMsg}`
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
          this.loading = false
        } else {
          this.$message({
            type: 'success',
            message: `数据同步成功！`
          })
          this.loadList()
          this.loading = false
        }
      })
    },
    operation () {
      this.dialogVisible = true
    },
    handleSizeChange (val) {
      this.search.pageSize = val
      this.loading = true
      this.loadList()
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.loading = true
      this.loadList()
    },
    handleChange (value) {}
  }
}
</script>
