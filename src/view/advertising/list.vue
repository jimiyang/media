<template>
  <div class="list-blocks">
    <div class="search-box">
      <el-form ref="form" :model="form">
        <el-form-item label="广告主：" prop="theme"><input type="text" class="ipttxt" v-model="form.advertiserName" placeholder="搜索关键字"/></el-form-item>
        <el-form-item label="开始时间：" prop="startDate">
          <el-date-picker   type="date"  placeholder="开始时间" v-model="form.startDate"></el-date-picker>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate">
          <el-date-picker  type="date"  placeholder="结束时间" v-model="form.endDate"></el-date-picker>
        </el-form-item>
      </el-form>
      <div class="btn-blocks">
        <input type="button" class="blue-btn" value="搜索" @click="searchEvent('form')"/>
        <input type="button" class="white-btn" value="重置" @click="resetForm('form')"/>
      </div>
    </div>
    <div class="g-tr mb">
      <input type="button" class="blue-btn cursor" value="创建广告" @click="creatEvent"/>
    </div>
    <el-table class="tab-list" :data="advertData">
        <el-table-column  prop="advertiserName"  label="广告主"></el-table-column>
        <el-table-column  prop="advertName"  label="广告标题"></el-table-column>
        <el-table-column  prop="url"  label="广告url"></el-table-column>
        <el-table-column  prop="type"  label="广告类型">
          <template slot-scope="scope">
            {{scope.row.type === 0 ? ' 微信' : '支付宝'}}
          </template>
        </el-table-column>
        <el-table-column  prop="createTime"  label="创建时间"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <a href="javascript:" @click="deleteAdvert(scope.row)">删除</a>
            <a href="javascript:" @click="modifyAdvert(scope.row)">修改</a>
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
        advertiserName: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 10
      },
      advertData: [],
      totalCount: 0
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.advertapi.list(this.form).then(rs => {
        console.log(this.form)
        if (rs.returnCode === 'F') {
          this.$message({
            type: 'error',
            message: `${rs.returnMsg}`
          })
          if (rs.errorCode === '000005') {
            this.$router.push({path: '/'})
          }
        } else {
          this.advertData = rs.data.items
          this.totalCount = rs.data.totalNum
        }
      })
    },
    deleteAdvert (item) {
      this.advertapi.deleteAdvert({id: item.id}).then(rs => {
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
            message: '删除成功'
          })
          this.loadList()
        }
      })
    },
    modifyAdvert (item) {
      this.$router.push({path: '/advertising/create', query: {id: item.id}})
    },
    searchEvent () {
      this.loadList()
    },
    resetForm (formName) {
      this.$nextTick(function () {
        this.$refs[formName].resetFields()
      })
    },
    creatEvent () {
      this.$router.push({path: '/advertising/create'})
    },
    handleSizeChange (val) {
      this.form.pageSize = val
      this.loadList()
    },
    handleCurrentChange (val) {
      this.form.currentPage = val
      this.loadList()
    }
  }
}
</script>

