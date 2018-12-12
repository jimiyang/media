<template>
  <div class="reg-box">
       <div class="step-box">
         <span class="active"><em>1</em><label>注册账号</label></span>
         <span :class="{active: active === 2}"><em>2</em><label>授权公众号</label></span>
         <span class="lst" :class="{active: active === 3}"><em>3</em><label>开始使用</label></span>
       </div>
       <div class="step-blocks">
          <div class="reg-info" :class="{hide: active !== 1}">
            <ul>
              <li class="first"><input type="text" v-model="phoneNum" placeholder="请输入手机号" class="ipt"/></li>
              <li><input type="password" v-model="pwd" placeholder="请输入6位及以上的密码" class="ipt"/></li>
              <li><input type="password" v-model="confirmPwd" placeholder="再次输入确认密码" class="ipt"/></li>
            </ul>
            <input type="button" class="blue-btn"  value="创建账号" @click="creatAccount"/>
            <div class="go-login">
                已有账号？<router-link to="/">点此登录</router-link>
            </div>
          </div>
       </div>
       <iframe :src="sucessAuthRedirectUrl" width="1200" height="800" frameborder="0" scrolling="no" class="iframe" :class="{hide:active !== 2}"></iframe>
  </div>
</template>
<style lang="less" src="../../../static/less/login.less"></style>
<script>
import loginapi from '../../api/loginapi'
export default{
  data () {
    return {
      loginapi: loginapi,
      active: 1,
      phoneNum: '',
      pwd: '',
      confirmPwd: '',
      sucessAuthRedirectUrl: ''
    }
  },
  created () {
    this.active = 1
  },
  methods: {
    creatAccount () {
      if (this.$common.regeXp(this.phoneNum).phone === false) {
        this.$message({
          message: `请输入正确的手机格式`,
          center: true,
          type: 'error'
        })
        return false
      }
      if (this.pwd !== this.confirmPwd) {
        this.$message({
          message: `两次密码输入不一致，请重新输入！`,
          center: true,
          type: 'error'
        })
        return false
      }
      let params = {
        phone: this.phoneNum,
        password: this.pwd
      }
      this.loginapi.userRegister(params).then(rs => {
        if (rs.returnCode === 'F') {
          this.$common.errorMsg(rs, this)
        } else {
          this.active = 2
          let sucessAuthRedirectUri = encodeURIComponent('/main')
          this.sucessAuthRedirectUrl = `/wechat/*/authPage?sucessAuthRedirectUri=${sucessAuthRedirectUri}`
        }
      })
    }
  }
}
</script>
