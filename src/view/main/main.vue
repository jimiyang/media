<template>
     <el-container class="sec">
        <el-aside width="200px">
            <div class="img-blocks"> <img :src= "imgurl" />
            </div>
            <div class="wx-name">
                {{name}} <span>{{isAuth === 0 ? "未认证" : "已认证"}}</span>
            </div>
            <div class="fun-num">{{serviceTypeInfo === 1 ? "订阅号" : "服务号"}}</div>
            <el-menu class="menu-blocks" id="menu-blocks" :default-openeds="defaultData" :default-active="currentMenu" @open="openEvent">
                <el-submenu :index="''+(i + 1)" v-for="(item, i) in menuData" :key="i" :class="{rborder:curr === i}">
                    <template slot="title" ><i :class="item.ico"></i>{{item.name}}</template>
                    <el-menu-item-group>
                        <router-link :to="childData.url" v-for="(childData,index) in item.children" :key="index">
                            <el-menu-item :index="childData.id" :class="{isActive:current === childData.id}" @click="menuEvent(childData.id,i)">{{childData.name}}</el-menu-item>
                        </router-link>
                    </el-menu-item-group>
                </el-submenu>
            </el-menu>
        </el-aside>
        <el-container>
            <el-header class="user-center" >
                 <div class="right">
                    <el-tooltip class="item" effect="dark"  placement="bottom">
                        <div slot="content">当前帐号：{{name}}</div>
                        <a href="javascript:" class="cur" @click="change">切换帐号</a>
                    </el-tooltip>
                    <div class="user-name">
                        <img :src= "imgurl" />
                    </div>
                    <el-popover
                        placement="bottom"
                        width="160"
                        v-model="visible2">
                        <ul class="setting-center">
                            <li><i class="el-icon-edit-outline"></i><router-link to="/">退出</router-link></li>
                            <li><i class="el-icon-setting"></i><router-link to="/account/publist">切换公众号</router-link></li>
                        </ul>
                        <el-button slot="reference">{{this.userName}}</el-button>
                    </el-popover>
                 </div>
            </el-header>
            <div class="view-content"><router-view></router-view></div>
        </el-container>
       <accountArea :open.sync="isopen"></accountArea>
    </el-container>
</template>
<script>
import accountArea from './account'
import bus from '../../until/eventbus.js'
export default {
  data () {
    return {
      userName: '',
      currentMenu: '1',
      imgurl: '',
      name: '',
      isAuth: '', // 是否认证
      serviceTypeInfo: '', // 1:订阅号2:服务号
      funcount: 1000,
      isopen: true,
      visible2: false,
      menuData: this.$common.menuList(),
      current: '',
      curr: 0,
      defaultData: ['1']
    }
  },
  created () {
    bus.$on('ischange', obj => {
      console.log(obj)
      this.name = obj.nickName
      this.userName = obj.userName
      this.imgurl = obj.headImg
      this.isAuth = obj.isAuth
      this.serviceTypeInfo = obj.serviceTypeInfo
    })
    console.log(window.sessionStorage.getItem('appInfo'))
    if (window.sessionStorage.getItem('appInfo') != null) {
      let appInfo = JSON.parse(window.sessionStorage.getItem('appInfo'))
      this.userName = appInfo.userName
      this.imgurl = appInfo.headImg
      this.name = appInfo.nickName
      this.isAuth = appInfo.isAuth
      this.serviceTypeInfo = appInfo.serviceTypeInfo
    }
  },
  components: {accountArea},
  methods: {
    openEvent (index) {
      this.defaultData = ['' + index + '']
    },
    change () {
      this.isopen = true
    },
    menuEvent (id, index) {
      this.current = id
      this.curr = index
    }
  }
}
</script>
