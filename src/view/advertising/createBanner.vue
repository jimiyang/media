<template>
  <div class="banner-blocks create-blocks">
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
            <div class="col-md-6">
              <input type="file" accept="image/jpg,image/jpeg,image/png"  ref="avatarInput" class="valid coverfile" @change="changeImage($event)"> 
              <div class="ant-upload ant-upload-select ant-upload-select-picture-card upload-v-img adImgUrl">
                <span class="rc-upload coverbutton" tabindex="0" role="button">
                    <i class="anticon anticon-plus" style="line-height: 2;">+</i>
                    <div class="ant-upload-text" style="line-height: 25px;">上传广告图</div>
                </span>
              </div>
              <div class="ant-upload-list-item-info v-img-box ad_p_img" style="display: none;" src="">
                <img src="" class="v-img ">
                <i class="icon-close anticon-delete voucherImgIcon" data-ref="v-img-file" style=" left: 44%; "></i>
              </div>
              <p class="tipsInfo">图片尺寸为700*260px,建议保持Banner广告风格一致,支持JPG、JEPG、PNG格式且文件小于1M</p>
            </div>
          </el-form-item>
        </li>
        <li>
            <div class="show-img" style="width:700px;height:260px;">
              <img :src="avatar?avatar:require('../../../static/images/404.png')" alt="" style="width:700px;height:260px;" name="avatar"  @mouseenter="enter">
              <div class="layer" :class="{show:isshow === false}"><em class="el-icon-close" @click="deleteImg"></em></div>
            </div>
        </li>
        <li>
          <el-form-item label="广告链接：" prop="url">
            <input type="text" class="ipttxt" placeholder="请输入广告链接" v-model="form.url"/> 
          </el-form-item>
        </li>
      </ul>
    </el-form>
    <div class="g-tc btn-blocks">
      <input type="button" class="blue-btn" value="保存banner图片" @click="submitEvent"/>
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
        avatar: '',
        file: '',
        form: {
          advertiserName: '',
          advertName: '',
          url: ''
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
          ]
        }
      }
    },
    methods: {
      changeImage (ev) {
        let file = ev.target.files[0]
        if (file) {
          this.file = file
          let reader = new FileReader()
          let _this = this
          reader.readAsDataURL(file)
          console.log(file)
          reader.onload = function (e) {
            // 这里的this 指向reader
            _this.avatar = this.result
            console.log(e)
            let params = {
              imgData: _this.avatar,
              fileName: file.name
            }
            _this.advertapi.imageAdd(params).then(rs => {
              console.log(rs)
            }).catch(error => {
              console.log(error)
            })
          }
        }
      },
      submitEvent () {
        let files = this.$refs.avatarInput.files
        let fileData = {}
        if (files instanceof Array) {
          fileData = files[0]
        } else {
          fileData = this.file
        }
        let data = new FormData()
        data.append('multfile', fileData)
        data.append('operaType', this.uploadType)
        // console.log(fileData)
        // console.log(JSON.stringify(this.avatar))
        let params = {
          advertiserName: '新banner',
          advertName: '新banner',
          url: 'http://www.baidu.com',
          imgUrl: this.avatar
        }
        console.log(params)
        this.advertapi.bannerAdd(params).then(rs => {
          console.log(rs)
        })
      },
      enter () {
        if (this.avatar !== '') {
          this.isshow = false
        }
      },
      deleteImg () {
        this.avatar = ''
        this.isshow = true
        console.log(this.isshow)
      }
    }
  }
</script>

