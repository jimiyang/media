import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login/login' 
import Center from  '@/center'
import Main from  '@/view/main/main'
import Allsend from '@/view/message/allsend' //消息群发
import Msglist from '@/view/message/list' //消息群发
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    /*{
      path: '/',
      name: 'Login',
      component: Login
    },*/
    {
      path:'/',
      name:'Main',
      component:Main,
    },
    {
      path:'/',
      name:'Center',
      component:Center,
      children:[ 
        {
          name: 'message',
          path: 'message',
          component: Main,
          children:[
              {
                path:'allsend',
                component:Allsend
              },
              {
                path:'list',
                component:Msglist
              }
          ]
        }
     ]
    },
  ],
  hidden: true
})
