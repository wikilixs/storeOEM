import { useAuthStore } from '@/stores/auth'

export function authGuard(to, from, next) {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Save the intended destination
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    // Redirect authenticated users away from guest-only pages
    next('/')
  } else {
    next()
  }
}
