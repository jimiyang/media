import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login' 
import NotFound from '../view/404.vue'
import Center from '@/center'
import Main from '@/view/main/main'
import Allsend from '@/view/message/allsend' // 消息群发
import Msglist from '@/view/message/list' // 消息群发
import Fanlist from '@/view/user/fanlist' // 粉丝列表
import Lablist from '@/view/user/lablist' // 用户标签管理
import Mlist from '@/view/material/list' // 图文素材库
import Publist from '@/view/account/publist' // 公众号列表
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      name: '',
      component: NotFound,
      hidden: true
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
      meta: {
        requireAuth: true // 判断是否需要登录
      },
      children: [{
        name: '/message',
        path: '/message',
        redirect: '/message/allsend',
        component: Center,
        children: [
          {
            path: 'allsend',
            component: Allsend
          },
          {
            path: 'list',
            component: Msglist
          }
        ]
      },
      {
        name: '/user',
        path: '/user',
        redirect: '/user/fanlist',
        component: Center,
        children: [
          {
            path: 'fanlist',
            component: Fanlist
          },
          {
            path: 'lablist',
            component: Lablist
          }
        ]
      },
      {
        name: '/material',
        path: '/material',
        redirect: '/material/list',
        component: Center,
        children: [
          {
            path: 'list',
            component: Mlist
          }
        ]
      },
      {
        name: '/account',
        path: '/account',
        redirect: '/account/publist',
        component: Center,
        children: [
          {
            path: 'publist',
            component: Publist
          }
        ]
      }
      ]
    }
  ],
  hidden: true
})
