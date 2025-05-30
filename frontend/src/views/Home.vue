<script setup>
import { ref } from 'vue'
import ProductCategories from '@/components/ProductCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'

const featuresList = [
  'Licencias 100% originales y permanentes',
  'Activación instantánea garantizada',
  'Soporte técnico personalizado',
  'Actualizaciones incluidas de por vida',
  'Garantía de funcionamiento o devolución',
  'Métodos de pago seguros'
]

const tutorials = [
  {
    title: 'Guía de Windows',
    description: 'Aprende a activar tu licencia de Windows paso a paso',
    icon: 'M9 5l7 7-7 7',
    link: '/tutoriales/windows'
  },
  {
    title: 'Guía de Office',
    description: 'Instala y activa tu suite de Office en minutos',
    icon: 'M19 14l-7 7m0 0l-7-7m7 7V3',
    link: '/tutoriales/office'
  }
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="max-w-7xl mx-auto">
        <div class="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main class="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-20">
            <div class="sm:text-center lg:text-left">
              <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Software Original</span>
                <span class="block text-purple-600">Precios Increíbles</span>
            </h1>
              <p class="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Las mejores licencias de Windows, Office y tarjetas de regalo para tus necesidades digitales.
            </p>
              <div class="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div class="rounded-md shadow">
                  <router-link
                    to="/productos"
                    class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 md:py-4 md:text-lg md:px-10"
                  >
                    Ver productos
                  </router-link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>

      <!-- Categories Section -->
      <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <ProductCategories />
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-3xl font-bold text-purple-900 text-center mb-8">Productos Destacados</h2>
          <FeaturedProducts />
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gradient-to-br from-purple-50 to-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-purple-900 text-center mb-12">
              ¿Por qué elegirnos?
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
              v-for="(feature, index) in featuresList"
                :key="index"
                class="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-50 rounded-lg mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                  </svg>
                </div>
            <span class="text-sm text-gray-700">{{ feature }}</span>
              </div>
          </div>
        </div>
      </section>

      <!-- Tutorial Section -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 class="text-2xl font-bold text-purple-900 text-center mb-8">
            Tutoriales de Activación
          </h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <router-link
              v-for="(tutorial, index) in tutorials"
              :key="index"
            :to="tutorial.link"
              class="group flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg mr-4">
                <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tutorial.icon"/>
                </svg>
              </div>
              <div class="flex-grow min-w-0">
                <h3 class="text-base font-semibold text-purple-900 mb-1">{{ tutorial.title }}</h3>
              <p class="text-sm text-gray-600 mb-2">{{ tutorial.description }}</p>
                <div class="flex items-center text-purple-600 group-hover:text-purple-700">
                  <span class="text-sm font-medium">Ver tutorial</span>
                  <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
          </router-link>
          </div>
        </div>
      </section>
  </div>
</template>
