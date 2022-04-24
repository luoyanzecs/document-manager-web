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
