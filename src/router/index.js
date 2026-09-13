import { createRouter, createWebHistory } from 'vue-router'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import DashboardPage from '../pages/DashboardPage.vue'
import ServicesPage from '../pages/ServicesPage.vue'
import VehiclePage from '../pages/VehiclePage.vue'
import VehiclesPage from '../pages/VehiclesPage.vue'

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
    path: '/vehicle/:id',
    component: VehiclePage
  },
  { path: '/vehicles', 
    component: VehiclesPage 
  },
  { path: '/services',
    component: ServicesPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router