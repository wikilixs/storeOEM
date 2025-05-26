<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-8 text-purple-900">
      {{ route.params.category.charAt(0).toUpperCase() + route.params.category.slice(1) }}
    </h1>

    <div v-if="loading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900"></div>
    </div>

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <div 
        v-for="producto in productos" 
        :key="producto.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div class="p-4">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ producto.nombre }}</h3>
          <p class="text-sm text-gray-600 mb-4">{{ producto.descripcion }}</p>
          <div class="flex items-center justify-between">
            <span class="text-purple-900 font-bold">{{ producto.precio }} Bs.</span>
            <button
              @click="cartStore.addItem(producto)"
              class="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!loading && !error && productos.length === 0" class="text-center py-12">
      <p class="text-gray-600">No hay productos disponibles en esta categoría.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const cartStore = useCartStore()
const productos = ref([])
const loading = ref(true)
const error = ref(null)

const cargarProductos = async () => {
  try {
    loading.value = true
    const response = await fetch(`/api/productos/?tipo=${route.params.category}`)
    if (!response.ok) throw new Error('Error al cargar productos')
    const data = await response.json()
    productos.value = data
  } catch (err) {
    error.value = 'Error al cargar los productos. Por favor, intente más tarde.'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  cargarProductos()
})
</script>
