<template>
	<div class="login-blocks">
		<div class="type">
			<a href="javascript:" :class="{active:isactive==0}" @click="changeLogintype(0)">密码登录</a>
			<a href="javascript:" :class="{active:isactive==1}" @click="changeLogintype(1)">扫码登录</a>
		</div>
		<ul class="user-info">
			<li>
				<div class="txt">
					<input type="text" class="ipt name-ico" v-model="form.name"  placeholder="请输入用户名" />
				</div>
			</li>
			<li>
				<input type="password" class="ipt pwd-ico" v-model="form.pwd" placeholder="请输入密码"/>
			</li>
			<li class="btn-submit">
				<input type="button" class="blue-btn" value="登录" @click="submit"/>
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
	export default{
		data(){
			return{
				isactive:0,
				form:{}
			}
		},
		methods:{
			changeLogintype(index){
				this.isactive = index;
			},
			submit(){
				console.log(this.form)
				this.$router.push({"path":"Main"});
			}
		}
	}
</script>
<style>
	body{background:#f6f7f8;}
</style>