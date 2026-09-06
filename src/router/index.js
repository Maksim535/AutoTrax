import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import VehiclePage from '../pages/VehiclePage.vue'

const routes = [
  {
    path: '/',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/dashboard',
    component: DashboardPage
  },
  {
    path: '/vehicle',
    component: VehiclePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router