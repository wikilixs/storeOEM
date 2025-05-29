<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="categoryInfo" class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          {{ categoryInfo.name }}
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          {{ categoryInfo.description }}
        </p>
      </div>

      <div v-if="productsStore.loading" class="mt-12 flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>

      <div v-else-if="productsStore.error" class="mt-12 text-center text-red-600">
        {{ productsStore.error }}
      </div>

      <div
        v-else
        class="mt-12 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <div class="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-t-lg overflow-hidden group-hover:opacity-75">
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-center object-cover"
            >
          </div>
          <div class="p-6">
            <h3 class="text-lg font-medium text-gray-900">
              <router-link :to="`/productos/${category}/${product.id}`">
                {{ product.name }}
              </router-link>
            </h3>
            <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
            <div class="mt-4 flex items-center justify-between">
              <p class="text-xl font-bold text-purple-600">{{ product.price }} Bs.</p>
              <button
                @click="addToCart(product)"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const category = computed(() => route.params.category)
const categoryInfo = computed(() => productsStore.categories[category.value])
const products = computed(() => productsStore.getProductsByCategory(category.value))

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>
