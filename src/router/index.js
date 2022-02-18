import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import(/* webpackChunkName: "about" */ '@/views/Admin.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/admin/body/UserManage.vue')
      },
      {
        path: 'userManage',
        component: () => import('@/components/admin/body/UserManage.vue')
      },
      {
        path: 'behaviorManage',
        component: () => import('@/components/admin/body/BehaviorManage.vue')
      },
      {
        path: 'fileManage',
        component: () => import('@/components/admin/body/FileManage.vue')
      },
      {
        path: 'noticeManage',
        component: () => import('@/components/admin/body/NoticeManage.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/User.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
