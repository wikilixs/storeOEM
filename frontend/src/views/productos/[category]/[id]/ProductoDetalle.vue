<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-900 mx-auto"></div>
      <p class="mt-4 text-gray-600">Cargando producto...</p>
    </div>

    <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg">
      {{ error }}
    </div>

    <template v-else>
      <nav class="mb-8 flex" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 text-sm text-gray-600">
          <li>
            <router-link to="/" class="hover:text-purple-600">Inicio</router-link>
          </li>
          <li>
            <span class="mx-2">/</span>
          </li>
          <li>
            <router-link :to="`/productos/${category}`" class="hover:text-purple-600">
              {{ categoryName }}
            </router-link>
          </li>
          <li>
            <span class="mx-2">/</span>
          </li>
          <li>
            <span class="text-gray-900">{{ product?.name }}</span>
          </li>
        </ol>
      </nav>

      <div class="grid gap-8 md:grid-cols-2">
        <div>
          <img
            :src="product?.image || '/placeholder.svg'"
            :alt="product?.name"
            class="rounded-lg object-cover w-full"
          />
        </div>

        <div>
          <h1 class="text-3xl font-bold text-gray-900">{{ product?.name }}</h1>
          <div class="mt-4">
            <span class="text-2xl font-bold text-purple-600">{{ product?.price }} Bs.</span>
          </div>
          
          <div class="mt-6 space-y-6">
            <p class="text-gray-600">{{ product?.description }}</p>

            <div class="border-t pt-6">
              <TabGroup>
                <TabList class="flex space-x-4 border-b">
                  <Tab v-slot="{ selected }">
                    <button
                      :class="[
                        'pb-4 text-sm font-medium',
                        selected
                          ? 'border-b-2 border-purple-600 text-purple-600'
                          : 'text-gray-600 hover:text-purple-600'
                      ]"
                    >
                      Detalles
                    </button>
                  </Tab>
                  <Tab v-slot="{ selected }">
                    <button
                      :class="[
                        'pb-4 text-sm font-medium',
                        selected
                          ? 'border-b-2 border-purple-600 text-purple-600'
                          : 'text-gray-600 hover:text-purple-600'
                      ]"
                    >
                      Instrucciones
                    </button>
                  </Tab>
                </TabList>
                <TabPanels class="mt-6">
                  <TabPanel>
                    <ul class="list-disc pl-5 space-y-2 text-gray-600">
                      <li v-for="feature in productFeatures" :key="feature">
                        {{ feature }}
                      </li>
                    </ul>
                  </TabPanel>
                  <TabPanel>
                    <div class="prose prose-purple">
                      <h4 class="text-lg font-semibold mb-2">Pasos para activar:</h4>
                      <ol class="list-decimal pl-5 space-y-2 text-gray-600">
                        <li>Recibirás la clave de activación por correo electrónico</li>
                        <li>Ingresa a la configuración de Windows</li>
                        <li>Selecciona "Actualizar y Seguridad" > "Activación"</li>
                        <li>Haz clic en "Cambiar clave de producto"</li>
                        <li>Ingresa la clave recibida</li>
                        <li>¡Listo! Tu producto estará activado</li>
                      </ol>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>

            <div class="border-t pt-6">
              <button
                @click="addToCart"
                class="w-full rounded-md bg-purple-600 px-8 py-4 text-center text-sm font-medium text-white hover:bg-purple-700"
              >
                Añadir al Carrito
              </button>
              <p class="mt-4 text-center text-sm text-gray-500">
                Entrega inmediata · Soporte incluido · 100% Original
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useProductsStore } from '@/stores/products'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const error = ref(null)

const categoryName = computed(() => {
  const categories = {
    'windows': 'Windows',
    'office': 'Office',
    'tarjetas': 'Tarjetas de Regalo'
  }
  return categories[route.params.category] || route.params.category
})

const productFeatures = computed(() => {
  if (!product.value) return []
  return [
    'Licencia original y permanente',
    'Activación garantizada',
    'Soporte técnico incluido',
    'Entrega inmediata por correo',
    'Compatible con todas las versiones'
  ]
})

const category = computed(() => route.params.category)

const loadProduct = async () => {
  loading.value = true
  error.value = null
  
  try {
    const validCategories = ["windows", "office", "tarjetas"]
    if (!validCategories.includes(category.value)) {
      throw new Error("Categoría no válida")
    }
    
    product.value = await productsStore.fetchProductById(route.params.id)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}

onMounted(() => {
  loadProduct()
})
</script>
