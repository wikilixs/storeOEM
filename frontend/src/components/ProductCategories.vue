<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <router-link
      v-for="category in categories"
      :key="category.slug"
      :to="`/productos/${category.slug}`"
      class="group flex items-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200"
    >
      <div class="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-purple-50 rounded-lg mr-4">
        <div class="text-purple-600">
          <svg 
            v-if="category.slug === 'windows'"
            class="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
          </svg>
          <svg 
            v-else-if="category.slug === 'office'"
            class="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12h6m-6 4h6m-6-8h6M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z"/>
          </svg>
          <svg 
            v-else
            class="w-6 h-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"/>
          </svg>
        </div>
      </div>
      <div class="flex-grow min-w-0">
        <h3 class="text-lg font-semibold text-purple-900 truncate">{{ category.name }}</h3>
        <p class="text-sm text-gray-600 line-clamp-2">{{ category.description }}</p>
      </div>
      <div class="flex-shrink-0 ml-4">
        <svg class="w-5 h-5 text-purple-600 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
        </svg>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { useProductsStore } from '../stores/products'

const productsStore = useProductsStore()
const categories = Object.entries(productsStore.categories).map(([slug, data]) => ({
  ...data,
  slug,
  image: `/categories/${slug}.jpg`
}))
</script>
