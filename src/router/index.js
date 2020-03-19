import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'
export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true }
      }
    ]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/bill',
    component: Layout,
    redirect: '/bill/index',
    meta: { title: '账单查询', icon: 'pdf' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/bill/index'),
        name: 'bill',
        meta: { title: '账单查询' }
      },
      {
        path: 'toview/:id',
        component: () => import('@/views/bill/view/toview'),
        name: 'toview',
        meta: { title: '查看账单' },
        hidden: true
      }
    ]
  },
  {
    path: '/charge',
    component: Layout,
    redirect: '/charge/index',
    meta: { title: '常用收费', icon: 'pdf' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/charge/index'),
        name: 'charge',
        meta: { title: '常用收费' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    redirect: '/record/index',
    meta: { title: '收费记录', icon: 'pdf' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/record/index'),
        name: 'record',
        meta: { title: '收费记录' }
      },

      {
        path: 'index/:type',
        component: () => import('@/views/record/index'),
        name: 'record',
        hidden: true,
        meta: { title: '收费记录' }
      },
       {
        path: 'toview/:id',
        component: () => import('@/views/record/view/toview'),
        name: 'toview',
        meta: { title: '查看账单' },
        hidden: true
      }
    ]
  },
  {
    path: '/temporary',
    component: Layout,
    redirect: '/temporary/index',
    meta: { title: '临时缴费', icon: 'pdf' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/temporary/index'),
        name: 'temporary',
        meta: { title: '临时缴费' }
      }
    ]
  },
  // {
  //   path: '/advance',
  //   component: Layout,
  //   redirect: '/advance/index',
  //   meta: { title: '预缴费', icon: 'pdf' },
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/advance/index'),
  //       name: 'advance',
  //       meta: { title: '预缴费' }
  //     }
  //   ]
  // },
  {
    path: '/pdf/download',
    component: () => import('@/views/pdf/download'),
    hidden: true
  },
  { path: '*', redirect: '/404', hidden: true }
]
