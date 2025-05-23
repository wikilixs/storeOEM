<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'

const authStore = useAuthStore()
const cartStore = useCartStore()
</script>

<template>
  <header class="bg-white shadow">
    <nav class="w-full px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <div class="flex items-center">
          <router-link to="/" class="text-xl font-bold text-purple-900">
            OEM Store
          </router-link>
          <div class="hidden md:flex space-x-8 ml-10">
            <router-link to="/productos/windows" class="text-gray-600 hover:text-purple-900">
              Windows
            </router-link>
            <router-link to="/productos/office" class="text-gray-600 hover:text-purple-900">
              Office
            </router-link>
            <router-link to="/productos/tarjetas" class="text-gray-600 hover:text-purple-900">
              Tarjetas Regalo
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <router-link 
            v-if="authStore.isAuthenticated" 
            to="/carrito" 
            class="relative text-gray-600 hover:text-purple-900"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span v-if="cartStore.totalItems" class="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ cartStore.totalItems }}
            </span>
          </router-link>
          <template v-if="authStore.isAuthenticated">
            <router-link to="/perfil" class="text-gray-600 hover:text-purple-900">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
            <button @click="authStore.logout" class="text-gray-600 hover:text-purple-900">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </template>
          <router-link v-else to="/login" class="text-gray-600 hover:text-purple-900">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
          </router-link>
        </div>
      </div>
    </nav>
  </header>-
</template>
