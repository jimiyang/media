<template>
  <div class="create-blocks">
  <div class="page-nav">广告位管理&nbsp;>&nbsp;创建广告位&nbsp;>&nbsp;<router-link to='/advertising/advertspacelist'>返回列表</router-link></div>
  <el-form ref="form" :model="form">
    <ul>
      <li>
        <el-form-item label="广告位类型：" prop="adType">
          <el-select v-model="form.adType" placeholder="请选择">
            <el-option value="0" label="H5广告">H5广告</el-option>
            <el-option value="1" label="banner广告">banner广告</el-option>
            <el-option value="2" label="模板消息广告">模板消息广告</el-option>
          </el-select>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告位code：" prop="channelCode">
          <input type="text" class="ipttxt" v-model="form.channelCode" placeholder="请输入广告位主名称"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告位名称：" prop="channelName">
           <input type="text" class="ipttxt" v-model="form.channelName" placeholder="请输入广告位标题"/>
        </el-form-item>
      </li>
    </ul>
  </el-form>
  <div class="btn-blocks">
    <a href="javascript:" class="blue-btn" v-if="disabled === false"  @click="submitForm('form')">保存</a>
    <a href="javascript:" class="blue-btn" v-else><img src="../../../static/images/loading.gif"/></a>
    <a href="javascript:" class="white-btn" @click="resetForm('form')">重置</a>
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
        channelCode: '',
        channelName: ''
      },
      disabled: false
    }
  },
  created () {
    this.initForm()
  },
  methods: {
    initForm () {
      if (!this.$route.query.id) {
        return false
      }
      this.advertapi.advertspaceGetDetail({id: this.$route.query.id}).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.form = rs.data
          this.form.adType = rs.data.adType.toString()
        }
      })
    },
    submitForm (formName) {
      if (!this.$route.query.id) {
        this.advertapi.advertspaceAdd(this.form).then(rs => {
          this.disabled = false
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.$message({
              type: 'success',
              message: '新增成功'
            })
            this.$router.push({path: '/advertising/advertspacelist'})
          }
        })
      } else {
        console.log(this.form)
        this.advertapi.advertspaceEdit(this.form).then(rs => {
          this.disabled = false
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.$message({
              type: 'success',
              message: '修改成功'
            })
            this.$router.push({path: '/advertising/advertspacelist'})
          }
        })
      }
    },
    resetForm (formName) {
      this.$nextTick(function () {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>

