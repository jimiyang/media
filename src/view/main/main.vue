<template>
     <el-container class="sec">
        <el-aside width="200px">
            <div class="img-blocks"> <img :src="imgurl" />
            </div>
            <div class="wx-name">
                {{name}} <span>{{isAuth == 0 ? "未认证" : "已认证"}}</span>
            </div>
            <div class="fun-num">{{serviceTypeInfo==1 ? "订阅号" : "服务号"}}</div>
            <el-menu class="menu-blocks" :default-openeds="['1','2','3','4']" :default-active="currentMenu">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>消息管理</template>
                    <el-menu-item-group>
                        <router-link to="/message/allsend"><el-menu-item index="1-1">群发消息</el-menu-item></router-link>
                        <router-link to="/message/list"><el-menu-item index="1-2">消息记录</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                    <el-menu-item-group>
                       <router-link to="/user/fanlist"> <el-menu-item index="2-1">粉丝列表</el-menu-item></router-link>
                       <router-link to="/user/lablist"><el-menu-item index="2-2">标签管理</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-picture"></i>素材管理</template>
                    <el-menu-item-group>
                     <router-link to="/material/list"><el-menu-item index="3-1">图文素材库</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-setting"></i>帐号设置</template>
                    <el-menu-item-group>
                        <router-link to="/account/publist"><el-menu-item index="4-1">公众号列表</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="user-center" >
                 <div></div>
                 <div class="right">
                    <el-tooltip class="item" effect="dark"  placement="bottom">
                        <div slot="content">当前帐号：{{name}}</div>
                        <a href="javascript:" class="cur" @click="change">切换帐号</a>
                    </el-tooltip>
                    <div class="user-name">
                        <img :src="imgurl" />{{this.userName}}
                    </div>
                   <router-link to="/" class="exit" >退出帐号</router-link>
                 </div>
            </el-header>
            <div class="view-content"><router-view></router-view></div>
        </el-container>
        <accountArea :open.sync="isopen"></accountArea>
    </el-container>
</template>
<script>
    import accountArea from  './account'
    import bus from '../../until/eventbus.js'
    export default{
        data(){
            return{
                userName:JSON.parse(window.localStorage.getItem("appInfo")).userName,
                currentMenu: 'allsend',
                imgurl:JSON.parse(window.localStorage.getItem("appInfo")).headImg,
                name:JSON.parse(window.localStorage.getItem("appInfo")).nickName,
                isAuth :JSON.parse(window.localStorage.getItem("appInfo")).isAuth, //是否认证
                serviceTypeInfo :JSON.parse(window.localStorage.getItem("appInfo")).serviceTypeInfo, //1:订阅号2:服务号
                funcount:1000,
                isopen:false,
                visible2:''
            }
        },
        created(){
           bus.$on("ischange",obj => {
               this.name = obj.nickName
               this.userName = obj.userName
               this.imgurl = obj.headImg
               this.isAuth = obj.isAuth
               this.serviceTypeInfo = obj.serviceTypeInfo
           })
         },
        components:{accountArea},
        methods:{
            change(){
                this.isopen = true
            }
        }
    }
</script>