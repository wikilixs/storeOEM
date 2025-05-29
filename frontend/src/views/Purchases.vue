<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Mis Compras</h1>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    </div>

    <div v-else-if="error" class="text-red-600 text-center py-8">
      {{ error }}
    </div>

    <div v-else-if="purchases.length === 0" class="text-center py-8">
      <p class="text-gray-500">No tienes compras realizadas</p>
      <router-link
        to="/productos"
        class="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700"
      >
        Ver productos disponibles
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 ml-1"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="purchase in purchases"
        :key="purchase.id"
        class="bg-white shadow rounded-lg overflow-hidden"
      >
        <div class="p-6">
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-medium text-gray-900">
                Compra #{{ purchase.id }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ new Date(purchase.fecha).toLocaleDateString('es-ES', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) }}
              </p>
            </div>
            <span class="text-xl font-bold text-purple-600">
              ${{ purchase.total }}
            </span>
          </div>

          <div class="border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Productos:</h4>
            <ul class="space-y-3">
              <li
                v-for="detalle in purchase.detalles"
                :key="detalle.id"
                class="flex justify-between text-sm"
              >
                <div>
                  <span class="font-medium text-gray-900">{{ detalle.clave.producto.nombre }}</span>
                  <span class="text-gray-500"> - {{ detalle.clave.producto.tipo }}</span>
                </div>
                <span class="text-gray-900">${{ detalle.precio_unitario }}</span>
              </li>
            </ul>
          </div>

          <div v-if="purchase.pago" class="mt-4 border-t border-gray-200 pt-4">
            <h4 class="text-sm font-medium text-gray-900 mb-2">Estado del pago:</h4>
            <span
              :class="{
                'px-2 py-1 text-xs font-medium rounded-full': true,
                'bg-yellow-100 text-yellow-800': purchase.pago.estado === 'pendiente',
                'bg-blue-100 text-blue-800': purchase.pago.estado === 'procesando',
                'bg-green-100 text-green-800': purchase.pago.estado.includes('completado'),
                'bg-red-100 text-red-800': purchase.pago.estado === 'fallido'
              }"
            >
              {{ purchase.pago.estado.charAt(0).toUpperCase() + purchase.pago.estado.slice(1) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const purchases = ref([])
const loading = ref(true)
const error = ref(null)

const fetchPurchases = async () => {
  try {
    const response = await fetch('/api/ventas/', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    
    if (!response.ok) throw new Error('Error al cargar las compras')
    
    purchases.value = await response.json()
  } catch (err) {
    error.value = 'Error al cargar el historial de compras. Por favor, intente más tarde.'
    console.error('Error:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPurchases()
})
</script> 