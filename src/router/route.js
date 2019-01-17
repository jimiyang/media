import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/view/login/login.vue'),
      hidden: true
    },
    {
      path: '/reg',
      component: () => import('@/view/login/reg.vue'),
      hidden: true
    },
    {
      path: '/404',
      component: () => import('@/view/404.vue'),
      hidden: true
    },
    {
      path: '/main',
      component: () => import('@/view/main/main.vue'),
      meta: {
        requireAuth: true // 判断是否需要登录
      },
      children: [
        {
          path: '/account',
          component: () => import('@/center.vue'),
          children: [
            {
              path: 'publist',
              component: () => import('@/view/account/publist.vue')
            }
          ]
        },
        {
          path: '/message',
          component: () => import('@/center.vue'),
          children: [
            {
              path: 'allsend',
              component: () => import('@/view/message/allsend.vue')
            },
            {
              path: 'list',
              component: () => import('@/view/message/list.vue')
            },
            {
              path: 'detail',
              component: () => import('@/view/message/detail.vue')
            }
          ]
        },
        {
          path: '/user',
          component: () => import('@/center.vue'),
          children: [
            {
              path: 'fanlist',
              component: () => import('@/view/user/fanlist.vue')
            },
            {
              path: 'lablist',
              component: () => import('@/view/user/lablist.vue')
            }
          ]
        },
        {
          path: '/material',
          component: () => import('@/center.vue'),
          children: [
            {
              path: 'list',
              component: () => import('@/view/material/list.vue')
            }
          ]
        },
        {
          path: '/advertising',
          component: () => import('@/center.vue'),
          children: [
            {
              path: 'list',
              component: () => import('@/view/advertising/list.vue')
            },
            {
              path: 'create',
              component: () => import('@/view/advertising/create.vue')
            },
            {
              path: 'createBanner',
              component: () => import('@/view/advertising/createBanner.vue')
            },
            {
              path: 'createMessagetemp',
              component: () => import('@/view/advertising/createMessagetemp.vue')
            },
            {
              path: 'putting',
              component: () => import('@/view/advertising/putting.vue')
            },
            {
              path: 'type',
              component: () => import('@/view/advertising/type.vue')
            },
            {
              path: 'advertspacelist',
              component: () => import('@/view/advertising/advertspacelist.vue')
            },
            {
              path: 'advertspaceputting',
              component: () => import('@/view/advertising/advertspaceputting.vue')
            },
            {
              path: 'createadvertspace',
              component: () => import('@/view/advertising/createadvertspace.vue')
            }
          ]
        }
      ]
    }
  ],
  hidden: true
})

