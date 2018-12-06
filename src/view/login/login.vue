<template>
	<div class="login-blocks">
		<div class="type">
			<a href="javascript:" :class = "{active:isactive === 0}" @click= "changeLogintype(0)">密码登录</a>
			<a href="javascript:" :class = "{active:isactive === 1}" @click= "changeLogintype(1)">扫码登录</a>
		</div>
		<ul class="user-info">
			<li>
				<div class="txt">
					<input type="text" class="ipt name-ico" v-model="userName"  placeholder="请输入用户名" />
				</div>
			</li>
			<li>
				<input type="password" class="ipt pwd-ico" v-model="passWord" placeholder="请输入密码"/>
			</li>
			<li class="btn-submit">
				<input type="button" class="blue-btn" :plain="true" value="登录" @click="submit"/>
			</li>
			<li class="find-pwd g-tr">
				<a href="">忘记密码?</a>
			</li>
			<li class="btn-reg">
				<!--<input type="button" value="注册" class="white-btn"/>-->
				<router-link to="reg" class="white-btn">注册</router-link>
			</li>
		</ul>
	</div>
</template>
<style lang="less" src="../../../static/less/login.less"></style>
<script>
	import loginapi from '../../api/loginapi.js'
	export default{
	  data () {
	    return {
	      loginapi: loginapi,
	      isactive: 0,
	      userName: 'TMMD',
	      passWord: '123@abc'
	    }
	  },
	  methods: {
	    changeLogintype (index) {
	      this.isactive = index
	    },
	    submit () {
	      let params = {
	        'userName': this.userName,
	        'passWord': this.passWord
	      }
	      this.loginapi.userLogin(params).then((rs) => {
	        if (rs.data.returnCode === 'F') {
	          this.$message({
	            message: `${rs.data.returnMsg}`,
	            center: true,
	            type: 'warning'
	          })
	          if (rs.errorCode === '000005') {
	            this.$router.push({path: '/'})
	          }
	        } else {
          sessionStorage.setItem('changeLogin', '100')
          sessionStorage.setItem('userName', this.userName)
          this.$router.push({path: '/Main'})
          sessionStorage.removeItem('appInfo')
	        }
	      })
	    }
	  },
	  watch: {
	    username (val) {
	      console.log(val)
	    }
	  }
	}
</script>
<style>
	body{background:#fff;}
</style>
