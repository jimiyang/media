<template>
  <div  class="list-blocks">
    <div class="page-nav">广告位管理&nbsp;>&nbsp;广告位列表</div>
    <div class="search-box">
      <el-form ref="form" :model="form">
        <el-form-item label="广告位类型：">
          <el-select v-model="form.adType" placeholder="请选择">
            <el-option value="0" label="H5广告">H5广告</el-option>
            <el-option value="1" label="banner广告">banner广告</el-option>
            <el-option value="2" label="模板消息广告">模板消息广告</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker   type="date"  placeholder="开始时间" v-model="form.startDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker  type="date"  placeholder="结束时间" v-model="form.endDate"></el-date-picker>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-blocks">
      <input type="button" class="blue-btn" value="搜索" @click="searchEvent('form')"/>
      <input type="button" class="white-btn" value="重置" @click="resetForm('form')"/>
    </div>
    <div class="g-tr mb">
      <input type="button" class="blue-btn cursor" value="创建广告位" @click="creatEvent"/>
    </div>
    <el-table class="tab-list" :data="advertspaceData">
        <el-table-column  prop="adType"  label="广告位类型">
          <template slot-scope="scope">
            <label v-if="scope.row.adType == 0">H5广告</label>
            <label v-if="scope.row.adType == 1">banner广告</label>
            <label v-if="scope.row.adType == 2">模板消息广告</label>
          </template>
        </el-table-column>
        <el-table-column  prop="channelCode"  label="广告位code"></el-table-column>
        <el-table-column  prop="channelName"  label="广告位名称"></el-table-column>
        <el-table-column  prop="createTime"  label="创建时间"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <a href="javascript:" class="mr20" @click="modifyAdvert(scope.row)">编辑</a>
            <a href="javascript:" class="mr20" @click="puttingAdvert(scope.row)">广告投放</a>
          </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="form.currentPage"
            :page-sizes="[5,10, 20, 30, 40]"
            :page-size.sync="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalCount">
        </el-pagination>
    </div>
  </div>
</template>
<style lang="less" src="../../../static/less/advert.less"></style>
<script>
import advertapi from '../../api/advert.js'
export default {
  data () {
    return {
      advertapi: advertapi,
      form: {
        adType: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 10
      },
      advertspaceData: [],
      totalCount: 0
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      if (window.localStorage.getItem('searchObj') !== null) {
        this.form = JSON.parse(window.localStorage.getItem('searchObj'))
        console.log(window.localStorage.getItem('searchObj'))
      }
      this.advertapi.advertspaceGetlist(this.form).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.advertspaceData = rs.data.items
          this.totalCount = rs.data.totalNum
        }
      })
    },
    searchEvent (formName) {
      window.localStorage.setItem('searchObj', JSON.stringify(this.form))
      this.loadList()
    },
    resetForm (formName) {
      this.form = {
        adType: '',
        startDate: '',
        endDate: ''
      }
      localStorage.removeItem('searchObj')
      window.localStorage.setItem('searchObj', JSON.stringify(this.form))
      this.loadList()
    },
    handleSizeChange (pagesize) {
      this.form.pageSize = pagesize
      window.localStorage.setItem('searchObj', JSON.stringify(this.form))
      this.loadList()
    },
    handleCurrentChange (currentpage) {
      this.form.currentPage = currentpage
      console.log(this.form)
      window.localStorage.setItem('searchObj', JSON.stringify(this.form))
      this.loadList()
    },
    modifyAdvert (item) {
      this.$router.push({path: 'createadvertspace', query: {id: item.id}})
    },
    puttingAdvert (item) {
      console.log(item.id)
      this.$router.push({path: 'advertspaceputting', query: {id: item.id}})
    },
    creatEvent () {
      this.$router.push({path: 'createadvertspace'})
    }
  }
}

</script>
