<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Nuestros Productos</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Windows -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Windows</h2>
          <ul class="space-y-4">
            <li v-for="product in windowsProducts" :key="product.id" class="flex justify-between items-center">
              <span class="text-gray-700">{{ product.name }}</span>
              <span class="text-purple-600 font-semibold">{{ product.price }} Bs.</span>
            </li>
          </ul>
          <router-link
            to="/productos/windows"
            class="mt-6 block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Ver todos
          </router-link>
        </div>
      </div>

      <!-- Office -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Office</h2>
          <ul class="space-y-4">
            <li v-for="product in officeProducts" :key="product.id" class="flex justify-between items-center">
              <span class="text-gray-700">{{ product.name }}</span>
              <span class="text-purple-600 font-semibold">{{ product.price }} Bs.</span>
            </li>
          </ul>
          <router-link
            to="/productos/office"
            class="mt-6 block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Ver todos
          </router-link>
        </div>
      </div>

      <!-- Tarjetas de Regalo -->
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Tarjetas de Regalo</h2>
          <ul class="space-y-4">
            <li v-for="product in giftCards" :key="product.id" class="flex justify-between items-center">
              <span class="text-gray-700">{{ product.name }}</span>
              <span class="text-purple-600 font-semibold">{{ product.price }} Bs.</span>
            </li>
          </ul>
          <router-link
            to="/productos/tarjetas"
            class="mt-6 block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            Ver todos
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const windowsProducts = ref([
  { id: 1, name: 'Windows 11 Pro', price: 299 },
  { id: 2, name: 'Windows 11 Home', price: 199 },
  { id: 3, name: 'Windows 10 Pro', price: 249 }
])

const officeProducts = ref([
  { id: 1, name: 'Office 365 Personal', price: 149 },
  { id: 2, name: 'Office Home & Student', price: 299 },
  { id: 3, name: 'Office Professional', price: 399 }
])

const giftCards = ref([
  { id: 1, name: 'Steam $20', price: 150 },
  { id: 2, name: 'PlayStation $50', price: 375 },
  { id: 3, name: 'Xbox Game Pass', price: 225 }
])
</script> 