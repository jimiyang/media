<template>
<div class="create-blocks">
  <div class="page-nav">广告管理&nbsp;>&nbsp;<router-link to='/advertising/list'>返回列表</router-link></div>
  <el-form ref="form" :model="form" :rules="rules">
    <ul>
      <li>
        <el-form-item label="广告支付类型：" prop="payType">
          <el-radio v-model="form.payType" label="0">微信</el-radio>
          <el-radio v-model="form.payType" label="1">支付宝</el-radio>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告主名称：" prop="advertiserName">
          <input type="text" class="ipttxt" v-model="form.advertiserName" placeholder="请输入广告主名称"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告标题：" prop="advertName">
           <input type="text" class="ipttxt" v-model="form.advertName" placeholder="请输入广告标题"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告链接地址：" prop="url">
           <input type="text" class="ipttxt" v-model="form.url" placeholder="请输入广告链接地址"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告内容：" prop="content">
           <textarea v-model="form.content" placeholder="请输入广告内容"></textarea>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="url广告子链接：" prop="subUrl">
           <input type="text" class="ipttxt" v-model="form.subUrl" placeholder="请输入广告子链接"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="js广告内容：" prop="jsContent">
           <textarea v-model="form.jsContent"></textarea>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="js广告子链接：" prop="jsSubUrl">
           <input type="text" class="ipttxt" v-model="form.jsSubUrl" placeholder="请输入js广告子链接"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="合作方式：" prop="copType">
          <el-radio v-model="form.copType" label="0">CPM</el-radio>
          <el-radio v-model="form.copType" label="1">CPC</el-radio>
          <el-radio v-model="form.copType" label="2">CPA</el-radio>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="合作价格（单价）：" prop="price">
          <input type="text" class="ipt" v-model="form.price" @keyup="matcthEvent"/>元
        </el-form-item>
      </li>
    </ul>
  </el-form>
  <div class="btn-blocks">
    <a href="javascript:" class="blue-btn" @click="submitForm('form')">保存</a>
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
        payType: '0',
        advertiserName: '',
        advertName: '',
        url: '',
        content: '',
        subUrl: '',
        jsContent: '',
        jsSubUrl: '',
        copType: '0',
        price: '',
        createTime: new Date().getTime()
      },
      rules: {
        advertiserName: [
          { required: true, message: '请输入广告活动主题', trigger: 'blur' }
        ],
        advertName: [
          { required: true, message: '请输入广告标题', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入广告链接地址', trigger: 'blur' },
          { pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, message: '请输入正确的链接地址' }
        ],
        price: [
          { required: true, message: '请输入合作价格', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1}[0-9]{1,2})?$/, message: '只能输入整数或小数（保留后两位）' }// /^[0-9]+([.]{1,2}[0-9]+){0,1}$/
        ]
      }
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
      this.advertapi.get({id: this.$route.query.id}).then(rs => {
        this.form = rs.data
        this.form.payType = rs.data.payType === null ? '0' : rs.data.payType.toString()
        this.form.copType = rs.data.copType === null ? '0' : rs.data.copType.toString()
      })
    },
    prevBack () {
      window.history.go(-1)
    },
    matcthEvent () {
      this.form.price = (this.form.price.match(/\d+(\.\d{0,2})?/))[0]
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$route.query.id) {
            Object.assign(this.form, {id: this.$route.query.id})
            this.advertapi.update(this.form).then(rs => {
              if (rs.returnCode === 'F') {
                this.$common.errorMsg(rs, this)
              } else {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                })
                this.$router.push({path: '/advertising/list'})
              }
            })
          } else {
            this.advertapi.add(this.form).then(rs => {
              if (rs.returnCode === 'F') {
                this.$common.errorMsg(rs, this)
              } else {
                this.$confirm('继续添加还是返回列表?', '广告创建成功', {
                  confirmButtonText: '继续',
                  cancelButtonText: '返回',
                  type: 'success'
                }).then(() => {
                  this.$refs[formName].resetFields()
                }).catch(() => {
                  this.prevBack()
                })
              }
            })
          }
        } else {
          this.$message({
            type: 'error',
            message: '创建失败，请输入正确的信息'
          })
          return false
        }
      })
    },
    resetForm (formName) {
      this.$nextTick(function () {
        this.$refs[formName].resetFields()
      })
    }
  }
}
</script>

