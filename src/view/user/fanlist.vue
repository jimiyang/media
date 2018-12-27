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
            <div class="items">
                粉丝地域：
                <el-cascader
                    :options="areaData"
                    v-model="selectedOptions"
                    @change="handleChange">
                </el-cascader>
            </div>
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
            <el-table-column   prop="nickName"  label="用户昵称" >
              <template slot-scope="scope">
                <img :src="scope.row.headImgUrl" class="headimg-ico"/>
                {{scope.row.nickName}}
                <span v-if="scope.row.sex === 1" class="sex-ico">
                    <img src="../../../static/images/boy.png" />
                </span>
                 <span v-if="scope.row.sex === 2" class="sex-ico">
                    <img src="../../../static/images/girl.png"/>
                </span>
              </template>
            </el-table-column>
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
      <getPercent :show.sync = "isshow" :percentageNum.sync="percentage"></getPercent><!--进度条-->
    </div>
</template>
<style lang="less" src="../../../static/less/user.less"></style>
<script>
import userapi from '../../api/userapi'
import getPercent from '../../components/getPercent'
import areaData from '../../until/area.js'
export default {
  data () {
    return {
      userapi: userapi,
      dialogVisible: false,
      loading: false,
      fansData: [],
      selectedOptions: [],
      search: {
        openId: '',
        nickName: '',
        tagIdList: [],
        sex: -1,
        country: null,
        province: null,
        city: null,
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
      userData: [],
      options: [
        {value: -1, label: '全部'},
        {value: 0, label: '未知'},
        {value: 1, label: '男'},
        {value: 2, label: '女'}
      ],
      percentage: 0,
      isshow: false,
      areaData: areaData.node
    }
  },
  components: { getPercent },
  created () {
    this.loadList()
    this.userapi.getList().then(rs => {
      this.tagData = rs.data.items
    })
  },
  methods: {
    loadList () {
      this.userapi.getFanslist(this.search).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.loading = false
          this.totalCount = rs.data.totalNum
          this.fansData = rs.data.items
        }
      })
    },
    searchUser () {
      if (this.selectedOptions.length > 0) {
        this.search.country = this.selectedOptions[0] === undefined ? null : this.selectedOptions[0]
        this.search.province = this.selectedOptions[1] === undefined ? null : this.selectedOptions[1]
        this.search.city = this.selectedOptions[2] === undefined ? null : this.selectedOptions[2]
      }
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
      this.selectedOptions = []
    },
    checkEvent (node) {
      this.checkedCount = node.length
      this.userData = node
    },
    getPercent (type) { // 得出百分比
      this.userapi.getPercent(type).then(rs => {
        if (rs.returnCode === 'S') {
          if (this.percentage <= 99) {
            this.getPercent(type)
            this.percentage = rs.data.sysUserPercent
          } else {
            setTimeout(() => {
              this.isshow = false
            }, 500)
            this.$message({
              type: 'success',
              message: '操作成功！'
            })
            this.loadList()
          }
        }
      })
    },
    addTag () {
      this.appidList = []
      for (let i = 0; i < this.userData.length; i++) {
        this.appidList.push(this.userData[i].openId)
      }
      let params = {
        tagId: this.selectTag,
        openIdList: this.appidList,
        tagrgetFansFlag: this.radio
      }
      Object.assign(params, this.search)
      this.userapi.batchAddtag(params).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.dialogVisible = false
          this.isshow = true
          this.percentage = 0
          this.getPercent('tags')
        }
      })
    },
    handleClose () {
      this.dialogVisible = false
    },
    updateUser () {
      this.isshow = true
      this.percentage = 0
      this.userapi.refreshUserlist().then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
          this.loading = false
        } else {
          this.getPercent('fans')
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
