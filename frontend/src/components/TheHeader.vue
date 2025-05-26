<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const isUserMenuOpen = ref(false)

const isLoggedIn = computed(() => authStore.isAuthenticated)
const cartItemCount = computed(() => cartStore.totalItems)

const userInitials = computed(() => {
  if (!authStore.user) return ''
  return `${authStore.user.first_name[0]}${authStore.user.last_name[0]}`.toUpperCase()
})

const toggleCart = () => {
  cartStore.toggleCart()
}

const handleLogout = async () => {
  await authStore.logout()
  isUserMenuOpen.value = false
  router.push('/auth/login')
}

onMounted(() => {
  cartStore.loadCart()
})
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
      <div class="w-full py-6 flex items-center justify-between border-b border-purple-500 lg:border-none">
        <div class="flex items-center">
          <router-link to="/">
            <span class="sr-only">OEM Store</span>
            <span class="text-2xl font-bold text-purple-600">OEM Store</span>
          </router-link>
          <div class="hidden ml-10 space-x-8 lg:block">
            <router-link
              to="/productos"
              class="text-base font-medium text-gray-700 hover:text-purple-600"
            >
              Productos
            </router-link>
            <router-link
              to="/soporte"
              class="text-base font-medium text-gray-700 hover:text-purple-600"
            >
              Soporte
            </router-link>
          </div>
        </div>
        <div class="ml-10 space-x-4 flex items-center">
          <template v-if="authStore.isAuthenticated">
            <router-link
              to="/carrito"
              class="relative inline-block text-gray-700 hover:text-purple-600"
            >
              <span class="sr-only">Carrito</span>
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span
                v-if="cartItemCount > 0"
                class="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full"
              >
                {{ cartItemCount }}
              </span>
            </router-link>
            <div class="relative ml-3">
              <button
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <span class="sr-only">Abrir menú de usuario</span>
                <div class="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  {{ userInitials }}
                </div>
              </button>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div
                  v-if="isUserMenuOpen"
                  class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5"
                  role="menu"
                >
                  <router-link
                    to="/perfil"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    @click="isUserMenuOpen = false"
                  >
                    Mi Perfil
                  </router-link>
                  <router-link
                    to="/pedidos"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                    @click="isUserMenuOpen = false"
                  >
                    Mis Pedidos
                  </router-link>
                  <button
                    @click="handleLogout"
                    class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </transition>
            </div>
          </template>
          <template v-else>
            <router-link
              to="/auth/login"
              class="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-purple-600 hover:bg-purple-50"
            >
              Iniciar Sesión
            </router-link>
            <router-link
              to="/auth/register"
              class="inline-block bg-purple-600 py-2 px-4 border border-transparent rounded-md text-base font-medium text-white hover:bg-purple-700"
            >
              Crear Cuenta
            </router-link>
          </template>
        </div>
      </div>
      <div class="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
        <router-link
          to="/productos"
          class="text-base font-medium text-gray-700 hover:text-purple-600"
        >
          Productos
        </router-link>
        <router-link
          to="/soporte"
          class="text-base font-medium text-gray-700 hover:text-purple-600"
        >
          Soporte
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.router-link-active {
  color: #8B5CF6;
  font-weight: 500;
}
</style>
