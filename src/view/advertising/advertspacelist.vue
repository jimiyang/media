<template>
  <div  class="list-blocks">
    <div class="search-box">
      <el-form ref="form" :model="form">
        <el-form-item label="广告类型：">
          <el-select v-model="form.type" placeholder="请选择">
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
      <input type="button" class="blue-btn cursor" value="创建广告" @click="creatEvent"/>
    </div>
    <el-table class="tab-list" :data="advertspaceData">
        <el-table-column  prop="type"  label="广告位类型"></el-table-column>
        <el-table-column  prop="channelCode"  label="广告位code"></el-table-column>
        <el-table-column  prop="advertName"  label="广告名称"></el-table-column>
        <el-table-column  prop="createTime"  label="创建时间"></el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <a href="javascript:" @click="modifyAdvert(scope.row)">编辑</a>
            <a href="javascript:">广告投放</a>
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
<script>
export default {
  data () {
    return {
      form: {
        type: '',
        startDate: '',
        endDate: '',
        currentPage: 1,
        pageSize: 5
      },
      advertspaceData: []
    }
  },
  created () {
    this.loadList()
  },
  methods: {
    loadList () {
      console.log('list')
    },
    searchEvent (formName) {
      console.log(formName)
    },
    resetForm (formName) {
      console.log(formName)
    },
    creatEvent () {
      this.$router.push({path: 'createadvertspace'})
    }
  }
}

</script>
