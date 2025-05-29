<template>
  <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
    <div
      v-for="product in featuredProducts"
      :key="product.id"
      class="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div class="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75">
        <img
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-center object-cover"
        >
      </div>
      <div class="flex-1 p-4 space-y-2 flex flex-col">
        <h3 class="text-lg font-medium text-gray-900">
          <router-link :to="`/productos/${product.category}/${product.id}`">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ product.name }}
          </router-link>
        </h3>
        <p class="text-sm text-gray-500">{{ product.description }}</p>
        <div class="flex-1 flex items-end">
          <div class="flex-1 flex justify-between items-center">
            <p class="text-lg font-medium text-purple-600">{{ product.price }} Bs.</p>
            <button
              @click.prevent="addToCart(product)"
              class="relative z-10 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
            >
              Añadir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const featuredProducts = computed(() => productsStore.getFeaturedProducts)

const addToCart = (product) => {
  cartStore.addToCart(product)
}
</script>
