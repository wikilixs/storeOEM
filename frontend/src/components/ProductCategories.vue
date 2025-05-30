<template>
  <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
    <div
      v-for="(category, key) in categories"
      :key="key"
      class="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div class="aspect-w-3 aspect-h-2 bg-gray-200 group-hover:opacity-75">
        <img
          :src="`/images/${key}-category.jpg`"
          :alt="category.name"
          class="w-full h-full object-center object-cover"
        >
      </div>
      <div class="flex-1 p-4 space-y-2 flex flex-col">
        <h3 class="text-lg font-medium text-gray-900">
          <router-link :to="`/productos/${key}`">
            <span aria-hidden="true" class="absolute inset-0"></span>
            {{ category.name }}
          </router-link>
        </h3>
        <p class="text-sm text-gray-500">{{ category.description }}</p>
        <div class="flex-1 flex items-end">
          <div class="flex-1">
            <router-link
              :to="`/productos/${key}`"
              class="relative inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700"
            >
              Ver productos
              <span class="ml-2" aria-hidden="true">&rarr;</span>
            </router-link>
          </div>
        </div>
      </div>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useProductsStore } from '@/stores/products'

const productsStore = useProductsStore()
const categories = computed(() => productsStore.categories)
</script>
