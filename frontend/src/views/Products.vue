<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Nuestros Productos
        </h1>
        <p class="mt-4 text-xl text-gray-500">
          Encuentra las mejores licencias originales al mejor precio
        </p>
      </div>

      <!-- Categorías -->
      <section class="mt-16">
        <h2 class="text-2xl font-bold text-purple-900 mb-8">Categorías</h2>
        <ProductCategories />
      </section>

      <!-- Productos Destacados -->
      <section class="mt-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-purple-900">Productos Destacados</h2>
        </div>
        <FeaturedProducts />
      </section>

      <!-- Todos los Productos -->
      <section class="mt-16">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-2xl font-bold text-purple-900">Todos los Productos</h2>
        </div>
        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
          <div
            v-for="product in allProducts"
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
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'
import ProductCategories from '@/components/ProductCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'

const productsStore = useProductsStore()
const cartStore = useCartStore()

const allProducts = computed(() => productsStore.products)

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script> 