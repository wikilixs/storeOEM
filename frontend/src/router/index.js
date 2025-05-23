import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  },
  {
    path: '/',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/login',
    component: () => import('@/views/auth/Login.vue')
  },
  {
    path: '/productos/:category',
    component: () => import('@/views/productos/[category]/ProductosCategoria.vue')
  },
  {
    path: '/productos/:category/:id',
    component: () => import('@/views/productos/[category]/[id]/ProductoDetalle.vue')
  },
  {
    path: '/carrito',
    component: () => import('@/views/Cart.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/perfil',
    component: () => import('@/views/Profile.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/soporte',
    component: () => import('@/views/Soporte.vue')
  },
  {
    path: '/terminos',
    component: () => import('@/views/Terminos.vue')
  },
  {
    path: '/privacidad',
    component: () => import('@/views/Politica.vue')
  },
  {
    path: '/preguntas',
    component: () => import('@/views/Preguntas.vue')
  },
  {
    path: '/pedidos',
    component: () => import('@/views/Orders.vue'),
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  // Check authentication status on initial load
  if (!authStore.isAuthenticated) {
    await authStore.checkAuth()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
