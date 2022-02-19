import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/ZHome'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import(/* webpackChunkName: "about" */ '@/views/ZAdmin.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/admin/body/UserManage.vue')
      },
      {
        path: 'user',
        component: () => import('@/components/admin/body/UserManage.vue')
      },
      {
        path: 'behavior',
        component: () => import('@/components/admin/body/BehaviorManage.vue')
      },
      {
        path: 'file',
        component: () => import('@/components/admin/body/FileManage.vue')
      },
      {
        path: 'notice',
        component: () => import('@/components/admin/body/NoticeManage.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/ZUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
