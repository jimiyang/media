<template>
     <el-container class="sec">
        <el-aside width="200px">
            <div class="img-blocks"> <img :src="{imgurl}" /></div>
            <div class="wx-name">
                {{name}}<img src="../../assets/rz.png" />
            </div>
            <div class="fun-num">粉丝数{{funcount}}</div>
            <el-menu class="menu-blocks" :default-openeds="['1']" :default-active="currentMenu">
                <el-submenu index="1">
                    <template slot="title"><i class="el-icon-message"></i>消息管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="1-1"><router-link to="/message/allsend">群发消息</router-link></el-menu-item>
                        <el-menu-item index="1-2"><router-link to="/message/list">消息记录</router-link></el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                    <el-menu-item-group>
                        <el-menu-item index="2-1">粉丝列表</el-menu-item>
                        <el-menu-item index="2-2">标签管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title"><i class="el-icon-picture"></i>素材管理</template>
                    <el-menu-item-group>
                    <el-menu-item index="3-1">图文素材库</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                    <template slot="title"><i class="el-icon-setting"></i>帐号设置</template>
                    <el-menu-item-group>
                        <el-menu-item index="4-1">公众号列表</el-menu-item>
                        <el-menu-item index="4-2">个人设置</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <center></center>
        </el-container>
    </el-container>
</template>
<script>
    import center from  '@/center'
    export default{
        data(){
            return{
                currentMenu: 'allsend',
                imgurl:'../../assets/0.jpg',
                name:'橘子社',
                funcount:1000,
            }
        },
        components:{
            center
        }
    }
</script>