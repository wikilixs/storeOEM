import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/MainLayout.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue')
      },
      {
        path: 'productos',
        name: 'products',
        component: () => import('@/views/Products.vue')
      },
      {
        path: 'productos/:category',
        name: 'product-category',
        component: () => import('@/views/productos/[category]/ProductosCategoria.vue')
      },
      {
        path: 'productos/:category/:id',
        name: 'product-detail',
        component: () => import('@/views/productos/[category]/[id]/ProductoDetalle.vue')
      },
      {
        path: 'carrito',
        name: 'cart',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: 'tutoriales/windows',
        name: 'tutorial-windows',
        component: () => import('@/views/tutoriales/windows/TutorialWindows.vue')
      },
      {
        path: 'tutoriales/office',
        name: 'tutorial-office',
        component: () => import('@/views/tutoriales/office/TutorialOffice.vue')
      },
      {
        path: 'mis-compras',
        name: 'purchases',
        component: () => import('@/views/Purchases.vue'),
        meta: { requiresAuth: true }
      }
    ]
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/auth/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/auth/Register.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  // Rutas que requieren autenticación
  const authRequiredPaths = [
    '/mis-compras',
    '/checkout',
    '/perfil'
  ]
  
  // Verificar si la ruta actual requiere autenticación
  const authRequired = authRequiredPaths.some(path => to.path.startsWith(path))

  if (authRequired && !authStore.isAuthenticated) {
    return next({
      path: '/auth/login',
      query: { redirect: to.fullPath }
    })
  }

  next()
})

export default router
