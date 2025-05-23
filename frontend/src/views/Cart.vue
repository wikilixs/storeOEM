<template>
  <div class="w-full px-4 py-8">
    <h1 class="text-2xl font-bold mb-8">Carrito de Compras</h1>
    
    <div v-if="cartStore.isEmpty" class="text-center py-8">
      <p class="text-gray-500">Tu carrito está vacío</p>
      <router-link to="/" class="mt-4 inline-block bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700">
        Continuar Comprando
      </router-link>
    </div>
    
    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg shadow-md">
          <div v-for="item in cartStore.items" :key="item.id" class="p-6 border-b">
            <div class="flex items-center">
              <img :src="item.image || '/placeholder.svg'" :alt="item.name" class="w-20 h-20 object-cover rounded-md" />
              <div class="ml-4 flex-grow">
                <h3 class="font-semibold">{{ item.name }}</h3>
                <p class="text-sm text-gray-500">Licencia digital - Entrega inmediata</p>
                <div class="mt-1 text-purple-900 font-semibold">{{ item.price }} Bs.</div>
              </div>
              <div class="flex items-center gap-2">
                <button 
                  class="h-8 w-8 border rounded-md hover:bg-gray-100"
                  @click="cartStore.updateQuantity(item.id, item.quantity - 1)"
                >
                  -
                </button>
                <input
                  type="number"
                  :value="item.quantity"
                  min="1"
                  @input="e => cartStore.updateQuantity(item.id, parseInt(e.target.value) || 1)"
                  class="h-8 w-14 text-center border rounded-md"
                />
                <button 
                  class="h-8 w-8 border rounded-md hover:bg-gray-100"
                  @click="cartStore.updateQuantity(item.id, item.quantity + 1)"
                >
                  +
                </button>
                <button 
                  class="ml-4 text-red-600 hover:text-red-800"
                  @click="cartStore.removeFromCart(item.id)"
                >
                  <span class="sr-only">Eliminar</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h2 class="text-lg font-semibold mb-4">Resumen del Pedido</h2>
          <div class="space-y-2">
            <div class="flex justify-between">
              <span>Subtotal</span>
              <span>{{ cartStore.total }} Bs.</span>
            </div>
            <div class="border-t pt-2 mt-2">
              <div class="flex justify-between font-semibold">
                <span>Total</span>
                <span>{{ cartStore.total }} Bs.</span>
              </div>
            </div>
          </div>
          <button 
            class="w-full mt-6 bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700"
            @click="proceedToCheckout"
          >
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()

const proceedToCheckout = () => {
  // TODO: Implement checkout process
  console.log('Proceeding to checkout...')
}
</script>
