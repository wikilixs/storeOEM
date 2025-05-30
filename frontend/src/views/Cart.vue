<template>
  <div class="py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 class="text-3xl font-extrabold text-gray-900">Carrito de Compras</h1>
    
      <div v-if="cartStore.loading" class="mt-8 flex justify-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>

      <div v-else-if="cartStore.error" class="mt-8 text-center text-red-600">
        {{ cartStore.error }}
      </div>

      <div v-else-if="items.length === 0" class="mt-8 text-center">
      <p class="text-gray-500">Tu carrito está vacío</p>
        <router-link
          to="/productos"
          class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700"
        >
          Ver productos
      </router-link>
    </div>
    
      <div v-else class="mt-8">
        <div class="flow-root">
          <ul class="-my-6 divide-y divide-gray-200">
            <li v-for="item in items" :key="item.id" class="py-6 flex">
              <div class="flex-1 flex items-center">
                <div class="flex-1">
                  <div class="flex justify-between text-base font-medium text-gray-900">
                    <h3>{{ item.name }}</h3>
                    <p class="ml-4">{{ item.price * item.quantity }} Bs.</p>
              </div>
                  <div class="mt-4 flex items-center">
                    <label for="quantity" class="sr-only">Cantidad</label>
                    <select
                  :value="item.quantity"
                      @change="updateQuantity(item.id, parseInt($event.target.value))"
                      class="max-w-full rounded-md border border-gray-300 py-1.5 text-base leading-5 font-medium text-gray-700 text-left shadow-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                    >
                      <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                    </select>

                <button 
                      type="button"
                      @click="removeItem(item.id)"
                      class="ml-4 text-sm font-medium text-purple-600 hover:text-purple-500"
                >
                      Eliminar
                </button>
              </div>
            </div>
          </div>
            </li>
          </ul>
      </div>
      
        <div class="mt-8">
          <div class="flex justify-between text-base font-medium text-gray-900">
            <p>Total</p>
            <p>{{ totalAmount }} Bs.</p>
          </div>
          <p class="mt-0.5 text-sm text-gray-500">Impuestos incluidos.</p>
          <div class="mt-6">
          <button 
              @click="checkout"
              :disabled="cartStore.loading"
              class="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
          >
              <span v-if="cartStore.loading">Procesando...</span>
              <span v-else>Finalizar Compra</span>
          </button>
          </div>
          <div class="mt-6 flex justify-center text-sm text-center text-gray-500">
            <p>
              o
              <router-link
                to="/productos"
                class="text-purple-600 font-medium hover:text-purple-500"
              >
                Continuar Comprando
                <span aria-hidden="true"> &rarr;</span>
              </router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

const items = computed(() => cartStore.items)
const totalAmount = computed(() => cartStore.totalAmount)

const updateQuantity = (productId, quantity) => {
  cartStore.updateQuantity(productId, quantity)
}

const removeItem = (productId) => {
  cartStore.removeFromCart(productId)
}

const checkout = async () => {
  try {
    await cartStore.checkout()
    router.push('/mis-compras')
  } catch (error) {
    console.error('Error en el checkout:', error)
}
}

onMounted(() => {
  cartStore.loadCart()
})
</script>
