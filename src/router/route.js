import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/view/login/login'),
      hidden: true
    },
    {
      path: '/reg',
      component: () => import('@/view/login/reg'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/view/404'),
      hidden: true
    },
    {
      path: '/main',
      component: () => import('@/view/main/main'),
      meta: {
        requireAuth: true // 判断是否需要登录
      },
      children: [
        {
          path: '/account',
          component: () => import('@/center'),
          children: [
            {
              path: 'publist',
              component: () => import('@/view/account/publist')
            }
          ]
        },
        {
          path: '/message',
          component: () => import('@/center'),
          children: [
            {
              path: 'allsend',
              component: () => import('@/view/message/allsend')
            },
            {
              path: 'list',
              component: () => import('@/view/message/list')
            },
            {
              path: 'detail',
              component: () => import('@/view/message/detail')
            }
          ]
        },
        {
          path: '/user',
          component: () => import('@/center'),
          children: [
            {
              path: 'fanlist',
              component: () => import('@/view/user/fanlist')
            },
            {
              path: 'lablist',
              component: () => import('@/view/user/lablist')
            }
          ]
        },
        {
          path: '/material',
          component: () => import('@/center'),
          children: [
            {
              path: 'list',
              component: () => import('@/view/material/list')
            }
          ]
        },
        {
          path: '/advertising',
          component: () => import('@/center'),
          children: [
            {
              path: 'list',
              component: () => import('@/view/advertising/list')
            },
            {
              path: 'create',
              component: () => import('@/view/advertising/create')
            },
            {
              path: 'createBanner',
              component: () => import('@/view/advertising/createBanner')
            },
            {
              path: 'createMessagetemp',
              component: () => import('@/view/advertising/createMessagetemp')
            },
            {
              path: 'putting',
              component: () => import('@/view/advertising/putting')
            },
            {
              path: 'type',
              component: () => import('@/view/advertising/type')
            },
            {
              path: 'advertspacelist',
              component: () => import('@/view/advertising/advertspacelist')
            },
            {
              path: 'advertspaceputting',
              component: () => import('@/view/advertising/advertspaceputting')
            },
            {
              path: 'createadvertspace',
              component: () => import('@/view/advertising/createadvertspace')
            }
          ]
        }
      ]
    }
  ],
  hidden: true
})

