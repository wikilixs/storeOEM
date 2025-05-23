<template>
  <div class="w-full px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Mis Pedidos</h1>
    
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Cargando pedidos...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
    </div>

    <div v-else-if="!orders.length" class="text-center py-8">
      <p class="text-gray-500">No tienes pedidos todavía</p>
      <router-link 
        to="/" 
        class="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700"
      >
        Explorar Productos
      </router-link>
    </div>

    <div v-else class="space-y-6">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div class="p-6 border-b">
          <div class="flex justify-between items-start">
            <div>
              <h3 class="text-lg font-semibold text-purple-900">
                Pedido #{{ order.id }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ new Date(order.created_at).toLocaleDateString() }}
              </p>
            </div>
            <span 
              :class="{
                'bg-green-100 text-green-800': order.status === 'completed',
                'bg-yellow-100 text-yellow-800': order.status === 'processing',
                'bg-blue-100 text-blue-800': order.status === 'pending'
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ statusText[order.status] }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="divide-y">
            <div 
              v-for="item in order.items" 
              :key="item.id"
              class="py-4 flex justify-between items-center"
            >
              <div class="flex items-center space-x-4">
                <img 
                  :src="item.product.image || '/placeholder.svg'" 
                  :alt="item.product.name"
                  class="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h4 class="font-medium">{{ item.product.name }}</h4>
                  <p class="text-sm text-gray-500">
                    Cantidad: {{ item.quantity }}
                  </p>
                </div>
              </div>
              <div class="text-right">
                <p class="font-semibold">{{ item.price * item.quantity }} Bs.</p>
                <p class="text-sm text-gray-500">{{ item.price }} Bs. c/u</p>
              </div>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t">
            <div class="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>{{ order.total }} Bs.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const loading = ref(true)
const error = ref(null)
const orders = ref([])

const statusText = {
  pending: 'Pendiente',
  processing: 'Procesando',
  completed: 'Completado'
}

onMounted(async () => {
  try {
    const response = await axios.get('/api/orders/')
    orders.value = response.data
  } catch (e) {
    error.value = e.response?.data?.message || 'Error al cargar los pedidos'
  } finally {
    loading.value = false
  }
})
</script>
