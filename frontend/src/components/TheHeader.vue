<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const router = useRouter()
const authStore = useAuthStore()
const cartStore = useCartStore()
const isMenuOpen = ref(false)

const cartItemCount = computed(() => cartStore.totalItems)
const isAuthenticated = computed(() => authStore.isAuthenticated)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const handleLogout = async () => {
  await authStore.logout()
  router.push('/auth/login')
}
</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <!-- Logo y navegación principal -->
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-purple-600">
              TiendaOEM
          </router-link>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link
              to="/productos"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-purple-700"
            >
              Productos
            </router-link>
            <router-link
              to="/tutoriales/windows"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-purple-700"
            >
              Tutorial Windows
            </router-link>
            <router-link
              to="/tutoriales/office"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-purple-700"
            >
              Tutorial Office
            </router-link>
          </div>
        </div>

        <!-- Botones de acción -->
        <div class="flex items-center">
          <!-- Carrito -->
            <router-link
              to="/carrito"
            class="p-2 text-gray-400 hover:text-purple-600 relative"
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
              class="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-purple-600 rounded-full"
              >
                {{ cartItemCount }}
              </span>
            </router-link>

          <!-- Menú de usuario -->
          <div v-if="isAuthenticated" class="ml-3 relative">
                  <button
                    @click="handleLogout"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
                  >
              Cerrar sesión
            </button>
                </div>
          <div v-else class="ml-3 flex items-center space-x-3">
            <router-link
              to="/auth/login"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200"
            >
              Iniciar sesión
            </router-link>
            <router-link
              to="/auth/register"
              class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Registrarse
          </router-link>
          </div>

          <!-- Botón menú móvil -->
          <div class="flex items-center sm:hidden">
            <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span class="sr-only">Abrir menú</span>
              <svg
                v-if="!isMenuOpen"
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                v-else
                class="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Menú móvil -->
      <div
        v-show="isMenuOpen"
        class="sm:hidden"
      >
        <div class="pt-2 pb-3 space-y-1">
        <router-link
          to="/productos"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-purple-700 hover:bg-gray-50"
            @click="isMenuOpen = false"
        >
          Productos
        </router-link>
        <router-link
            to="/tutoriales/windows"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-purple-700 hover:bg-gray-50"
            @click="isMenuOpen = false"
        >
            Tutorial Windows
          </router-link>
          <router-link
            to="/tutoriales/office"
            class="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-purple-700 hover:bg-gray-50"
            @click="isMenuOpen = false"
          >
            Tutorial Office
        </router-link>
        </div>
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
