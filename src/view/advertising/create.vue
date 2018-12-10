<template>
<div class="create-blocks">
  <el-form ref="form" :model="form" :rules="rules">
    <ul>
      <li>
        <el-form-item label="广告类型：" prop="type">
          <el-radio v-model="form.type" label="0">微信</el-radio>
          <el-radio v-model="form.type" label="1">支付宝</el-radio>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告主名称：" prop="advertiserName">
          <input type="text" class="ipttxt" v-model="form.advertiserName" placeholder="请输入广告主名称"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告活动名称：" prop="advertName">
           <input type="text" class="ipttxt" v-model="form.advertName" placeholder="请输入广告活动名称"/>
        </el-form-item>
      </li>
      <li>
        <el-form-item label="广告链接地址：" prop="url">
           <input type="text" class="ipttxt" v-model="form.url" placeholder="www.abc.com/http://www.abc.com/http://sub.abc.com/abc.com/a/b.html"/>
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
          <input type="text" class="ipt" v-model="form.price"/>元
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
        type: '0',
        advertiserName: '',
        advertName: '',
        url: '',
        subUrl: '',
        jsContent: '',
        jsSubUrl: '',
        copType: '0',
        price: ''
      },
      rules: {
        advertiserName: [
          { required: true, message: '请输入广告活动主题', trigger: 'blur' }
        ],
        advertName: [
          { required: true, message: '请输入广告活动名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入广告链接地址', trigger: 'blur' },
          { pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, message: '请输入正确的链接地址' }
        ],
        price: [
          { required: true, message: '请输入合作价格', trigger: 'blur' },
          { pattern: /^[0-9]+([.]{1,2}[0-9]+){0,1}$/, message: '只能输入整数或小数' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // Object.assign(this.form, {appId: JSON.parse(window.sessionStorage.getItem('appInfo')).appId})
          // console.log(this.form)
          this.advertapi.add(this.form).then(rs => {
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
                message: '创建成功'
              })
            }
          })
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

