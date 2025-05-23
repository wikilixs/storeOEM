<script setup>
import ProductCategories from '@/components/ProductCategories.vue'
import FeaturedProducts from '@/components/FeaturedProducts.vue'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

const steps = [
  {
    title: '¿Qué son las claves OEM?',
    description: 'Las licencias OEM son claves originales que vienen con equipos nuevos. Son permanentes y completamente legales.',
    icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z'
  },
  {
    title: 'Activación Garantizada',
    description: 'Proceso sencillo de activación con soporte técnico incluido.',
    icon: 'M5 13l4 4L19 7'
  },
  {
    title: 'Tutorial de Activación',
    description: 'Aprende a activar tu licencia paso a paso.',
    icon: 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122'
  }
]

const features = [
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
    icon: 'M9 5l7 7-7 7'
  },
  {
    title: 'Guía de Office',
    description: 'Instala y activa tu suite de Office en minutos',
    icon: 'M19 14l-7 7m0 0l-7-7m7 7V3'
  }
]
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-grow">
      <!-- Hero Section - OEM Keys Info -->
      <section class="bg-gradient-to-r from-purple-900 to-purple-700 py-16 text-white">
        <div class="w-full px-4">
          <div class="w-full text-center">
            <h1 class="text-4xl font-bold mb-6">
              Claves OEM Originales al Mejor Precio
            </h1>
            <p class="text-xl mb-8">
              Software original con activación garantizada y soporte técnico incluido
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div v-for="(step, index) in steps" :key="index" class="flex items-start p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                <div class="flex-shrink-0 w-8 h-8 mr-3 flex items-center justify-center">
                  <svg class="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path :d="step.icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                  </svg>
                </div>
                <div>
                  <h3 class="text-base font-semibold mb-1">{{ step.title }}</h3>
                  <p class="text-sm text-purple-100 line-clamp-2">{{ step.description }}</p>
                </div>
              </div>
            </div>
            <a href="#tutorial" class="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-purple-900 bg-white hover:bg-purple-50">
              Ver Tutorial de Activación
              <svg class="ml-2 -mr-1 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <!-- Categories Section -->
      <section class="py-16">
        <div class="w-full px-4 md:px-6">
          <h2 class="text-3xl font-bold text-center mb-8">Nuestros Productos</h2>
          <ProductCategories />
        </div>
      </section>

      <!-- Featured Products Section -->
      <section class="py-16 bg-gray-50">
        <div class="w-full px-4 md:px-6">
          <h2 class="text-3xl font-bold text-center mb-8">Productos Destacados</h2>
          <FeaturedProducts />
        </div>
      </section>

      <!-- Features Section -->
      <section class="py-16 bg-gradient-to-br from-purple-50 to-white">
        <div class="w-full px-4">
          <div class="w-full">
            <h2 class="text-3xl font-bold text-purple-900 text-center mb-12">
              ¿Por qué elegirnos?
            </h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div
                v-for="(feature, index) in features"
                :key="index"
                class="flex items-center p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-purple-50 rounded-lg mr-3">
                  <svg class="w-2 h-2 text-purple-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"/>
                  </svg>
                </div>
                <span class="text-sm text-gray-700 line-clamp-2">{{ feature }}</span>
                </div>
              </div>
          </div>
        </div>
      </section>

      <!-- Tutorial Section -->
      <section id="tutorial" class="py-12">
        <div class="w-full px-4">
          <h2 class="text-2xl font-bold text-purple-900 text-center mb-8">
            Tutoriales de Activación
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <div
              v-for="(tutorial, index) in tutorials"
              :key="index"
              class="group flex items-start p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <div class="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-50 rounded-lg mr-4">
                <svg class="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tutorial.icon"/>
                </svg>
              </div>
              <div class="flex-grow min-w-0">
                <h3 class="text-base font-semibold text-purple-900 mb-1">{{ tutorial.title }}</h3>
                <p class="text-sm text-gray-600 mb-2 line-clamp-2">{{ tutorial.description }}</p>
                <div class="flex items-center text-purple-600 group-hover:text-purple-700">
                  <span class="text-sm font-medium">Ver tutorial</span>
                  <svg class="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <TheFooter />
  </div>
</template>
