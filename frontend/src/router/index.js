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
  const publicPages = ['/', '/auth/login', '/auth/register', '/productos', '/tutoriales/windows', '/tutoriales/office']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !authStore.isAuthenticated) {
    return next('/auth/login')
  }

    next()
})

export default router
