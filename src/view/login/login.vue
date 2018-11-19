<template>
	<div class="login-blocks">
		<div class="type">
			<a href="javascript:" :class="{active:isactive==0}" @click="changeLogintype(0)">密码登录</a>
			<a href="javascript:" :class="{active:isactive==1}" @click="changeLogintype(1)">扫码登录</a>
		</div>
		<ul class="user-info">
			<li>
				<div class="txt">
					<input type="text" class="ipt name-ico" v-model="username"  placeholder="请输入用户名" />
				</div>
			</li>
			<li>
				<input type="password" class="ipt pwd-ico" v-model="userpwd" placeholder="请输入密码"/>
			</li>
			<li class="btn-submit">
				<input type="button" class="blue-btn" :plain="true" value="登录" @click="submit"/>
			</li>
			<li class="find-pwd g-tr">
				<a href="">忘记密码?</a>
			</li>
			<li class="btn-reg">
				<input type="button" value="注册" class="white-btn"/>
			</li>
		</ul>
	</div>
</template>
<script>
	import loginapi from  '../../api/loginapi.js'
	export default{
		data(){
			return{
				isactive:0,
				username:'',
				userpwd:'',
				loginapi:loginapi
			}
		},
		methods:{
			changeLogintype(index){
				this.isactive = index;
			},
			submit(){
				if(this.username=="" || this.userpwd==""){
					this.$message({
						message: '请输入用户名或密码',
						center: true,
						type:'warning'
					});
				}else{
					//this.$router.push({"path":"/Main"});
					let params = {"userName":"51club","passWord":"123456abc"}	
					this.loginapi.userLogin(params).then((rs)=>{
						console.log(rs)
					})
				}
				//this.$router.replace('/Main')
				
			}
		},
		watch:{
			username(val){
				//console.log(val)
			}
		}
	}
</script>
<style>
	body{background:#f6f7f8;}
</style>