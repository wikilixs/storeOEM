<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <div
      v-for="product in products"
      :key="product.id"
      class="group flex flex-col bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div class="p-4 flex items-center border-b">
        <div class="w-10 h-10 flex-shrink-0 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
          <div class="text-purple-600">
            <svg
              v-if="product.category === 'windows'"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            <svg
              v-else-if="product.category === 'office'"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
        </div>
        <div class="flex-grow min-w-0">
          <h3 class="text-lg font-semibold text-purple-900 truncate">
            {{ product.name }}
          </h3>
          <p class="text-sm text-gray-600 truncate">
            {{ product.description }}
          </p>
        </div>
        <div class="flex-shrink-0 ml-4">
          <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
            {{ product.price }} Bs.
          </span>
        </div>
      </div>

      <div class="p-4 mt-auto flex items-center justify-between gap-4">
        <button
          @click.prevent="addToCart(product)"
          class="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm rounded bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          <svg
            class="w-4 h-4 mr-2"
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
          Añadir
        </button>
        <router-link
          :to="`/productos/${product.category}/${product.id}`"
          class="inline-flex items-center text-sm text-purple-600 hover:text-purple-700"
        >
          Ver detalles
          <svg
            class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const products = ref([
  {
    id: 1,
    name: 'Windows 11 Pro',
    description: 'Licencia original de por vida',
    price: 350,
    category: 'windows',
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Office 2021 Professional Plus',
    description: 'Suite completa de Office',
    price: 420,
    category: 'office',
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Tarjeta Steam $50',
    description: 'Tarjeta de regalo para Steam',
    price: 380,
    category: 'tarjetas',
    image: '/placeholder.svg'
  }
])

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
