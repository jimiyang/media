<template>
  <div class="list-blocks">
    <div class="search-box">
      <el-form ref="form" :model="form">
        <el-form-item label="广告主：" prop="theme"><input type="text" class="ipttxt"/></el-form-item>
        <el-form-item label="开始时间：" prop="startDate"><input type="text" class="ipttxt"/></el-form-item>
        <el-form-item label="结束时间：" prop="endDate"><input type="text" class="ipttxt"/></el-form-item>
      </el-form>
      <div class="btn-blocks">
        <input type="button" class="blue-btn" value="搜索"/>
        <input type="button" class="white-btn" value="重置"/>
      </div>
    </div>
    <el-table class="tab-list">
        <el-table-column  prop="advertiserName"  label="广告主"></el-table-column>
        <el-table-column  prop="advertName"  label="广告活动名称"></el-table-column>
        <el-table-column  prop=""  label="广告活动预览">
          <template slot-scope="scope">
            图片
          </template>
        </el-table-column>
        <el-table-column  prop="url"  label="跳转地址"></el-table-column>
        <el-table-column  prop=""  label="创建时间"></el-table-column>
        <el-table-column  prop=""  label="操作">
          <template slot-scope="scope">
            <a href="javascript:">删除</a>
            <a href="javascript:">修改</a>
          </template>
        </el-table-column>
    </el-table>
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
        theme: '',
        date: '',
        currentPage: 1,
        pageSize: 5
      }
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      this.advertapi.get(this.form).then(rs => {
        console.log(rs)
      })
    }
  }
}
</script>

