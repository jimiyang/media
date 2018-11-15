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
                        <router-link to="/message/allsend"><el-menu-item index="1-1">群发消息</el-menu-item></router-link>
                        <router-link to="/message/list"><el-menu-item index="1-2">消息记录</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                    <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                    <el-menu-item-group>
                       <router-link to="/user/funlist"> <el-menu-item index="2-1">粉丝列表</el-menu-item></router-link>
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
                        <router-link to="/account/setting"><el-menu-item index="4-2">个人设置</el-menu-item></router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="user-center" >
                 <div></div>
                 <div  class="right">
                    <a href="">切换帐号</a>
                    <el-badge :value="100" :max="10" class="item ">
                        <i class="el-icon-messag"></i>
                    </el-badge>
                    <div>
                        <img src="" />
                        <label>jimiyang</label>
                    </div>
                 </div>
            </el-header>
            <router-view></router-view>
        </el-container>
    </el-container>
</template>
<script>

    export default{
        data(){
            return{
                currentMenu: 'allsend',
                imgurl:'../../assets/0.jpg',
                name:'橘子社',
                funcount:1000,
            }
        }
    }
</script>