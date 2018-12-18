<template>
  <div class="create-blocks">
    <div class="page-nav">广告管理&nbsp;>&nbsp;创建模版消息广告&nbsp;>&nbsp;<router-link to='/advertising/list'>返回列表</router-link></div>
    <el-form ref="form" :model="form" :rules="rules">
      <ul>
        <li>
          <el-form-item label="广告主名称：" prop="advertiserName">
            <input type="text" class="ipttxt" maxlength="50" v-model="form.advertiserName"/>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="广告名称：" prop="advertName">
            <input type="text" class="ipttxt" maxlength="100" v-model="form.advertName"/>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="跳转链接：" prop="url">
            <input type="text" class="ipttxt" v-model="form.url"/>
          </el-form-item>
        </li>
        <li>
            <el-form-item label="模版ID：" prop="templateId">
                <el-select v-model="form.templateId" placeholder="请选择">
                  <el-option v-for="(item,i) in tempData" :key="i" :value="item.templateId" :label="item.title">{{item.title}}</el-option>
                </el-select>
            </el-form-item>
        </li>
        <li>
            <el-form-item label="广告描述：" prop="advertDesc">
              <textarea v-model="form.advertDesc"></textarea>
            </el-form-item>
        </li>
        <li>
            <el-form-item label="描述颜色：" prop="advertDescColor">
              <textarea v-model="form.advertDescColor"></textarea>
            </el-form-item>
        </li>
        <li>
            <el-form-item label="小程序appID：" prop="advertAppId">
              <input type="text" class="ipttxt" v-model="form.advertAppId"/>
            </el-form-item>
        </li>
        <li>
            <el-form-item label="小程序page：" prop="advertAppUrl">
              <input type="text" class="ipttxt" v-model="form.advertAppUrl"/>
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
        tempData: [],
        disabled: false,
        form: {
          advertiserName: '',
          advertName: '',
          url: '',
          templateId: '',
          advertDesc: '',
          advertDescColor: '',
          advertAppId: '',
          advertAppUrl: ''
        },
        rules: {
          advertiserName: [{ required: true, message: '请输入广告主名称', trigger: 'blur' }],
          advertName: [{ required: true, message: '请输入广告名称', trigger: 'blur' }],
          url: [
            { required: true, message: '请输入广告链接地址', trigger: 'blur' },
            { pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, message: '请输入正确的链接地址' }
          ]
        }
      }
    },
    created () {
      this.initTempList()
      this.initForm()
    },
    methods: {
      initTempList () {
        this.advertapi.tempAlllist().then(rs => {
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.tempData = rs.data
          }
        })
      },
      initForm () {
        if (!this.$route.query.id) {
          return false
        }
        this.advertapi.get({id: this.$route.query.id}).then(rs => {
          if (rs.returnCode === 'F') {
            this.$common.errorMsg(rs, this)
          } else {
            this.form = rs.data
          }
        })
      },
      submitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.query.id) {
              Object.assign(this.form, {id: this.$route.query.id})
              console.log(this.form)
              this.advertapi.templateMsgUpdate(this.form).then(rs => {
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
              this.advertapi.templateMsgAdd(this.form).then(rs => {
                if (rs.returnCode === 'F') {
                  this.$common.errorMsg(rs, this)
                } else {
                  this.$confirm('继续添加还是返回列表?', '模版创建成功', {
                    confirmButtonText: '继续',
                    cancelButtonText: '返回',
                    type: 'success'
                  }).then(() => {
                    this.$refs[formName].resetFields()
                  }).catch(() => {
                    this.$router.push({path: '/advertising/list'})
                  })
                }
              })
            }
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
