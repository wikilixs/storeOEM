<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="productsStore.loading" class="flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

      <div v-else-if="productsStore.error" class="text-center text-red-600">
        {{ productsStore.error }}
    </div>

      <div v-else-if="product" class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Imagen -->
        <div class="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
          <img
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-center object-cover"
          >
        </div>

        <!-- Información del producto -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ product.name }}</h1>
          
          <div class="mt-3">
            <h2 class="sr-only">Información del producto</h2>
            <p class="text-3xl text-gray-900">{{ product.price }} Bs.</p>
          </div>
          
          <div class="mt-6">
            <h3 class="sr-only">Descripción</h3>
            <div class="text-base text-gray-700 space-y-6">
              <p>{{ product.description }}</p>
            </div>
          </div>

          <div class="mt-10 flex sm:flex-col1">
                    <button
              type="button"
              @click="addToCart"
              class="max-w-xs flex-1 bg-purple-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500 sm:w-full"
                    >
              Añadir al carrito
                    </button>
          </div>

          <section class="mt-12">
            <h3 class="text-lg font-medium text-gray-900">Características</h3>
            <div class="mt-4">
              <ul class="pl-4 list-disc text-sm space-y-2">
                <li>Licencia 100% original y permanente</li>
                <li>Activación instantánea garantizada</li>
                <li>Soporte técnico incluido</li>
                <li>Actualizaciones de por vida</li>
                <li>Garantía de funcionamiento o devolución</li>
                    </ul>
            </div>
          </section>

          <section class="mt-12">
            <h3 class="text-lg font-medium text-gray-900">Instrucciones</h3>
            <div class="mt-4">
              <p class="text-sm text-gray-600">
                Después de completar tu compra, recibirás un correo electrónico con tu clave de producto y las instrucciones detalladas de activación.
                También puedes consultar nuestra guía paso a paso en la sección de tutoriales.
              </p>
            </div>
          </section>
            </div>
          </div>

      <div v-else class="text-center py-12">
        <h2 class="text-2xl font-medium text-gray-900">Producto no encontrado</h2>
        <p class="mt-2 text-gray-600">El producto que buscas no está disponible.</p>
        <div class="mt-6">
          <router-link
            :to="`/productos/${route.params.category}`"
            class="text-purple-600 hover:text-purple-500"
          >
            Volver a la categoría
          </router-link>
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

const product = computed(() => productsStore.getProductById(route.params.id))
const category = computed(() => productsStore.categories[route.params.category])

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}

onMounted(async () => {
  await productsStore.fetchProducts()
})
</script>
