<script setup>
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const handleCheckout = () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  // TODO: Implement checkout process
}

const cart = cartStore
const updateQuantity = cartStore.updateQuantity
const removeItem = cartStore.removeItem
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900">Carrito de Compra</h1>
    
    <div v-if="cart.items.length === 0" class="mt-8 text-center">
      <p class="text-gray-500">Tu carrito está vacío</p>
      <router-link to="/" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
        Continuar comprando
      </router-link>
    </div>

    <div v-else class="mt-8">
      <div class="flow-root">
        <ul role="list" class="-my-6 divide-y divide-gray-200">
          <li v-for="item in cart.items" :key="item.id" class="py-6 flex">
            <div class="flex-1 ml-4">
              <div class="flex justify-between">
                <div>
                  <h3 class="text-sm font-medium text-gray-900">
                    {{ item.name }}
                  </h3>
                  <p class="mt-1 text-sm text-gray-500">
                    {{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price) }}
                  </p>
                </div>
                <div class="flex items-center">
                  <button @click="updateQuantity(item.id, item.quantity - 1)" 
                          class="p-1 text-gray-400 hover:text-gray-500">
                    -
                  </button>
                  <input type="number" 
                         v-model="item.quantity" 
                         min="1"
                         class="mx-2 w-16 text-center border-gray-300 rounded-md"
                         @change="updateQuantity(item.id, parseInt($event.target.value))" />
                  <button @click="updateQuantity(item.id, item.quantity + 1)"
                          class="p-1 text-gray-400 hover:text-gray-500">
                    +
                  </button>
                </div>
                <div class="flex items-center">
                  <p class="text-sm font-medium text-gray-900">
                    {{ new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(item.price * item.quantity) }}
                  </p>
                  <button @click="removeItem(item.id)"
                          class="ml-4 text-sm font-medium text-red-600 hover:text-red-500">
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-8">
        <div class="border-t border-gray-200 py-6">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>{{ cart.formattedTotal }}</p>
          </div>
          <p class="mt-0.5 text-sm text-gray-500">Impuestos incluidos.</p>
          <div class="mt-6">
            <button @click="handleCheckout"
                    class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Finalizar compra
            </button>
          </div>
          <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              o
              <router-link to="/" class="text-indigo-600 font-medium hover:text-indigo-500">
                Continuar comprando
                <span aria-hidden="true"> &rarr;</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
