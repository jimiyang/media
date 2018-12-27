<template>
  <div class="banner-blocks create-blocks">
    <div class="page-nav">广告管理&nbsp;>&nbsp;创建banner广告&nbsp;>&nbsp;<router-link to='/advertising/list'>返回列表</router-link></div>
    <el-form ref="form" :model="form" :rules="rules">
      <ul>
        <li>
          <el-form-item label="广告主名称：" prop="advertiserName">
            <input type="text" class="ipttxt" placeholder="请输入广告主名称" v-model="form.advertiserName"/> 
          </el-form-item>
        </li>
        <li>
          <el-form-item label="广告名称：" prop="advertName">
            <input type="text" class="ipttxt" placeholder="请输入广告名称" v-model="form.advertName"/> 
          </el-form-item>
        </li>
        <li>
          <el-form-item label="广告图片：" prop="imageUrl">
            <div class="col-md-6" :class="{hide:isblock}">
              <input type="file" accept="image/jpg,image/jpeg,image/png"  ref="avatarInput" class="valid coverfile" @change="changeImage($event)"> 
              <div class="ant-upload ant-upload-select ant-upload-select-picture-card upload-v-img adImgUrl">
                <span class="rc-upload coverbutton" tabindex="0" role="button">
                    <i class="anticon anticon-plus">+</i>
                    <div class="ant-upload-text">上传广告图</div>
                </span>
              </div>
              <div class="ant-upload-list-item-info v-img-box ad_p_img" style="display: none;" src="">
                <img src="" class="v-img">
                <i class="icon-close anticon-delete voucherImgIcon" data-ref="v-img-file" style=" left: 44%; "></i>
              </div>
            </div>
            <div class="show-img" :class="{hide:ishide}">
              <div class="layer" :class="{hide:isshow}"><em class="el-icon-close" @click="deleteImg"></em></div>
              <img :src="avatar" alt="" name="avatar" @mousemove.stop="deleteEvent">
            </div>
            <p class="tipsInfo">图片尺寸为700*260px,建议保持Banner广告风格一致,支持JPG、JEPG、PNG格式且文件小于1M</p>
          </el-form-item>
        </li>
        <li>
          <el-form-item label="广告链接：" prop="url">
            <input type="text" class="ipttxt" placeholder="请输入广告链接" v-model="form.url"/> 
          </el-form-item>
        </li>
        <li>
          <el-form-item label="广告内容：" prop="content">
            <textarea v-model="form.content" placeholder="请输入广告内容"></textarea>
          </el-form-item>
        </li>
        <li>
				<el-form-item label="广告发送时间类型：" prop="adSendTimeType">
					<el-radio v-model="form.adSendTimeType" label="0">无限制</el-radio>
					<el-radio v-model="form.adSendTimeType" label="1">限制</el-radio>
				</el-form-item>
			</li>
			<li :class="{hide:form.adSendTimeType === '0'}">
				<el-form-item>
          <label class="el-form-item__label"><em class="red">*</em>发送时间：</label>
					<el-date-picker   type="datetime"  placeholder="开始时间" v-model="form.adSendStartTime"></el-date-picker>
					<el-date-picker   type="datetime"  placeholder="结束时间" v-model="form.adSendEndTime"></el-date-picker>
          <div class="el-form-item__error l150" :class="{hide:hidden === true}">请输入开始时间和结束时间</div>
				</el-form-item>
			</li>
			<li>
				<el-form-item label="每日发送次数：" prop="adSendNum">
					<input type="text" class="ipt" v-model="form.adSendNum"/>次
				</el-form-item>
			</li>
			<li>
				<el-form-item label="发送权重：" prop="adWeight">
					<input type="text" class="ipt" v-model="form.adWeight"/>
				</el-form-item>
			</li>
      </ul>
    </el-form>
    <div class="btn-blocks">
      <a href="javascript:" class="blue-btn" v-if="disabled === false"  @click="submitEvent('form')">保存</a>
      <a href="javascript:" class="blue-btn" v-else><img src="../../../static/images/loading.gif"/></a>
      <input type="button" class="white-btn" value="重置" @click="resetForm('form')"/>
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
        isshow: true,
        ishide: true,
        isblock: false,
        avatar: '',
        file: '',
        disabled: false,
        hidden: true,
        form: {
          type: this.$route.query.type,
          advertiserName: '',
          advertName: '',
          url: '',
          content: '',
          imageUrl: '',
          adSendTimeType: '0',
          adSendStartTime: '',
          adSendEndTime: '',
          adSendNum: 0,
          adWeight: 1
        },
        rules: {
          advertiserName: [
            { required: true, message: '请输入广告主名称', trigger: 'blur' }
          ],
          advertName: [
            { required: true, message: '请输入广告名称', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入广告链接地址', trigger: 'blur' },
            { pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/, message: '请输入正确的链接地址' }
          ],
          adSendNum: [
            { required: true, message: '请输入每日发送次数', trigger: 'blur' },
            { pattern: /^[0-9]\d*$/, message: '请输入整数' }
          ],
          adWeight: [
            { required: true, message: '请输入发送权重', trigger: 'blur' },
            { pattern: /^[1-9]\d*$/, message: '只能输入整数且大于0' }
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
          this.form.adSendTimeType = rs.data.adSendTimeType === null ? '0' : rs.data.adSendTimeType.toString()
          this.form.adSendNum = rs.data.adSendNum === null ? '0' : rs.data.adSendNum
          this.avatar = rs.data.imageUrl
          this.ishide = false
          this.isblock = true
        })
      },
      changeImage (ev) {
        let file = ev.target.files[0]
        if (file) {
          this.file = file
          let reader = new FileReader()
          let _this = this
          reader.readAsDataURL(file)
          reader.onload = function (e) {
            _this.avatar = this.result
            _this.ishide = false
            _this.isblock = true
            _this.height = ''
            let params = {
              imgData: _this.avatar,
              fileName: file.name
            }
            _this.advertapi.imageAdd(params).then(rs => {
              if (rs.returnCode === 'F') {
                _this.$common.errorMsg(rs, _this)
              } else {
                _this.form.imageUrl = rs.data
              }
            })
          }
        }
      },
      submitEvent (formName) {
        this.$refs[formName].validate((valid) => {
          let start = new Date(Date.parse(this.form.adSendStartTime))
          let end = new Date(Date.parse(this.form.adSendEndTime))
          if (this.form.adSendTimeType === '1') {
            if (this.form.adSendStartTime === '' || this.form.adSendEndTime === '') {
              this.hidden = false
              return false
            } else {
              this.hidden = true
            }
          }
          if (valid) {
            if (start > end) {
              this.$message({
                type: 'error',
                message: '结束时间不能小于开始时间！'
              })
              return false
            }
            this.disabled = true
            this.hidden = true
            if (this.$route.query.id) {
              Object.assign(this.form, {id: this.$route.query.id})
              this.advertapi.bannerUpdate(this.form).then(rs => {
                this.disabled = false
                if (rs.returnCode === 'F') {
                  this.$common.errorMsg(rs, this)
                } else {
                  this.$message({
                    type: 'success',
                    message: '修改成功'
                  })
                }
              })
            } else {
              this.advertapi.bannerAdd(this.form).then(rs => {
                this.disabled = false
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
                    this.$router.push({path: '/advertising/list'})
                  })
                }
              })
            }
          }
        })
      },
      resetForm (formName) {
        this.$nextTick(function () {
          this.$refs[formName].resetFields()
        })
        this.avatar = ''
        this.ishide = true
        this.isblock = false
        this.isshow = true
      },
      deleteEvent () {
        this.isshow = false
      },
      deleteImg () {
        this.avatar = ''
        this.isshow = true
        this.ishide = true
        this.isblock = false
      }
    }
  }
</script>

