import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from 'firebase/auth'


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
    component: DashboardPage, meta: { requiresAuth: true }
  },
  {
    path: '/vehicle/:id',
    component: VehiclePage, meta: { requiresAuth: true }
  },
  { path: '/vehicles', 
    component: VehiclesPage, meta: { requiresAuth: true }
  },
  { path: '/services',
    component: ServicesPage, meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = getAuth()

  if (to.meta.requiresAuth && !auth.currentUser) {
    return '/'
  }
})

export default router