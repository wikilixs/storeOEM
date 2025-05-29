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
        <h2 class="text-2xl font-bold text-purple-900 mb-8">Productos Destacados</h2>
        <FeaturedProducts />
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useProductsStore } from '@/stores/products'
import ProductCategories from '@/components/ProductCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script> 