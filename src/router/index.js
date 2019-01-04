import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: '',
      component: resolve => require(['@/view/login/login'], resolve),
      hidden: true
    },
    {
      path: '/reg',
      component: resolve => require(['@/view/login/reg'], resolve),
      hidden: true
    },
    {
      path: '/404',
      component: resolve => require(['@/view/404'], resolve),
      hidden: true
    },
    {
      path: '/main',
      component: resolve => require(['@/view/main/main'], resolve),
      meta: {
        requireAuth: true // 判断是否需要登录
      },
      children: [
        {
          path: '/account',
          component: resolve => require(['@/center'], resolve),
          children: [
            {
              path: 'publist',
              component: resolve => require(['@/view/account/publist'], resolve)
            }
          ]
        },
        {
          path: '/message',
          component: resolve => require(['@/center'], resolve),
          children: [
            {
              path: 'allsend',
              component: resolve => require(['@/view/message/allsend'], resolve)
            },
            {
              path: 'list',
              component: resolve => require(['@/view/message/list'], resolve)
            },
            {
              path: 'detail',
              component: () => import('@/view/message/detail')
            }
          ]
        },
        {
          path: '/user',
          component: resolve => require(['@/center'], resolve),
          children: [
            {
              path: 'fanlist',
              component: resolve => require(['@/view/user/fanlist'], resolve)
            },
            {
              path: 'lablist',
              component: resolve => require(['@/view/user/lablist'], resolve)
            }
          ]
        },
        {
          path: '/material',
          component: resolve => require(['@/center'], resolve),
          children: [
            {
              path: 'list',
              component: resolve => require(['@/view/material/list'], resolve)
            }
          ]
        },
        {
          path: '/advertising',
          component: resolve => require(['@/center'], resolve),
          children: [
            {
              path: 'list',
              component: resolve => require(['@/view/advertising/list'], resolve)
            },
            {
              path: 'create',
              component: resolve => require(['@/view/advertising/create'], resolve)
            },
            {
              path: 'createBanner',
              component: resolve => require(['@/view/advertising/createBanner'], resolve)
            },
            {
              path: 'createMessagetemp',
              component: resolve => require(['@/view/advertising/createMessagetemp'], resolve)
            },
            {
              path: 'putting',
              component: resolve => require(['@/view/advertising/putting'], resolve)
            },
            {
              path: 'type',
              component: resolve => require(['@/view/advertising/type'], resolve)
            },
            {
              path: 'advertspacelist',
              component: resolve => require(['@/view/advertising/advertspacelist'], resolve)
            },
            {
              path: 'advertspaceputting',
              component: resolve => require(['@/view/advertising/advertspaceputting'], resolve)
            },
            {
              path: 'createadvertspace',
              component: resolve => require(['@/view/advertising/createadvertspace'], resolve)
            }
          ]
        }
      ]
    }
  ],
  hidden: true
})
