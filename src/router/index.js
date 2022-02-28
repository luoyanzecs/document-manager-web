import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/ZHomeView'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',

    component: () => import('@/views/ZAdminView.vue'),
    children: [
      {
        path: '',
        redirect: 'user'
      },
      {
        path: 'user',
        component: () => import('@/components/admin/body/ZUser.vue')
      },
      {
        path: 'behavior',
        component: () => import('@/components/admin/body/ZRecord.vue')
      },
      {
        path: 'file',
        component: () => import('@/components/admin/body/ZFile.vue')
      },
      {
        path: 'notice',
        component: () => import('@/components/admin/body/ZNotice.vue')
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('../views/ZUserView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
