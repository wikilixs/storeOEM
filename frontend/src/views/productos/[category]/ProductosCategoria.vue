<template>
  <div class="w-full px-4 py-8">
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Cargando productos...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
    </div>

    <template v-else>
      <div class="mb-8">
        <h1 class="text-3xl font-bold">{{ categoryData[category]?.title }}</h1>
        <p class="mt-2 text-gray-600">{{ categoryData[category]?.description }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in products"
          :key="product.id"
          class="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg"
        >
          <router-link :to="`/productos/${category}/${product.id}`">
            <div class="aspect-w-16 aspect-h-9">
              <img
                :src="product.image || '/placeholder.svg'"
                :alt="product.name"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="p-4">
              <h3 class="text-lg font-semibold text-purple-900">{{ product.name }}</h3>
              <p class="mt-2 text-sm text-gray-600">{{ product.description }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-lg font-bold text-purple-600">{{ product.price }} Bs.</span>
                <button 
                  @click.prevent="addToCart(product)"
                  class="rounded-md bg-purple-600 px-4 py-2 text-sm text-white hover:bg-purple-700"
                >
                  Añadir al carrito
                </button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const category = computed(() => route.params.category)
const products = ref([])
const loading = ref(true)
const error = ref(null)

const categoryData = {
  windows: {
    title: "Licencias Windows OEM",
    description: "Licencias originales para Windows 10 y Windows 11 a los mejores precios en Bolivia",
  },
  office: {
    title: "Licencias Microsoft Office",
    description: "Licencias originales para Microsoft Office a los mejores precios en Bolivia",
  },
  tarjetas: {
    title: "Tarjetas de Regalo",
    description: "Tarjetas de regalo para tus plataformas favoritas: Steam, Netflix, Spotify y más",
  },
}

const loadProducts = async () => {
  loading.value = true
  error.value = null
  
  try {
    const validCategories = ["windows", "office", "tarjetas"]
    if (!validCategories.includes(category.value)) {
      throw new Error("Categoría no válida")
    }
    
    await productsStore.fetchProductsByCategory(category.value)
    products.value = productsStore.getProductsByCategory(category.value)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  loadProducts()
})

watch(() => route.params.category, () => {
  loadProducts()
})
</script>
